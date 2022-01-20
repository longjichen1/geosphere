import { FirebaseError } from "firebase/app";
import React, { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDocs,
  query,
} from "firebase/firestore";
import { auth, firestore } from "../firebase-config";
import { applyActionCode } from "firebase/auth";

export default function Gallery({
  blur,
  gallery,
  setGallery,
  user,
  state,
  like,
  d, 
  setD,
  a,
  setA,
  photoData,
  setLike
}) {
  
  const fetchPosts = async () => {
    state.pptd = [];
    const post = getDocs(collection(firestore, `users/${user.uid}/likes`));
    const profiles = query(collection(firestore, `users/${user.uid}/likes`));
    const querySnapshot = await getDocs(profiles);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      if (doc.data() in state.pptd){

      }else{
        state.pptd.push(doc.data());
      }
    });
  };

  useEffect(() => {
    state.pptd = []
    if (!gallery && state.remove.length > 0){
      for (let date of state.remove){
        deleteDoc(doc(firestore, `users/${user.uid}/likes`, date));
        console.log(date)
      }
      state.remove = []
    }
    fetchPosts();
  }, [user, blur, like, gallery]);

  function arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
  }

  function handleRemove(profile){
    if (!(state.remove.includes(profile))){
      state.remove.push(profile);
      console.log(photoData.date);
      console.log(profile);
      if (photoData.date == profile){
        setLike(false);
      }
    }else{
      state.remove = arrayRemove(state.remove, profile);
      if (photoData.date == profile){
        setLike(true);
      }
    }
    if (d){
      setD(false);
    }else{
      setD(true);
    }
    if (a){
      setA(false);
    }else{
      setA(true);
    }
  }
  
  
  return (
    <>
      <div
        className={`border-white border-4 absolute m-auto left-0 right-0 w-[78rem] lg:w-[50%] xl:w-[60%] md:w-[40%] ${
          gallery && blur ? "opacity-100" : "opacity-0 scale-0"
        } top-0 bottom-0 h-[45rem] overflow-y-scroll scrollbar-hide p-4 rounded-3xl z-40 transform duration-300 bg-slate-800 bg-opacity-80 text-3xl`}
      >
        {gallery && state.pptd.length>0? (
          state.pptd.map((profile, i) => (
            <div
              key={`${profile.photoDate}${i}`}
              className="z-40 w-[90%] mx-auto border-white  scrollbar-hide border-4 rounded-xl mt-3"
            >
              <p className="text-white text-center xl:text-3xl lg:text-xl md:text-md sm:text-sm">
                {profile.photoTitle}
              </p>
              <p className="text-white text-center xl:text-xl lg:text-md md:text-sm sm:text-[10px]">
                {profile.photoDate}
              </p>

              <img
                className="text-center mx-auto max-h-56 "
                src={profile.photoImage}
                alt=""
              />
              <div className="text-center">
              <button
            onClick={() => {handleRemove(profile.photoDate)}}
            className={`hover:fill-pink-400  p-1`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class={`h-10 w-10 text-center ${
                (!((d||a)&&state.remove.includes(profile.photoDate)) )
                  ? "border-red-600 fill-red-600"
                  : "border-white fill-white hover:fill-red-200 "
              } hover:border-pink-400 p-1 `}
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
              </div>
              <div className="max-h-52 mt-2 overflow-y-scroll scrollbar-hide fade  ">
                <p className="text-white xl:text-xl max-h-[20%] xl:pb-8 md:pb-4 lg:text-md md:text-sm sm:text-[10px] max-w-[90%] mx-auto text-center mt-2 mb-2 text-sm">
                  {profile.photoDescription}
                </p>
              </div>
              {/* <h1 className=" absolute -bottom-5 w-full bg-gradient-to-b from-inherit to-black h-[10%]">
                HELLO
              </h1> */}
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
