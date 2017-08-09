import React, { Component } from 'react';
import update from 'immutability-helper';
import { PageHeader, FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createVote } from './actions';

class NewVotePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteName: '',
            voteOptions: ['', ''],
            submitButtonPressed: false
        };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleRemoveOption = this.handleRemoveOption.bind(this);
    this.validateName = this.validateName.bind(this);
    this.onSubmitButtonPress = this.onSubmitButtonPress.bind(this);
    this.handleCreateVote = this.handleCreateVote.bind(this);
    }

    handleCreateVote() {
        let newVote = {
            voteName: this.state.voteName,
            voteOptions: this.state.voteOptions
        };

        this.props.createVote(newVote);

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let postData = {
            method: 'POST',
            body: JSON.stringify(newVote),
            headers: myHeaders,
            credentials: 'include'
        }

        //add vote and then changes url to voting page
        fetch('/api/addvote', postData)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((returnedInfo) => {
                this.props.history.push('/vote/' + returnedInfo.insertedId);
            })
    }

    handleNameChange(e) {
        //limit name size to 50 characters
        if (e.target.value.length < 50) {
            this.setState({ voteName: e.target.value });
        }
    }

    handleOptionChange(index, e) {
        //limit option size to 50 characters
        if (e.target.value.length < 50) {
            this.setState(update(
                this.state,{
                    voteOptions: {
                        [index]: {$set: e.target.value}
                    }
                }
            ));
        }
    }

    //add an empty string to end of options array
    handleAddOption() {
        this.setState(update(this.state,{
            voteOptions: {
                $push: ['']
            }
        }));
    }

    //remove last element from options array
    handleRemoveOption(){
        this.setState(update(this.state,{
            voteOptions: {
                $splice: [[this.state.voteOptions.length - 1, 1]]
            }
        }));
    }

    validateName(){
        if (this.state.submitButtonPressed) {
            if (this.state.voteName.length === 0) {
                return "error";
            } else {
                return "success";
            }
        } else {
            return null;
        }
    }

    validateOption(index, e) {
        if (this.state.submitButtonPressed) {
            if (this.state.voteOptions[index].length === 0) {
                return "error";
            } else {
                return "success";
            }
        } else {
            return null;
        }
    }

    onSubmitButtonPress(e) {
         this.setState(update(this.state,{
            submitButtonPressed: {
               $set: true
            }
        }));

         //check to see if name is not empty
         if (this.state.voteName.length !== 0) {
            let isValidated = true;
            //check if any of the options are empty
            this.state.voteOptions.map((option) => {
                if (option.length === 0) {
                    isValidated = false;
                }
                return true;
            });

            //if validate, update store
            if (isValidated) {
                this.handleCreateVote();
            }
         }

        e.preventDefault();
    }

    renderHelpBock(validationStatus) {
        if (validationStatus === 'error') {
            return (<HelpBlock>Can't Be Empty!</HelpBlock>);
        }
    }

  render() {
    let voteOptions = this.state.voteOptions.map((option, index) => {
        let validationStatus = this.validateOption.bind(this, index)();
        return (
            <FormGroup key={index} controlId={"formVoteOptions" + index} validationState={validationStatus}>
                <FormControl key={index}
                    type="text"
                    value={this.state.voteOptions[index]}
                    placeholder="Name of option"
                    onChange={this.handleOptionChange.bind(this, index)}
                />
                {this.renderHelpBock(validationStatus)}
                <FormControl.Feedback />
            </FormGroup>
        );
    });

    let voteRemoveOptionButton = () => {
        //show remove option button if there are more than 2 option
        if (this.state.voteOptions.length > 2) {
            return (
                <Button bsStyle="danger" onClick={this.handleRemoveOption}>
                    Remove option
                </Button>
            );
        }
    }
    return (
      <div className="Home">
        <PageHeader>Create a new Vote.</PageHeader>
        <p>Fill out the form below to create your vote!</p>

          <form onSubmit={this.onSubmitButtonPress}>
            <FormGroup controlId="formVoteName" validationState={this.validateName()}>
                <ControlLabel>Vote Name</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.voteName}
                    placeholder="Name of the Vote"
                    onChange={this.handleNameChange}
                />
                {this.renderHelpBock(this.validateName)}
                <FormControl.Feedback />
            </FormGroup>
            <h3>Vote Options</h3>
            {voteOptions}
            <Button onClick={this.handleAddOption}>
                Add option
            </Button>
            {voteRemoveOptionButton()}
            <Button bsStyle="primary" type="submit">
                Create Vote
            </Button>
          </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        votes: state.votes
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createVote: (newVote) => dispatch(createVote(newVote))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewVotePage);