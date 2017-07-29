import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class VoteListButtons extends Component {
  render() {
    let voteButton = this.props.votes.map(vote => {
        return (<Button key={vote.id}>{vote.vote.voteName}</Button>);
    });

    return (
      <div className="VoteListButtons">
        {voteButton}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        votes: state.votes
    };
};

export default connect(mapStateToProps)(VoteListButtons);