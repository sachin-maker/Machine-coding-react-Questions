import useTictacToe from "./useTictacToe";
import './style.css'

function TicTacToe() {
  const { board, handleClick, resetGame, getStatusMessage, size } = useTictacToe();

  return (
    <div className="game">
      <div className="status">
        {getStatusMessage()}
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>

      <div className="board" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {board.map((b, index) => (
          <button
            className="cell"
            key={index}
            onClick={() => handleClick(index)}
            disabled={b !== null}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}


export default TicTacToe;