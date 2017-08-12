import React, { Component } from 'react';
import { connect } from 'react-redux';
import { votesFetchData } from './actions/index';
import PollTitleButton from './PollTitleButton.js';
import LoadingPage from './LoadingPage.js';

class VoteListButtons extends Component {
    componentDidMount() {
        this.props.fetchData();
    }

  render() {
    let displayPage = null;
    if (this.props.isLoading) {
        displayPage = <LoadingPage />
    } else {
        displayPage = this.props.votes.map((vote, index) => {
            return (
                <PollTitleButton
                    key={vote._id}
                    pollId={vote._id}
                    pollName={vote.voteName}/>
            );
        });
    }


    return (
      <div className="VoteListButtons">
        {displayPage}
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
        fetchData: (url) => dispatch(votesFetchData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VoteListButtons);