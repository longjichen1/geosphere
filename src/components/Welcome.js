import React, {useState, useEffect} from 'react';

export default function Welcome ({photoData, setPhotoData, blur, setBlur, blurIcon, setBlurIcon, loggedIn, setLoggedIn}){
    const [started, setStarted] = useState(false);
    const [started2, setStarted2] = useState(false);
  
    const handleStarted = () =>{
        setStarted(true);
        setTimeout(function(){
            setStarted2(true);
        }, 700)
    }
    const startButton = (
        <>
        <div style={{maxWidth:"30%", marginTop:"19%"}} className={` ${blur? 'blur-sm': ''}  ${started? 'scale-0 duration-500':''} ${started2? 'absolute': ''} hover:bg-opacity-0 hover:bg-slate-600 hover:text-orange-800 hover:delay-200 bg-slate-800 bg-opacity-70  group m-auto outline rounded-full outline-8 outline-white p-4 text-center`}>
            <h1 onClick={() => handleStarted()} className = "p-3 h-max w-max mx-auto text-center pt-1/2 text-7xl text-white uppercase font-semibold hover:text-transparent bg-clip-text bg-gradient-to-r duration-300 from-orange-400 to-red-400">Get started</h1>
        </div>
        <div style={{marginTop:"19%", maxWidth:"70%"}} className = {`${started? 'scale-100': 'scale-0'} mx-auto text-3xl transformation duration-500 delay-[850ms] p-4 border-4 border-white rounded-full`}>HELLO THIS IS ME</div>
        </>
    )
    return(
        <>
        {startButton}
        
        </>
    )
}