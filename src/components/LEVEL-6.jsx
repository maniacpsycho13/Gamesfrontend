import { useNavigate } from 'react-router-dom';
import { Block, Button } from './BLOCK';
import {levelArray} from './components/script';
import {useState,useEffect} from 'react';
let value1 = parseInt(localStorage.getItem('count'));

// import LEVEL6 from './LEVEL6';

function Level6() {
  const [pairs, setPairs] = useState({a:NaN , b:NaN});
  const [count, setcount] = useState(0);
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');
  const [level, setLevel] = useState(1);  
  const navigate = useNavigate();
  const [value,setValue] =useState(-1)
  useEffect(() => {
    setValue(parseInt(localStorage.getItem('count')))
  },[])
  const [blocks, setBlocks] = useState(() =>{
    const intitialBlock = {
      1 : levelArray(1),
      2 : [],
      3 : []
    };
    return intitialBlock;
  })

  const handleBlockClick = (id) => {
    setPairs({a: pairs.b, b:id});
  };

  const compareArrays = (a, b) =>
  a.length === b.length && a.every((element, index) => element === b[index]);

  const handleTransfer = () =>{
    if(pairs.a === pairs.b){
      setMessage('Blocks Selected are same !');
    }
    else if(isNaN(pairs.a) || isNaN(pairs.b)){
      setMessage('Select Blocks Properly !');
    }
    else if(blocks[pairs.a].length === 0){
      setMessage(`Block ${pairs.a} is Empty !`);
    } 
    else if(blocks[pairs.b][blocks[pairs.b].length - 1] < blocks[pairs.a][blocks[pairs.a].length - 1]){
      setMessage(`Block ${blocks[pairs.b][blocks[pairs.b].length - 1]} is smaller than Block ${blocks[pairs.a][blocks[pairs.a].length - 1]} !`);
    }
    else{
      let ele = blocks[pairs.a].pop();
      blocks[pairs.b].push(ele);
      setcount(count + 1);
      setBlocks({ ...blocks });
      setMessage('');
      if(compareArrays(blocks[3],([5, 4, 3, 2, 1]))){
        setMessage2(`You Successfully Cleared The level in ${count+1} moves.`);
        if(level==5){
          localStorage.setItem('count', 7 );
          console.log(parseInt(localStorage.getItem('count')));
          navigate('/LEVEL-7');
        }
      }
    }
  }

  const handleReset = () => {
    setPairs({a:NaN , b:NaN});
    setcount(0);
    setBlocks({1 : levelArray(level), 2: [], 3: []});
    setMessage('');
    setMessage2('');
  }

  return value>=6 ? (
    <>
      <div className="h-12 w-ful bg-green-500 z-10 px-5 flex items-center justify-around ">
        <p className='bg-green-800 text-white px-4 py-1 rounded-lg'> Number of Attempts : {count} </p>
        <div>
        <select className='bg-black text-white px-3 py-1 rounded-lg' id='level-select' onChange={(e) => {setLevel(e.target.value); setBlocks({ ...blocks , 1: levelArray(e.target.value),2: [] ,3:[]});}}>
          {
            [1, 2, 3, 4, 5].map((value, index) => (
              <option key={index} value={value}>Level {value}</option>
            ))
          }
        </select>
        </div>
      </div>
      
      <div className='w-auto bg-red-400 m-5 text-center font-bold'>{message}</div>
      <div className='w-auto bg-green-500 m-5 text-center font-bold'>{message2}</div>

      <div className='flex z-0 justify-center'>
        {
          Object.entries(blocks).map(([blockId, values], index) =>(
            <Block key={index} id={blockId} Values={values} onClick={() => handleBlockClick(blockId)}/>
          ))
        }
      </div>

      <div className="h-12 w-ful bg-green-500 z-10 px-14 flex items-center gap-14 justify-center  ">
        <Button title={`Transfer   ${pairs.a} to ${pairs.b}`} txtCol='white' bgCol='black' onClick={() => setPairs({a:NaN , b:NaN})}/>
        <Button title='Transfer' txtCol='white' bgCol={`${((pairs.a === pairs.b) || isNaN(pairs.a) || isNaN(pairs.b) || (blocks[pairs.a].length === 0)) ? 'red' : 'blue'}-500`} onClick={handleTransfer}/>
        <Button title='Reset' txtCol='black' bgCol='yellow-300' onClick={handleReset}/>

        
      </div>
      <div className='flex justify-center items-center flex-col my-4' >
          <h1 className='  text-2xl my-4'> How to Play</h1>
          <ul className='text-center space-y-2'>
            <li>1. Just click on the block from where you want to move the number block </li>
            <li>2. And Click any of the remaining block to tranfer the block</li>
            <li>3. For Eg : If you click on block 1 and then on 2 then the Num Block will move from from 1 to 2 by using transfer button </li>
            <li>4. In order to win this game you just have to put all number block in ascending order from top </li>
          </ul>
      </div>
    </>
  ): (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-center">
        <p className="text-4xl font-bold mb-4">Oh you have not cracked the previous levels</p>
        <p className="text-2xl font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-900 to-blue-500">Keep playing and try to crack the levels to unlock more fun! {value}</span> 
        </p>
      </div>
    </div>
  );
}

export default Level6;