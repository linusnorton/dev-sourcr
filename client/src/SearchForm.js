import React, { Component } from 'react';
import register from "babel-core/register";
import polyfill from "babel-polyfill";

export default class SearchForm extends Component {

  getInitialState() {
    return { language: this.props.language, location: this.props.language };
  }

  handleLocationChange(e) {
    this.setState({ location: e.target.value });
  }

  handleLanguageChange(e) {
    this.setState({ language: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.onQuery({
      language: this.state.language,
      location: this.state.location
    });
  }

  render() {

    return (
      <form style="margin-left: 50px;" className="navbar-form navbar-left" onsubmit={this.handleSubmit}>
        <div className="form-group">
          <label for="language">Find</label>
          <input type="text" className="form-control" id="language" name="language" data-input="language" value={this.state.language}/>
          <label for="location">developers in</label>
          <input type="text" className="form-control" id="location" name="location" data-input="location" value={this.state.location}/>
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
    );
  }

}

