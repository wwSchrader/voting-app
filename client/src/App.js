import React, { Component } from 'react';
import './App.css';
import NavigationBar from './NavigationBar.js';
import HomePage from './HomePage.js';
import NewVotePage from './NewVotePage.js';
import { Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar />
        <Route exact path="/" component={HomePage} />
        <Route path="/newpoll" component={NewVotePage} />
      </div>
    );
  }
}

export default App;
