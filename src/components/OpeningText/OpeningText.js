import React from 'react';
import PropTypes from 'prop-types';

const OpeningText = ({openingText}) => {
  const {title, episode, crawl, year} = openingText;
  return(
    <div>
      <h1>Episode {episode}</h1>
      <h2>{crawl}</h2>
      <p>{title} - {year}</p>
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