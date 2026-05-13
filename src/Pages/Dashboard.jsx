import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../Context/Authcontext";
import { updateProfile, signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { toast } from "react-toastify";
import useData from "../hooks/useData";
import { Link, useLocation, useNavigate } from "react-router";

import {
  getBookingsListForUser,
  getSavedSkillsListForUser,
  removeBookingForUser,
  removeSavedSkillForUser,
  getMySkillsList,
  addMySkill,
  removeMySkill,
} from "../utils/skillStorage";

import {
  FaBookmark,
  FaCalendarCheck,
  FaGraduationCap,
  FaChartLine,
  FaHome,
  FaCog,
  FaPlusCircle,
  FaBars,
  FaTrash,
  FaSignOutAlt,
  FaUser,
  FaBell,
  FaLock,
} from "react-icons/fa";

const Dashboard = () => {
  const { info, setInfo } = useContext(AuthContext);
  const { skill } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [savedSkills, setSavedSkills] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [saving, setSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [removingSavedId, setRemovingSavedId] = useState(null);
  
  // Add Skill Form State
  const [skillForm, setSkillForm] = useState({
    skillName: "",
    category: "",
    price: "",
    description: "",
    image: "",
    slotsAvailable: "",
  });
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [mySkills, setMySkills] = useState([]);

  useEffect(() => {
    if (!info?.email) return;

    setName(info.displayName || "");
    setPhotoURL(info.photoURL || "");

    // এগুলোর ডিফল্ট ভ্যালু হিসেবে খালি অ্যারে [] রাখা নিরাপদ
    setSavedSkills(getSavedSkillsListForUser(info.email) || []);
    setBookings(getBookingsListForUser(info.email) || []);
    setMySkills(getMySkillsList(info.email) || []);
  }, [info]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    setSaving(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });

      setInfo({
        ...info,
        displayName: name,
        photoURL,
      });

      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveBooking = (bookingId) => {
    setRemovingId(bookingId);
    try {
      removeBookingForUser(info.email, bookingId);
      const updated = getBookingsListForUser(info.email) || [];
      setBookings(updated);
      toast.success("Booking cancelled successfully!");
    } catch (err) {
      toast.error("Failed to cancel booking");
    } finally {
      setRemovingId(null);
    }
  };

  const handleRemoveSavedSkill = (skillId) => {
    setRemovingSavedId(skillId);
    try {
      removeSavedSkillForUser(info.email, skillId);
      const updated = getSavedSkillsListForUser(info.email) || [];
      setSavedSkills(updated);
      toast.success("Skill removed from saved!");
    } catch (err) {
      toast.error("Failed to remove skill");
    } finally {
      setRemovingSavedId(null);
    }
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    
    if (!skillForm.skillName || !skillForm.category || !skillForm.price || !skillForm.description || !skillForm.image || !skillForm.slotsAvailable) {
      toast.error("Please fill all fields");
      return;
    }

    setIsAddingSkill(true);
    try {
      const newSkill = addMySkill(info.email, {
        ...skillForm,
        price: Number(skillForm.price),
        slotsAvailable: Number(skillForm.slotsAvailable),
        providerName: info.displayName || "Anonymous",
      });

      setMySkills([...mySkills, newSkill]);
      setSkillForm({
        skillName: "",
        category: "",
        price: "",
        description: "",
        image: "",
        slotsAvailable: "",
      });

      toast.success("Skill published successfully!");
      
      // Trigger a storage event to notify other components
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('skillPublished'));
      }
    } catch (err) {
      toast.error("Failed to add skill");
    } finally {
      setIsAddingSkill(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setInfo(null);
      toast.success("Logged out successfully!");
      navigate("/signin");
    } catch (err) {
      toast.error("Failed to logout");
    }
  };

  if (!info) return null;

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "My Profile", path: "/my-profile", icon: <FaUser /> },
    { name: "All Skills", path: "/all-skills", icon: <FaGraduationCap /> },
    { name: "My Bookings", path: "/my-bookings", icon: <FaCalendarCheck /> },
    { name: "Saved Skills", path: "/saved-skills", icon: <FaBookmark /> },
    { name: "Add Skill", path: "/add-skill", icon: <FaPlusCircle /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 text-slate-800">
      {/* SIDEBAR */}
      <aside
        className={`fixed z-50 w-[280px] h-screen bg-[#0F172A] text-white transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-7 border-b border-white/10">
          <h1 className="text-3xl font-black tracking-tight text-cyan-400">SkillSwap</h1>
        </div>

        <div className="p-8 text-center border-b border-white/5">
          <img
            src={photoURL || "https://via.placeholder.com/150"}
            className="w-24 h-24 rounded-full mx-auto border-4 border-cyan-500/30 object-cover shadow-xl"
            alt="profile"
          />
          <h2 className="mt-4 text-xl font-bold truncate">{name || "User Name"}</h2>
          <p className="text-sm text-slate-400 truncate">{info?.email}</p>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-medium transition-all ${
                location.pathname === item.path
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                  : "hover:bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* LOGOUT BUTTON */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-[#0F172A]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 font-semibold px-5 py-4 rounded-2xl transition-all"
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-[280px] p-6 lg:p-10">
        <header className="flex justify-between items-center mb-8">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-2xl bg-white rounded-lg shadow-sm"
          >
            <FaBars />
          </button>
          <h2 className="text-2xl font-bold text-slate-800">
            {location.pathname === "/dashboard" && "Overview"}
            {location.pathname === "/my-profile" && "My Profile"}
            {location.pathname === "/profile" && "Profile Settings"}
            {location.pathname === "/my-bookings" && "My Bookings"}
            {location.pathname === "/saved-skills" && "Saved Skills"}
            {location.pathname === "/add-skill" && "Add Skill"}
            {location.pathname === "/settings" && "Settings"}
          </h2>
        </header>

        {/* DASHBOARD VIEW */}
        {location.pathname === "/dashboard" && (
          <>
            {/* STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Bookings", val: bookings.length, icon: <FaCalendarCheck className="text-blue-500" /> },
                { label: "Saved Skills", val: savedSkills.length, icon: <FaBookmark className="text-pink-500" /> },
                { label: "Account Status", val: "Active", icon: <FaGraduationCap className="text-green-500" /> },
                { label: "Skill Growth", val: "+24%", icon: <FaChartLine className="text-cyan-500" /> },
              ].map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                  <div className="text-2xl mb-4">{stat.icon}</div>
                  <p className="text-slate-500 font-medium text-sm">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.val}</h3>
                </div>
              ))}
            </div>

            {/* MY BOOKINGS SECTION - Dashboard View */}
            <div className="mt-10 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold mb-6 text-slate-800">Recent Bookings</h2>

              {bookings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-500">No bookings yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="text-left py-4 px-4 font-bold text-slate-700">Skill</th>
                        <th className="text-left py-4 px-4 font-bold text-slate-700">Provider</th>
                        <th className="text-left py-4 px-4 font-bold text-slate-700">Booked At</th>
                        <th className="text-center py-4 px-4 font-bold text-slate-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 3).map((booking) => (
                        <tr key={booking.bookingId} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4">
                            <p className="font-bold text-slate-900">{booking.skillName}</p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="font-semibold text-slate-900">{booking.providerName}</p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm text-slate-600">
                              {new Date(booking.bookedAt).toLocaleDateString()}
                            </p>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={() => handleRemoveBooking(booking.bookingId)}
                              disabled={removingId === booking.bookingId}
                              className="text-red-600 hover:text-red-800 font-semibold disabled:opacity-50"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* PROFILE VIEW */}
        {location.pathname === "/profile" && (
          <div className="mt-10 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 max-w-2xl">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Profile Settings</h2>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 ml-1">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all text-slate-900"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 ml-1">Photo URL</label>
              <input
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all text-slate-900"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <button 
              disabled={saving}
              className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {saving ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </div>
        )}

        {/* MY BOOKINGS VIEW */}
        {location.pathname === "/my-bookings" && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">My Bookings</h2>

            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <FaCalendarCheck className="text-6xl text-slate-200 mx-auto mb-4" />
                <p className="text-slate-500 text-lg">No bookings yet</p>
                <p className="text-slate-400 text-sm mt-2">Explore skills and book your first session</p>
                <Link 
                  to="/all-skills"
                  className="inline-block mt-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-8 py-3 rounded-2xl transition-all"
                >
                  Browse Skills
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-4 px-4 font-bold text-slate-700">Skill</th>
                      <th className="text-left py-4 px-4 font-bold text-slate-700">Provider</th>
                      <th className="text-left py-4 px-4 font-bold text-slate-700">Price</th>
                      <th className="text-left py-4 px-4 font-bold text-slate-700">Booked At</th>
                      <th className="text-center py-4 px-4 font-bold text-slate-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.bookingId} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <img 
                            src={booking.image} 
                            alt={booking.skillName}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-bold text-slate-900">{booking.skillName}</p>
                            <p className="text-xs text-slate-500">{booking.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-semibold text-slate-900">{booking.providerName}</p>
                        <p className="text-xs text-slate-500">{booking.providerEmail}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-bold text-cyan-600">${booking.price}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-slate-600">
                          {new Date(booking.bookedAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleRemoveBooking(booking.bookingId)}
                          disabled={removingId === booking.bookingId}
                          className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-xl transition-all disabled:opacity-50"
                        >
                          <FaTrash className="text-sm" />
                          {removingId === booking.bookingId ? "Removing..." : "Cancel"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}
          </div>
        )}

        {/* SAVED SKILLS VIEW */}
        {location.pathname === "/saved-skills" && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Saved Skills</h2>

            {savedSkills.length === 0 ? (
              <div className="text-center py-12">
                <FaBookmark className="text-6xl text-slate-200 mx-auto mb-4" />
                <p className="text-slate-500 text-lg">No saved skills yet</p>
                <p className="text-slate-400 text-sm mt-2">Bookmark skills you're interested in</p>
                <Link 
                  to="/all-skills"
                  className="inline-block mt-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-8 py-3 rounded-2xl transition-all"
                >
                  Explore Skills
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedSkills.map((skill) => (
                  <div key={skill.skillId} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-slate-200">
                    <div className="relative">
                      <img 
                        src={skill.image} 
                      alt={skill.skillName}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ${skill.price}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{skill.skillName}</h3>
                    <p className="text-sm text-slate-600 mb-3">{skill.category}</p>
                    
                    <div className="mb-4">
                      <p className="text-xs text-slate-500 font-semibold mb-1">Provider</p>
                      <p className="font-semibold text-slate-900">{skill.providerName}</p>
                      <p className="text-xs text-slate-500">{skill.providerEmail}</p>
                    </div>

                    <div className="flex gap-2">
                      <Link 
                        to={`/details/${skill.skillId}`}
                        className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-xl transition-all text-center text-sm"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleRemoveSavedSkill(skill.skillId)}
                        disabled={removingSavedId === skill.skillId}
                        className="bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 px-4 rounded-xl transition-all disabled:opacity-50"
                        title="Remove from saved"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        )}

        {/* MY PROFILE VIEW */}
        {location.pathname === "/my-profile" && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 max-w-2xl">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">My Profile</h2>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="flex justify-center mb-6">
                <img
                  src={photoURL || "https://via.placeholder.com/150"}
                  className="w-32 h-32 rounded-full object-cover border-4 border-cyan-500/30 shadow-lg"
                  alt="profile"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 ml-1">Email</label>
                <input
                  disabled
                  value={info?.email || ""}
                  className="w-full px-5 py-4 bg-slate-100 border border-slate-200 rounded-2xl text-slate-600 cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 ml-1">Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all text-slate-900"
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 ml-1">Photo URL</label>
                <input
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all text-slate-900"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div className="flex gap-4">
                <button 
                  disabled={saving}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                  {saving ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Account Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <p className="text-sm text-slate-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-slate-900">{bookings.length}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <p className="text-sm text-slate-600">Saved Skills</p>
                  <p className="text-2xl font-bold text-slate-900">{savedSkills.length}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <p className="text-sm text-slate-600">Published Skills</p>
                  <p className="text-2xl font-bold text-slate-900">{mySkills.length}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <p className="text-sm text-slate-600">Member Since</p>
                  <p className="text-sm font-bold text-slate-900">May 2026</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ADD SKILL VIEW */}
        {location.pathname === "/add-skill" && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 max-w-3xl">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Share Your Skill</h2>

            <form onSubmit={handleAddSkill} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Skill Name *</label>
                  <input
                    value={skillForm.skillName}
                    onChange={(e) => setSkillForm({ ...skillForm, skillName: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all text-slate-900"
                    placeholder="e.g., Web Development, Graphic Design"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Category *</label>
                  <select
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all text-slate-900"
                  >
                    <option value="">Select Category</option>
                    <option value="Technology">Technology</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Language">Language</option>
                    <option value="Health">Health</option>
                    <option value="Arts">Arts</option>
                    <option value="Music">Music</option>
                    <option value="Sports">Sports</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Price per Session ($) *</label>
                  <input
                    type="number"
                    value={skillForm.price}
                    onChange={(e) => setSkillForm({ ...skillForm, price: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all text-slate-900"
                    placeholder="25"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Available Slots *</label>
                  <input
                    type="number"
                    value={skillForm.slotsAvailable}
                    onChange={(e) => setSkillForm({ ...skillForm, slotsAvailable: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all text-slate-900"
                    placeholder="5"
                    min="1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 ml-1">Description *</label>
                <textarea
                  value={skillForm.description}
                  onChange={(e) => setSkillForm({ ...skillForm, description: e.target.value })}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all text-slate-900 resize-none"
                  placeholder="Describe what you'll teach and what students will learn..."
                  rows="5"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 ml-1">Image URL *</label>
                <input
                  value={skillForm.image}
                  onChange={(e) => setSkillForm({ ...skillForm, image: e.target.value })}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all text-slate-900"
                  placeholder="https://example.com/skill-image.jpg"
                />
              </div>

              {skillForm.image && (
                <div className="flex justify-center">
                  <img 
                    src={skillForm.image} 
                    alt="Skill preview" 
                    className="w-48 h-32 rounded-xl object-cover shadow-lg"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x200?text=Invalid+URL";
                    }}
                  />
                </div>
              )}

              <div className="flex gap-4">
                <button 
                  disabled={isAddingSkill}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                  {isAddingSkill ? "Publishing..." : "Publish Skill"}
                </button>
              </div>
            </form>

            {mySkills.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200">
                <h3 className="text-xl font-bold mb-4 text-slate-800">Your Published Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mySkills.map((skill) => (
                    <div key={skill.skillId} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <img 
                        src={skill.image} 
                        alt={skill.skillName}
                        className="w-full h-32 rounded-lg object-cover mb-3"
                      />
                      <h4 className="font-bold text-slate-900 mb-1">{skill.skillName}</h4>
                      <p className="text-xs text-slate-500 mb-2">{skill.category}</p>
                      <p className="text-sm text-slate-600 line-clamp-2 mb-3">{skill.description}</p>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-cyan-600 font-bold">${skill.price}</span>
                        <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">{skill.slotsAvailable} slots</span>
                      </div>
                      <button
                        onClick={() => {
                          removeMySkill(info.email, skill.skillId);
                          setMySkills(mySkills.filter(s => s.skillId !== skill.skillId));
                          toast.success("Skill removed");
                        }}
                        className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 rounded-lg transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SETTINGS VIEW */}
        {location.pathname === "/settings" && (
          <div className="max-w-3xl">
            {/* NOTIFICATION SETTINGS */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <FaBell className="text-2xl text-blue-500" />
                <h2 className="text-2xl font-bold text-slate-800">Notification Settings</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <p className="font-semibold text-slate-900">Booking Notifications</p>
                    <p className="text-sm text-slate-600">Get notified when someone books your skill</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <p className="font-semibold text-slate-900">Message Notifications</p>
                    <p className="text-sm text-slate-600">Get notified for new messages</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <p className="font-semibold text-slate-900">Email Notifications</p>
                    <p className="text-sm text-slate-600">Receive updates via email</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
                </div>
              </div>
            </div>

            {/* PRIVACY SETTINGS */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <FaLock className="text-2xl text-green-500" />
                <h2 className="text-2xl font-bold text-slate-800">Privacy Settings</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <p className="font-semibold text-slate-900">Profile Visibility</p>
                    <p className="text-sm text-slate-600">Make your profile visible to other users</p>
                  </div>
                  <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900">
                    <option>Public</option>
                    <option>Private</option>
                    <option>Friends Only</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <p className="font-semibold text-slate-900">Show My Skills</p>
                    <p className="text-sm text-slate-600">Allow others to see your published skills</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <p className="font-semibold text-slate-900">Show My Bookings</p>
                    <p className="text-sm text-slate-600">Allow others to see your bookings</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 cursor-pointer" />
                </div>
              </div>
            </div>

            {/* DANGER ZONE */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-red-200 bg-red-50">
              <h2 className="text-2xl font-bold text-red-600 mb-6">Danger Zone</h2>

              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                    toast.error("Account deletion coming soon");
                  }
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-2xl transition-all"
              >
                Delete Account
              </button>
              <p className="text-sm text-red-600 mt-3">Permanently delete your account and all associated data</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;