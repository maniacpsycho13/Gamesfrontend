import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import level2Imag from '../assets/LEVEL-2.png';
import levelImag3 from '../assets/LEVEL-3.png';
import levelImag from '../assets/LEVEL-4.png';
import levelImag5 from '../assets/LEVEL-5.png';
import b from '../assets/9746162.jpg';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

function Header() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1 });
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={controls}
      className="flex flex-col items-center justify-center text-center"
    >
      <motion.h1 className="text-2xl bg-gradient-to-r from-orange-400 via-sky-400 to-red-400 mt-8 mx-4 mb-2 py-3 px-32 rounded-2xl text-black font-extrabold h-16">
        CrackHunt
      </motion.h1>
      <motion.p className="text-2xl mt-6 my-4 text-black bg-gradient-to-r from-red-200 via-amber-400 to-red-300 rounded-2xl py-14 px-12 font-bold">
        Unlock the mystery, solve the puzzles, and embark on an adventure!
      </motion.p>
    </motion.div>
  );
}

function Home() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation();

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    controls.start({ y: scrollY / 2 });
  }, [scrollY, controls]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="text-white relative " style={{ backgroundImage: `url(${b})`, backgroundPosition: 'center', color: 'red', overflow: 'hidden' }}>
      <Header />
      <motion.div className="grid grid-cols-3 grid-rows-5 gap-3 mx-4 my-2">
        {[1, 2, 3, 4, 5,6].map((item) => (
          <motion.div
            key={item}
            className="relative bg-gradient-to-r from-green-500 via-red-500 to-blue-500 my-6 mx-4 rounded-tr-3xl"
            style={{ border: '8px solid transparent' }}
            animate={controls}
            onClick={() => {
              navigate(`/LEVEL-${item}`);
            }}
          >
            <div
              className="p-4 w-72 h-64 bg-white border-solid border-8 rounded-tr-3xl"
              style={{
                backgroundImage: `url(${getBackgroundImage(item)})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
              {/* Content for Grid Item {item} */}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// Function to get background image URL based on item
function getBackgroundImage(item) {
  switch (item) {
    case 1:
      return 'https://cdn-icons-png.flaticon.com/256/6581/6581077.png';
    case 2:
      return level2Imag;
    case 3:
      return levelImag3;
    case 4:
      return levelImag;
    case 5:
      return levelImag5;
    case 6:
      return levelImag5;
    default:
      return '';
  }
}

export default Home;
