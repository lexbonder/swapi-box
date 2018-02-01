import React from 'react';

const Card = ({cardInfo, addToFavorites}) => {
  switch(cardInfo.category){
    case 'people' :
      return renderPeopleCards(cardInfo, addToFavorites);
    case 'vehicles' :
      return renderVehicleCards(cardInfo, addToFavorites);
    case 'planets' :
      return renderPlanetCards(cardInfo, addToFavorites);
    default :
      return;
  }
}

const renderPeopleCards = (cardInfo, addToFavorites) => {
  const {name, species, homeworld, population} = cardInfo;
  return (
    <div>
      <button
        onClick={addToFavorites}
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

const renderVehicleCards = (cardInfo, addToFavorites) => {
  const {name, model, vehicleClass, numOfPassengers} = cardInfo;
  return (
    <div>
      <button
        onClick={addToFavorites}
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

const renderPlanetCards = (cardInfo, addToFavorites) => {
  const {name, terrain, population, climate, residents} = cardInfo;
  const allResidents = residents.map((resident, index) => <li key={index}>{resident}</li>)

  return (
    <div>
      <button
        onClick={addToFavorites}
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

export default Card;