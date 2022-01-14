import React, {useEffect, useState} from "react";
import earthLogo from "../images/earth-logo.png";
import image from "../images/light.jpg"
function Nav({photoData, setPhotoData, blur, setBlur, blurIcon, setBlurIcon, loggedIn, setLoggedIn}) {
    useEffect(()=>{
      window.localStorage.setItem('photoData', photoData);
    }, [photoData]);

    useEffect(()=>{
      window.localStorage.setItem('blur', blur);
    }, [blur]);

    useEffect(()=>{
      window.localStorage.setItem('blurIcon', blurIcon);
    }, [blurIcon]);

    useEffect(()=>{
      window.localStorage.setItem('loggedIn', loggedIn);
    }, [loggedIn]);

    const generateRandomDate = () =>{
      const year = Math.floor(Math.random() * 18) + 1;
      const date = Math.floor(Math.random() * 27) + 1;
      const month = Math.floor(Math.random() * 11) + 1;
      const link = `20${year > 9? year: `0${year}`}-${month > 9? month: `0${month}`}-${date > 9? date: `0${date}`}`;
      return link;
    }
    let dt = `&date=${generateRandomDate()}`;
    var dat = 0;
    function fetchPhoto(){
      fetch(`https://api.nasa.gov/planetary/apod?api_key=E7O3bEYfrE32xI20de2cTgogKrwLH01sy0WdtGtn${dt}`)
          .then(response => response.json())
          .then((data) => setPhotoData(data))
    }
    useEffect(()=>{
      fetchPhoto();
    }, [dat]);
    if (!photoData){
      dat++;
      console.log(dat)
    }
    // if (photoData) {
    //   const body = document.body.style;
    //   body.background =`url(${photoData.url}), url(${photoData.url})`
      
    //   body.backgroundPosition = 'center, center';
      
    //   body.backgroundSize = 'contain';
    //   body.backgroundRepeat = 'no-repeat, repeat';
    //   body.width = '90vw';
    //   body.height = '90vh';
    // }else{
    //   document.body.style.background = 'black';
    // }
    function handleBlurIcon(){
      if (blurIcon === true){
        setBlurIcon(false);
      }else{
        setBlurIcon(true);
      }
      console.log(blurIcon);
    }
    
  return(
    <>    
    <div id="background" className= {`background h-screen ${blur? 'blur-sm saturate-50': 'blur-none saturate-100'} -z-20 transition-all duration-300`} style={{backgroundImage:`url(${image})`, backgroundPosition:'center',backgroundSize:'contain', position:'absolute', backgroundRepeat:'repeat', left:'0', right:'0', top:'0', bottom:'0'}}></div>

    {/* <img id="background"src="https://coolwallpapers.me/picsup/5814157-meteor-wallpapers.jpg" className= {`background h-screen ${blur? 'blur-sm saturate-50': 'blur-none saturate-100'} -z-10 absolute transition-all duration-300`} style={{ left:'0', right:'0', top:'0', bottom:'0'}}/> */}

    <div>
      <nav className = "absolute flex items-center justify-between flex-wrap  p-4">
        <div className="p-4 flex items-center flex-shrink-0 text-white mr-6 ">
            <img  onClick = {() =>{blur? setBlur(false):setBlur(true)}}className = {`${!blur? 'animate-pulse hover:outline-slate-900 hover:duration-150': 'hover:outline-slate-900 hover:duration-150'} delay-200 p-0  z-40 outline outline-4 outline-white outline-offset-4 rounded-full  ${blurIcon? 'animate-spin':''}`} src={earthLogo} style={{maxWidth: 70, margin:0}}></img>
            <span className="z-40 font-semibold text-3xl tracking-widest pl-7"><a href="/">GeoSphere</a></span>
        </div>
        <div className = "block lg:hidden">
            
        </div>
        {/* login thing here */}
        
      </nav>
      <br/>
      <ul className = " pt-28 text-xl absolute">
        <li className = {`${!blur? 'scale-0 left-0 delay-500': 'translate-x-36 scale-150 delay '} hover:duration-75 hover:text-slate-800 inline-block transform  duration-700  text-white`}><a href="/">Home</a></li>
        <br/><br/><br/>
        <li className={`${!blur? 'scale-0 left-0 delay-300': 'translate-x-36 scale-150 delay-300'} hover:duration-75 inline-block transform  duration-700  text-white`}><a className='hover:text-slate-800' href="/about">About</a></li>
        <br/><br/><br/>
        <li className= {`${!blur? 'scale-0 left-0': 'translate-x-36 scale-150 delay-500'}  hover:duration-75  inline-block transform  duration-700  text-white`}><a className = 'hover:text-slate-800' href= {`/${loggedIn? 'gallery': 'login'}`}>{loggedIn? 'Gallery': 'Login'}</a></li>        <br/><br/>
      </ul>
      {/* <h1 className={`origin-center -rotate-90 text-center text-4xl text-white absolute transform top-full -left-4 ${blur? 'translate-y-120px':'translate-y-96 scale-100 duration-1000'}`}>Menu ➤</h1> */}

      {/* <button onClick = {() =>{blur? setBlur(false):setBlur(true)}} className = "bg-white text-black uppercase">CLICK</button> */}
    </div>
    </>
  )
}

export default Nav;