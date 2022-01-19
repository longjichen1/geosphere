import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, firestore } from "../firebase-config";
export default function Welcome({
  blur,
  setBlur,
  loggedIn,
  setLoggedIn,
  photoData,
  setPhotoData,
  user,
}) {
  const [like, setLike] = useState(false);
  const [started, setStarted] = useState(false);
  const [started2, setStarted2] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [first, toggleFirst] = useState(true);
  const generateRandomDate = () => {
    const year = Math.floor(Math.random() * 18) + 1;
    const date = Math.floor(Math.random() * 27) + 1;
    const month = Math.floor(Math.random() * 11) + 1;
    const link = `20${year > 9 ? year : `0${year}`}-${
      month > 9 ? month : `0${month}`
    }-${date > 9 ? date : `0${date}`}`;
    return link;
  };
  useEffect(() => {
    fetchPhoto(`&date=${generateRandomDate()}`);
  }, []);
  async function fetchPhoto(link) {
    const result = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=E7O3bEYfrE32xI20de2cTgogKrwLH01sy0WdtGtn${link}`
    );
    setPhotoData(await result.json());
  }

  const handleStarted = () => {
    setStarted(true);
    setTimeout(function () {
      setStarted2(true);
    }, 700);
    setTimeout(function () {
      setExpanded(true);
    }, 400);
  };

  const startButton = (
    <>
      <div
        className={` ${blur ? "blur-sm" : ""} max-w-[30%] xl:max-w-[25%] ${
          started ? "scale-0 duration-500" : "duration-700"
        } ${
          started2 ? "absolute" : ""
        } absolute top-[45%] left-0 right-0 hover:bg-opacity-0 hover:bg-slate-600 hover:text-orange-800 hover:delay-200 bg-slate-800 bg-opacity-70  group m-auto outline rounded-full outline-8 outline-white p-4 text-center`}
      >
        <h1
          onClick={() => handleStarted()}
          className="p-3 xl:text-5xl sm:text-xl md:text-3xl lg:text-4xl h-max w-max mx-auto text-center pt-1/2 text-7xl text-white uppercase font-semibold hover:text-transparent bg-clip-text bg-gradient-to-r duration-300 from-blue-400 to-orange-600"
        >
          Get started
        </h1>
      </div>
    </>
  );
  const changePhoto = () => {
    if (!blur) {
      toggleFirst(false);
      setTimeout(toggleFirst(true), 2000);

      setLike(false);
      setTimeout(function () {
        fetchPhoto(`&date=${generateRandomDate()}`);
      }, 600);
    }
  };

  const addPhoto = () => {
    if (loggedIn) {
      if (like) {
        setLike(false);
        console.log("delete");
        deleteDoc(doc(firestore, `users/${user.uid}/likes`, photoData.date));
      } else {
        const ref = setDoc(
          doc(firestore, `users/${user.uid}/likes`, photoData.date),
          {
            photoTitle: photoData.title,
            photoDate: photoData.date,
            photoImage: photoData.url,
            photoDescription: photoData.explanation,
          }
        );
        setLike(true);
      }
    } else {
      alert("Sign in to like and save your images!");
    }
  };

  const explanation = (
    <>
      <div
        className={`max-h-[25rem]  overflow-x-hidden scrollbar-hide overflow-y-scroll `}
      >
        {photoData ? (
          <p className="w-[80%] inline-block text-center duration-1000 text-2xl  transform">
            {photoData.explanation}
          </p>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );

  const scrollArrow = (
    <div className="max-h-[25rem] m-4 overflow-hidden inline-block text-center animate-bounce bg-gradient-to-r bg-clip-text from-blue-500 to-red-500 duration-200 transform">
      <p className="text-sm">Scroll</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-3 w-3 stroke-rose-300 m-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="none"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
        />
      </svg>
    </div>
  );
  return (
    <>
      {startButton}
      <div
        className={`mt-[150px] max-w-[75%] h-[50%] rounded-[48px] ${
          blur ? "blur-sm delay-[0ms]" : ""
        }  text-white duration-1000 relative ${
          started ? "p-72  scale-100 " : " p-0 scale-0"
        } ${
          started && blur ? "delay-[0ms]" : " delay-[800ms] duration-500"
        }  bg-slate-800 bg-opacity-90 mx-auto text-3xl transformation scale-0  text-center  ${
          expanded
            ? " scale-100  transform duration-[2200]"
            : "p-4 duration-500 origin-center"
        } border-8 border-orange-400 absolute overflow-x-hidden`}
      >
        <div
          style={{
            backgroundImage: `url('${photoData.url}')`,
          }}
          className={`${
            blur ? "blur-sm" : ""
          } left-[2%] w-[40%] h-[90%] rounded-t-[50px] bg-auto ${
            first ? "delay-75" : "opacity-100 delay-300"
          } transform duration-1000 absolute  top-2 left-4 block border-8  overflow-x-hidden border-slate-800`}
        >
          {/* <img style={{borderRadius:"48px"}} className={`${first?'opacity-0 delay-200':'opacity-100 delay-500'} transform duration-1000 h-full w-full flex-shrink-0 flex`} src={photoData? photoData.url: ''} alt="" /> */}
        </div>
        <div
          className={`${
            blur ? "blur-sm" : ""
          } bg-black bg-opacity-40 transform duration-500 absolute rounded-b-[50px] h-[10%] w-[40%] left-4 hover:bg-opacity-60 bottom-0 block border-b-8 border-r-8 border-t-4 border-l-8  border-slate-800`}
        >
          <button
            onClick={() => addPhoto(photoData)}
            className={`hover:fill-pink-400  p-1`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class={`h-10 w-10 text-center ${
                like
                  ? "border-red-600 fill-red-600"
                  : "border-white fill-white hover:fill-red-400 "
              } hover:border-pink-400 p-1 animate-pulse`}
              viewBox="0 0 24 24"
              stroke="none"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button
            onClick={changePhoto}
            className="absolute right-5 bottom-0 top-0 animate-pulse "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 hover:stroke-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <div
          className={`absolute top-4 text-center right-0 w-[60%] overflow-x-hidden ${
            !first
              ? " opacity-0 duration-700"
              : "opacity-100 delay-700 duration-700"
          } transform`}
        >
          {photoData ? (
            <p className="text-center text-3xl duration-1000 transform">
              {photoData.title}
            </p>
          ) : (
            <p></p>
          )}

          {photoData ? (
            <p className="inline-block text-center  text-sm duration-1000 transform">
              {photoData.date}
            </p>
          ) : (
            <p></p>
          )}
          <br />
          {explanation}
          {photoData && photoData.explanation.length > 840 ? (
            scrollArrow
          ) : (
            <div></div>
          )}
        </div>

        <br />
      </div>
    </>
  );
}
