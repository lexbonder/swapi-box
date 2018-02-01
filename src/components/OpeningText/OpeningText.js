import React from 'react'

const OpeningText = ({title, episode, text}) => {
  return(
    <div>
      <h2>Episode {episode}</h2>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  )
}

export default OpeningText;