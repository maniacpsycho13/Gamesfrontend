// src/components/Puzzle.js
import React, { useState, useEffect } from 'react';
import './Puzzle.css';
import y from '../assets/Arena.jpg'
const Puzzle = () => {
  const [tiles, setTiles] = useState([...Array(16).keys()]);
  const emptyTileIndex = tiles.indexOf(0);
  const isGameFinished = tiles.every((tile, index) => tile === index + 1) && tiles[15] === 0;

  useEffect(() => {
    // Shuffle the tiles
    const shuffledTiles = [...Array(16).keys()].sort(() => Math.random() - 0.5);
    setTiles(shuffledTiles);
  }, []);

  const handleTileClick = (index) => {
    // Check if the game is already finished
    if (isGameFinished) {
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

  return (
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
  );
};

export default Puzzle;
