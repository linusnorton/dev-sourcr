import React, { Component } from 'react';
import { OrderedMap } from 'immutable';
import Developer from './Developer';
import register from "babel-core/register";
import polyfill from "babel-polyfill";

export default class DeveloperList extends Component {

  static propTypes = { 
    github: React.PropTypes.object.isRequired,
    language: React.PropTypes.string.isRequired,
    location: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      developers: new OrderedMap(),
      page: 1
    };

    this.bindScroll();
  }

  componentDidMount() {
    this.nextPage();
  }

  bindScroll() {
    window.onscroll = (ev) => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        developerList.nextPage();
      }
    };
  }

  async nextPage() {
    let response = await this.props.github.search(
      this.props.language, 
      this.props.location, 
      this.state.page
    );

    let developers = this.state.developers;

    for (let person of response.items) {
      developers = developers.set(person.login, person);
    }

    this.setState({
      developers: developers,      
      page: this.state.page + 1
    });
  }

  render() {
    let developers = this.state.developers.map(developer =>  
      <Developer key={developer.login} github={this.props.github} {...developer} />
    );

    return (
      <table className="table table-striped">
        <tbody>{developers.toList()}</tbody>
      </table>
    );
  }

}

