import React from "react";
import Mycontainer from "../components/Mycontainer";
import { FaSearch, FaEye, FaCheckCircle, FaQuestionCircle } from "react-icons/fa";

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
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <Mycontainer>

        {/* HERO */}
        <section className="text-center py-14 md:py-20 space-y-4">
          <div className="flex justify-center">
            <span className="bg-[#1B3C53]/10 text-[#1B3C53] px-4 py-2 rounded-full text-sm font-semibold">
              🚀 Simple Process
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-[#1B3C53]">
            How It <span className="text-[#BF124D]">Works</span>
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            A simple 3-step flow to connect learners and teachers instantly.
          </p>
        </section>

        {/* STEPS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              {/* step number */}
              <div className="absolute -top-3 -left-3 bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                0{index + 1}
              </div>

              {/* icon */}
              <div className="bg-gradient-to-br from-[#1B3C53] to-[#456882] w-14 h-14 flex items-center justify-center rounded-xl mb-4 group-hover:scale-110 transition">
                <step.icon className="text-white text-xl" />
              </div>

              <h3 className="text-xl font-bold text-[#1B3C53] mb-2">
                {step.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </section>

        {/* FAQ SECTION */}
        <section className="max-w-3xl mx-auto pb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B3C53]">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 mt-2">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
              >
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-semibold text-[#1B3C53] hover:bg-gray-50">
                    <span className="flex items-center gap-2">
                      <FaQuestionCircle className="text-[#BF124D]" />
                      {item.q}
                    </span>

                    <span className="text-gray-400 group-open:rotate-180 transition-transform">
                      ⌄
                    </span>
                  </summary>

                  <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">
                    {item.a}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16">
          <div className="bg-gradient-to-r from-[#1B3C53] to-[#456882] text-white rounded-3xl p-10 text-center shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Ready to start learning?
            </h2>
            <p className="text-white/80 mb-6">
              Join Skill Exchange and connect with real people today.
            </p>

            <button className="bg-white text-[#1B3C53] font-bold px-8 py-3 rounded-xl hover:scale-105 transition">
              Get Started
            </button>
          </div>
        </section>

      </Mycontainer>
    </main>
  );
};

export default Howitworks;