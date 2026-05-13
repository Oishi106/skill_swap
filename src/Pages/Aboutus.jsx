import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaGraduationCap,
  FaUsers,
  FaShieldAlt,
  FaRocket,
  FaLaptopCode,
  FaGlobe,
} from "react-icons/fa";

const Aboutus = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden py-24 px-4">

        {/* glowing background */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/30 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-400/30 blur-3xl rounded-full"></div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10">

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Build Skills.  
              <span className="text-cyan-400"> Share Knowledge.</span>
            </h1>

            <p className="mt-5 text-white/70 text-lg">
              Skill Exchange is a modern platform where learning becomes social, simple and powerful.
            </p>

            <div className="mt-6 flex gap-4">
              <Link to="/signup">
                <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl transition">
                  Get Started
                </button>
              </Link>

              <Link to="/signin">
                <button className="border border-white/30 px-6 py-3 rounded-xl">
                  Sign In
                </button>
              </Link>
            </div>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center"
          >
            <img
              src="https://i.ibb.co.com/vMVR7X9/Elderly-Care.avif"
              className="rounded-3xl shadow-2xl w-[420px] h-[320px] object-cover border border-white/20"
              alt="about"
            />
          </motion.div>
        </div>
      </section>

      {/* GLASS CARDS */}
      <section className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-3 gap-6">

        {[
          {
            icon: <FaGraduationCap />,
            title: "Learn Faster",
            desc: "Direct skill learning from real people",
            color: "text-cyan-400",
          },
          {
            icon: <FaUsers />,
            title: "Community Driven",
            desc: "Connect with learners & experts",
            color: "text-pink-400",
          },
          {
            icon: <FaShieldAlt />,
            title: "Safe & Trusted",
            desc: "Verified users and secure system",
            color: "text-green-400",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl"
          >
            <div className={`text-4xl ${item.color}`}>{item.icon}</div>
            <h3 className="mt-4 font-bold text-xl">{item.title}</h3>
            <p className="text-white/60 mt-2 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* MISSION / VISION */}
      <section className="max-w-6xl mx-auto px-4 pb-20 grid md:grid-cols-2 gap-6">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-cyan-400">Our Mission</h2>
          <p className="text-white/70 mt-4 leading-7">
            To make skill learning accessible globally through peer-to-peer
            knowledge sharing without barriers.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-pink-400">Our Vision</h2>
          <p className="text-white/70 mt-4 leading-7">
            A world where everyone can teach and learn anything from anyone,
            anytime.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center relative">

        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 blur-2xl"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold">
            Start Your Journey Today 🚀
          </h2>

          <p className="text-white/60 mt-3">
            Join thousands of learners worldwide
          </p>

          <Link to="/signup">
            <button className="mt-6 bg-cyan-500 text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition">
              Join Now
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Aboutus;