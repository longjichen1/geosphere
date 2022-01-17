import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config.js";
function App() {
  const [blur, setBlur] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginBox, setLoginBox] = useState(false);
  const [user, setUser] = useState({});
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
        />
      )}

      <Welcome
        blur={blur}
        setBlur={setBlur}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
    </>
  );
}

export default App;
