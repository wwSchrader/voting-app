import React, { Component } from 'react';
import update from 'immutability-helper';
import { PageHeader, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class NewVotePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteName: '',
            voteOptions: ['', '']
        };
    this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e) {
        this.setState({ voteName: e.target.value });
    }

    handleOptionChange(index, e) {
        let newState = update(
                this.state,{
                    voteOptions: {
                        [index]: {$set: e.target.value}
                    }
                }
            );
        this.setState(newState);
    }

  render() {
    let voteOptions = this.state.voteOptions.map((option, index) => {
        return (
            <FormControl key={index}
                type="text"
                value={this.state.voteOptions[index]}
                placeholder="Name of option"
                onChange={this.handleOptionChange.bind(this, index)}
            />
        );
    })
    return (
      <div className="Home">
        <PageHeader>Create a new Vote.</PageHeader>
        <p>Fill out the form below to create your vote!</p>

          <form>
            <FormGroup controlId="formVoteName">
                <ControlLabel>Vote Name</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.voteName}
                    placeholder="Name of the Vote"
                    onChange={this.handleNameChange}
                />
                <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="formVoteOptions">
                <ControlLabel>Vote Options</ControlLabel>
                    {voteOptions}
                    <FormControl.Feedback />
            </FormGroup>
            <Button bsStyle="primary" type="submit">
                Create Vote
            </Button>
          </form>
      </div>
    );
  }
}

export default NewVotePage;