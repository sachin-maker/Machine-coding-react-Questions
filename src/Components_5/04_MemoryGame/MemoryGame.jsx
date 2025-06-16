import { useEffect, useState } from "react";
import './style.css';

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);

  const handleGridSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) setGridSize(size);
  };

  const initializeGame = () => {
    const totalCards = gridSize * gridSize;
    const pairCount = Math.floor(totalCards / 2);
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({ id: index, number }));

    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  const checkMatch = (secondId) => {
    const [firstId] = flipped;
    if (cards[firstId].number === cards[secondId].number) {
      setSolved([...solved, firstId, secondId]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  const handleClick = (id) => {
    if (disabled || won || flipped.includes(id)) return;

    if (flipped.length === 0) {
      setFlipped([id]);
    } else if (flipped.length === 1) {
      setFlipped([...flipped, id]);
      setDisabled(true);
      checkMatch(id);
    }
  };

  const isFlipped = (id) => flipped.includes(id) || solved.includes(id);
  const isSolved = (id) => solved.includes(id);

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);
    }
  }, [solved, cards]);

  return (
    <div className="memory-container">
      <h1 className="game-title">Memory Game</h1>

      <div className="grid-size-input">
        <label htmlFor="gridSize">Grid Size (max 10):</label>
        <select onChange={handleGridSizeChange} value={gridSize}>
  {[2, 4, 6, 8, 10].map(size => (
    <option key={size} value={size}>{size} x {size}</option>
  ))}
</select>
      </div>

      <div
        className="game-board"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${isFlipped(card.id) ? isSolved(card.id) ? "solved" : "flipped" : ""}`}
            onClick={() => handleClick(card.id)}
          >
            {isFlipped(card.id) ? card.number : "?"}
          </div>
        ))}
      </div>

      {won && <div className="won-text">You Won!</div>}

      <button className="reset-button" onClick={initializeGame}>
        {won ? "Play Again" : "Reset"}
      </button>
    </div>
  );
};

export default MemoryGame;
