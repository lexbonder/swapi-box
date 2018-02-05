import React from 'react';
import './PageTurn.css';
import PropTypes from 'prop-types';

const PageTurn = ({nextOrPrev}) => {
  // let lowest = 1;
  // let highest = 10;

  // const nextTen = (event) => {
  //   if (highest <= count) {
  //     nextOrPrev(event)
  //     lowest += 10;
  //     highest += 10;
  //   }
  //   if (highest > count) {
  //     highest = count;
  //   }
  // }

  // const lastTen = (event) => {
  //   nextOrPrev(event)
  //   lowest -= 10;
  //   highest -= 10;
  // }

  // <h2> {lowest} - {highest} of {count} </h2>
  return (
    <div className='PageTurn'>
      <button onClick={nextOrPrev} name='previous'>
          Last 10
      </button>
      <button onClick={nextOrPrev} name='next'>
          Next 10
      </button>
    </div>
  );
};

const { func } = PropTypes;

PageTurn.propTypes = {
  nextOrPrev: func
};

export default PageTurn;