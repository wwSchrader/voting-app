import React, { Component } from 'react';
import { connect } from 'react-redux';
import { votesFetchSinglePoll } from './actions';
import { FormGroup, Radio, ControlLabel, Button, InputGroup, FormControl } from 'react-bootstrap';
import {Pie} from 'react-chartjs-2';

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
            let queryString = '';
            if (this.state.selectedRadioButton < 0) {
                //handle adding option and voting
                queryString = "/api/addoptionandvote/?id=" + this.pollId + "&votename=" + this.state.newOptionText;
            } else {
                //submit vote to server
               queryString = "/api/submitvote/?id=" + this.pollId + "&vote=" + this.state.selectedRadioButton;
            }

            fetch(queryString, {method: 'put', credentials: 'include'})
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
        fetch("/api/deletepoll/?id=" + this.pollId, {method: 'delete', credentials: 'include'})
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
        var chartLabels= [];
        var chartVotes = [];
        if (typeof this.props.singlePoll.voteOptions !== 'undefined') {
            options = this.props.singlePoll.voteOptions.map((option, index) => {
                //push option name and votes onto array for chart
                chartLabels.push(option.optionName);
                chartVotes.push(option.optionVotes);

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
        }

        var chartData = {
            labels: chartLabels,
            datasets: [{
                data: chartVotes,
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#2ecc71',
                '#e74c3c',
                '#8e44ad',
                '#f1c40f',
                '#1abc9c'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#2ecc71',
                '#e74c3c',
                '#8e44ad',
                '#f1c40f',
                '#1abc9c'
                ]
            }]
        };

        let createNewOption = null;
        if (this.props.userIsSignedIn) {
            createNewOption =
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
                </InputGroup>;
        }

        let voteSelectionForm = null;
        //show voting options if ip address does not one in the list
        if (this.props.singlePoll.voterList !== undefined) {
            if (this.props.singlePoll.voterList.indexOf(this.props.singlePoll.userIp) === -1) {
                voteSelectionForm = <form onSubmit={this.handleFormSubmit}>
                    <FormGroup>
                        <ControlLabel>Vote for an option:</ControlLabel>
                        {options}
                        {createNewOption}
                    </FormGroup>
                    <Button type="submit" bsStyle="primary">
                        Vote
                    </Button>
                </form>;
            } else {
                voteSelectionForm = <h3>Thank you for your vote!</h3>;
            }
        }

        return(
            <div>
                <h3>Vote: {this.props.singlePoll.voteName}</h3>
                {voteSelectionForm}
                <Pie data={chartData} />
                <Button bsStyle="danger" onClick={() => this.deletePoll()}>
                        Delete Poll
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        singlePoll: state.singlePoll,
        hasErrored: state.voteHasErrored,
        isLoading: state.votesIsLoading,
        userIsSignedIn: state.userIsSignedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(votesFetchSinglePoll(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VotingPage);