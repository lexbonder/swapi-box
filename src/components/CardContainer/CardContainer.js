import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';

const CardContainer = ({chosenCategory, cleanedData, toggleFavorite}) => {
  let noResults;
  // Insert loading screen here if cleanedData.length 
  if (chosenCategory === 'favorites' && !cleanedData.length) {
    noResults = <h1>No favorites found</h1>
  } else {
    noResults = <div></div>
  }
  const cardsToRender = cleanedData.map((datapoint, index) => 
    <Card
      key={index}
      cardInfo={datapoint}
      toggleFavorite={toggleFavorite}
    /> )

  return(
    <div>
      <h1>{chosenCategory}</h1>
      {noResults}
      {cardsToRender}
    </div>
  )
}

const { string, arrayOf, func, object } = PropTypes;

CardContainer.propTypes = {
  chosenCategory: string,
  cleanedData: arrayOf(object),
  toggleFavorite: func
}

export default CardContainer;