import React from 'react';
import Card from '../Card/Card'
// import People from '../People/People'; 

const CardContainer = ({chosenCategory, cleanedData, addToFavorites}) => {
  const cardsToRender = cleanedData.map((datapoint, index) => 
    <Card
      key={index}
      cardInfo={datapoint}
      addToFavorites={addToFavorites}
    /> )

  return(
    <div>
      <h1>{chosenCategory}</h1>
      {cardsToRender}
    </div>
  )
}

export default CardContainer;