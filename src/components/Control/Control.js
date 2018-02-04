import React from 'react';
import PropTypes from 'prop-types';

const Control = ({ handleClick, numFav }) => {
  return(
    <div>
      <button onClick={handleClick} name='favorites'>View Favorites ({numFav})</button>
      <button onClick={handleClick} name='people'>People</button>
      <button onClick={handleClick} name='planets'>Planets</button>
      <button onClick={handleClick} name='vehicles'>Vehicles</button>
    </div>
  )
}

const { func, number } = PropTypes;

Control.propTypes = {
  handleClick: func.isRequired,
  numFav: number.isRequired
}

export default Control;