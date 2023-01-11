import React from 'react'
import AC from './assets/card-deck/AC.png'
import AH from './assets/card-deck/AH.png'
import AD from './assets/card-deck/AD.png'
import AS from './assets/card-deck/AS.png'
import { Col, Row } from 'react-bootstrap'

function DeckSymbolPicker({ setDeckSymbolIndex }) {

  const symbols = [AC, AH, AS, AD]

  return (
    <Row className='justify-content-center mt-5' style={{ color: 'white' }}>
      <Col xs='12'>
        <h1>Bem Vindo ao Jogo da Memória</h1>
        <span>escolha um tipo de deck</span>
      </Col>
      <Col xs='11 mt-4'>
        <Row className='justify-content-center'>
          {symbols.map((s, index) =>
            <Col xs='6 pointer' sm='3' key={index} >
              <div >
                <img
                  src={s}
                  className='zoom img-fluid'
                  height='30'
                  onClick={() => setDeckSymbolIndex(index)}
                />
              </div>
            </Col>
          )}
        </Row>

      </Col>
    </Row>
  )
}

export default DeckSymbolPicker