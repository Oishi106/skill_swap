import React, { useContext, useEffect, useState } from "react";
import Mycontainer from "../components/Mycontainer";
import { AuthContext } from "../Context/Authcontext";
import { auth } from "../Firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import bg from "../assets/beautifulbg.png"; 
import { DotLoader } from "react-spinners";
import { useNavigate } from "react-router";

const Profile = () => {
  const { info, setInfo } = useContext(AuthContext);
  const [name, setName] = useState(info?.displayName || "");
  const [photoURL, setPhotoURL] = useState(info?.photoURL || "");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (info==null) navigate("/signin");
  }, [info, navigate]);
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    setSaving(true);

    updateProfile(auth.currentUser, {
      displayName: name.trim(),
      photoURL: photoURL?.trim() || null,
    })
      .then(() => {
        setInfo({
          ...info,
          displayName: name.trim(),
          photoURL: photoURL?.trim() || null,
        });
        toast.success("Profile updated ✅");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Update failed. Try again.");
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">

      <img
        src={bg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30" />

      <div className="relative z-0 py-16">
        <Mycontainer className="max-w-xl">
          <div className="card bg-white/10 border border-white/20 text-white shadow-2xl backdrop-blur-lg">
            <div className="card-body items-center text-center">
  
              <div className="avatar">
                <div className="w-28 h-28 rounded-full ring ring-sky-400 ring-offset-base-100 ring-offset-2 overflow-hidden">
                  <img
                    src={photoURL || info?.photoURL || "/placeholder-user.png"}
                    alt="Profile"
                  />
                </div>
              </div>

              <h1 className="mt-4 text-3xl font-bold">
                {info?.displayName || "User"}
              </h1>
              <p className="text-sm opacity-80">{info?.email}</p>

              <div className="divider my-6 text-gray-300">Update Profile</div>

              <form onSubmit={handleUpdate} className="w-full space-y-4 p-3">
                <label className="form-control w-full">
                  <span className="label-text text-white/80">Display Name</span>
                  <input
                    type="text"
                    className="input input-bordered w-full bg-white/20 placeholder-white/60 text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter new name"
                  />
                </label>

                <label className="form-control w-full">
                  <span className="label-text text-white/80">Photo URL</span>
                  <input
                    type="text"
                    className="input input-bordered w-full bg-white/20 placeholder-white/60 text-white"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    placeholder="Enter image link"
                  />
                </label>

                <button
                  type="submit"
                  className={`btn btn-primary w-full mt-3 ${
                    saving ? "btn-disabled" : ""
                  }`}
                >
                  {saving ? (
                   <DotLoader size={24} />
                  ) : (
                    "Update"
                  )}
                </button>
              </form>
            </div>
          </div>
        </Mycontainer>
      </div>
    </div>
  );
};

export default Profile;
