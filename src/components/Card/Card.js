import React from 'react';

const Card = ({category, cardInfo}) => {
  switch(category){
    case 'people' :
      return renderPeopleCards(cardInfo);
    case 'vehicles' :
      return renderVehicleCards(cardInfo);
    case 'planets' :
      return renderPlanetCards(cardInfo);
    default :
      return;
  }
}

const renderPeopleCards = (cardInfo) => {
  const {name, species, homeworld, population} = cardInfo;
  return (
    <div>
      <h1>{name}</h1>
      <h2>Species: {species}</h2>
      <h2>Homeworld: {homeworld}</h2>
      <h2>Population: {population}</h2>
    </div>
  )
}

const renderVehicleCards = (cardInfo) => {
  const {name, model, vehicleClass, numOfPassengers} = cardInfo;
  return (
    <div>
      <h1>{name}</h1>
      <h2>Model: {model}</h2>
      <h2>Class: {vehicleClass}</h2>
      <h2>Passengers: {numOfPassengers}</h2>
    </div>
  )
}

const renderPlanetCards = (cardInfo) => {
  const {name, terrain, population, climate, residents} = cardInfo;
  const allResidents = residents.map((resident, index) => <li key={index}>{resident}</li>)

  return (
    <div>
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