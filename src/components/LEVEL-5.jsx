import React from 'react'
import GuessPass from './GuessPass/GuessPass';
import ErrorPage from './ErrorPage';


const LEVEL5 = () => {
  
  const value =parseInt(localStorage.getItem('count'));
  return (
    value >= 5 ? <GuessPass /> : <div><ErrorPage/></div>
  );
}

export default LEVEL5