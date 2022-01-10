import React, {useEffect, useState} from "react";
import earthLogo from "../images/earth-logo.png";

function Nav() {
  const [photoData, setPhotoData] = useState(null);

    const generateRandomDate = () =>{
      const year = Math.floor(Math.random() * 18) + 1;
      const date = Math.floor(Math.random() * 27) + 1;
      const month = Math.floor(Math.random() * 11) + 1;
      const link = `20${year > 9? year: `0${year}`}-${month > 9? month: `0${month}`}-${date > 9? date: `0${date}`}`;
      return link;
    }
    let dt = '&date=2014-06-06';
    useEffect(() => {
        fetchPhoto(dt);

        async function fetchPhoto(link) {
          console.log(link);
          const res = await fetch(
              `https://api.nasa.gov/planetary/apod?api_key=E7O3bEYfrE32xI20de2cTgogKrwLH01sy0WdtGtn${link}`
          );
          const data = await res.json();
          
          setPhotoData(data);
        }
        console.log(photoData);
        if (!photoData){
          fetchPhoto('');
        }
       
    }, []);
    
    if (photoData) {
      const body = document.body.style;
      body.background =`url(${photoData.url}), url(${photoData.url})`
      
      body.backgroundPosition = 'center, center';
      
      body.backgroundSize = 'contain';
      body.backgroundRepeat = 'no-repeat, repeat';
      body.width = '90vw';
      body.height = '90vh';
    }else{

    }
  return(
    <div>
      <nav className = "flex items-center justify-between flex-wrap  p-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <img className = "p-0"src={earthLogo} style={{maxWidth: 70, margin:0}}></img>
            <span className="font-semibold text-xl tracking-widest pl-2">GeoSphere</span>
        </div>
        <div className = "block lg:hidden">
            
        </div>
        
      </nav>
      <h1 className = "text-white text-center">Hi</h1>
      {/* <Nasa className = "text-center inline-block object-center ml-5"/> */}
    </div>

  )
}

export default Nav;