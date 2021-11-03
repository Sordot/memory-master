import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './SingleCard';

//create cards array
const cardImages = [
  {'src': '/img/helmet.png'},
  {'src': '/img/potion.png'},
  {'src': '/img/ring.png'},
  {'src': '/img/shield.png'},
  {'src': '/img/sword.png'},
  {'src': '/img/scroll.png'},
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

    //if we've selected a pair of cards, compare them, reset turn
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log('those cards match')
        resetTurn()
      } else {
        console.log('those cards dont match')
        resetTurn()
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
            {cards.map(card => (<SingleCard key={card.id} card={card} handleChoice={handleChoice}/>))}
      </div>
    </div>
  </>
}

export default App;
