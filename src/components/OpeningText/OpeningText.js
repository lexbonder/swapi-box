import React from 'react';
import PropTypes from 'prop-types';
import './OpeningText.css'

const OpeningText = ({openingText}) => {
  const {title, episode, crawl, year} = openingText;
  return(
    <div className='fade'>
      <div className='OpeningText'>
        <div className='crawl'>
          <div className='title'>
            <p>Episode {episode}</p>
            <h1>{title}</h1>
          </div>
          <h2>{crawl}</h2>
          <h2>{year}</h2>
        </div>
      </div>
    </div>
  )
}

const { shape, string, number } = PropTypes

OpeningText.propTypes = {
  openingText: shape({
    title: string,
    episode: number,
    crawl: string,
    year: string
  })
}

export default OpeningText;