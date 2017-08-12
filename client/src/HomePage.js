import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import VoteListButtons from './VoteListButtons.js';

class HomePage extends Component {
  render() {
    return (
      <div className="Home">
        <PageHeader>Voting App</PageHeader>
        <p>Select a poll to see results and vote, or sign-in to make a new poll.</p>
        <VoteListButtons />
      </div>
    );
  }
}

export default HomePage;