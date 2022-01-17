// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD81xIO0SLEtVSAxUM0WMsUs_vLvN8diCk",
  authDomain: "fir-11957.firebaseapp.com",
  projectId: "fir-11957",
  storageBucket: "fir-11957.appspot.com",
  messagingSenderId: "862011470279",
  appId: "1:862011470279:web:6d602a6ec0d5a6a11669e2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
