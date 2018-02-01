import React from 'react';

const Control = ({ handleClick, displayFavorites }) => {
  return(
    <div>
        <button onClick={handleClick} name='favorites'>View Favorites</button>
        <button onClick={handleClick} name='people'>People</button>
        <button onClick={handleClick} name='planets'>Planets</button>
        <button onClick={handleClick} name='vehicles'>Vehicles</button>
    </div>
  )
}

export default Control;