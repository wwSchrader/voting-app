import React, { Component } from 'react';
import { connect } from 'react-redux';
import { votesFetchSinglePoll } from './actions';
import { FormGroup, Radio, ControlLabel, Button, InputGroup, FormControl } from 'react-bootstrap';

class VotingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRadioButton: null,
            newOptionText: ""
        }

        this.pollId = this.props.match.params.id;
        this.deletePoll = this.deletePoll.bind(this);
        this.handleOnRadioChange = this.handleOnRadioChange.bind(this);
        this.handleNewOptionTextChange = this.handleNewOptionTextChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(e) {
        if (this.state.selectedRadioButton !== null) {
            if (this.state.selectedRadioButton < 0) {
                //handle adding option here
            } else {
                //submit vote to server
                fetch("/api/submitvote/?id=" + this.pollId + "&vote=" + this.state.selectedRadioButton, {method: 'put'})
                    .then((response) => {
                        if (!response.ok) {
                            throw Error(response.statusText);
                        }
                    })
                    .then((response) => {
                        this.props.fetchData(this.pollId);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        }
        e.preventDefault();
    }

    componentDidMount() {
        this.props.fetchData(this.pollId);
    }

    handleNewOptionTextChange (e) {
        //limit text length
        if (e.target.value.length < 50) {
            this.setState({
                newOptionText: e.target.value
            });
        }
    }

    handleOnRadioChange(e) {
        this.setState({
            selectedRadioButton: parseInt(e.target.value, 10)
        });
    }

    deletePoll() {
        fetch("/api/deletepoll/?id=" + this.pollId, {method: 'delete'})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                this.props.history.push('/');
            })
            .catch((e) => {
                console.log(e);
            }
        );
    }

    render(){
        var options = [];
        var results = [];
        if (typeof this.props.singlePoll.voteOptions !== 'undefined') {
            options = this.props.singlePoll.voteOptions.map((option, index) => {
                return (
                    <Radio
                        name="optionRadioGroup"
                        value={index}
                        key={index + option.optionName}
                        onChange={this.handleOnRadioChange}
                        checked={this.state.selectedRadioButton === index}
                        >{option.optionName}</Radio>
                );
            });

             results = this.props.singlePoll.voteOptions.map((option) => {
                return (<h4 key={"results" + option.optionName}>{option.optionName}: {option.optionVotes} </h4>)
            });
        }

        return(
            <div>
                <h3>Vote: {this.props.singlePoll.voteName}</h3>
                <form onSubmit={this.handleFormSubmit}>
                    <FormGroup>
                        <ControlLabel>Vote for an option:</ControlLabel>
                        {options}
                        <InputGroup>
                            <InputGroup.Addon>
                                <input
                                    type="radio"
                                    name="optionRadioGroup"
                                    value="-1"
                                    onChange={this.handleOnRadioChange}
                                    checked={this.state.selectedRadioButton === -1}
                                    />
                            </InputGroup.Addon>
                            <FormControl
                                type="text"
                                placeholder="Enter a new option"
                                value={this.state.newOptionText}
                                onChange={this.handleNewOptionTextChange}/>
                        </InputGroup>
                    </FormGroup>
                    <Button type="submit" bsStyle="primary">
                        Vote
                    </Button>
                    <Button bsStyle="danger" onClick={() => this.deletePoll()}>
                        Delete Poll
                    </Button>
                </form>

                {results}
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