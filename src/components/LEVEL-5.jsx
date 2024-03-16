import React, { useState } from 'react'
import GuessPass from './GuessPass/GuessPass';
import ErrorPage from './ErrorPage';
import { useEffect } from 'react';
import CryptoJS from 'crypto-js';


const LEVEL5 = () => {
  const [value,setValue] =useState(-1)
  useEffect(() => {
    // setValue(parseInt(localStorage.getItem('count')))
    const decrypted = CryptoJS.AES.decrypt(localStorage.getItem('count'), 'secret key').toString(CryptoJS.enc.Utf8);
    setValue(parseInt(decrypted));
    console.log(value);
  },[value])
  
  // const value =parseInt(localStorage.getItem('count'));
  return (
    value >= 5 ? <GuessPass /> : <div><ErrorPage/></div>
  );
}

export default LEVEL5