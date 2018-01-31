import React from 'react';

const Control = ({ getCards }) => {
  return(
    <div>
        <button>View Favorites</button>
        <button onClick={getCards}>People</button>
        <button onClick={getCards}>Planets</button>
        <button onClick={getCards}>Vehicles</button>
    </div>
  )
}

export default Control;