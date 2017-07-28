import React, { Component } from 'react';
import './App.css';
import NavigationBar from './NavigationBar.js';
import HomePage from './HomePage.js';
import NewVotePage from './NewVotePage.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar />
        <HomePage />
        <NewVotePage />
      </div>
    );
  }
}

export default App;
