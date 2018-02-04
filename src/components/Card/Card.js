import React from 'react';
import PropTypes from 'prop-types';

const Card = ({cardInfo, toggleFavorite}) => {
  switch(cardInfo.category){
    case 'people' :
      return renderPeopleCards(cardInfo, toggleFavorite);
    case 'vehicles' :
      return renderVehicleCards(cardInfo, toggleFavorite);
    case 'planets' :
      return renderPlanetCards(cardInfo, toggleFavorite);
    default :
      return;
  }
}

const renderPeopleCards = (cardInfo, toggleFavorite) => {
  const {name, species, homeworld, population} = cardInfo;
  return (
    <div>
      <button
        onClick={toggleFavorite}
        name={name}
      >
        Favorite
      </button>
      <h1>{name}</h1>
      <h2>Species: {species}</h2>
      <h2>Homeworld: {homeworld}</h2>
      <h2>Population: {population}</h2>
    </div>
  )
}

const renderVehicleCards = (cardInfo, toggleFavorite) => {
  const {name, model, vehicleClass, numOfPassengers} = cardInfo;
  return (
    <div>
      <button
        onClick={toggleFavorite}
        name={name}
      >
        Favorite
      </button>
      <h1>{name}</h1>
      <h2>Model: {model}</h2>
      <h2>Class: {vehicleClass}</h2>
      <h2>Passengers: {numOfPassengers}</h2>
    </div>
  )
}

const renderPlanetCards = (cardInfo, toggleFavorite) => {
  const {name, terrain, population, climate, residents} = cardInfo;
  const allResidents = residents.map((resident, index) => <li key={index}>{resident}</li>)

  return (
    <div>
      <button
        onClick={toggleFavorite}
        name={name}
      >
        Favorite
      </button>
      <h1>{name}</h1>
      <h2>Terrain: {terrain}</h2>
      <h2>Population: {population}</h2>
      <h2>Climate: {climate}</h2>
      <h2>Residents:</h2>
      <ul>
        {allResidents}
      </ul>
    </div>
  )
}

const { object, func} = PropTypes;

Card.propTypes = {
  cardInfo: object,
  toggleFavorite: func
}

export default Card;