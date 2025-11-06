// src/pages/HowItWorks.jsx
import React from "react";
import Mycontainer from "../components/Mycontainer";

const steps = [
  {
    title: "1) Browse Skills",
    desc: "Explore categories and find the exact skill you need. Filter by rating, price, or category.",
  },
  {
    title: "2) View Details",
    desc: "Open a skill to see description, rating, provider info, and available slots.",
  },
  {
    title: "3) Book Session",
    desc: "Hit “Book Session”, fill in your name & email, submit — you’ll see a success toast.",
  },
];

const Howitworks = () => {
  return (
    <main className="min-h-screen">
      <Mycontainer>
        <div className="text-center my-8 md:my-12 space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            How It Works
          </h1>
          <p className="text-base text-gray-600">
            A simple 3-step flow to get you learning fast.
          </p>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 pb-12">
          {steps.map((s) => (
            <div key={s.title} className="card bg-base-100 shadow p-6">
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-gray-600">{s.desc}</p>
            </div>
          ))}
        </section>
        <section className="max-w-3xl mx-auto pb-16">
          <div className="collapse collapse-arrow bg-base-100 shadow">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              Do I need an account to book?
            </div>
            <div className="collapse-content text-gray-600">
              <p>Yesyou have to have an account , enter your name and email, submit, and you’re done.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-100 shadow mt-3">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              Can I cancel or reschedule?
            </div>
            <div className="collapse-content text-gray-600">
              <p>This demo is UI-only; add backend logic later for cancellations and rescheduling.</p>
            </div>
          </div>
        </section>
      </Mycontainer>
    </main>
  );
};

export default Howitworks;
