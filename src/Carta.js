import React from 'react'
import cover from './assets/back.png'


function Carta({card,handleClick,index,flippingDisabled}) {
  return (
    <button
      onClick={() => handleClick(index)}
      className='carta my-2'
      disabled={card.isDiscovered || (flippingDisabled) || card.isFlipped}
    >
      <div
        className={`carta_conteudo ${!card.isFlipped ? 'flipped' : ''}`}
      >
        <div className="carta_frente">
          <img src={card.src} className='img-fluid zoom' />
        </div>
        <div className="carta_costas">
          <img src={cover} className='img-fluid zoom' />
        </div>

      </div>
    </button>
  )
}

export default Carta