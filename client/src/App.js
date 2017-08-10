import React, { Component } from 'react';
import './App.css';
import NavigationBar from './NavigationBar.js';
import HomePage from './HomePage.js';
import NewVotePage from './NewVotePage.js';
import VotingPage from './VotingPage.js';
import LoginPage from './LoginPage.js';
import RegistrationPage from './RegistrationPage.js';
import MyPollsPage from './MyPollsPage.js';
import { Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={NavigationBar} />
        <Route exact path="/" component={HomePage} />
        <Route path="/newpoll" component={NewVotePage} />
        <Route path="/mypolls" component={MyPollsPage} />
        <Route path="/vote/:id" component={VotingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegistrationPage} />
      </div>
    );
  }
}

export default App;
