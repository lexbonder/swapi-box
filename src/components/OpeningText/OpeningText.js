import React from 'react'

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

export default OpeningText;