import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';

class NewVotePage extends Component {
  render() {
    return (
      <div className="Home">
        <PageHeader>Create a new Vote.</PageHeader>
        <p>Fill out the form below to create your vote!</p>
      </div>
    );
  }
}

export default NewVotePage;