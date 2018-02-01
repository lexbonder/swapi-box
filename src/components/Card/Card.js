import React from 'react';

const Card = ({cardInfo}) => {
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

export default Card;