import React, { useState } from "react";
import { countState } from "../store/atoms/countState";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import y from '../assets/Arena.jpg';
import { useNavigate } from 'react-router-dom';

function LEVEL1() {
  const [value, setValue] = useRecoilState(countState);
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (response.toLowerCase() === "cede") {

      localStorage.setItem('count', 2);
      console.log(localStorage.getItem('count'));

      alert("You've found the word");
      navigate('/LEVEL-2')

      setValue(2); // Update value to 2 if "cede" is entered

    }

    console.log('Form submitted with response:', response);
  };

  return (
    <div
      className="text-black relative flex flex-col justify-center items-center "
      style={{
        backgroundImage: `url(${y})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <div className="pb-24 font-extrabold text-black text-3xl">LEVEL-1</div>
      <div className="mt-18 bg-gradient-to-r from-cyan-500 to-blue-500 text-black rounded-3xl p-8 font-extrabold mb-4 text-2xl bg-opacity-80  ">
        <h1 className="px-20">C_D_</h1>
        Guess The Word 
      </div>

      {value >= 1 ? (
        <div className=" flex flex-col items-center justify-center">
          <form onSubmit={handleSubmit} className=" p-6 bg-black text-black rounded-md shadow-md">
            <input
              type="text"
              id="response"
              name="response"
              placeholder="Type your response"
              value={response}
              onChange={handleInputChange}
              className="border rounded-md p-2 m-2"
            />
            <button type="submit" className="mt-4 bg-blue-500 text-black px-4 py-2 rounded-md">
              Submit
            </button>
          </form>
          <div className=" p-6 bg-black  rounded-md shadow-md mt-4 ">Hient </div>
        </div>
      ) : (
        <>
          <p style={{ margin: '10px' }}>Level is locked!</p>
        </>
      )}
    </div>
  );
}

export default LEVEL1;
