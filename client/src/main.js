$(function() {	
	fun.import({ under: window });

	var sourcr = new Sourcr();

	sourcr.fetch();

	window.onscroll = function(ev) {
	    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
	        sourcr.fetch();
	    }
	};

	$('[data-role=search]').click(sourcr.reset);
});


function Sourcr () {
	/**
	 * Vars
	 */
	var $table = $('[data-role=results]'),
		$language = $('[name=language]'),
		$location = $('[name=location]'),
		api = 'https://api.github.com/search/users',
		token = '&access_token=' + window.githubToken,
		sort = 'followers',
		num = '10',
		page = 1,
		rowTemplateSource = $("#person-placeholder").html(),
		detailsTemplateSource = $("#person-details").html();


	/**
	 * Private Functions
	 */
	var renderTable = $table.append.bind($table),
		concat = curry(join, ''),
		rowTemplate = Handlebars.compile(rowTemplateSource),
		personTemplate = Handlebars.compile(detailsTemplateSource),
		buildRows = curry(map, rowTemplate),
		getItems = pluck('items'),
		renderResults = compose(renderTable, concat, buildRows, getItems),
		fetchPeopleDetails = curry(forEach, fetchPersonDetails),
		fetchMoreDetails = compose(fetchPeopleDetails, getItems);

	function fetchPersonDetails (person) {
		$.get('https://api.github.com/users/' + person.login + '?' + token, function (data) {
			$table.find('[data-id=' + person.login + ']').html(personTemplate(data));
		});
	}

	function getQuery () {
		return 'type:user language:' + $language.val() + ' location:' + $location.val();		
	}

	/**
	 * Public functions
	 */
	function fetch () {
		var url = api + '?q=' + getQuery() + '&sort=' + sort + '&per_page=' + num + '&page=' + page++ + token;

		$.get(encodeURI(url), function (data) {
			renderResults(data);
			fetchMoreDetails(data);
		});
	}

	function reset () {
		page = 1;
		$table.html('');
		fetch();
	}

	this.fetch = fetch;
	this.reset = reset;

}