import React, { useEffect, useState } from "react";
import LinkedIn from "../images/linkedin.png";
import Github from "../images/github.png";
export default function About({ blur, about, setAbout }) {
  return (
    <div
      className={`border-white border-4 absolute m-auto left-0 right-0 sm:w-[40%] sm:text-[10px] lg:w-[50%] xl:w-[60%] md:w-[40%] w-[78rem] ${
        about && blur ? "opacity-100" : "opacity-0 scale-0"
      } top-0 bottom-0 h-[45rem] lg:h-[70%] rounded-3xl z-40 transform duration-300 bg-slate-800 bg-opacity-80 text-3xl  xl:text-xl sm:h-[65%] lg:text-md md:text-sm`}
    >
      <img
        src={`https://media-exp1.licdn.com/dms/image/C4E03AQF094hQl2ZZMA/profile-displayphoto-shrink_100_100/0/1641619885481?e=1648080000&v=beta&t=BGvSL7UhhTSsL4zHU57bdNZb_0PhdVZRsiTJIQ73hBw`}
        alt=""
        className="h-48 lg:h-[30%] sm:h-[25%] mx-auto border-white border-4 rounded-full my-8"
      />
      <p className="text-slate-300 text-center  sm:leading-tight">
        Hello! My name is Longji Chen, and I am a self-taught developer studying
        at Vanderbilt University.
      </p>
      <br />
      <p className="w-1/2  m-auto text-transparent  sm:leading-tight bg-clip-text bg-gradient-to-r from-blue-400 to-red-400  text-center">
        Check out some cool images from NASA APOD (Astronomy Picture of the
        Day), create an account, and save your favorite pictures!
      </p>
      <ul className="text-center mt-3 ">
        <li className="w-[5rem] lg:w-[4rem] sm:w-[2rem] inline-block m-2 border-2 border-slate-400 rounded-full">
          <a href="https://github.com/longjichen1">
            <img src={Github} alt="Github" />
          </a>
        </li>
        <li className="w-[5rem] lg:w-[4rem] sm:w-[2rem] inline-block m-2 border-2 border-slate-400 rounded-full">
          <a href="https://www.linkedin.com/in/longjichen/">
            <img src={LinkedIn} alt="Linkedin"></img>
          </a>
        </li>
      </ul>
    </div>
  );
}
