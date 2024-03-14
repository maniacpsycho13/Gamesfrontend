// src/components/Puzzle.js
import React, { useState, useEffect } from 'react';
import './Puzzle.css';
import y from '../assets/Arena.jpg'
import { useRecoilState } from 'recoil';
import { countState } from '../store/atoms/countState';
import { useNavigate } from 'react-router-dom';

const Puzzle = () => {
  const [tiles, setTiles] = useState([...Array(16).keys()]);
  const emptyTileIndex = tiles.indexOf(0);
  const isGameFinished = tiles.every((tile, index) => tile === index + 1) && tiles[15] === 0;
  const [count, setCount] = useRecoilState(countState);
  const Navigate = useNavigate();
  useEffect(() => {
    // Shuffle the tiles
    const shuffledTiles = [...Array(16).keys()].sort(() => Math.random() - 0.5);
    setTiles(shuffledTiles);
  }, []);

  const handleTileClick = (index) => {
    // Check if the game is already finished
    if (isGameFinished) {
      setCount(4);
      Navigate('/LEVEL-4');
      alert('Congratulations! You have completed the game.');
      return;
    }

    // Check if the clicked tile can be moved
    if (canMove(index)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyTileIndex]] = [newTiles[emptyTileIndex], newTiles[index]];
      setTiles(newTiles);
    }
  };

  const canMove = (index) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    const emptyRow = Math.floor(emptyTileIndex / 4);
    const emptyCol = emptyTileIndex % 4;

    return (
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)
    );
  };

  return count>=3 ? (
    <div className=' ' style={{
      backgroundImage: `url('https://img.freepik.com/premium-vector/rgb-hexagonal-background_11469-76.jpg')`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      height: '100vh',
      overflow: 'hidden',
    }}>
      <div className=' text-black text-3xl flex flex-col mt-16 justify-center items-center h-16 bg-orange-700 '>15 PuZZlE GaMe</div>
    <div className="puzzle rounded-2xl bg-black w-96 h-72 mt-32 p-2" >
      {tiles.map((tile, index) => (
        <div
          key={index}
          className={`tile ${tile === 0 ? 'empty' : ''}`}
          onClick={() => handleTileClick(index)}
        >
          {tile !== 0 && tile}
        </div>
      ))}
      {isGameFinished && <div className="game-finished">Game Finished!</div>}
    </div>
    </div>
  ): (
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

export default Puzzle;
