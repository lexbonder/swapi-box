import React, { Component } from 'react';
import CardContainer from '../CardContainer/CardContainer';
import Control from '../Control/Control';
import './App.css';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      openingCrawl: '',
      cardsToShow: ''
    }
  }

  async componentDidMount() {
    const initialFetch = await fetch('https://swapi.co/api/films/4/');
    const object = await initialFetch.json();
    this.setState({openingCrawl: object.opening_crawl});
  }

  getCards() {
    // Have button give variable
    // api call starwars/whaterver/${variable}/1/ <-- dry code
    // pass data through cleaner
    // print it on screen

    // May only need Cards component..
    // save data locally somewhere? maybe just copy selected objects into state.
    // Array or object?? Object is better/faster/dryer

    //focus on only making people work. do the rest after your freakin code works...
  }

  render() {
    return (
      <div className="App">
        <h1>SWAPIbox</h1>
        <h3>{this.state.openingCrawl}</h3>
        <Control getCards={this.getCards} />
        <CardContainer cardsToShow={this.state.cardsToShow} />
      </div>
    );
  }
}

export default App;
