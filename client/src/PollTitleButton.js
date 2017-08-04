import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Route } from 'react-router-dom';

class PollTitleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pollId: props.pollId,
            pollName: props.pollName
        }
    }

    render() {
        return (
            <Route render={({ history }) => (
                <Button
                    onClick={() => { history.push('/vote/' + this.state.pollId)}}>
                    {this.state.pollName}
                </Button>
            )} />
        );
    }
}

export default PollTitleButton