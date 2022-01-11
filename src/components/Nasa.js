import React, {useEffect, useState} from 'react';

function Nasa () {
    const [photoData, setPhotoData] = useState(null);

    useEffect(()=>{
        fetch('https://api.nasa.gov/planetary/apod?api_key=E7O3bEYfrE32xI20de2cTgogKrwLH01sy0WdtGtn')
            .then(response => response.json())
            .then((data) => setPhotoData(data))
    })
    document.body.backgroundUrl = `url(${photoData.url})`
    return (
            
            <img
            src={photoData.url}
            alt={photoData.title}
            className="photo text-center inline"
            />
       
    );
}

export default Nasa;