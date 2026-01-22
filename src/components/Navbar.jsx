import React, { use, useContext } from "react";
import Mylink from "./Mylink";
import { AuthContext } from "../Context/Authcontext";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../Firebase/firebase.config";
import { DotLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { ToastBar } from "react-hot-toast";

const Navbar = () => {
  const { info, setInfo, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignOut = () => {
    console.log("signout clicked")
    signOut(auth)
      .then(() => {
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
      <li> <Mylink to="/" className="px-4 py-5 text-[#1B3C53] rounded-lg hover:bg-[#E3E3E3] transition-colors">Home</Mylink></li>
      <li> <Mylink to="/profile" className="px-4 py-5 text-[#1B3C53] rounded-lg hover:bg-[#E3E3E3] transition-colors">My Profile</Mylink></li>
      <li> <Mylink to="/all-skills" className="px-4 py-5 text-[#1B3C53] rounded-lg hover:bg-[#E3E3E3] transition-colors">All Skills</Mylink></li>
      <li> <Mylink to="/about-us" className="px-4 py-5 text-[#1B3C53] rounded-lg hover:bg-[#E3E3E3] transition-colors">About Us</Mylink></li>
      <li> <Mylink to="/contract" className="px-4 py-5 text-[#1B3C53] rounded-lg hover:bg-[#E3E3E3] transition-colors">Contact</Mylink></li>
    </>
  );

  return (
    
      <div className="navbar bg-white shadow-md shadow-gray-200 w-full sticky top-0 z-50 px-4 md:px-8 lg:px-16">


        <div className="navbar-start">


          <div className="dropdown">
            <div className="flex justify-center items-center">
              <img className="h-12 w-12 mr-2" src="/logo.png" alt="" />
              <h2 className="font-bold text-2xl md:text-3xl text-[#1B3C53]">SkillSwap</h2>
            </div>
            <ul
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow cursor-pointer lg:hidden"
            >
              {menuItems}
            </ul>
          </div>

        </div>



        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">{menuItems}</ul>
        </div>



        <div className="navbar-end">
          {loading ? (
            <DotLoader size={24} color="#1B3C53" />
          ) : info ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring-2 ring-[#234C6A] ring-offset-2" >
                  <img
                    alt="user avatar"
                    src={info?.photoURL}
                    title={info?.displayName || "User"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-10 p-2 shadow menu menu-sm dropdown-content bg-base-100 w-36 rounded-box"
              >
                <li>
                  <button onClick={handleSignOut} className="btn btn-sm mt-1 cursor-pointer bg-[#BF124D] text-white hover:bg-[#a01040]">Log Out</button>
                </li>
              </ul>
            </div>
          ) : (
            <Mylink to="/signin" className="btn bg-[#1B3C53] text-white hover:bg-[#234C6A] border-none px-6">Login</Mylink>
          )}
        </div>
      </div>

   
  );
};

export default Navbar;