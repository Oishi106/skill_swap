import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaClock,
  FaLinkedin,
  FaGithub,
  FaShieldAlt,
} from "react-icons/fa";

const Contract = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({
        fullName: "",
        email: "",
        subject: "General Inquiry",
        message: "",
      });

      setTimeout(() => setSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white">

      {/* HERO */}
      <section className="relative py-20 text-center px-4 overflow-hidden">

        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-500/30 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-400/30 blur-3xl rounded-full"></div>

        <h1 className="text-4xl md:text-5xl font-bold">
          Get in <span className="text-cyan-400">Touch</span>
        </h1>

        <p className="text-white/70 mt-3">
          We’re here to help you anytime 🚀
        </p>
      </section>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-4 pb-20 grid md:grid-cols-3 gap-8">

        {/* FORM */}
        <div className="md:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">

          {success && (
            <div className="mb-6 bg-green-500/20 border border-green-400 text-green-200 p-3 rounded-xl">
              Message sent successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20"
              required
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20"
              required
            />

            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20"
            >
              <option>General Inquiry</option>
              <option>Support</option>
              <option>Booking Issue</option>
              <option>Feedback</option>
            </select>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your message..."
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* SIDE INFO */}
        <div className="space-y-6">

          {/* CONTACT CARD */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <h2 className="font-bold text-lg mb-4">Contact Info</h2>

            <div className="flex items-center gap-3 mb-4">
              <FaEnvelope className="text-cyan-400" />
              <span>support@skillswap.com</span>
            </div>

            <div className="flex items-center gap-3">
              <FaClock className="text-pink-400" />
              <span>Reply within 24h</span>
            </div>
          </div>

          {/* SOCIAL */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <h2 className="font-bold mb-4">Follow Us</h2>

            <div className="flex gap-4">
              <a href="#">
                <FaLinkedin className="text-2xl text-cyan-400 hover:scale-110 transition" />
              </a>
              <a href="#">
                <FaGithub className="text-2xl text-white hover:scale-110 transition" />
              </a>
            </div>
          </div>

          {/* SECURITY */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <div className="flex items-start gap-3">
              <FaShieldAlt className="text-green-400 text-xl" />
              <div>
                <h3 className="font-bold">Secure & Private</h3>
                <p className="text-white/60 text-sm">
                  Your data is always protected.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contract;