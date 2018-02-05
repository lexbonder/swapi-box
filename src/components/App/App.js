import React, { Component } from 'react';
import CardContainer from '../CardContainer/CardContainer';
import Control from '../Control/Control';
import OpeningText from '../OpeningText/OpeningText';
import DataCleaner from '../../dataCleaner';
import fetchApi from '../../apiFetcher';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      openingText: {},
      chosenCategory: '',
      cleanedData: [],
      favorites: [],
      numFav: 0,
      next: '',
      previous: ''
    };
    this.cleaner = new DataCleaner(fetchApi);
  }

  componentDidMount = () => {
    const episodeNumber = Math.ceil(Math.random() * 7);
    this.getMovieCrawl(episodeNumber);
    this.getFavoritesFromStorage();
  }

  getMovieCrawl = async (episodeNumber) => {
    const movieInfo = await fetchApi(
      `https://swapi.co/api/films/${episodeNumber}/`
    );
    const openingText = await this.cleaner.cleanData('opening', movieInfo);
    this.setState({openingText});
  }

  toggleFavorite = (event) => {
    const clicked = event.target.name;
    const clickedObject = this.state.cleanedData.find(
      object => object.name === clicked
    );
    const exists = this.state.favorites.filter(
      object => object.name === clicked
    );
    if (!exists.length) {
      this.addFavorite(clickedObject);
    } else {
      this.removeFavorite(clickedObject);
    }
  }

  addFavorite = (clickedObject) => {
    let numFav = this.state.favorites.length;
    numFav++;
    const favorites = [...this.state.favorites, clickedObject];
    this.setState({favorites, numFav});
    this.sendToLocalStorage(favorites);
  }

  removeFavorite = (clickedObject) => {
    const favorites = this.state.favorites.filter(
      object => object.name !== clickedObject.name
    );
    let numFav = favorites.length;
    this.setState({favorites, numFav});
    this.sendToLocalStorage(favorites);
  }

  sendToLocalStorage = (favorites) => {
    const stringified = JSON.stringify(favorites);
    localStorage.setItem('favorites', stringified);
  }

  getFavoritesFromStorage = () => {
    if (localStorage.favorites) {
      const fromLocal = localStorage.getItem('favorites');
      const favorites = JSON.parse(fromLocal);
      const numFav = favorites.length;
      this.setState({favorites, numFav});
    }
  } 

  handleClick = (event) => {
    const chosenCategory = event.target.name;
    const url = `https://swapi.co/api/${chosenCategory}/`;
    if (chosenCategory === 'favorites') {
      this.getFavorites(chosenCategory);
    } else {
      this.getCards(chosenCategory, url);
    }
  }

  getFavorites = (chosenCategory) => {
    this.setState({chosenCategory, cleanedData: this.state.favorites});
  }

  getCards = async (chosenCategory, url) => {
    const {results, next, previous} = await fetchApi(url);
    const cleanedData = await this.cleaner.cleanData(chosenCategory, results);
    this.setState({ chosenCategory, cleanedData, next, previous });
  }

  nextOrPrev = (event) => {
    const page = event.target.name;
    if (this.state[page]) {
      this.getCards(this.state.chosenCategory, this.state[page]);
    }
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
            nextOrPrev={this.nextOrPrev}
          />
        </section>
      </div>
    );
  }
}

export default App;
