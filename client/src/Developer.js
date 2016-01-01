import React, { Component } from 'react';
import register from "babel-core/register";
import polyfill from "babel-polyfill";

export default function Developer(developer) {

  let name = (!developer.name) ? "" : <h3>{developer.name} (<a href={developer.html_url}>{developer.login}</a>)</h3>;
  let company = (!developer.company) ? "" : <p>Company: {developer.company}</p>;
  let email = (!developer.email) ? "" : <p>Email: <a href={'mailto:' + developer.email}>{developer.email}</a></p>;
  let blog = (!developer.blog) ? "" : <p>Website: <a href={developer.blog}>{developer.blog}</a></p>;

  let details = (!developer.name)
   ? <td className="details">Fetching details...</td>
   : <td className="details">{name} {company} {email} {blog}</td>;

  return (
    <tr className="developer">
      <td className="image">
        <a href={developer.html_url}>
          <img src={developer.avatar_url}/>
        </a>
      </td>
      {details}
    </tr>
  );

}
