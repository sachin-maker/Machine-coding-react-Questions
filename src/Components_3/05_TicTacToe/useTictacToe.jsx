import { useState, useEffect } from "react";

const useTictacToe = (size = 3) => {
  const createBoard = () => Array(size * size).fill(null);

  const [board, setBoard] = useState(createBoard);
  const [isXNext, setIsXNext] = useState(true);

  useEffect(() => {
    // Reset board whenever size changes
    setBoard(createBoard());
    setIsXNext(true);
  }, [size]);

  const getCell = (row, col) => {
    if (row < 0 || row >= size || col < 0 || col >= size) return null;
    return board[row * size + col];
  };

  const checkDirection = (startRow, startCol, dx, dy) => {
    const player = getCell(startRow, startCol);
    if (!player) return false;

    for (let i = 1; i < size; i++) {
      const next = getCell(startRow + dx * i, startCol + dy * i);
      if (next !== player) return false;
    }

    return true;
  };

  const calculateWinner = () => {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (
          checkDirection(row, col, 0, 1) || // horizontal →
          checkDirection(row, col, 1, 0) || // vertical ↓
          checkDirection(row, col, 1, 1) || // diagonal ↘
          checkDirection(row, col, 1, -1)   // diagonal ↙
        ) {
          return getCell(row, col);
        }
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner()) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const getStatusMessage = () => {
    const winner = calculateWinner();
    if (winner) return `Player ${winner} wins!`;
    if (!board.includes(null)) return `It's a draw!`;
    return `Player ${isXNext ? "X" : "O"} turn`;
  };

  const resetGame = () => {
    setBoard(createBoard());
    setIsXNext(true);
  };

  return { board, handleClick, resetGame, getStatusMessage, size };
};

export default useTictacToe;
