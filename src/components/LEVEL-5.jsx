import React, { useState } from 'react'
import GuessPass from './GuessPass/GuessPass';
import ErrorPage from './ErrorPage';
import { useEffect } from 'react';



const LEVEL5 = () => {
  const [value,setValue] =useState(-1)
  useEffect(() => {
    setValue(parseInt(localStorage.getItem('count')))
  },[])
  
  // const value =parseInt(localStorage.getItem('count'));
  return (
    value >= 5 ? <GuessPass /> : <div><ErrorPage/></div>
  );
}

export default LEVEL5