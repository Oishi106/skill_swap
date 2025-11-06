import React, { useState } from "react";
import Mycontainer from "../components/Mycontainer";
import { useParams } from "react-router";
import useData from "../hooks/useData";
import { toast } from "react-toastify";

const Viewdetails = () => {
  const { skillId } = useParams();
  const { skill, loading } = useData();
  const skilled = !loading ? skill.find((p) => p.skillId == Number(skillId)) : null;
  const { skillName, price, rating, image, description, slotsAvailable, providerEmail, providerName, category } =
    skilled || {};

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("✅ Session booked successfully!");
    setForm({ name: "", email: "" });
    setShowModal(false);
  };

  return (
    <div>
      <Mycontainer>
        <div className="card lg:card-side shadow-xl mt-11 bg-[#8FABD4] text-white">
          <figure className="rounded-xl">
            <img className="w-96 h-96 rounded-xl p-4 object-cover" src={image} alt={skillName} />
          </figure>

          <div className="card-body">
            <h2 className="card-title text-4xl">{skillName}</h2>
            <h1 className="text-orange-500 text-2xl">Rating: {rating}</h1>
            <h1 className="text-sky-600 font-bold text-2xl">Price: ${price}</h1>
            <p className="text-gray-600 font-semibold text-lg">{description}</p>
            <p className="text-gray-600 font-semibold text-lg">Category: {category}</p>
            <p className="text-gray-600 font-semibold text-lg">Slots Available: {slotsAvailable}</p>
            <p className="text-gray-600 font-semibold text-lg">Provider Name: {providerName}</p>
            <p className="text-gray-600 font-semibold text-lg">Provider Email: {providerEmail}</p>

            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                Book Session
              </button>
            </div>
          </div>
        </div>
      </Mycontainer>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg relative">
            <button
              className="btn btn-sm btn-circle absolute right-3 top-3"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h3 className="text-2xl font-semibold text-center mb-4 text-sky-600">
              Book Your Session
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="input input-bordered w-full mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="input input-bordered w-full mt-1"
                />
              </div>

              <div className="text-center pt-3">
                <button type="submit" className="btn btn-primary w-full">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Viewdetails;
