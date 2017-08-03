import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class PollTitleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pollId: props.pollId,
            pollName: props.pollName
        }

        this.onButtonPress = this.onButtonPress.bind(this);
    }

    onButtonPress(e) {
        console.log(this.state.pollId);
    }

    render() {
        console.log(this.state);
        return (
            <Button onClick={this.onButtonPress}>{this.state.pollName}</Button>
        );
    }
}

export default PollTitleButton