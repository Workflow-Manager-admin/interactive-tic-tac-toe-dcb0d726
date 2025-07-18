import { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
const Square = ({ value, onClick, index }) => (
  <button 
    className={`square ${value?.toLowerCase()}`} 
    onClick={onClick}
    aria-label={value ? `Square ${index + 1}, contains ${value}` : `Square ${index + 1}, empty`}
  >
    {value}
  </button>
);

// PUBLIC_INTERFACE
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);
  
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Game is a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="App">
      <h1 className="game-title">Tic Tac Toe</h1>
      
      <div className="game-board">
        {squares.map((square, i) => (
          <Square
            key={i}
            value={square}
            onClick={() => handleClick(i)}
            index={i}
          />
        ))}
      </div>

      <div className="game-status">{status}</div>
      
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

export default App;
