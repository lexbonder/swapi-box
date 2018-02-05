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
      favorites: [],
      numFav: 0,
    }
    this.cleaner = new DataCleaner(fetchApi)
  }

  componentDidMount = () => {
    const episodeNumber = Math.ceil(Math.random() * 7)
    this.getMovieCrawl(episodeNumber)
  }

  getMovieCrawl = async (episodeNumber) => {
    const movieInfo = await fetchApi(`https://swapi.co/api/films/${episodeNumber}/`)
    const openingText = await this.cleaner.cleanData('opening', movieInfo)
    this.setState({openingText});
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
    const cleanedData = await this.cleaner.cleanData(chosenCategory, results)
    this.setState({ chosenCategory, cleanedData })
  }

  render() {
    return (
      <div className="App">
        <OpeningText openingText={this.state.openingText} />
        <section className='bottom-half'>
          <Control
            handleClick={this.handleClick}
            numFav={this.state.numFav}
          />
          <CardContainer
            chosenCategory={this.state.chosenCategory}
            cleanedData={this.state.cleanedData}
            toggleFavorite={this.toggleFavorite}
            currentFavorites={this.state.favorites}
          />
        </section>
      </div>
    );
  }
}

export default App;
