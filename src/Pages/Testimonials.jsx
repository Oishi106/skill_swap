// src/Pages/Testimonials.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaQuoteLeft,
  FaLightbulb,
  FaAward,
  FaHeart,
} from "react-icons/fa";
import Mycontainer from "../components/Mycontainer";
import { Link } from "react-router";

const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "Web Development Learner",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    feedback:
      "This platform helped me learn React in a practical way. The mentors are supportive, and the booking system is super easy!",
    rating: 5,
    badge: "Verified Learner",
  },
  {
    name: "Rafiul Hasan",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    feedback:
      "The learning experience is smooth and structured. I love the real project-based approach.",
    rating: 4.9,
    badge: "Top Provider",
  },
  {
    name: "Nusrat Jahan",
    role: "Data Science Enthusiast",
    image: "https://randomuser.me/api/portraits/women/60.jpg",
    feedback:
      "Booking sessions is easy and flexible. Instructors are very patient and helpful.",
    rating: 5,
    badge: "Verified Learner",
  },
  {
    name: "Mohammed Ali",
    role: "Full Stack Developer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    feedback:
      "SkillSwap changed how I learn. Everything feels structured and professional.",
    rating: 5,
    badge: "Verified Learner",
  },
];

const Testimonials = () => {
  const avgRating =
    testimonials.reduce((a, b) => a + b.rating, 0) / testimonials.length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Mycontainer>

        {/* HEADER */}
        <section className="text-center py-16 space-y-4">
          <span className="text-sm font-semibold px-4 py-1 rounded-full bg-pink-100 text-pink-600">
            Real User Feedback
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800">
            Loved by Learners & Teachers
          </h1>

          <p className="text-slate-600 max-w-2xl mx-auto">
            Honest feedback from people who are actively using SkillSwap every day.
          </p>

          <div className="flex justify-center gap-10 pt-4 text-slate-700">
            <div>
              <p className="text-2xl font-bold text-pink-600">
                {testimonials.length}+
              </p>
              <p className="text-sm">Users</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-pink-600">
                {avgRating.toFixed(1)}★
              </p>
              <p className="text-sm">Avg Rating</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-pink-600">98%</p>
              <p className="text-sm">Satisfaction</p>
            </div>
          </div>
        </section>

        {/* GRID */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-20">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.image}
                  className="w-14 h-14 rounded-full object-cover"
                  alt={t.name}
                />
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {t.name}
                  </h3>
                  <p className="text-sm text-slate-500">{t.role}</p>
                  <span className="text-xs text-pink-600 font-semibold">
                    {t.badge}
                  </span>
                </div>
              </div>

              <FaQuoteLeft className="text-pink-200 mb-3" />

              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {t.feedback}
              </p>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.round(t.rating) }).map((_, idx) => (
                  <FaStar key={idx} className="text-yellow-400 text-sm" />
                ))}
                <span className="text-xs text-slate-500 ml-2">
                  ({t.rating})
                </span>
              </div>
            </motion.div>
          ))}
        </section>

        {/* CTA */}
        <section className="pb-20">
          <div className="bg-slate-900 text-white rounded-3xl p-10 text-center space-y-4">
            <h2 className="text-3xl font-bold">
              Start Learning Today
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto">
              Join thousands of learners improving their skills every day.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link to="/signup">
                <button className="px-6 py-3 bg-pink-500 rounded-xl font-semibold hover:bg-pink-600">
                  Get Started
                </button>
              </Link>

              <Link to="/all-skills">
                <button className="px-6 py-3 border border-white/30 rounded-xl font-semibold hover:bg-white/10">
                  Browse Skills
                </button>
              </Link>
            </div>
          </div>
        </section>

      </Mycontainer>
    </main>
  );
};

export default Testimonials;