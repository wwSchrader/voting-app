import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { votesFetchData } from './actions/index';

class VoteListButtons extends Component {
    componentDidMount() {
        this.props.fetchData();
    }

  render() {
    console.log(this.props.votes);
    let voteButton = this.props.votes.map((vote, index) => {
        return (<Button key={vote + index}>{vote.voteName}</Button>);
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
        fetchData: (url) => dispatch(votesFetchData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VoteListButtons);