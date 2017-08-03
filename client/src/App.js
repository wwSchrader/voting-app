import React, { Component } from 'react';
import './App.css';
import NavigationBar from './NavigationBar.js';
import HomePage from './HomePage.js';
import NewVotePage from './NewVotePage.js';
import VotingPage from './VotingPage.js';
import { Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar />
        <Route exact path="/" component={HomePage} />
        <Route path="/newpoll" component={NewVotePage} />
        <Route path="/vote/:id" component={VotingPage} />
      </div>
    );
  }
}

export default App;
