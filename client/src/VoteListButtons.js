import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class VoteListButtons extends Component {
    constructor(props) {
        super(props);

        this.state = {
            voteList: ["Election", "Star Wars", "Star Trek", "Game Of Thrones"]
        };
    }

  render() {
    let voteButton = this.state.voteList.map(vote => {
        return (<Button key={vote}>{vote}</Button>);
    });

    return (
      <div className="VoteListButtons">
        {voteButton}
      </div>
    );
  }
}

export default VoteListButtons;