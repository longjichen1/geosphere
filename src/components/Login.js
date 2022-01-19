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
        setSignUpError(true);
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

      {password && password.length < 6 ? (
        <p className="text-red-600 text-center xl:text-2xl sm:text-md">
          Password must be at least 6 characters in length!
        </p>
      ) : (
        <p className="text-red-600 transform duration-500 opacity-100 text-center w-5/6 m-auto xl:text-2xl sm:text-md">
          Invalid Email/Password Combination. Please try again!
        </p>
      )}
    </>
  );

  const signUpErrorPassword = (
    <>
      {confirmPW.length >= 6 ? (
        <p className="text-red-600 text-center xl:text-2xl sm:text-md">
          Email already in use!
        </p>
      ) : (
        <p className="text-red-600 text-center xl:text-2xl sm:text-md">
          Password must be at least 6 characters in length!
        </p>
      )}
    </>
  );
  const signUpErrorElement = (
    <>
      <br />

      {!(confirmPW === password) ? (
        <p className="text-red-600 text-center xl:text-2xl sm:text-md">
          Passwords do not match!
        </p>
      ) : (
        <>
          {password.length >= 6 ? (
            <p className="text-red-600 text-center xl:text-2xl sm:text-md">
              Email already in use!
            </p>
          ) : (
            <p className="text-red-600 text-center xl:text-2xl sm:text-lg">
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
        className={`invalid:text-red-600 sm:p-3 w-3/4 sm:text-md required invalid:border-red-600 text-black xl:text-3xl xl:p-6 border-4 border-none rounded-3xl m-auto block`}
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
        className={`text-black xl:text-3xl xl:p-6 sm:text-md sm:p-3 w-3/4 border-4 border-none rounded-3xl m-auto block`}
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
      className={`border-white border-4 absolute m-auto left-0 right-0 xl:w-[70%] xl:h-[70%] sm:w-[50%] sm:text-sm sm:h-[70%] lg:w-[50%] lg:h-[90%]  ${
        loginBox && blur ? "opacity-100" : "opacity-0 scale-0"
      } top-0 bottom-0 rounded-3xl z-40 transform duration-300 bg-slate-800 bg-opacity-80 text-3xl`}
    >
      <div
        id="login"
        className={`absolute xl:top-0 m-auto xl:bottom-0 left-8 sm:-left-0 sm:block overflow-hidden inline-block xl:text-3xl lg:text-xl md:text-sm xl:h-[90%] xl:w-[45%] rounded-3xl sm:w-[100%] sm:h-[45%]  border-blue-600 border-4`}
      >
        <h1
          className={`text-white text-center bg-blue-900 p-4 sm:p-2 z-38 border-blue-600 border-b-4 `}
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
        className={`absolute sm:top-[46%] sm:-bottom-0 sm:block sm:-right-0 sm:w-full inline-block xl:text-3xl lg:text-xl md:text-sm m-auto xl:top-0 xl:bottom-0 overflow-hidden sm:h-[55%] xl:h-[90%] xl:w-[45%] border-4 border-red-400 rounded-3xl right-8`}
      >
        <h1
          className={`text-white text-center bg-orange-700 sm:p-2  p-4 z-38 border-red-400 border-b-4 `}
        >
          Sign Up
        </h1>
        {inputForm}
        <br />
        <input
          type="password"
          className={`text-black xl:text-3xl sm:p-3 w-3/4 sm:text-md xl:p-6 border-4 border-none rounded-3xl m-auto block`}
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
