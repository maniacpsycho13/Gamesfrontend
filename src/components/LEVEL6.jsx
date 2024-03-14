import "../components/LEVEL6/src/App.css";
import Game from "./LEVEL6/src/components/Game";

function LEVEL6() {
  const darkHandler = (dark) => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };
  
  return (
    <div className={"app dark:bg-zinc-800"}>
      <Game darkness={darkHandler} />
    </div>
  );
}

export default LEVEL6;
