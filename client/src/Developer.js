import React, { Component } from 'react';
import register from "babel-core/register";
import polyfill from "babel-polyfill";

export default class Developer extends Component {

  static propTypes = {
    github: React.PropTypes.object.isRequired,
    login: React.PropTypes.string.isRequired
  };

  state = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getUserDetails();
  }

  async getUserDetails() {
    try {
      let response = await this.props.github.getUserDetails(this.props.login);
      let data = response.body;

      if (data.blog && data.blog.indexOf('http') === -1) {
          data.blog = 'http://' + data.blog;
      }
      this.setState(data);
    }
    catch (err) {
      throw new Error(`Could not fetch details of ${this.props.login}, error: ${err}`);
    }
  }

  render() {
    let name = (!this.state.name) ? "" : <h3>{this.state.name} (<a href={this.state.html_url}>{this.state.login}</a>)</h3>;
    let company = (!this.state.company) ? "" : <p>Company: {this.state.company}</p>;
    let email = (!this.state.email) ? "" : <p>Email: <a href={'mailto:' + this.state.email}>{this.state.email}</a></p>;
    let blog = (!this.state.blog) ? "" : <p>Website: <a href={this.state.blog}>{this.state.blog}</a></p>;

    let details = (!this.state.name)
     ? <td className="details">Fetching details...</td>
     : <td className="details">{name} {company} {email} {blog}</td>;

    return (
      <tr className="developer">
        <td className="image">
          <a href={this.props.html_url}>
            <img src={this.props.avatar_url}/>
          </a>
        </td>
        {details}
      </tr>
    );
  }

}
