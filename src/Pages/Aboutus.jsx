import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaListAlt, FaCalendarCheck, FaGraduationCap, FaUsers, FaShieldAlt, FaLock, FaMobileAlt, FaReact, FaFireAlt, FaNodeJs, FaDatabase } from 'react-icons/fa';
import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Aboutus = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-neutral-light">
      
      {/* Hero Section */}
      <section className=" text-[#0f3c5f] py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className='text-[#BF124D]'>About </span>Skill Exchange
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Connecting people through shared skills
          </motion.p>
          <motion.p 
            className="text-base md:text-lg text-gray/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Skill Exchange helps users learn and teach skills locally in a safe and friendly environment. 
            Whether you want to learn guitar, master a new language, improve your coding skills, 
            or share your fitness expertise, we connect you with passionate individuals in your community.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Mission Card */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border-t-4 border-primary-medium"
              variants={fadeInUp}
              data-aos="fade-right"
            >
              <div className="bg-[#75a8ca] w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaGraduationCap className="text-primary-medium text-3xl" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-dark mb-4">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Making skill learning accessible through local, peer-to-peer connections. 
                We believe everyone has something valuable to teach and learn, and we're here 
                to make those connections seamless and meaningful.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border-t-4 border-primary-light"
              variants={fadeInUp}
              data-aos="fade-left"
            >
              <div className="bg-[#75a8ca] w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaUsers className="text-primary-light text-3xl" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-dark mb-4">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Building a trusted and inclusive community for skill sharing where knowledge flows freely, 
                relationships are built on mutual respect, and every member feels empowered to grow 
                both as a learner and a teacher.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

   
    

    
      {/* Call To Action */}
      <section className="py-20 px-4 ">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#BF124D] mb-4">
            <span className='text-[#0f3c5f]'>Ready to share</span> your skills or <span className='text-[#0f3c5f]'>learn something </span>new?
          </h2>
          <p className="text-gray text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of learners and teachers in our growing community today
          </p>
          <Link to="/signup">
            <motion.button 
              className="bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white font-bold px-10 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </Link>
          <p className="text-gray/120 text-sm mt-6">
            Already have an account? <Link to="/signin" className="text-gray font-semibold underline hover:text-[#BF124D]">Sign In</Link>
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default Aboutus;