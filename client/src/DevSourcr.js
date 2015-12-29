import React, { Component } from 'react';
import GitHub from "./GitHub";

export default class DevSourcr extends Component {
  
  static propTypes = { 
    githubToken: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    props.github = new GitHub($, props.githubToken);

    super(props);
  }

  handleQuery(e) {
    
  }

  render() {
    return (
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
            <SearchForm onQuery={this.handleQuery} />
            <ul className="nav navbar-nav navbar-right">
              <li><a href="/sign-out">Sign out</a></li>
            </ul>
            <form className="navbar-form navbar-right" role="export">
              <button type="submit" className="btn btn-danger">Export</button>
            </form>
          </div>
        </div>
      </div>
      </nav>

      <div className="container">
        <DevelopList language="JavaScript" location="London" github="{this.props.github}" />
      </div>
    );
  }

}