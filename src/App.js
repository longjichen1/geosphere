import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Nasa from './components/Nasa';
import Welcome from './components/Welcome';
import React, {useEffect, useState} from 'react';
function App() {
  const [photoData, setPhotoData] = useState(null);
  const [blur, setBlur] = useState(false);
  const [blurIcon, setBlurIcon] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);

  document.body.style.backgroundColor='black';
  return (
    <>
      <Nav photoData={photoData} setPhotoData={setPhotoData} blur={blur} setBlur={setBlur} blurIcon={blurIcon} setBlurIcon={setBlurIcon} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Welcome photoData={photoData} setPhotoData={setPhotoData} blur={blur} setBlur={setBlur} blurIcon={blurIcon} setBlurIcon={setBlurIcon} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    </>
    
    
  );
}

export default App;
