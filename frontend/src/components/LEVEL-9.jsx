import React, { useState ,useEffect} from "react";
import { countState } from "../store/atoms/countState";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import y from '../assets/Arena.jpg';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
// let value1 = parseInt(localStorage.getItem('count'));
function LEVEL9() {
  const [value,setValue] =useState(-1)
  useEffect(() => {

    // setValue(parseInt(localStorage.getItem('count')))
    const decrypted = CryptoJS.AES.decrypt(localStorage.getItem('count'), 'secret key').toString(CryptoJS.enc.Utf8);
    setValue(parseInt(decrypted));
    console.log(value);
  },[value])
  
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (response.toLowerCase() === "botnet") {

      // localStorage.setItem('count', 9);
      // console.log(localStorage.getItem('count'));
      const encrypted = CryptoJS.AES.encrypt('9', 'secret key').toString();
      localStorage.setItem('count', encrypted );
      alert("You've found the word");
      navigate('/LEVEL-9')

      // setValue(2); // Update value to 2 if "cede" is entered

    }

    console.log('Form submitted with response:', response);
  };

  return value>=8 ? (
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
      <div className="pb-24 font-extrabold text-black text-3xl">LEVEL-8</div>
      <div className="mt-18 bg-gradient-to-r from-cyan-500 to-blue-500 text-black rounded-3xl p-8 font-extrabold mb-4 text-2xl bg-opacity-80  ">
        <h1 className="px-20">_O_N_T</h1>
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
          <div className=" p-6 bg-black  rounded-md shadow-md mt-4  text-white">H2I1NT</div>
        </div>
      ) : (
        <>
          <p style={{ margin: '10px' }}>Level is locked!</p>
        </>
      )}
    </div>
  ): ( 
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-center">
        <p className="text-4xl font-bold mb-4">Oh you have not cracked the previous levels</p>
        <p className="text-2xl font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-900 to-blue-500">Keep playing and try to crack the levels to unlock more fun!</span> 
        </p>
      </div>
      <h1>{value}</h1>
    </div>
  );
}

export default LEVEL9;
