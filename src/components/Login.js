import React, { useEffect, useState } from "react";
import Button from "./Button";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, firestore } from "../firebase-config";

export default function Login({
  blur,
  setBlur,
  loggedIn,
  setLoggedIn,
  loginBox,
  setLoginBox,
  photoData,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const register = async () => {
    if (confirmPW === password) {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setLoggedIn(true);
        setTimeout(setSignUpError(false), 1000);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setSignUpError(true);
    }
  };

  const login = async () => {
    setTimeout(setLoginError(false), 1000);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);

      setLoginError(true);
    }
  };
  const loginErrorElement = (
    <>
      <br />
      <p className="text-red-600 transform duration-500 opacity-100 text-center w-5/6 m-auto text-2xl">
        Invalid Email/Password Combination. Please try again!
      </p>
    </>
  );

  const signUpErrorPassword = (
    <>
      {confirmPW.length >= 8 ? (
        <p className="text-red-600 text-center text-3xl">
          Email already in use!
        </p>
      ) : (
        <p className="text-red-600 text-center text-3xl">
          Password must be at least 8 characters in length!
        </p>
      )}
    </>
  );
  const signUpErrorElement = (
    <>
      <br />

      {!(confirmPW === password) ? (
        <p className="text-red-600 text-center text-2xl">
          Passwords do not match!
        </p>
      ) : (
        <>
          {password.length >= 8 ? (
            <p className="text-red-600 text-center text-2xl">
              Email already in use!
            </p>
          ) : (
            <p className="text-red-600 text-center text-2xl">
              Password must be at least 6 characters in length!
            </p>
          )}
        </>
      )}
    </>
  );

  const inputForm = (
    <>
      <br />
      <input
        type="email"
        className={`invalid:text-red-600 md:text-xl md:p-2 required invalid:border-red-600 text-black text-3xl p-6 border-4 border-none rounded-3xl m-auto block`}
        placeholder="Email..."
        onChange={(event) => {
          setSignUpError(false);
          setLoginError(false);
          setEmail(event.target.value);
        }}
      />
      <br />
      <input
        type="password"
        className={`text-black text-3xl md:text-xl p-6 md:p-2 border-4 border-none rounded-3xl m-auto block`}
        placeholder="Password..."
        onChange={(event) => {
          setSignUpError(false);
          setLoginError(false);
          setPassword(event.target.value);
        }}
      />
    </>
  );
  const loginElement = (
    <div
      className={`border-white border-4 absolute m-auto left-0 right-0 w-[78rem] z-20 ${
        loginBox && blur ? "opacity-100" : "opacity-0 scale-0"
      } top-0 bottom-0 h-[45rem] rounded-3xl z-20 transform duration-300 md:w-[70%] sm:w-[40%] sm:h-[50%] md:h-[70%] lg:w-[80$] bg-slate-800 bg-opacity-80 text-3xl`}
    >
      <div
        id="login"
        className={`absolute top-0 md:w-[45%] md:h-[80%] m-auto bottom-0 left-8 overflow-hidden inline-block  h-[38rem] w-[35rem] rounded-3xl border-blue-600 border-4`}
      >
        <h1
          className={`text-white text-center bg-blue-900 p-4 z-38 border-blue-600 border-b-4 `}
        >
          Login
        </h1>
        {inputForm}
        <br />
        <div className="text-center">
          <Button func={login} />
        </div>
        {loginError ? loginErrorElement : <p></p>}
      </div>
      <div
        id="signup"
        className={`absolute md:w-[45%] md:h-[80%] inline-block m-auto top-0 bottom-0 overflow-hidden h-[38rem] border-4 border-red-400 rounded-3xl w-[35rem] right-8`}
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
          className={`text-black md:text-xl md:p-2 text-3xl p-6 border-4 border-none rounded-3xl m-auto block`}
          placeholder="Confirm Password..."
          onChange={(event) => {
            setSignUpError(false);
            setLoginError(false);
            setConfirmPW(event.target.value);
          }}
        />
        <br />
        <div className="text-center">
          <Button func={register} />
        </div>
        {signUpError ? signUpErrorElement : <div></div>}
      </div>
    </div>
  );

  return loginElement;
}
