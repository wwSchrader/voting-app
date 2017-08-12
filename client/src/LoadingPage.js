import React, { Component } from 'react';
import { ScaleLoader } from 'halogen'

class LoadingPage extends Component {
  render() {
    return (
      <div className="LoadingPage">
        <ScaleLoader color="#26A65B" size={16} margin="4px" />
        <h4>Loading from server...Please wait.</h4>
      </div>
    );
  }
}

export default LoadingPage;