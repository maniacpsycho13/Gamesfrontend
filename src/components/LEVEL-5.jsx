import React, { useState, useEffect, useRef } from 'react';
import { countState } from "../store/atoms/countState";
import { useRecoilState } from "recoil";
import { useNavigate } from 'react-router-dom';
let value = parseInt(localStorage.getItem('count'));


function GuessPass(){
  const [positions, setPositions] = useState(Array.from({ length: 10 }, () => ({ x: 0, y: 0 })));
  const [velocities, setVelocities] = useState(Array.from({ length: 10 }, () => ({ x: 1, y: 1 })));
  const [containerSize, setContainerSize] = useState({ width: 400, height: 300 });
  const [value, setValue] = useState('');
  const ballSize = 20;
  const [value1,setValue1]=useRecoilState(countState);
  const Navigate = useNavigate();

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    setContainerSize({ width: containerRect.width, height: containerRect.height });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newPositions = positions.map((pos, index) => {
        const newPosition = {
          x: pos.x + velocities[index].x,
          y: pos.y + velocities[index].y
        };

        let newVelocity = { ...velocities[index] };

        // Reverse direction if ball hits container edges and add some randomness
        if (newPosition.x <= 0 || newPosition.x >= containerSize.width - ballSize) {
          newVelocity.x = -velocities[index].x * (0.8 + Math.random() * 0.4); // Random change in direction
        }

        if (newPosition.y <= 0 || newPosition.y >= containerSize.height - ballSize) {
          newVelocity.y = -velocities[index].y * (0.8 + Math.random() * 0.4); // Random change in direction
        }

        // Update ball velocity
        setVelocities(prevVelocities => {
          const newVelocities = [...prevVelocities];
          newVelocities[index] = newVelocity;
          return newVelocities;
        });

        return newPosition;
      });

      // Update ball positions
      setPositions(newPositions);
    }, 5);

    return () => clearInterval(intervalId);
  }, [positions, velocities, containerSize, ballSize]);

  const colors = ['#ff0000', '#00ff00', '#0000ff', '#000', '#00ffff', '#ff00ff', '#888888', '#f00f00', '#ffa500', '#800080'];
  const alphabets = ['@', 'K', 'C', 'A', 'D', 'F', 'C', 'R', 'I', 'S'];

  function clickHandler(e){
    e.preventDefault();
    console.log(value);
    if(value === 'ISDF@CRACK'){
      setValue1(6); 
      localStorage.setItem('count', 6 );
      console.log(parseInt(localStorage.getItem('count')));
      alert("You've found the password");
      Navigate('/LEVEL-6');
    }
    
  }

  return  (
    
    <div className='flex flex-col justify-center items-center gap-4'>
      <h1 className="text-3xl font-bold mb-4">Guess Password</h1>
      <div className="w-96 h-96 border border-black relative" ref={containerRef}>
        {positions.map((pos, index) => (
          <div
            key={index}
            className="w-10 h-10 rounded-full absolute flex justify-center items-center"
            style={{
              left: pos.x,
              top: pos.y,
              backgroundColor: colors[index],
              color: 'white', // Adjust text color as needed
            }}
          >
            {alphabets[index]}
          </div>
        ))}
      </div>
      <input type="text" className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder='Guess The Password' onChange={(e) => setValue(e.target.value)}></input>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={clickHandler}>Submit</button>
    </div>
  ) 
}

export default GuessPass;