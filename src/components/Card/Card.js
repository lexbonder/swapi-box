import React from 'react';
import PropTypes from 'prop-types';
import './Card.css'

const Card = ({cardInfo, toggleFavorite, currentFav}) => {
  switch(cardInfo.category){
    case 'people' :
      return renderPeopleCards(cardInfo, toggleFavorite, currentFav);
    case 'vehicles' :
      return renderVehicleCards(cardInfo, toggleFavorite, currentFav);
    case 'planets' :
      return renderPlanetCards(cardInfo, toggleFavorite, currentFav);
    default :
      return;
  }
}

const renderPeopleCards = (cardInfo, toggleFavorite, currentFav) => {
  const {name, species, homeworld, population} = cardInfo;
  return (
    <div className={`Card ${currentFav}`}>
      <button
        onClick={toggleFavorite}
        name={name}
      >
        &#9733;
      </button>
      <h1>{name}</h1>
      <h2>Species: {species}</h2>
      <h2>Homeworld: {homeworld}</h2>
      <h2>Population: {population}</h2>
    </div>
  )
}

const renderVehicleCards = (cardInfo, toggleFavorite, currentFav) => {
  const {name, model, vehicleClass, numOfPassengers} = cardInfo;
  return (
    <div className={`Card ${currentFav}`}>
      <button
        onClick={toggleFavorite}
        name={name}
      >
        &#9733;
      </button>
      <h1>{name}</h1>
      <h2>Model: {model}</h2>
      <h2>Class: {vehicleClass}</h2>
      <h2>Passengers: {numOfPassengers}</h2>
    </div>
  )
}

const renderPlanetCards = (cardInfo, toggleFavorite, currentFav) => {
  const {name, terrain, population, climate, residents} = cardInfo;
  const allResidents = residents.map((resident, index) => <li key={index}><h3>{resident}</h3></li>)

  return (
    <div className={`Card ${currentFav}`}>
      <button
        onClick={toggleFavorite}
        name={name}
      >
        &#9733;
      </button>
      <h1>{name}</h1>
      <h2>Terrain: {terrain}</h2>
      <h2>Population: {population}</h2>
      <h2>Climate: {climate}</h2>
      <h2>Residents: {residents.length}</h2>
      <ul>
        {allResidents}
      </ul>
    </div>
  )
}

const { object, func, string } = PropTypes;

Card.propTypes = {
  cardInfo: object,
  toggleFavorite: func,
  currentFav: string
}

export default Card;