// src/components/Testimonials.jsx
import React from "react";

const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "Web Development Learner",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    feedback:
      "This platform helped me learn React in a practical way. The mentors are supportive, and the booking system is super easy!",
    rating: 5,
  },
  {
    name: "Rafiul Hasan",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    feedback:
      "I love how the top-rated providers guide you with real project examples. Highly recommend for beginners!",
    rating: 4.9,
  },
  {
    name: "Nusrat Jahan",
    role: "Data Science Enthusiast",
    image: "https://randomuser.me/api/portraits/women/60.jpg",
    feedback:
      "A great experience! I could easily book sessions and learn at my own pace. The instructors are amazing.",
    rating: 5,
  },
];

const Testimonials=()=>   {
  return (
    <section className="my-12">
      <div className="text-center mb-8 space-y-2">
        <h2 className="text-2xl sm:text-3xl font-semibold">What Learners Say</h2>
        <p className="text-gray-600">Real feedback from our learners</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="card bg-base-100 shadow-xl p-5 hover:shadow-2xl transition-all duration-200"
            data-aos="fade-up"
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src={t.image}
                alt={t.name}
                className="w-14 h-14 rounded-full border-2 border-sky-400"
              />
              <div>
                <h3 className="font-semibold text-lg">{t.name}</h3>
                <p className="text-gray-500 text-sm">{t.role}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-3">“{t.feedback}”</p>
            <div className="text-yellow-400">
              {"★".repeat(Math.round(t.rating))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Testimonials
