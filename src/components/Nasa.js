import React, {useEffect, useState} from 'react';

function Nasa () {
    const [photoData, setPhotoData] = useState(null);

    useEffect(() => {
        fetchPhoto();

        async function fetchPhoto() {
        const res = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=E7O3bEYfrE32xI20de2cTgogKrwLH01sy0WdtGtn&date=2014-10-01`
        );
        const data = await res.json();
        setPhotoData(data);
        }
    }, []);

    if (!photoData) return <div />;
    
    console.log(photoData);
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