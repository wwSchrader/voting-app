import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import PollTitleButton from './PollTitleButton.js';
import { connect } from 'react-redux';
import { votesFetchCreatedPollsByUser } from './actions/index';

class MyPollsPage extends Component {
  componentDidMount() {
        this.props.fetchData();
    }

  render() {
    let voteButton = this.props.votes.map((vote, index) => {
        return (
            <PollTitleButton
                key={vote._id}
                pollId={vote._id}
                pollName={vote.voteName}/>
        );
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
        votes: state.votes,
        hasErrored: state.voteHasErrored,
        isLoading: state.votesIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(votesFetchCreatedPollsByUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (MyPollsPage);