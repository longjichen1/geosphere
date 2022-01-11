import React, {useEffect, useState} from "react";
import earthLogo from "../images/earth-logo.png";

function Nav() {
  const [photoData, setPhotoData] = useState(null);
  const [blur, setBlur] = useState(false);
  const [blurIcon, setBlurIcon] = useState(false);
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
    <div className= {`h-screen ${blur? 'blur-sm saturate-50': 'blur-none saturate-100'} -z-10 transition-all duration-300`} style={{backgroundImage:`url('https://coolwallpapers.me/picsup/5814157-meteor-wallpapers.jpg')`, backgroundPosition:'center',backgroundSize:'cover', position:'absolute', left:'0', right:'0', top:'0', bottom:'0'}}>
      
    </div>
    <div>
      <nav className = "flex items-center justify-between flex-wrap  p-4">
        <div className="p-4 flex items-center flex-shrink-0 text-white mr-6 ">
            <img  onClick = {() =>{blur? setBlur(false):setBlur(true)}}className = {`${!blur? 'animate-pulse hover:outline-white': 'hover:outline-white'} delay-200 p-0  outline outline-4 outline-slate-900 outline-offset-4 rounded-full  ${blurIcon? 'animate-spin':''}`} src={earthLogo} style={{maxWidth: 70, margin:0}}></img>
            <span className="font-semibold text-2xl tracking-widest pl-4">GeoSphere</span>
        </div>
        <div className = "block lg:hidden">
            
        </div>
        <p className="hover:visible translate-y-5 duration-1000 justify-center text-center">hello</p>
      </nav>
      
      {/* <button onClick = {() =>{blur? setBlur(false):setBlur(true)}} className = "bg-white text-black uppercase">CLICK</button> */}
    </div>
    </>
  )
}

export default Nav;