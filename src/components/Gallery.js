import React, { useEffect, useState } from "react";

export default function Gallery({ blur, gallery, setGallery }) {
  return (
    <div
      className={`border-white border-4 absolute m-auto left-0 right-0 w-[78rem] ${
        gallery && blur ? "opacity-100" : "opacity-0 scale-0"
      } top-0 bottom-0 h-[45rem] rounded-3xl z-40 transform duration-300 bg-slate-800 bg-opacity-80 text-3xl`}
    ></div>
  );
}
