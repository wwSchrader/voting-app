import React, { Component } from 'react';
import { connect } from 'react-redux';
import { votesFetchSinglePoll } from './actions';
import { FormGroup, Radio, ControlLabel, Button, InputGroup, FormControl } from 'react-bootstrap';

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
                return (<Radio name="optionRadioGroup" key={option}>{option}</Radio>);
            });
        }

        return(
            <div>
                <h3>Vote: {this.props.singlePoll.voteName}</h3>
                <form>
                    <FormGroup>
                        <ControlLabel>Vote for an option:</ControlLabel>
                        {options}
                        <InputGroup>
                            <InputGroup.Addon>
                                <input type="radio" name="optionRadioGroup" />
                            </InputGroup.Addon>
                            <FormControl type="text" placeholder="Enter a new option"/>
                        </InputGroup>
                    </FormGroup>
                    <Button type="submit" bsStyle="primary">
                        Vote
                    </Button>
                    <Button bsStyle="danger">
                        Delete Poll
                    </Button>
                </form>
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