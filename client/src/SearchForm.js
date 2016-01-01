import React, { Component } from 'react';
import { OrderedMap } from 'immutable';
import register from "babel-core/register";
import polyfill from "babel-polyfill";

export default class SearchForm extends Component {

  static propTypes = {
    onResults: React.PropTypes.func.isRequired,
    github: React.PropTypes.object.isRequired
  };

  state = {
    language: "JavaScript",
    location: "London",
    developers: new OrderedMap(),
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

    let developers = this.state.developers;

    for (let person of response.body.items) {
      developers = developers.set(person.login, person);
    }

    this.setState({
      developers: developers,
      page: this.state.page + 1
    });

    this.props.onResults(developers);
  }

  handleLocationChange(e) {
    this.setState({ location: e.target.value });
  }

  handleLanguageChange(e) {
    this.setState({ language: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      developers: new OrderedMap(),
      page: 1
    });

    this.nextPage();
  }

  render() {
    return (
      <form className="navbar-form navbar-left" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label htmlFor="language">Find</label>
          <input type="text" className="form-control" id="language" name="language" onChange={this.handleLanguageChange.bind(this)} value={this.state.language}/>
          <label htmlFor="location">developers in</label>
          <input type="text" className="form-control" id="location" name="location" onChange={this.handleLocationChange.bind(this)} value={this.state.location}/>
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
    );
  }

}
