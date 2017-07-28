import React, { Component } from 'react';
import './App.css';
import NavigationBar from './NavigationBar.js';
import HomePage from './HomePage.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar />
        <HomePage />
      </div>
    );
  }
}

export default App;
