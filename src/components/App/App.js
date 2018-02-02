import React, { Component } from 'react';
import CardContainer from '../CardContainer/CardContainer';
import Control from '../Control/Control';
import OpeningText from '../OpeningText/OpeningText';
import DataCleaner from '../../dataCleaner';
import fetchApi from '../../apiFetcher';
import './App.css';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      openingText: {},
      chosenCategory: '',
      cleanedData: [],
      cleaner: {},
      favorites: [],
      numFav: 0,
    }
  }

  componentDidMount = async () => {
    const cleaner = new DataCleaner(fetchApi)
    const openingText = await this.getOpeningText()
    this.setState({openingText, cleaner});
  }

  getOpeningText = async () => {
    const episodeNumber = Math.ceil(Math.random() * 7)
    const movieInfo = await fetchApi(`https://swapi.co/api/films/${episodeNumber}/`)
    return {
      title: movieInfo.title,
      episode: movieInfo.episode_id,
      crawl: movieInfo.opening_crawl,
      year: movieInfo.release_date,
    }
  }

  toggleFavorite = (event) => {
    const clicked = event.target.name
    const clickedObject = this.state.cleanedData.find(object => object.name === clicked)
    const exists = this.state.favorites.filter(object => object.name === clicked)
    if (!exists.length) {
      this.addFavorite(clickedObject)
    } else {
      this.removeFavorite(clickedObject)
    }
  }

  addFavorite = (clickedObject) => {
    let numFav = this.state.favorites.length
    numFav++
    this.setState({favorites: [...this.state.favorites, clickedObject], numFav})
  }

  removeFavorite = (clickedObject) => {
    const remainingFavorites = this.state.favorites.filter(object => object.name !== clickedObject.name)
    let numFav = remainingFavorites.length
    this.setState({favorites: remainingFavorites, numFav})
  }

  handleClick = (event) => {
    const chosenCategory = event.target.name;
    if (chosenCategory === 'favorites') {
      this.getFavorites(chosenCategory)
    } else {
      this.getCards(chosenCategory)
    }
  }

  getFavorites = (chosenCategory) => {
    this.setState({chosenCategory, cleanedData: this.state.favorites})
  }

  getCards = async (chosenCategory) => {
    const {results} = await fetchApi(`https://swapi.co/api/${chosenCategory}/`)
    const cleanedData = await this.state.cleaner.cleanData(chosenCategory, results)
    this.setState({ chosenCategory, cleanedData })
  }

  render() {
    return (
      <div className="App">
        <h1>SWAPIbox</h1>
        <OpeningText openingText={this.state.openingText} />
        <h3>{this.state.openingCrawl}</h3>
        <Control
          handleClick={this.handleClick}
          numFav={this.state.numFav}
        />
        <CardContainer
          chosenCategory={this.state.chosenCategory}
          cleanedData={this.state.cleanedData}
          toggleFavorite={this.toggleFavorite}
        />
      </div>
    );
  }
}

export default App;
