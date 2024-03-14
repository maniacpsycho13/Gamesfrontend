export const Block = ({id, onClick, Values}) => {
  return (
      <>
      <div class='h-96 w-96 bg-slate-300 text-center p-2 m-6' onClick={onClick} >
          <h1 class='text-3xl'>Block : {id}</h1>
          <div class='w-full hover:text-white hover:bg-black'>Size : {Values.length}</div>
          <div className="w-full bg-white h-80">
              <div className='flex flex-col items-center justify-end -z-10 pt-14'>
                  <div className="h-52 w-8 bg-black"></div>
                  <div className="w-full h-12 bg-black"></div>
              </div>
              <div className='w-full h-80 flex flex-col-reverse items-center justify-start gap-1 -translate-y-96'>
              {Values.map((value, index) => (    
                  <div key={index} className="h-8 bg-blue-500 text-white font-bold" style={{width: `${value*3}rem`}}>
                  {value}
                  </div>
              ))}
              </div>
          </div>
      </div>
      </>
  );
}

export const Button = ({onClick, title, txtCol, bgCol}) =>{
    return (
        <button className={`font-bold px-4 py-1 rounded-lg shadow-lg transition bg-${bgCol} text-${txtCol}`} onClick={onClick}> {title} </button>
    );
}