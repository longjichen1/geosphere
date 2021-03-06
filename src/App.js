import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Gallery from "./components/Gallery";
import Welcome from "./components/Welcome";
import React, { useEffect, useState } from "react";
import About from "./components/About";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { auth, firestore } from "./firebase-config.js";
const state = { pptd: [] , remove:[]};
function App() {
  const [d, setD] = useState(false);
  const [a, setA] = useState(true);
  const [like, setLike] = useState(false);
  const [photoData, setPhotoData] = useState("");
  const [blur, setBlur] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginBox, setLoginBox] = useState(false);
  const [about, setAbout] = useState(false);
  const [user, setUser] = useState({});
  const [gallery, setGallery] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);
  return (
    <>
      <Nav
        blur={blur}
        setBlur={setBlur}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        loginBox={loginBox}
        setLoginBox={setLoginBox}
        about={about}
        setAbout={setAbout}
        gallery={gallery}
        setGallery={setGallery}
        state={state}
        setLike={setLike}
      />
      {loggedIn ? (
        <div></div>
      ) : (
        <Login
          blur={blur}
          setBlur={setBlur}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          loginBox={loginBox}
          setLoginBox={setLoginBox}
          photoData={photoData}
        />
      )}
      <About blur={blur} about={about} setAbout={setAbout} />
      <Gallery
        blur={blur}
        gallery={gallery}
        setGallery={setGallery}
        user={user}
        state={state}
        like={like}
        d={d}
        setD={setD}
        a={a}
        setA={setA}
        photoData={photoData}
        setLike={setLike}
      />
      <Welcome
        blur={blur}
        setBlur={setBlur}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        photoData={photoData}
        setPhotoData={setPhotoData}
        user={user}
        like={like}
        setLike={setLike}
        state = {state}
        a={a}
        d={d}
      />
    </>
  );
}

export default App;
