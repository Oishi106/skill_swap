import React, { use, useContext } from "react";
import Mylink from "./Mylink";
import { AuthContext } from "../Context/Authcontext";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../Firebase/firebase.config";
import { DotLoader } from "react-spinners";
import logo from "../assets/logo.png"
import { useNavigate } from "react-router";
import { ToastBar } from "react-hot-toast";

const Navbar = () => {
  const { info, setInfo, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignOut =  () => {
    console.log("signout clicked")
       signOut(auth)
       .then(()=>{
         setInfo(null);
         ToastBar("✅ Signed out successfully");
         navigate("/signin");
       })
       .catch((e) => {
         ToastBar("Could not sign out. Try again.");
            });
            console.log("signout clicked")
  };

  const menuItems = (
    <>
     <li> <Mylink to="/" className="p-2 rounded-xl">Home</Mylink></li>
     <li> <Mylink to="/profile" className="p-2 rounded-xl">My Profile</Mylink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
 
 
      <div className="navbar-start">
  
  
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow cursor-pointer"
          >
            {menuItems}
          </ul>
        </div>
        <img className="h-14 w-14" src={logo} alt="Logo" />
      </div>



      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>

  
  
      <div className="navbar-end">
        {loading ? (
          <DotLoader size={24} />
        ) : info ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full" >
                <img
                  alt="user avatar"
                  src={info?.photoURL}
                  title={info?.displayName || "User"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-10 p-2 shadow menu menu-sm dropdown-content bg-base-100  w-30 rounded-box"
            >
              <li>
                <button onClick={handleSignOut} className="btn btn-sm mt-1 cursor-pointer text-blue-600">Log Out</button>
              </li>
            </ul>
          </div>
        ) : (
          <Mylink to="/signin" className="btn">Login</Mylink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
