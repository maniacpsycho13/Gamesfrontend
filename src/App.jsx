// src/App.js
import React from 'react';
import level2Imag from './assets/LEVEL-2.png';
import levelImag3 from './assets/LEVEL-3.png';
import levelImag from './assets/LEVEL-4.png';
import levelImag5 from './assets/LEVEL-5.png';
import { RecoilRoot } from 'recoil';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import LEVEL1 from './components/LEVEL-1'

import Game from './components/LEVEL-2';
import Puzzle from './components/LEVEL-3';
import ImgReader from './components/LEVEL-4';
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
  </Routes>
  </BrowserRouter> 
   
</div>
  );
}

export default App;
