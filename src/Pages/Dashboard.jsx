import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../Context/Authcontext";
import { updateProfile } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { toast } from "react-toastify";
import useData from "../hooks/useData";
import { Link, useLocation } from "react-router";

import {
  getBookingsListForUser,
  getSavedSkillsListForUser,
  removeBookingForUser,
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
} from "react-icons/fa";

const Dashboard = () => {
  const { info, setInfo } = useContext(AuthContext);
  const { skill } = useData();
  const location = useLocation();

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [savedSkills, setSavedSkills] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [saving, setSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    if (!info?.email) return;

    setName(info.displayName || "");
    setPhotoURL(info.photoURL || "");

    // এগুলোর ডিফল্ট ভ্যালু হিসেবে খালি অ্যারে [] রাখা নিরাপদ
    setSavedSkills(getSavedSkillsListForUser(info.email) || []);
    setBookings(getBookingsListForUser(info.email) || []);
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

  if (!info) return null;

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
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
          <h2 className="text-2xl font-bold text-slate-800">Overview</h2>
        </header>

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

        {/* PROFILE SECTION */}
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

        {/* MY BOOKINGS SECTION */}
        <div className="mt-10 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
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
      </main>
    </div>
  );
};

export default Dashboard;