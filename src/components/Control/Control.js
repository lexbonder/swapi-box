import React from 'react';

const Control = ({ getCards }) => {
  return(
    <div>
        <button>View Favorites</button>
        <button onClick={getCards} name='people'>People</button>
        <button onClick={getCards} name='planets'>Planets</button>
        <button onClick={getCards} name='vehicles'>Vehicles</button>
    </div>
  )
}

export default Control;