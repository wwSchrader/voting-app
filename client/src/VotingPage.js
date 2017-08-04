import React, { Component } from 'react';
import { connect } from 'react-redux';
import { votesFetchSinglePoll } from './actions';

class VotingPage extends Component {
    constructor(props) {
        super(props);

        this.pollId = this.props.match.params.id;
    }

    componentDidMount() {
        this.props.fetchData(this.pollId);
    }

    render(){
        console.log(this.props);
        var options = [];
        if (typeof this.props.singlePoll.voteOptions !== 'undefined') {
            options = this.props.singlePoll.voteOptions.map((option) => {
                return (<li key={option}>{option}</li>);
            });
        }

        return(
            <div>
                <h3>Vote: {this.props.singlePoll.voteName}</h3>
                <ul>
                    {options}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        singlePoll: state.singlePoll,
        hasErrored: state.voteHasErrored,
        isLoading: state.votesIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(votesFetchSinglePoll(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VotingPage);