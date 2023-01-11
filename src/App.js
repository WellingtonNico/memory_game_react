import { useState } from 'react';
import './App.css';
import DeckSymbolPicker from './DeckSymbolPicker';
import Game from './Game';


function App() {
  const [deckSymbolIndex, setDeckSymbolIndex] = useState(null)



  return (
    <div className="App">
      {deckSymbolIndex==null&&
        <DeckSymbolPicker setDeckSymbolIndex={setDeckSymbolIndex} />
      }
      {deckSymbolIndex!=null&&
        <Game symbolIndex={deckSymbolIndex}/>
      }

    </div>
  );
}

export default App;
