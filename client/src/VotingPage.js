import React, { Component } from 'react';

class VotingPage extends Component {
    constructor(props) {
        super(props);

        this.pollId = this.props.match.params.id;
    }


    render(){
        return(
            <div>
                <h3>Vote: {this.pollId}</h3>
                <ul>
                    <li>1st option</li>
                    <li>2nd option</li>
                </ul>
            </div>
        );
    }
}

export default VotingPage;