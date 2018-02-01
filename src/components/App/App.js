import React, { Component } from 'react';
import CardContainer from '../CardContainer/CardContainer';
import Control from '../Control/Control';
import DataCleaner from '../../helper.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      openingCrawl: '',
      chosenCategory: '',
      cleanedData: [],
      cleaner: {},
    }
  }

  async componentDidMount() {
    const cleaner = new DataCleaner()
    const episodeNumber = Math.ceil(Math.random() * 7)
    const initialFetch = await fetch(`https://swapi.co/api/films/${episodeNumber}/`);
    const object = await initialFetch.json();
    this.setState({openingCrawl: object.opening_crawl, cleaner});
  }

  getCards = async (event) => {
    // Have button give variable
    const chosenCategory = event.target.name;
    // api call starwars/whaterver/${variable}/1/ <-- dry code
    const initialFetch = await fetch(`https://swapi.co/api/${chosenCategory}/`)
    const foundData = await initialFetch.json()
    // pass data through cleaner
    // dataCleaner(chosenCategory, foundData)
    const cleanedData = await this.state.cleaner.cleanData(chosenCategory, foundData.results)
    this.setState({ chosenCategory, cleanedData })
    // print it on screen

    // May only need Cards component..
    // save data locally somewhere? maybe just copy selected objects into state.
  }

  render() {
    return (
      <div className="App">
        <h1>SWAPIbox</h1>
        <h3>{this.state.openingCrawl}</h3>
        <Control getCards={this.getCards} />
        <CardContainer
          chosenCategory={this.state.chosenCategory}
          cleanedData={this.state.cleanedData} />
      </div>
    );
  }
}

export default App;
