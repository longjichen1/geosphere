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
var pptd = [];
export default function Gallery({ blur, gallery, setGallery, user }) {
  const fetchPosts = async () => {
    const post = getDocs(collection(firestore, `users/${user.uid}/likes`));
    const profiles = query(collection(firestore, `users/${user.uid}/likes`));
    const querySnapshot = await getDocs(profiles);
    querySnapshot.forEach((doc) => {
      console.log(typeof doc.data());
      const d = doc.data().phototitle;
      pptd.push(doc.data());
    });
  };

  useEffect(() => {
    console.log(pptd.length);
    fetchPosts();

    console.log(Object.keys(pptd).length);
  }, [gallery]);
  return (
    <>
      {/* {pptd.map((profile, i) => (
        <div key={`${i}`}>
          <p>HELLO{profile}</p>
        </div>
      ))} */}
      <div
        className={`border-white border-4 absolute m-auto left-0 right-0 w-[78rem] lg:w-[50%] xl:w-[60%] md:w-[40%] ${
          gallery && blur ? "opacity-100" : "opacity-0 scale-0"
        } top-0 bottom-0 h-[45rem] rounded-3xl z-40 transform duration-300 bg-slate-800 bg-opacity-80 text-3xl`}
      ></div>
    </>
  );
}
