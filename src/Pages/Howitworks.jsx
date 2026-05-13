import React, { useState } from "react";
import { motion } from "framer-motion";
import Mycontainer from "../components/Mycontainer";
import { FaSearch, FaEye, FaCheckCircle, FaQuestionCircle, FaChevronDown, FaShieldAlt, FaClipboardList, FaCalendarAlt, FaUsers, FaLightbulb } from "react-icons/fa";
import { Link } from "react-router";

const steps = [
  {
    icon: FaSearch,
    title: "Browse Skills",
    desc: "Explore categories and find the exact skill you need. Filter by rating, price, or category.",
  },
  {
    icon: FaEye,
    title: "View Details",
    desc: "Open a skill to see full details, ratings, provider info, and availability.",
  },
  {
    icon: FaCheckCircle,
    title: "Book Session",
    desc: "Submit your booking in seconds and get instant confirmation.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const faqs = [
  {
    q: "Do I need an account to book?",
    a: "Yes, you must create an account. Then you can browse skills and book sessions easily.",
  },
  {
    q: "Can I cancel or reschedule?",
    a: "Currently this is a UI demo. Backend logic can be added later for cancellations.",
  },
];

const Howitworks = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-cyan-50 to-blue-50">
      <Mycontainer>

        {/* HERO */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center py-16 md:py-24 space-y-6 relative overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-10 left-1/4 w-64 h-64 bg-cyan-300 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-10 right-1/4 w-64 h-64 bg-blue-300 rounded-full blur-3xl"
            />
          </div>

          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center relative z-10"
          >
            <span className="bg-gradient-to-r from-cyan-400/20 to-blue-400/20 text-cyan-700 px-6 py-2 rounded-full text-sm font-bold border border-cyan-400/30">
              🚀 Simple & Intuitive
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-black leading-tight relative z-10"
          >
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">SkillSwap</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Works</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-700 max-w-3xl mx-auto text-lg md:text-xl relative z-10"
          >
            Connect with skilled professionals in just three simple steps. Our streamlined platform makes learning and teaching effortless.
          </motion.p>
        </motion.section>

        {/* STEPS */}
        <motion.section 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 md:py-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="relative bg-gradient-to-br from-white to-cyan-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-cyan-300 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br from-cyan-400 to-blue-400 transition-opacity duration-300" />

              {/* step number */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="absolute -top-4 -left-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-black px-4 py-2 rounded-full shadow-lg"
              >
                {index + 1}
              </motion.div>

              {/* icon */}
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-cyan-500 to-blue-600 w-16 h-16 flex items-center justify-center rounded-xl mb-6 shadow-lg"
              >
                <step.icon className="text-white text-2xl" />
              </motion.div>

              <h3 className="text-2xl font-bold text-[#0F172A] mb-3 relative z-10">
                {step.title}
              </h3>

              <p className="text-gray-700 text-sm leading-relaxed relative z-10">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.section>

        {/* FAQ SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto py-16 md:py-24"
        >
          <div className="text-center mb-12">
            <motion.span 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block bg-gradient-to-r from-purple-400/20 to-indigo-400/20 text-purple-700 px-4 py-2 rounded-full text-sm font-bold border border-purple-400/30 mb-4"
            >
              ❓ Questions?
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-black mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Frequently</span> Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Questions</span>
            </h2>
            <p className="text-gray-700 mt-3 text-lg">
              Get quick answers to common questions about SkillSwap
            </p>
          </div>

          <motion.div 
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqs.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-purple-100 hover:border-purple-400"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 transition-colors duration-200"
                >
                  <span className="flex items-center gap-3 text-left">
                    <FaQuestionCircle className="text-purple-600 flex-shrink-0" />
                    <span className="font-bold text-[#0F172A] text-lg">{item.q}</span>
                  </span>

                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="text-purple-600" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? "auto" : 0,
                    opacity: openFaq === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 text-gray-700 bg-white border-t-2 border-purple-100">
                    {item.a}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-16 md:py-24 relative overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              { icon: FaShieldAlt, title: "Secure & Safe", desc: "Firebase-protected bookings ensure your safety" },
              { icon: FaClipboardList, title: "Easy Management", desc: "Track all your sessions in one place" },
              { icon: FaCalendarAlt, title: "Flexible Scheduling", desc: "Book sessions at times that work for you" },
              { icon: FaUsers, title: "Community Driven", desc: "Learn from real experts in your area" },
              { icon: FaLightbulb, title: "Quality Learning", desc: "Verified instructors with high ratings" },
              { icon: FaCheckCircle, title: "Instant Confirmation", desc: "Get matched with providers instantly" }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-white to-cyan-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-cyan-100 hover:border-cyan-300"
              >
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <benefit.icon className="text-white text-lg" />
                </div>
                <h3 className="font-bold text-lg text-[#0F172A] mb-2">{benefit.title}</h3>
                <p className="text-gray-700 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pb-16"
        >
          <div className="bg-gradient-to-br from-[#0F172A] via-[#1B3C53] to-[#234C6A] text-white rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-20">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-5 right-5 w-32 h-32 bg-cyan-400 rounded-full blur-3xl"
              />
            </div>

            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black mb-4 relative z-10"
            >
              Ready to Transform Your Skills?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/90 mb-8 max-w-2xl mx-auto text-lg relative z-10"
            >
              Join thousands of learners and teachers in our community. Start your journey today!
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
            >
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 text-[#0F172A] font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
                >
                  Get Started Now
                </motion.button>
              </Link>
              <Link to="/all-skills">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 border-2 border-white text-white font-bold px-10 py-4 rounded-xl hover:bg-white/20 transition-all text-lg backdrop-blur-sm"
                >
                  Browse Skills
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.section>

      </Mycontainer>
    </main>
  );
};

export default Howitworks;