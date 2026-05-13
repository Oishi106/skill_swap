import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import {
  FaSearch,
  FaTimes,
  FaStar,
  FaUsers,
  FaTh,
  FaList,
  FaChevronDown,
  FaFire,
  FaFilter,
} from "react-icons/fa";
import useData from "../hooks/useData";
import Skillcard from "../components/Skillcard";
import { DotLoader } from "react-spinners";

const AllSkills = () => {
  const { skill, loading } = useData();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("rating");
  const [view, setView] = useState("grid");
  const [openSort, setOpenSort] = useState(false);

  // Dynamically generate categories from skills
  const categories = useMemo(() => {
    const categorySet = new Set(["All"]);
    skill.forEach((s) => {
      if (s.category) {
        categorySet.add(s.category);
      }
    });
    return Array.from(categorySet);
  }, [skill]);

  const sortOptions = [
    { label: "Top Rated", value: "rating" },
    { label: "Price Low", value: "low" },
    { label: "Price High", value: "high" },
    { label: "Newest", value: "new" },
  ];

  const filtered = useMemo(() => {
    let data = [...skill];

    if (search) {
      data = data.filter((s) =>
        s.skillName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      data = data.filter((s) => s.category === category);
    }

    switch (sort) {
      case "low":
        data.sort((a, b) => a.price - b.price);
        break;
      case "high":
        data.sort((a, b) => b.price - a.price);
        break;
      case "new":
        data.sort((a, b) => b.skillId - a.skillId);
        break;
      default:
        data.sort((a, b) => b.rating - a.rating);
    }

    return data;
  }, [skill, search, category, sort]);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white py-14 text-center">
        <h1 className="text-4xl font-bold">Explore Skills</h1>
        <p className="text-white/70 mt-2">
          Learn, share, and grow your expertise
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* SEARCH BAR */}
        <div className="bg-slate-100 rounded-2xl shadow p-4 flex flex-col lg:flex-row gap-4 items-center">

          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search skills..."
              className="w-full pl-12 pr-10 py-3 rounded-xl border focus:outline-none text-slate-900 placeholder-gray-500"
            />
            {search && (
              <FaTimes
                onClick={() => setSearch("")}
                className="absolute right-4 top-4 text-gray-400 cursor-pointer"
              />
            )}
          </div>

          {/* VIEW TOGGLE */}
          <div className="flex border rounded-xl overflow-hidden">
            <button
              onClick={() => setView("grid")}
              className={`p-3 text-slate-900 ${view === "grid" ? "bg-slate-900 text-white" : "hover:bg-slate-200"}`}
            >
              <FaTh />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-3 text-slate-900 ${view === "list" ? "bg-slate-900 text-white" : "hover:bg-slate-200"}`}
            >
              <FaList />
            </button>
          </div>

          {/* SORT */}
          <div className="relative">
            <button
              onClick={() => setOpenSort(!openSort)}
              className="px-5 py-3 border rounded-xl flex items-center gap-2 text-slate-900 font-semibold hover:bg-slate-200"
            >
              Sort <FaChevronDown />
            </button>

            <AnimatePresence>
              {openSort && (
                <motion.div className="absolute bg-white shadow rounded-xl mt-2 w-40 z-50">
                  {sortOptions.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => {
                        setSort(s.value);
                        setOpenSort(false);
                      }}
                      className="w-full text-left px-4 py-2 text-slate-900 hover:bg-slate-100 font-semibold"
                    >
                      {s.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap gap-2 mt-6">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                category === c
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-300 text-slate-900 hover:border-slate-900"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* RESULTS */}
        <div className="mt-10">
          <p className="text-gray-600 mb-5">
            Showing <b>{filtered.length}</b> skills
          </p>

          {loading ? (
            <div className="flex justify-center py-20">
              <DotLoader color="#1E293B" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No skills found
            </div>
          ) : (
            <div
              className={
                view === "grid"
                  ? "grid md:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {filtered.map((s) => (
                <Skillcard key={s.skillId} skill={s} />
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-slate-900 text-white p-10 rounded-3xl text-center">
          <h2 className="text-2xl font-bold">Share Your Skill</h2>
          <p className="text-white/70 mt-2">
            Teach others and earn by sharing knowledge
          </p>

          <Link to="/add-skill">
            <button className="mt-5 bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold">
              Add Skill
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllSkills;