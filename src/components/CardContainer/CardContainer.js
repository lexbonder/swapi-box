import React from 'react';
import PropTypes from 'prop-types';
import PageTurn from '../PageTurn/PageTurn';
import Card from '../Card/Card';
import './CardContainer.css';

const CardContainer = (props) => {
  const {
    chosenCategory,
    cleanedData, 
    toggleFavorite, 
    currentFavorites,
    nextOrPrev
  } = props;

  let noResults;
  // Insert loading screen here if cleanedData.length 
  if (chosenCategory === 'favorites' && !cleanedData.length) {
    noResults = <h1>No Favorites Found</h1>;
  } else {
    noResults = <div></div>;
  }

  const favoritesNames = currentFavorites.map(favorite => favorite.name);
  
  const cardsToRender = cleanedData.map((datapoint, index) => {
    
    const currentFav =
      favoritesNames.includes(datapoint.name) ? 'favorite' : '';

    return <Card
      key={index}
      cardInfo={datapoint}
      toggleFavorite={toggleFavorite}
      currentFav={currentFav}
    />;
  });

  return (
    <div className='CardContainer'>
      {
        chosenCategory &&
        chosenCategory !== 'favorites' &&
        <PageTurn nextOrPrev={nextOrPrev} />
      }
      <section>
        {noResults}
        {cardsToRender}
      </section>
    </div>
  );
};

const { string, arrayOf, func, object } = PropTypes;

CardContainer.propTypes = {
  chosenCategory: string,
  cleanedData: arrayOf(object),
  toggleFavorite: func,
  currentFavorites: arrayOf(object),
  nextOrPrev: func
};

export default CardContainer;