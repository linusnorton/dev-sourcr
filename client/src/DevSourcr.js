import React, { Component } from 'react';
import GitHub from "./GitHub";
import DeveloperList from "./DeveloperList";
import SearchForm from "./SearchForm";
import { OrderedMap } from 'immutable';
import http from 'superagent-bluebird-promise';

export default class DevSourcr extends Component {

  static propTypes = {
    githubToken: React.PropTypes.string.isRequired,
  };

  state = {
    developers: new OrderedMap()
  };

  constructor(props) {
    super(props);

    this.github = new GitHub(http, props.githubToken);
  }

  export(e) {
    e.preventDefault();

    let content = "name,username,email\n";

    for (let d of this.state.developers.values()) {
      content += d.email ? `${d.name},${d.login},${d.email}\n` : '';
    }

    window.open(encodeURI("data:text/csv;charset=utf-8," + content));
  }

  onUpdate(results) {
    let developers = new OrderedMap(results);

    for (let [login, developer] of developers) {
      if (typeof developer.name === 'undefined') {
        this.github.getUserDetails(login).then(::this.onUpdate);
      }
    }

    this.setState({
      developers: this.state.developers.mergeDeep(developers)
    });
  }

  onClear() {
    this.setState({
      developers: new OrderedMap()
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top " role="navigation">
          <div className="container">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">Search</a>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <SearchForm onClear={::this.onClear} onUpdate={::this.onUpdate} github={this.github} />
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="/sign-out">Sign out</a></li>
                </ul>
                <form className="navbar-form navbar-right" onSubmit={::this.export}>
                  <button type="submit" className="btn btn-danger">Export</button>
                </form>
              </div>
            </div>
          </div>
        </nav>
        <div className="container">
          <DeveloperList developers={this.state.developers}/>
        </div>
      </div>
    );
  }

}
