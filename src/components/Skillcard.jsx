import React from "react";
import { motion } from "framer-motion";
import Mylink from "./Mylink";

const Skillcard = ({ skill, index = 0 }) => {
  const { skillName, price, rating, image, description, skillId } = skill;

  // even -> left, odd -> right
  const initialX = index % 2 === 0 ? -140 : 140;

  return (
    <motion.div
      className="card w-96 shadow-sm rounded-xl p-4 border border-gray-100 bg-[#8FABD4] text-white"
      initial={{ opacity: 0, x: initialX, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.5, ease: "easeOut" }}  // ⬅ Slow & Smooth
    >
      <figure>
        <motion.img
          className="object-cover w-full h-48 rounded-lg"
          src={image}
          alt={skillName}
          initial={{ scale: 1.05, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4 }}
        />
      </figure>

      <div className="card-body ">
        <motion.h2
          className="card-title"
       
        >
          {skillName}
        </motion.h2>

        <motion.h1
          className="text-orange-500"
        
        >
          Rating - {rating}
        </motion.h1>

        <motion.h1
          className="text-sky-600 font-bold"
         
        >
          Price - ${price}
        </motion.h1>

        <motion.p
          className="text-gray-600 font-semibold"
       
        >
          {description}
        </motion.p>

        <div className="card-actions justify-start mt-3">
          <Mylink
            to={`/details/${skillId}`}
            skill={skill}
            className="btn btn-active"
          >
            View Details
          </Mylink>
        </div>
      </div>
    </motion.div>
  );
};

export default Skillcard;