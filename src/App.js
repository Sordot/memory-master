import './App.css';
import { useState } from 'react';

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

  console.log(cards, turns)

  return (
    <div className="App">
      <h1>Memory Master</h1>
      <button onClick={shuffleCards}>New Game!</button>
    </div>
  );
}

export default App;
