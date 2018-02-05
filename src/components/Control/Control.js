import React from 'react';
import PropTypes from 'prop-types';
import './Control.css';

const Control = ({ handleClick, numFav }) => {

  const allButtons = document.querySelectorAll('button');

  const clickFunction = (event) => {
    allButtons.forEach(button => button.classList.remove('clicked'));
    event.target.classList.add('clicked');
    handleClick(event);
  };

  return (
    <div className='Control'>
      <button 
        onClick={(event) => clickFunction(event)} 
        name='favorites'>View Favorites ({numFav})</button>
      <button 
        onClick={(event) => clickFunction(event)} 
        name='people'>People</button>
      <button 
        onClick={(event) => clickFunction(event)} 
        name='planets'>Planets</button>
      <button 
        onClick={(event) => clickFunction(event)} 
        name='vehicles'>Vehicles</button>
    </div>
  );
};

const { func, number } = PropTypes;

Control.propTypes = {
  handleClick: func.isRequired,
  numFav: number.isRequired
};

export default Control;