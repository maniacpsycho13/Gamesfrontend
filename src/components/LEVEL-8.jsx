import React, {useState} from 'react';
import '../assets/LEVEL-8.css';
import { useWindowSize } from 'usehooks-ts';
import Confetti from 'react-confetti';

import Crossword, {ThemeProvider} from '@jaredreisinger/react-crossword';

export default function LEVEL8() {

  const [isPuzzleComplete, setIsPuzzleComplete] = useState(false);

  const handleCrosswordCorrect = (isCorrect) => {
    setIsPuzzleComplete(isCorrect);
  };

  const data = 
  {
    across: {
      2: {
        clue: 'Short for code that takes advantage of vulnerability',
        answer: 'SPLOIT',
        row: 0,
        col: 15,
      },
      4: {
        clue: 'stylized form of writing using alphanumeric substitutions',
        answer: 'LEET',
        row: 1,
        col: 12,
      },
      5:{
        clue: 'Popular tool for Windows credential harvesting',
        answer: 'MIMIKATZ',
        row: 3,
        col: 1,
      },
      6:{
        clue: 'security mechanism for access control',
        answer: 'SELINUX',
        row: 8,
        col: 12,
      },
      7:{
        clue: 'The practice of concealing information within other data',
        answer: 'STEGANOGRAPHY',
        row: 10,
        col: 6,
      },
      10:{
        clue: 'Deliberately making code difficult to understand',
        answer: 'OBFUSCATION',
        row: 12,
        col: 3,
      },
      11:{
        clue: 'Protocols where a prover can prove knowledge without revealing it',
        answer: 'ZERO-KNOWLEDGE',
        row: 14,
        col: 0,
      },
      13:{
        clue: 'Type of cipher using multiple substitution alphabets',
        answer: 'POLYALPHA',
        row: 16,
        col: 2,
      },
      15:{
        clue: 'controls routing on the internet',
        answer: 'BGP',
        row: 18,
        col: 1,
      },
      14:{
        clue: 'Protocol used in critical infrastructure communication (think power grids)',
        answer: 'DNP3',
        row: 17,
        col: 12,
      
      },
    },
    down: {
      1:{
        clue: 'Process of analyzing a system to understand inner workings',
        answer: 'REVERSE-ENGINEERING',
        row: 0,
        col: 13,
      },
      2:{
        clue: 'Highly spohisticated worm that targeted industrial control systems',
        answer: 'STUXNET',
        row: 0,
        col: 15,
      },
      3:{
        clue: 'Framework for developing and executing security exploits',
        answer: 'METASPLOIT',
        row: 1,
        col: 7,
      },
      8:{
        clue: 'sophisticated, targeted cyberattack',
        answer: 'APT',
        row: 10,
        col: 10,
      },
      9:{
        clue:'Type of encryption allowing computation on encrypted data',
        answer: 'HOMOMORPHIC',
        row: 11,
        col: 3,
      },
      12:{
        clue:'Popular open-source network scanning tool',
        answer: 'NMAP',
        row: 14,
        col: 6,
      },
    },
  };
  const { width, height } = useWindowSize();

  return(
    <>
    <div>
    <h1 style={{display: 'flex',paddingTop: '1%'}}>Cybersecurity Crossword</h1>
    <ThemeProvider
      theme={{
        allowNonSquare: true,
        columnBreakpoint: '9999px',
        gridBackground: '#acf',
        cellBackground: '#ffe',
        cellBorder: '#fca',
        textColor: 'black',
        numberColor: '#9f9',
        focusBackground: '#f00',
        highlightBackground: '#f99',
      }}
    >
      <Crossword data={data} onCrosswordCorrect={handleCrosswordCorrect} />
      {isPuzzleComplete && (
        //Put the code for going to next level here!
          <Confetti
          width={width}
          height={height}
        />
        )}
      </ThemeProvider>
    </div>
    </>
    );
  }