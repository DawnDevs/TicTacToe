import React, { useState } from 'react';
import './App.css';
function Square({ value, onClick, isWinning, lineClass }) {
  const baseStyle = 'border-2 h-24 w-24 flex items-center justify-center text-2xl font-bold relative';
  const winningStyle = isWinning ? 'bg-green-500 text-white winning' : 'bg-blue-400 text-black';

  return (
    <button className={`${baseStyle} ${winningStyle} ${lineClass}`} onClick={onClick}>
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? squares[winnerInfo.indexes[0]] : null;

  function renderSquare(i) {
    const isWinning = winnerInfo?.indexes.includes(i);
    const lineClass = isWinning ? winnerInfo.direction : '';
    return (
      <Square
        value={squares[i]}
        onClick={() => handleClick(i)}
        isWinning={isWinning}
        lineClass={lineClass}
      />
    );
  }

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (squares.every(square => square != null)) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="p-5">
      <div className="text-xl mb-2">{status}</div>
      <div className="flex justify-center gap-1">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="flex justify-center gap-1">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="flex justify-center gap-1">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    { indexes: [0, 1, 2], direction: 'win-horizontal-top' },
    { indexes: [3, 4, 5], direction: 'win-horizontal-middle' },
    { indexes: [6, 7, 8], direction: 'win-horizontal-bottom' },
    { indexes: [0, 3, 6], direction: 'win-vertical-left' },
    { indexes: [1, 4, 7], direction: 'win-vertical-center' },
    { indexes: [2, 5, 8], direction: 'win-vertical-right' },
    { indexes: [0, 4, 8], direction: 'win-diagonal-from-left' },
    { indexes: [2, 4, 6], direction: 'win-diagonal-from-right' },
  ];
  for (let line of lines) {
    const { indexes } = line;
    if (squares[indexes[0]] && squares[indexes[0]] === squares[indexes[1]] && squares[indexes[0]] === squares[indexes[2]]) {
      return line;
    }
  }
  return null;
}

function App() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

export default App;
