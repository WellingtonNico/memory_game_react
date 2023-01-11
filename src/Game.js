import React, { useEffect, useState } from 'react'
import { DECKS } from './constants'
import cover from './assets/back.png'
import { Col, Row, Modal, Button } from 'react-bootstrap'


function Game({ symbolIndex }) {
  const milisecondsToRetry = 1000
  const deck = DECKS[symbolIndex]
  const [cardList, setCardList] = useState([])
  const [score, setScore] = useState(0)
  const [attemptsCounter, setAttemptsCounter] = useState(0)
  const [flipped1, setFlipped1] = useState(null)
  const [flipped2, setFlipped2] = useState(null)
  const [gameHasFinished, setGameHasFinished] = useState(false)
  const [animationIndex, setAnimationIndex] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)


  function shuffleArray(arr) {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i--) {
      // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
  }

  const animateStartGame = async (incomingIndex) => {
    if(incomingIndex==0){
      setIsAnimating(true)
    }
    var index = incomingIndex
    flipCard(index)
    setTimeout(()=>{
      index++
      if(index<=cardList.length){
        animateStartGame(index)
      }else{
        setIsAnimating(false)
      }
    },150)

  }

  const buildCardList = () => {
    const newCardList = deck.map((src, index) => {
      return {
        id: index,
        src,
        isFlipped: false,
        isDiscovered: false
      }
    })
    setCardList([...newCardList, ...newCardList])
    setIsAnimating(true)
  }

  const checkGameHasFinished = () => {
    if (cardList.length > 0 && cardList.every(card => card.isDiscovered)) {
      setGameHasFinished(true)
    }
  }

  const flipCard = (index) => {
    setCardList(cardList.map((card, cardIndex) => {
      if (index == cardIndex) {
        return { ...card, isFlipped: !card.isFlipped }
      } else {
        return card
      }
    }))
  }



  const handleClick = (index) => {
    if (flipped1 == null) {
      setFlipped1(cardList[index])
    } else if (flipped2 == null) {
      setFlipped2(cardList[index])
      setAttemptsCounter(p => p + 1)
    }
    flipCard(index)
  }


  const checkAttempt = () => {
    if (flipped1.id == flipped2.id) {
      setScore(p => p + 1)
      setCardList(cardList.map(card => {
        return {
          ...card,
          isDiscovered: card.id == flipped1.id ? true : card.isDiscovered
        }
      }))
      setFlipped1(null)
      setFlipped2(null)
    } else {
      setTimeout(() => {
        const newCardList = cardList.map(card => {
          return {
            ...card,
            isFlipped: card.id == flipped1.id || card.id == flipped2.id ? false : card.isFlipped
          }
        })
        setCardList(newCardList)
        setFlipped1(null)
        setFlipped2(null)
      }, milisecondsToRetry);
    }

  }

  const resetGame = () => {
    setAttemptsCounter(0)
    setScore(0)
    setFlipped1(null)
    setFlipped2(null)
    buildCardList()
    setGameHasFinished(false)
  }

  useEffect(() => {
    buildCardList()
  }, [])


  useEffect(() => {
    if (flipped1 && flipped2) {
      checkAttempt()
    }
  }, [flipped1, flipped2])

  useEffect(() => {
    checkGameHasFinished()
  }, [cardList])


  useEffect(()=>{
    if(isAnimating){
      animateStartGame(0)
    }else if(cardList.length>0){
      setCardList(shuffleArray(cardList))
    }
  },[isAnimating])

  return (
    <>
      <Row className='text-light justify-content-center mt-5' style={{ maxWidth: '100vw' }}>
        <Col xs='12'>
          <h3>Jogo da Memória</h3>
          <span>encontre os pares das cartas</span>
        </Col>
        <Col>
          <Row>
            <Col>
              <span><b>Pontos: </b>{score}</span>
            </Col>
            <Col>
              <span><b>Tentativas: </b>{attemptsCounter}</span>
            </Col>

          </Row>
        </Col>
        <div className='jogo_cartas' >
          {cardList.map((card, index) =>
            <button
              key={index}
              onClick={() => handleClick(index)}
              className='carta my-2'
              disabled={card.isDiscovered || (flipped1 != null && flipped2 != null) || card.isFlipped}
            >
              <div
                className={`carta_conteudo ${!card.isFlipped || animationIndex == index ? 'flipped' : ''}`}
              >
                <div className="carta_frente">
                  <img src={card.src} className='img-fluid zoom' />
                </div>
                <div className="carta_costas">
                  <img src={cover} className='img-fluid zoom' />
                </div>

              </div>
            </button>

          )}
        </div>
      </Row>

      <Modal show={gameHasFinished} contentClassName='main-bg text-light'>
        <Modal.Header>
          <Modal.Title>Jogo da Memória</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Parabéns por terminar o jogo!!!</h3>
          <br />
          <b>Sua porcentagem de acerto:</b>
          <p>
            <h2>{(deck.length * 100 / attemptsCounter).toFixed(2)} %</h2>
          </p>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Button variant='primary' onClick={resetGame}>
            Reiniciar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Game