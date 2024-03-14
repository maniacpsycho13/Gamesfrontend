import "../components/LEVEL6/src/App.css";
import Game from "./LEVEL6/src/components/Game";
import { useRecoilState } from 'recoil';
import { countState } from '../store/atoms/countState';
let value = parseInt(localStorage.getItem('count'));


function LEVEL61() {
  const [count, setCount] = useRecoilState(countState);
  const darkHandler = (dark) => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };
  
  return value >=3 ? (
    <div className={"app dark:bg-zinc-800"}>
      <Game darkness={darkHandler} />
    </div>
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

export default LEVEL61;
