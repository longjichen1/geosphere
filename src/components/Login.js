import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase-config";
export default function Login({
  blur,
  setBlur,
  loggedIn,
  setLoggedIn,
  loginBox,
  setLoginBox,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      setLoggedIn(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };
  const inputForm = (
    <>
      <br />
      <input
        type="email"
        className={`text-black text-3xl p-6 border-4 border-none rounded-3xl m-auto block`}
        placeholder="Email..."
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <br />
      <input
        type="password"
        className={`text-black text-3xl p-6 border-4 border-none rounded-3xl m-auto block`}
        placeholder="Password..."
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
    </>
  );
  const loginElement = (
    <div
      className={`border-white border-4 absolute m-auto left-0 right-0 w-[78rem] ${
        loginBox && blur ? "opacity-100" : "opacity-0 scale-0"
      } top-0 bottom-0 h-[45rem] rounded-3xl z-40 transform duration-300 bg-slate-800 bg-opacity-80 text-3xl`}
    >
      <div
        id="login"
        className={`absolute top-0 m-auto bottom-0 left-8 overflow-hidden inline-block  h-[38rem] w-[35rem] rounded-3xl border-blue-600 border-4`}
      >
        <h1
          className={`text-white text-center bg-blue-900 p-4 z-38 border-blue-600 border-b-4 `}
        >
          Login
        </h1>
        {inputForm}
        <br />
        <div className="text-center">
          <button
            className="bg-green-300 
          
    text-lg
    text-black
    h-auto 
    w-max 
    transition
    transform
    duration-700
    hover:scale-110
    text-center 
    font-rob 
    pt-2
    pb-2
    px-4
    rounded-lg
    focus:outline-none
    active:opacity-75"
            onClick={login}
          >
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
      <div
        id="signup"
        className={`absolute inline-block m-auto top-0 bottom-0 overflow-hidden h-[38rem] border-4 border-red-400 rounded-3xl w-[35rem] right-8`}
      >
        <h1
          className={`text-white text-center bg-orange-700 p-4 z-38 border-red-400 border-b-4 `}
        >
          Sign Up
        </h1>
        {inputForm}
        <br />
        <input
          type="password"
          className={`text-black text-3xl p-6 border-4 border-none rounded-3xl m-auto block`}
          placeholder="Confirm Password..."
          onChange={(event) => {
            setConfirmPW(event.target.value);
          }}
        />
        <br />
        <div className="text-center">
          <button
            className="bg-green-300 
          
    text-lg
    text-black
    h-auto 
    w-max 
    transition
    transform
    duration-700
    hover:scale-110
    text-center 
    font-rob 
    pt-2
    pb-2
    px-4
    rounded-lg
    focus:outline-none
    active:opacity-75"
            onClick={register}
          >
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  return loginElement;
}
