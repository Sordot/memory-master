import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './SingleCard';

//create cards array
const cardImages = [
  {'src': '/img/helmet.png', matched: false},
  {'src': '/img/potion.png', matched: false},
  {'src': '/img/ring.png', matched: false},
  {'src': '/img/shield.png', matched: false},
  {'src': '/img/sword.png', matched: false},
  {'src': '/img/scroll.png', matched: false}
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  //shuffle cards, first duplicate cards, randomize cards, assign random ids
  //fires on click for New Game button
  const shuffleCards = () => {

    //duplicate the cards by spreading the array twice
    //when the random number in .sort comes back negative: the order of the cards being compared will stay the same
    //when the random number in .sort comes back positive: the order of the cards being compared will be swapped
    //map over the newly assorted array of cards, return card object with newly assigned random id
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}))

    //setCards array to our newly shuffled deck and reset turn counter to 0
    setCards(shuffledCards)
    setTurns(0)

  }

  //track user choices
  const handleChoice = (card) => {

    //if choiceOne is null (false), setChoiceOne, if it has a value (true), setChoiceTwo
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    
  }

  //compare choiceOne and choiceTwo, fires whenever a new card is chosen
  useEffect(() => {

    //if we've selected a pair of cards
    if (choiceOne && choiceTwo) {
      //if the images match
      if (choiceOne.src === choiceTwo.src) {
        //update the state of Cards
        setCards(prevCards => {
          //return a new Cards array
          return prevCards.map(card => {
            //if the current card being mapped over src matches our choice, set matched to true
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
              //otherwise, return the card without modification
            } else {
              return card
            }
          })
        })
        resetTurn()
        //if choiceOne and choiceTwo dont match, resetTurn
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }
  
  //map over the SingleCards and create divs for the front and back of each
  return <>
    <div className="App">
      <h1>Memory Master</h1>
      <button onClick={shuffleCards}>New Game!</button>
      <div className='card-grid'>
            {cards.map(card => (
            <SingleCard 
              key={card.id} 
              card={card} 
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
            />))}
      </div>
    </div>
  </>
}

export default App;
