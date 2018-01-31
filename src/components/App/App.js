import React, { Component } from 'react';
import CardContainer from '../CardContainer/CardContainer';
import Control from '../Control/Control';
import './App.css';

class App extends Component {
  constructor(props) {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <h1>SWAPIbox</h1>
        <Control />
        <CardContainer />
      </div>
    );
  }
}

export default App;
