
    
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

const app = (state = {}, action) => {

  let query = form(state.query, action);
  let results = resultsList(state.resultsList, action);

  switch (action) {
    case "SEARCH": return ;
    case "NEXT_PAGE": return ;
    case "REQUEST_USER_DETAILS": return;
    default: return state;
  }

};

const form = (state = { language: "JavaScript", location: "London"}, action) => {

}

const resultsList = (state = [], action) => {

}

const store = createStore(app);

<SearchForm onSubmit={app({ type: "SEARCH", language: this.state.langage, location: this.state.location })} />
<DeveloperList onScroll={app({ type: "NEXT_PAGE" })}>
  <Developer onRender={app({ type: "GET_USER_DETAILS", id: this.props.id })} />
</DeveloperList>


const DeveloperList = ({ developers }) => (
  <table>
    <tbody>
      { developers.map( (dev) => {
        <Developer key={dev.login} onNeedMoreDetails={app} {...developer} />
      })}
    </tbody>
  </table>
);

const Developer = (login, avatar_url, html_url, onNeedMoreDetails, details = null) => {
  if (details === null) {
    onNeedMoreDetails({ type: "REQUEST_USER_DETAILS", id: login });
  }

  return (
    <tr><td>{login}</td></tr>;
  );
}

const SearchForm = (onSubmit, location, language) => {
  <form 
}