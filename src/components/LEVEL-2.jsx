import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { countState } from '../store/atoms/countState';
import { useNavigate } from 'react-router-dom';

const Square = ({ value, onClick }) => (
  <button
    className="square bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 px-6 rounded-md m-1"
    onClick={onClick}
    disabled={value !== null}
  >
    {value}
  </button>
);

const Board = ({ squares, onClick }) => (
  <div className=" grid grid-cols-3 gap-32">
    {[0, 1, 2].map((row) => (
      <div key={row} className=" ">
        {[0, 1, 2].map((col) => (
          <div key={col}>{<Square value={squares[row * 3 + col]} onClick={() => onClick(row * 3 + col)} />}</div>
        ))}
      </div>
    ))}
  </div>
);

const Game = () => {
  const [count, setCount] = useRecoilState(countState);

  useEffect(() => {
    // Any side effect code can be placed here if needed
    // This will be executed whenever count changes
  }, [count]);

  console.log(count);

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [playerWins, setPlayerWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);

  useEffect(() => {
    if (!xIsNext && !winner) {
      const computerMove = getBestMove(squares, xIsNext);
      makeMove(computerMove);
    }
  }, [xIsNext, winner, squares]);


  const Navigate=useNavigate();

  const makeMove = (index) => {
    if (squares[index] || winner) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const currentWinner = calculateWinner(newSquares);
    if (currentWinner) {
      setWinner(currentWinner);
      if (currentWinner === 'X') {
        setPlayerWins(playerWins + 1);
        setCount(3);
        Navigate('/LEVEL-3');
        
      } else if (currentWinner === 'O') {
        setComputerWins(computerWins + 1);
      }
    }
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'You' : 'Computer'}`;

  return count >= 2 ? (
    <div style={{ 
      backgroundImage: `url('https://media.freestocktextures.com/cache/d7/d7/d7d72be81898a7f7b56681242cf3ee5b.jpg')`,
      height: '100vh',
      overflow: 'hidden'
    }}>
      <div className="game bg-black text-white p-8 max-w-md mx-auto my-8 flex flex-col justify-center items-center ">
        <Board squares={squares} onClick={(index) => makeMove(index)} />
        <div className="status mt-4 font-bold text-xl">{status}</div>
        <div className="score mt-4">
          <p>Player Wins: {playerWins}</p>
          <p>Computer Wins: {computerWins}</p>
        </div>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={restartGame}>
          Restart
        </button>
      </div>
    </div>
  ) : (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-center">
        <p className="text-4xl font-bold mb-4">Oh you have not cracked the previous levels</p>
        <p className="text-2xl font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-900 to-blue-500">Keep playing and try to crack the levels to unlock more fun!</span> 
        </p>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const getBestMove = (squares, xIsNext) => {
  const player = xIsNext ? 'X' : 'O';
  const opponent = xIsNext ? 'O' : 'X';

  // Check for a winning move
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      const tempSquares = squares.slice();
      tempSquares[i] = player;
      if (calculateWinner(tempSquares) === player) {
        return i;
      }
    }
  }

  // Check for a blocking move
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      const tempSquares = squares.slice();
      tempSquares[i] = opponent;
      if (calculateWinner(tempSquares) === opponent) {
        return i;
      }
    }
  }

  // Prioritize the center, corners, and then edges
  const priorityMoves = [4, 0, 2, 6, 8, 1, 3, 5, 7];
  for (const move of priorityMoves) {
    if (squares[move] === null) {
      return move;
    }
  }

  // Fallback to a random move if everything else fails
  const emptySquares = squares.reduce((acc, value, index) => (value === null ? acc.concat(index) : acc), []);
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randomIndex];
};

export default Game;
