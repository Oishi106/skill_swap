import React, { useContext, useEffect, useState } from "react";
import Mycontainer from "../components/Mycontainer";
import { useParams } from "react-router";
import useData from "../hooks/useData";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/Authcontext";

import {
  addBookingForUser,
  hasSavedSkillForUser,
  toggleSavedSkillForUser,
} from "../utils/skillStorage";

import {
  FaBookmark,
  FaRegBookmark,
  FaStar,
  FaUserGraduate,
  FaCalendarCheck,
  FaEnvelope,
  FaLayerGroup,
} from "react-icons/fa";

const Viewdetails = () => {
  const { skillId } = useParams();
  const { skill, loading } = useData();
  const { info } = useContext(AuthContext);

  const skilled = !loading
    ? skill.find((p) => p.skillId == Number(skillId))
    : null;

  const {
    skillName,
    price,
    rating,
    image,
    description,
    slotsAvailable,
    providerEmail,
    providerName,
    category,
  } = skilled || {};

  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: info?.displayName || "",
    email: info?.email || "",
  });

  useEffect(() => {
    if (!skilled) return;

    setSaved(hasSavedSkillForUser(info?.email, skilled));

    setForm({
      name: info?.displayName || "",
      email: info?.email || "",
    });
  }, [info?.displayName, info?.email, skilled]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F7FA]">
        <span className="loading loading-spinner loading-lg text-cyan-600"></span>
      </div>
    );
  }

  if (!skilled) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-bold text-slate-500">
        Skill Not Found
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const booking = addBookingForUser(info?.email, {
      skillId: skilled.skillId,
      skillName,
      providerName,
      providerEmail,
      category,
      price,
      rating,
      slotsAvailable,
      image,
      description,
      name: form.name,
      email: form.email,
    });

    if (!booking) {
      toast.info("This session already exists.");
      setShowModal(false);
      return;
    }

    toast.success("Session booked successfully.");

    setForm({
      name: "",
      email: "",
    });

    setShowModal(false);
  };

  const handleSave = () => {
    const nextSaved = toggleSavedSkillForUser(
      info?.email,
      skilled
    );

    setSaved(nextSaved);

    toast.success(
      nextSaved
        ? "Skill saved successfully."
        : "Removed from saved list."
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-10">
      <Mycontainer>
        {/* MAIN CARD */}
        <div className="overflow-hidden rounded-[35px] bg-white shadow-2xl">
          <div className="grid lg:grid-cols-[1fr_1.1fr]">
            {/* IMAGE */}
            <div className="relative h-full">
              <img
                src={image}
                alt={skillName}
                className="h-full min-h-[500px] w-full object-cover"
              />

              <div className="absolute left-6 top-6 rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-slate-800 backdrop-blur">
                {category}
              </div>
            </div>

            {/* DETAILS */}
            <div className="p-8 lg:p-12">
              {/* TOP */}
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <h1 className="text-4xl font-black text-slate-800">
                    {skillName}
                  </h1>

                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-yellow-700">
                      <FaStar />
                      <span className="font-semibold">
                        {rating} Rating
                      </span>
                    </div>

                    <div className="rounded-full bg-cyan-100 px-4 py-2 font-semibold text-cyan-700">
                      ${price}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  className={`flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold transition-all duration-300 ${
                    saved
                      ? "bg-pink-500 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {saved ? (
                    <>
                      <FaBookmark />
                      Saved
                    </>
                  ) : (
                    <>
                      <FaRegBookmark />
                      Save Skill
                    </>
                  )}
                </button>
              </div>

              {/* DESCRIPTION */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-slate-800">
                  About This Skill
                </h2>

                <p className="mt-4 leading-8 text-slate-600">
                  {description}
                </p>
              </div>

              {/* INFO GRID */}
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-cyan-100 p-3 text-cyan-600">
                      <FaUserGraduate />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Provider Name
                      </p>

                      <h3 className="font-bold text-slate-800">
                        {providerName}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-pink-100 p-3 text-pink-600">
                      <FaEnvelope />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Provider Email
                      </p>

                      <h3 className="font-bold text-slate-800 break-all">
                        {providerEmail}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-yellow-100 p-3 text-yellow-600">
                      <FaLayerGroup />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Category
                      </p>

                      <h3 className="font-bold text-slate-800">
                        {category}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-green-100 p-3 text-green-600">
                      <FaCalendarCheck />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Slots Available
                      </p>

                      <h3 className="font-bold text-slate-800">
                        {slotsAvailable}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div className="mt-10">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#334155] px-8 py-5 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.01]"
                >
                  Book Learning Session
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-[35px] bg-white p-8 shadow-2xl">
              {/* CLOSE BUTTON */}
              <button
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-slate-400 text-lg transition hover:bg-cyan-800"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>

              {/* HEADER */}
              <div className="text-center">
                <h2 className="text-3xl font-black text-slate-800">
                  Book Session
                </h2>

                <p className="mt-2 text-slate-500">
                  Confirm your booking details
                </p>
              </div>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                <div>
                  <label className="mb-2 block font-semibold text-slate-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    className="input input-bordered h-14 w-full rounded-2xl bg-slate-500"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-slate-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    className="input input-bordered h-14 w-full rounded-2xl bg-slate-500"
                    placeholder="Enter your email"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-3 w-full rounded-2xl bg-gradient-to-r from-cyan-900 to-blue-800 py-4 text-lg font-bold text-white shadow-lg transition hover:opacity-95"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        )}
      </Mycontainer>
    </div>
  );
};

export default Viewdetails;