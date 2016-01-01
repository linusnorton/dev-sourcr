import register from "babel-core/register";
import polyfill from "babel-polyfill";

export default class GitHub {
  endpoints = {
    search: 'https://api.github.com/search/users',
    user: 'https://api.github.com/users/'
  };

  constructor(http, token) {
    this.http = http;
    this.token = '&access_token=' + token;
  }

  search(language, location, page = 1, num = 10, sort = "followers") {
    let url = encodeURI(
      `${this.endpoints.search}?q=type:user language:${language} location:${location}&sort=${sort}&per_page=${num}&page=${page}${this.token}`
    );

    return this.http.get(url);
  }

  getUserDetails(username) {
    return this.http.get(`${this.endpoints.user}${username}?${this.token}`)
               .then(response => this.extractUserDetails(username, response));
  }

  extractUserDetails(username, response) {
    let data = response.body;

    if (data.blog && data.blog.indexOf('http') === -1) {
        data.blog = 'http://' + data.blog;
    }

    return { [username]: data };
  }

}
