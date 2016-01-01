import React, { Component } from 'react';
import { OrderedMap } from 'immutable';
import register from "babel-core/register";
import polyfill from "babel-polyfill";

export default class SearchForm extends Component {

  static propTypes = {
    onUpdate: React.PropTypes.func.isRequired,
    onClear: React.PropTypes.func.isRequired,
    github: React.PropTypes.object.isRequired
  };

  state = {
    language: "JavaScript",
    location: "London",
    page: 1
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.bindScroll();
    this.nextPage();
  }

  bindScroll() {
    window.onscroll = (ev) => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.nextPage();
      }
    };
  }

  async nextPage() {
    let response = await this.props.github.search(
      this.state.language,
      this.state.location,
      this.state.page
    );

    let developers = {};

    for (let person of response.body.items) {
      developers[person.login] = person;
    }

    this.props.onUpdate(developers);
    this.setState({ page: this.state.page + 1 });
  }

  handleLocationChange(e) {
    this.setState({ location: e.target.value });
  }

  handleLanguageChange(e) {
    this.setState({ language: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ page: 1 });
    this.props.onClear();
    this.nextPage();
  }

  render() {
    return (
      <form className="navbar-form navbar-left" onSubmit={::this.onSubmit}>
        <div className="form-group">
          <label htmlFor="language">Find</label>
          <input type="text" className="form-control" id="language" name="language" onChange={::this.handleLanguageChange} value={this.state.language}/>
          <label htmlFor="location">developers in</label>
          <input type="text" className="form-control" id="location" name="location" onChange={::this.handleLocationChange} value={this.state.location}/>
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
    );
  }

}
