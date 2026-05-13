import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../Context/Authcontext";
import { updateProfile } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { toast } from "react-toastify";
import useData from "../hooks/useData";
import { Link, Outlet, useLocation } from "react-router";

import {
  getBookingsListForUser,
  getSavedSkillsListForUser,
  removeBookingForUser,
  removeSavedSkillForUser,
} from "../utils/skillStorage";

import {
  FaBookmark,
  FaCalendarCheck,
  FaGraduationCap,
  FaUsers,
  FaStar,
  FaChartLine,
  FaArrowRight,
  FaHome,
  FaCog,
  FaPlusCircle,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

const Dashboard = () => {
  const { info, setInfo } = useContext(AuthContext);
  const { skill } = useData();
  const location = useLocation();

  const [name, setName] = useState(info?.displayName || "");
  const [photoURL, setPhotoURL] = useState(info?.photoURL || "");
  const [savedSkills, setSavedSkills] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [saving, setSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!info?.email) return;

    setSavedSkills(getSavedSkillsListForUser(info.email));
    setBookings(getBookingsListForUser(info.email));

    setName(info.displayName || "");
    setPhotoURL(info.photoURL || "");
  }, [info]);

  const recommendationPool = useMemo(() => {
    const excludedIds = new Set([
      ...savedSkills.map((item) => Number(item.skillId)),
      ...bookings.map((item) => Number(item.skillId)),
    ]);

    return skill
      .filter((item) => !excludedIds.has(Number(item.skillId)))
      .slice(0, 4);
  }, [skill, savedSkills, bookings]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) return;

    setSaving(true);

    try {
      await updateProfile(auth.currentUser, {
        displayName: name.trim(),
        photoURL: photoURL.trim() || null,
      });

      const nextInfo = {
        ...info,
        displayName: name.trim(),
        photoURL: photoURL.trim() || null,
      };

      setInfo(nextInfo);

      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(error?.message || "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveBooking = (bookingId) => {
    const nextBookings = removeBookingForUser(info?.email, bookingId);

    setBookings(nextBookings);

    toast.success("Booking removed.");
  };

  const handleRemoveSaved = (skillId) => {
    const nextSavedSkills = removeSavedSkillForUser(
      info?.email,
      skillId
    );

    setSavedSkills(nextSavedSkills);

    toast.success("Saved skill removed.");
  };

  if (!info) return null;

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "All Skills",
      path: "/all-skills",
      icon: <FaGraduationCap />,
    },
    {
      name: "My Bookings",
      path: "/my-bookings",
      icon: <FaCalendarCheck />,
    },
    {
      name: "Saved Skills",
      path: "/saved-skills",
      icon: <FaBookmark />,
    },
    {
      name: "Add Skill",
      path: "/add-skill",
      icon: <FaPlusCircle />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex">
      {/* SIDEBAR */}
      <aside
        className={`fixed z-50 top-0 left-0 h-screen w-[290px] bg-[#0F172A] text-white shadow-2xl transition-all duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* LOGO */}
        <div className="border-b border-white/10 p-7">
          <h1 className="text-3xl font-black tracking-wide">
            SkillSwap
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Professional Dashboard
          </p>
        </div>

        {/* PROFILE */}
        <div className="flex flex-col items-center border-b border-white/10 p-7">
          <img
            src={
              photoURL ||
              info?.photoURL ||
              "/placeholder-user.png"
            }
            alt={info?.displayName}
            className="h-24 w-24 rounded-full border-4 border-cyan-500 object-cover"
          />

          <h2 className="mt-4 text-xl font-bold">
            {info?.displayName}
          </h2>

          <p className="text-sm text-slate-400">
            {info?.email}
          </p>
        </div>

        {/* MENU */}
        <nav className="mt-5 flex flex-col gap-2 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-[15px] font-medium transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-cyan-500 text-white shadow-lg"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="absolute bottom-0 left-0 w-full p-5">
          <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-500 px-5 py-4 font-semibold transition hover:bg-red-600">
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 lg:ml-[290px]">
        {/* TOPBAR */}
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-xl bg-slate-100 p-3 text-slate-700 lg:hidden"
            >
              <FaBars />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Dashboard Overview
              </h1>

              <p className="text-sm text-slate-500">
                Welcome back 👋
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <img
              src={
                photoURL ||
                info?.photoURL ||
                "/placeholder-user.png"
              }
              alt={info?.displayName}
              className="h-12 w-12 rounded-full object-cover"
            />
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-6">
          {/* STATS */}
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[30px] bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500">
                    Total Bookings
                  </p>

                  <h2 className="mt-2 text-4xl font-black text-slate-800">
                    {bookings.length}
                  </h2>
                </div>

                <div className="rounded-2xl bg-cyan-100 p-4 text-3xl text-cyan-600">
                  <FaCalendarCheck />
                </div>
              </div>
            </div>

            <div className="rounded-[30px] bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500">
                    Saved Skills
                  </p>

                  <h2 className="mt-2 text-4xl font-black text-slate-800">
                    {savedSkills.length}
                  </h2>
                </div>

                <div className="rounded-2xl bg-pink-100 p-4 text-3xl text-pink-600">
                  <FaBookmark />
                </div>
              </div>
            </div>

            <div className="rounded-[30px] bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500">
                    Learning Status
                  </p>

                  <h2 className="mt-2 text-4xl font-black text-slate-800">
                    Active
                  </h2>
                </div>

                <div className="rounded-2xl bg-yellow-100 p-4 text-3xl text-yellow-600">
                  <FaGraduationCap />
                </div>
              </div>
            </div>

            <div className="rounded-[30px] bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500">
                    Skill Growth
                  </p>

                  <h2 className="mt-2 text-4xl font-black text-slate-800">
                    +24%
                  </h2>
                </div>

                <div className="rounded-2xl bg-green-100 p-4 text-3xl text-green-600">
                  <FaChartLine />
                </div>
              </div>
            </div>
          </section>

          {/* MAIN GRID */}
          <section className="mt-8 grid gap-8 xl:grid-cols-[1.5fr_0.9fr]">
            {/* BOOKINGS */}
            <div className="rounded-[35px] bg-white p-7 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-slate-800">
                    Upcoming Sessions
                  </h2>

                  <p className="mt-1 text-slate-500">
                    Your booked sessions
                  </p>
                </div>

                <FaUsers className="text-3xl text-slate-400" />
              </div>

              <div className="mt-8 space-y-5">
                {bookings.length ? (
                  bookings.map((booking) => (
                    <div
                      key={booking.bookingId}
                      className="flex flex-col gap-5 rounded-3xl border border-slate-200 p-5 transition hover:shadow-xl lg:flex-row lg:items-center lg:justify-between"
                    >
                      <div className="flex items-center gap-5">
                        <img
                          src={booking.image}
                          alt={booking.skillName}
                          className="h-20 w-20 rounded-2xl object-cover"
                        />

                        <div>
                          <h3 className="text-xl font-bold text-slate-800">
                            {booking.skillName}
                          </h3>

                          <p className="text-slate-500">
                            {booking.providerName}
                          </p>

                          <p className="text-sm text-slate-400">
                            {booking.category}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Link
                          to={`/details/${booking.skillId}`}
                          className="rounded-xl bg-slate-100 px-5 py-3 font-medium transition hover:bg-slate-200"
                        >
                          View
                        </Link>

                        <button
                          onClick={() =>
                            handleRemoveBooking(
                              booking.bookingId
                            )
                          }
                          className="rounded-xl bg-red-500 px-5 py-3 font-medium text-white transition hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
                    No bookings found.
                  </div>
                )}
              </div>
            </div>

            {/* PROFILE */}
            <div className="rounded-[35px] bg-white p-7 shadow-lg">
              <h2 className="text-3xl font-bold text-slate-800">
                Profile Settings
              </h2>

              <form
                onSubmit={handleUpdate}
                className="mt-8 space-y-5"
              >
                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Display Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    className="input input-bordered w-full bg-slate-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Photo URL
                  </label>

                  <input
                    type="text"
                    value={photoURL}
                    onChange={(e) =>
                      setPhotoURL(e.target.value)
                    }
                    className="input input-bordered w-full bg-slate-50"
                  />
                </div>

                <button
                  disabled={saving}
                  className="w-full rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#334155] py-4 font-semibold text-white"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;