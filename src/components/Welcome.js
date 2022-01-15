import React, { useState, useEffect } from "react";

export default function Welcome({
  photoData,
  setPhotoData,
  blur,
  setBlur,
  blurIcon,
  setBlurIcon,
  loggedIn,
  setLoggedIn,
}) {
  const [started, setStarted] = useState(false);
  const [started2, setStarted2] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [first, toggleFirst] = useState(false);
  const generateRandomDate = () => {
    const year = Math.floor(Math.random() * 18) + 1;
    const date = Math.floor(Math.random() * 27) + 1;
    const month = Math.floor(Math.random() * 11) + 1;
    const link = `20${year > 9 ? year : `0${year}`}-${
      month > 9 ? month : `0${month}`
    }-${date > 9 ? date : `0${date}`}`;
    return link;
  };
  let dt = `&date=${generateRandomDate()}`;
  var dat = 0;
  function fetchPhoto(link) {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=E7O3bEYfrE32xI20de2cTgogKrwLH01sy0WdtGtn${link}`
    )
      .then((response) => response.json())
      .then((data) => setPhotoData(data));
  }
  useEffect(() => {
    fetchPhoto(dt);
  }, [dat]);
  if (!photoData) {
    fetchPhoto("");
    dat++;
    console.log(dat);
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
        style={{ maxWidth: "30%", marginTop: "19%" }}
        className={` ${blur ? "blur-sm" : ""}  ${
          started ? "scale-0 duration-500" : "duration-700"
        } ${
          started2 ? "absolute" : ""
        } hover:bg-opacity-0 hover:bg-slate-600 hover:text-orange-800 hover:delay-200 bg-slate-800 bg-opacity-70  group m-auto outline rounded-full outline-8 outline-white p-4 text-center`}
      >
        <h1
          onClick={() => handleStarted()}
          className="p-3 h-max w-max mx-auto text-center pt-1/2 text-7xl text-white uppercase font-semibold hover:text-transparent bg-clip-text bg-gradient-to-r duration-300 from-blue-400 to-orange-600"
        >
          Get started
        </h1>
      </div>
    </>
  );
  const changePhoto = () => {
    if (!blur) {
      if (first === true) {
        toggleFirst(false);
      } else {
        toggleFirst(true);
      }
      setTimeout(function () {
        fetchPhoto(`&date=${generateRandomDate()}`);
      }, 600);
    }
  };
  console.log(photoData);
  return (
    <>
      {startButton}
      <div
        style={{
          marginTop: "8%",
          maxWidth: "75%",
          height: "50%",
          borderTopLeftRadius: "48px",
          borderBottomLeftRadius: "48px",
          borderTopRightRadius: "108px",
        }}
        className={`${
          blur ? "blur-sm delay-[0ms]" : ""
        }  text-white duration-1000 relative ${
          started ? "p-72  scale-100 " : " p-0 scale-0"
        } ${
          started && blur ? "delay-[0ms]" : " delay-[800ms] duration-500"
        }  bg-slate-800 bg-opacity-90 mx-auto text-3xl transformation scale-0  text-center  ${
          expanded
            ? " scale-100  transform duration-[2200]"
            : "p-4 duration-500 origin-center"
        } border-8 border-orange-400 `}
      >
        <div
          style={{
            borderRadius: "50px",
            height: "94%",
            width: "40%",
            top: "3%",
            left: "1%",
            backgroundImage: `url('${photoData.url}')`,
            backgroundSize: "cover",
          }}
          className={`${blur ? "blur-sm" : ""} absolute ${
            first ? " delay-75" : "opacity-100 delay-300"
          } transform top-2 left-4 block border-4 border-white`}
        >
          {/* <img style={{borderRadius:"48px"}} className={`${!first?'opacity-0 delay-200':'opacity-100 delay-500'} transform duration-1000 h-full w-full flex-shrink-0 flex`} src={photoData? photoData.url: ''} alt="" /> */}
        </div>
        <div
          style={{
            borderRadius: "50px",
            height: "94%",
            width: "40%",
            top: "3%",
            left: "1%",
            backgroundImage: `url('${photoData.url}')`,
            backgroundSize: "cover",
          }}
          className={`${blur ? "blur-sm" : ""} ${
            first ? "delay-75" : "opacity-100 delay-300"
          } transform duration-1000 absolute  top-2 left-4 block border-4 border-white`}
        >
          {/* <img style={{borderRadius:"48px"}} className={`${first?'opacity-0 delay-200':'opacity-100 delay-500'} transform duration-1000 h-full w-full flex-shrink-0 flex`} src={photoData? photoData.url: ''} alt="" /> */}
          <button className={`absolute bottom-8 left-8`}>👍</button>
        </div>
        <div
          style={{ width: "60%" }}
          className={`absolute top-4 right-0 ${
            !first
              ? " opacity-0 duration-700"
              : "opacity-100 delay-700 duration-700"
          } transform`}
        >
          {photoData ? (
            <p className="text-center  duration-1000 transform">
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
          {photoData ? (
            <p
              style={{ maxWidth: "80%", fontSize: "16px" }}
              className="inline-block text-center duration-1000 transform"
            >
              {photoData.explanation}
            </p>
          ) : (
            <p></p>
          )}
        </div>
        <div
          style={{ width: "60%" }}
          className={`absolute top-4 right-0 ${
            first
              ? "opacity-0 duration-700"
              : "opacity-100 delay-700 duration-700"
          } transform `}
        >
          {photoData ? (
            <p className="text-center  duration-1000 transform">
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
          {photoData ? (
            <p
              style={{ maxWidth: "80%", fontSize: "16px" }}
              className="inline-block text-center duration-1000 transform"
            >
              {photoData.explanation}
            </p>
          ) : (
            <p></p>
          )}
        </div>
        <br />
        <button
          className="absolute bottom-4 right-4"
          onClick={() => changePhoto()}
        >
          Next Image
        </button>
      </div>
    </>
  );
}
