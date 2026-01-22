import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaStar, FaUsers, FaFire } from "react-icons/fa";

const Skillcard = ({ skill, index = 0 }) => {
  const { skillName, price, rating, image, description, skillId, category, providerName, slotsAvailable } = skill;

  const getCategoryColor = (category) => {
    const categoryColors = {
      'Music': 'bg-gradient-to-r from-purple-500 to-purple-700',
      'Language': 'bg-gradient-to-r from-emerald-500 to-emerald-700',
      'Programming': 'bg-gradient-to-r from-blue-500 to-blue-700',
      'Design': 'bg-gradient-to-r from-pink-500 to-rose-600',
      'Fitness': 'bg-gradient-to-r from-orange-500 to-red-600',
      'Data Science': 'bg-gradient-to-r from-cyan-500 to-cyan-700',
      'Artificial Intelligence': 'bg-gradient-to-r from-violet-500 to-violet-700',
      'Marketing': 'bg-gradient-to-r from-amber-500 to-amber-700',
      'Creative': 'bg-gradient-to-r from-teal-500 to-teal-700',
      'Communication': 'bg-gradient-to-r from-indigo-500 to-indigo-700',
    };
    return categoryColors[category] || 'bg-gradient-to-r from-gray-500 to-gray-700';
  };

  return (
    <motion.div
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={skillName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className={`absolute top-3 left-3 ${getCategoryColor(category)} text-white text-xs font-semibold px-3 py-1.5 rounded-full`}>
          {category}
        </span>
        {rating >= 4.8 && (
          <span className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <FaFire className="text-xs" /> Hot
          </span>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-[#1B3C53] mb-1 group-hover:text-[#234C6A] transition-colors line-clamp-1">
          {skillName}
        </h3>
        <p className="text-gray-500 text-sm mb-2">by {providerName}</p>
        
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400 text-sm" />
            <span className="font-semibold text-[#1B3C53] text-sm">{rating}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <FaUsers className="text-[#456882]" />
            <span>{slotsAvailable} slots available</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{description}</p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-2xl font-bold text-[#1B3C53]">${price}</span>
          <Link to={`/details/${skillId}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white font-semibold px-5 py-2 rounded-xl text-sm hover:shadow-lg transition-all duration-300"
            >
              View / Book Now
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Skillcard;