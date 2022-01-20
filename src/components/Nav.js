import React, { useEffect, useState } from "react";
import earthLogo from "../images/earth-logo.png";
import image from "../images/light.jpg";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
function Nav({
  blur,
  setBlur,
  loggedIn,
  setLoggedIn,
  loginBox,
  setLoginBox,
  about,
  setAbout,
  gallery,
  setGallery,
  state,
  setLike,
}) {
  const logout = () => {
    setAbout(false);
    setGallery(false);
    signOut(auth);
    state.pptd = [];
    setLike(false);
  };
  function handleBlur() {
    if (blur === true) {
      setAbout(false);
      setGallery(false);
      setBlur(false);
      setLoginBox(false);
    } else {
      setBlur(true);
    }
  }

  function handleLogin() {
    if (!loggedIn) {
      if (loginBox === true) {
        setLoginBox(false);
      } else {
        setLoginBox(true);
        setAbout(false);
      }
    } else {
      if (gallery) {
        setGallery(false);
      } else {
        setGallery(true);
        setAbout(false);
      }
    }
  }

  function toggleAbout() {
    if (about) {
      setAbout(false);
    } else {
      setLoginBox(false);
      setGallery(false);
      setAbout(true);
    }
  }
  return (
    <>
      <div
        id="background"
        className={`background h-screen ${
          blur ? "blur-sm saturate-50" : "blur-none saturate-100"
        } -z-20 transition-all duration-300 bg-bottom bg-cover bg-repeat absolute left-0 right-0 top-0 bottom-0`}
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>

      {/* <img id="background"src="https://coolwallpapers.me/picsup/5814157-meteor-wallpapers.jpg" className= {`background h-screen ${blur? 'blur-sm saturate-50': 'blur-none saturate-100'} -z-10 absolute transition-all duration-300`} style={{ left:'0', right:'0', top:'0', bottom:'0'}}/> */}

      <div>
        <nav className="absolute flex items-center justify-between flex-wrap  p-4">
          <div className="p-4 flex items-center flex-shrink-0 text-white mr-6 ">
            <img
              onClick={() => {
                handleBlur();
              }}
              className={`${
                !blur
                  ? "animate-pulse hover:outline-slate-900 hover:duration-150"
                  : "hover:outline-slate-900 hover:duration-150"
              } delay-200 p-0  z-40 outline max-w-[70px] outline-4 m-0 outline-white outline-offset-4 rounded-full  `}
              src={earthLogo}
            ></img>
            <span className="z-40 font-semibold text-3xl tracking-widest pl-7">
              <a href="/">GeoSphere</a>
            </span>
          </div>
          <div className="block lg:hidden"></div>
          {/* login thing here */}
        </nav>
        <br />
        <ul className=" pt-28 text-xl absolute z-40">
          <li
            className={`${
              !blur ? "scale-0 left-0 delay-500" : "translate-x-36 scale-150 "
            } hover:duration-75 inline-block transform  duration-700  text-white`}
          >
            <a className="hover:text-slate-800" onClick={() => toggleAbout()}>
              About
            </a>
          </li>
          <br />
          <br />
          <br />
          <li
            className={`${
              !blur
                ? "scale-0 left-0 delay-300 "
                : "translate-x-36 scale-150 delay-300"
            }  hover:duration-75  inline-block transform  duration-700  text-white`}
          >
            <a className="hover:text-slate-800" onClick={() => handleLogin()}>
              {loggedIn ? "Gallery" : "Login"}
            </a>
          </li>
          <br />
          <br />
          <br />
          {loggedIn ? (
            <li
              className={`${
                !blur
                  ? "scale-0 left-0 delay-150"
                  : "translate-x-36 scale-150 delay-500"
              } hover:duration-75 inline-block transform opacity-100 duration-700  text-white`}
            >
              <a className="hover:text-slate-800" onClick={logout}>
                Logout
              </a>
            </li>
          ) : (
            <div></div>
          )}
        </ul>
        {/* <h1 className={`origin-center -rotate-90 text-center text-4xl text-white absolute transform top-full -left-4 ${blur? 'translate-y-120px':'translate-y-96 scale-100 duration-1000'}`}>Menu ➤</h1> */}

        {/* <button onClick = {() =>{blur? setBlur(false):setBlur(true)}} className = "bg-white text-black uppercase">CLICK</button> */}
      </div>
    </>
  );
}

export default Nav;
