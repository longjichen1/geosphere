import React from "react";
import earthLogo from "../images/earth-logo.png"
function Nav() {
  return(
    <nav className = "flex items-center justify-between flex-wrap bg-slate-900 p-4">
         <div className="flex items-center flex-shrink-0 text-white mr-6">
    <img className = "p-0"src={earthLogo} style={{maxWidth: 70, margin:0}}></img>
    <span className="font-semibold text-xl tracking-tight pl-2">GeoSphere</span>
  </div>
    </nav>
  )
}

export default Nav;