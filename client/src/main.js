import fun from "fun-js";

$(function() {  
    fun.import({ under: window });

    var sourcr = new Sourcr();

    sourcr.fetch();

    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            sourcr.fetch();
        }
    };

    $('[role=search]').submit(sourcr.reset);
        
});


function Sourcr () {
    /**
     * Vars
     */
    var $table = $('[data-role=results]'),
        $form = $('[role=search]'),
        $language = $form.find('[name=language]'),
        $location = $form.find('[name=location]'),
        api = 'https://api.github.com/search/users',
        token = '&access_token=' + window.githubToken,
        sort = 'followers',
        num = '10',
        page = 1,
        rowTemplateSource = $("#person-placeholder").html(),
        detailsTemplateSource = $("#person-details").html(),
        results = {};

    $('[role=export]').submit(function () {

        var data = [["name", "username", "email"].join(',')];

        for (var i in results) {
            var result = results[i];
            data.push([result.name, result.login, result.email + ''].join(','));
        }

        var csvContent = "data:text/csv;charset=utf-8," + data.join("\n");
        
        
        var encodedUri = encodeURI(csvContent);
        window.open(encodedUri);

        return false;
    }); 



    /**
     * Private Functions
     */
    var renderTable = $table.append.bind($table),
        concat = curry(join, ''),
        rowTemplate = Handlebars.compile(rowTemplateSource),
        personTemplate = Handlebars.compile(detailsTemplateSource),
        buildRows = curry(map, rowTemplate),
        getItems = pluck('items'),
        storeResults = curry(map, storeResult),
        renderResults = compose(renderTable, concat, buildRows, storeResults, getItems),
        fetchPeopleDetails = (people) => people.forEach(fetchPersonDetails),
        fetchMoreDetails = compose(fetchPeopleDetails, getItems);

    function fetchPersonDetails (person) {
        $.get('https://api.github.com/users/' + person.login + '?' + token, function (data) {
            if (data.blog && data.blog.indexOf('http') === -1) {
                data.blog = 'http://' + data.blog;
            }

            $table.find('[data-id=' + person.login + ']').html(personTemplate(data));
            results[person.login].name = data.name;
            results[person.login].email = data.email;
        });
    }

    function storeResult (person) {
        results[person.login] = person;

        return person;
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
        results = {};
        $table.html('');
        fetch();

        return false;
    }

    this.fetch = fetch;
    this.reset = reset;

}