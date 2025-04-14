import React from 'react'
import { useEffect, useState } from 'react'
import './App.css'
import musicOff from './assets/music_off.svg'
import musicOn from './assets/music_on.svg'
import ball from './assets/ball.svg'
import close from './assets/close.svg'
import row from './assets/row-row.mp3'
import gameBall from './assets/gameball.svg'
import smile from './assets/smile.svg'
import notBad from './assets/not-bad.svg'

function App() {
  const [music, setMusic]= useState(false);
  const audio = React.useRef()
  const ToggleMusic=()=>{

    if(audio.current){

      if(music){
          audio.current.pause()
      }else{
        audio.current.play()
      }

      setMusic(!music)
    }
  }
  
  
  const [startGame, setStartGame] =useState(false);
  const handleStartGame=()=>{
    setStartGame(true);
    setTime(10);
    setClick(0)
  }

  const [click, setClick] =useState(0);
  const handleClick=()=>{
    setClick(click + 1);
    handlePosition()
  }
  const [position, setPosition] = useState({left:0, top:0})
  const handlePosition=()=>{
    const left = Math.floor(Math.random() * 80) + '%';
    const top = Math.floor(Math.random() * 80) + '%';
    setPosition({left,top})
  }

  const [time, setTime] = useState(10);
  useEffect(()=>{
    let timer;
    if(startGame && time ){
        timer = setInterval(() => {
          setTime((prevTime) => prevTime -1)  
        }, 1000);
    }else if (time === 0){
      clearInterval(timer);
      handleModal()
    }
    return()=> clearInterval(timer)
  },[time, startGame])

  const [Modal, setModal] = useState(false);
  const handleModal=()=>{
    setModal(!Modal);
  }
  const handlecloseModal=()=>{
    setModal(!Modal);
    setStartGame(false)
    setTime(false)
  }
  
  
  return (
    <>
      <div className="bg-gray-200 w-full h-[100vh] flex flex-col ">
        <div className="w-full h-[6rem] bg-gray-200 shadow-xl items-center  p-6 flex justify-between">
          <span className={` ${music ? 'bg-red-900' : 'bg-gray-300'}  w-[5rem] h-[3rem] relative p-1 rounded-full flex items-center  `}>
            <img
                onClick={ToggleMusic} 
                src={ music ? musicOn : musicOff} 
                className={` ${music ? 'right-1' : 'left-1'} w-[2.5rem] cursor-pointer absolute bg-white p-1 white rounded-full`} />
          </span>
            <audio ref={audio} loop>
              <source  src={row} />
            </audio>

          <span className={`${startGame ? '' : 'hidden'}`}>
              <h1 className="">Clicks: {click}</h1>
              <h1 className="">Time Left: {time}</h1>
          </span>
        </div>
        
          {
            startGame ?
            <>

                <div className="relative w-full h-[100vh]">
                  <img 
                     
                      style={{
                        top:position.top,
                        left:position.left
                      }}
                      onClick={handleClick}
                      src={gameBall} 
                      className='w-[8rem] absolute cursor-pointer transition-all duration-300'/>
                </div>

                <div className={`${Modal ? 'block' : 'hidden'} fixed opacity-70 flex flex-col  justify-center items-center w-full h-[100vh] bg-gray-900`}>
                      <img 
                          onClick={handlecloseModal}
                          src={close} 
                          className='w-10 mb-3 cursor-pointer'   />
                      <div className={` ${Modal ? 'block' : 'hidden'} w-[40vh] h-[25vh] flex flex-col items-center  p-6 rounded-xl bg-white`}>
                       
                      {
                          click > 10 ? (
                            <>
                              <h1 className='text-3xl text-center font-bold text-red-900'>Amazing!!</h1>
                              <span className="flex">
                                <img src={smile} className='w-10 mt-5' />
                                <img src={smile} className='w-10 mt-5' />
                                <img src={smile} className='w-10 mt-5' />
                              </span>
                            </>
                          ) : click > 7 ? (
                            <>
                              <h1 className='text-3xl text-center mt-5 font-bold text-red-900'>Good Play!</h1>
                              <span className="flex">
                                <img src={smile} className='w-10 mt-5' />
                                <img src={smile} className='w-10 mt-5' />
                              </span>
                            </>
                          ) : click > 5 ? (
                            <>
                              <h1 className='text-3xl text-center mt-5 font-bold text-orange-600'>Not Bad!</h1>
                              <img src={smile} className='w-10 mt-5' />
                            </>
                          ) : (
                            <>
                              <h1 className='text-3xl text-center mt-5 font-bold text-gray-600'>Try Again!</h1>
                              <img src={notBad} className='w-10 mt-5' />
                            </>
                          )
                        }

                      </div>
               </div>
            
            </> :
            <>
              <div className="p-6 flex flex-col items-center justify-center mt-[3rem]">
                <h1 className="text-3xl md:text-4xl text-red-900 font-semibold">Bouncing Ball Game</h1>
                <p className="w-[70%] m-3 text-center text-red-900">A game where the ball moves randomly around the screen, your goal is to click the ball as many times you can in 10 secs, the faster you clicked the higher you will score.</p>
                <p className="font-bold text-red-900">Click the ball to start</p>
                <img 
                    onClick={handleStartGame}
                    src={ball} 
                    className='w-[50%] md:[30%] cursor-pointer' />
               </div>
               
            </>
          }
        
        
      </div>
    </>
  )
}

export default App
