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
      favorites: [],
    }
  }

  componentDidMount = async () => {
    const cleaner = new DataCleaner()
    const episodeNumber = Math.ceil(Math.random() * 7)
    const initialFetch = await fetch(`https://swapi.co/api/films/${episodeNumber}/`);
    const object = await initialFetch.json();
    this.setState({openingCrawl: object.opening_crawl, cleaner});
  }

  addToFavorites = (event) => {
    const clicked = event.target.name
    const newFavorite = this.state.cleanedData.find(object => object.name === clicked)
    this.setState({favorites: [...this.state.favorites, newFavorite]})
  }

  handleClick = (event) => {
    const chosenCategory = event.target.name;
    if (chosenCategory === 'favorites') {
      this.getFavorites(chosenCategory)
    }
    else {
      this.getCards(chosenCategory)
    }
  }

  getFavorites = (chosenCategory) => {
    this.setState({chosenCategory, cleanedData: this.state.favorites})
  }

  getCards = async (chosenCategory) => {
    // Have button give variable
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
        <Control
          handleClick={this.handleClick}
        />
        <CardContainer
          chosenCategory={this.state.chosenCategory}
          cleanedData={this.state.cleanedData}
          addToFavorites={this.addToFavorites}
        />
      </div>
    );
  }
}

export default App;
