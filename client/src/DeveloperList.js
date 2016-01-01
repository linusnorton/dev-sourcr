import React, { Component } from 'react';
import Developer from './Developer';

export default function DeveloperList({github, developers}) {

  let developerComponents = developers.map(developer =>
    <Developer key={developer.login} github={github} {...developer} />
  );

  return (
    <table className="table table-striped">
      <tbody>{developerComponents.toList()}</tbody>
    </table>
  );
}
