// src/App.js
import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import LEVEL1 from './components/LEVEL-1';

import Game from './components/LEVEL-2';
import Puzzle from './components/LEVEL-3';
import ImgReader from './components/LEVEL-4';
import GuessPass from './components/LEVEL-5';
import LEVEL6 from './components/LEVEL6';
function App() {
  return (
       
 
  <div>
    <BrowserRouter>
        <Routes>
              <Route path = "/" element = {<Home/>}/>
              <Route path = "/LEVEL-1" element = {<LEVEL1/>}/>
              <Route path = "/LEVEL-2" element = {<Game/>}/>
              <Route path = "/LEVEL-3" element = {<Puzzle/>}/>
              <Route path = "/LEVEL-4" element = {<ImgReader/>}/>
              <Route path = "/LEVEL-5" element = {<GuessPass />} />
              <Route path = "/LEVEL-6" element = {<LEVEL6/>}/>

              
        </Routes>
    </BrowserRouter> 
   
  </div>
  );
}

export default App;
