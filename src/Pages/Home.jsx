import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaExchangeAlt, FaShieldAlt, FaLock, FaMobileAlt, FaUserPlus, FaListAlt, FaCalendarCheck, FaGraduationCap, FaUsers, FaHandshake, FaHeart, FaMapMarkerAlt, FaFireAlt, FaUserShield, FaChevronDown, FaChevronUp, FaCode, FaMusic, FaLanguage, FaDumbbell, FaStar } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import Mycontainer from "../components/Mycontainer";
import useData from "../hooks/useData";
import Skillcard from "../components/Skillcard";
import { DotLoader } from "react-spinners";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Mylink from "../components/Mylink";
import { Link } from "react-router";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const Home = () => {
  const { skill, loading } = useData();
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out",
      offset: 80,
      once: true,
    });
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // FAQ Data
  const faqData = [
    {
      question: "How does SkillSwap work?",
      answer: "SkillSwap connects people who want to learn new skills with those who can teach them. Simply create an account, list skills you can offer or want to learn, browse available sessions, and book with confidence. It's a peer-to-peer exchange that benefits everyone."
    },
    {
      question: "Is my account information secure?",
      answer: "Absolutely! We use Firebase Authentication, an industry-standard security system by Google. Your personal data is encrypted, and we never share your information with third parties. Your privacy is our priority."
    },
    {
      question: "Do I need to pay to use SkillSwap?",
      answer: "SkillSwap is free to join and browse. Individual skill providers may set their own rates for sessions, or you can arrange skill exchanges where both parties teach each other something new."
    },
    {
      question: "How do bookings work?",
      answer: "Once you find a skill you want to learn, simply click to view details and book a session. Our protected booking system ensures only verified users can access sessions, and you'll receive confirmation once your booking is confirmed."
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white via-cyan-50 to-blue-50 min-h-screen overflow-hidden">
      <main className="min-h-screen">
        
        {/* Hero Section (Swiper) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
          >
            <SwiperSlide>
              <div className="relative h-[400px] md:h-[600px] lg:h-[700px]">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                  alt="Skill Exchange"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#1B3C53]/85 to-[#234C6A]/70" />
                
                {/* Animated accent lines */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-400 rounded-full blur-3xl" />
                  <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl" />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <span className="inline-block bg-cyan-400/20 text-cyan-300 text-sm font-bold px-4 py-2 rounded-full mb-6 border border-cyan-400/40">
                      🚀 Welcome to SkillSwap
                    </span>
                  </motion.div>
                  
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
                  >
                    Share Skills, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-200">
                      Grow Together
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-white/90 max-w-3xl mb-8 leading-relaxed"
                  >
                    Connect with your community and exchange knowledge through meaningful skill sharing. Learn new abilities, teach what you love, and unlock your potential.
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    <Link 
                      to="/all-skills"
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 text-[#0F172A] font-bold px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 transform hover:scale-105 text-center"
                    >
                      Explore Skills Now
                    </Link>
                    <Link 
                      to="/signup"
                      className="bg-white/10 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 text-center backdrop-blur-sm"
                    >
                      Get Started Free
                    </Link>
                  </motion.div>

                  {/* Stats */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20"
                  >
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-bold text-cyan-300">500+</p>
                      <p className="text-white/70 text-sm">Active Skills</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-bold text-cyan-300">10K+</p>
                      <p className="text-white/70 text-sm">Members</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-bold text-cyan-300">4.9★</p>
                      <p className="text-white/70 text-sm">Trust Score</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="relative h-[400px] md:h-[600px] lg:h-[700px]">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                  alt="Learning Together"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#234C6A]/85 to-[#456882]/70" />
                
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400 rounded-full blur-3xl" />
                  <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-500 rounded-full blur-3xl" />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <span className="inline-block bg-purple-400/20 text-purple-300 text-sm font-bold px-4 py-2 rounded-full mb-6 border border-purple-400/40">
                      📚 Learn & Grow
                    </span>
                  </motion.div>

                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
                  >
                    Learn From <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-200">
                      Local Experts
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-white/90 max-w-3xl mb-8 leading-relaxed"
                  >
                    Discover talented individuals in your area ready to share their expertise. Connect with passionate teachers and accelerate your learning journey.
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    <Link 
                      to="/all-skills"
                      className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-purple-400/50 transition-all duration-300 transform hover:scale-105 text-center"
                    >
                      Browse Experts
                    </Link>
                    <Link 
                      to="/"
                      className="bg-white/10 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 text-center backdrop-blur-sm"
                    >
                      Learn More
                    </Link>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="relative h-[400px] md:h-[600px] lg:h-[700px]">
                <img
                  src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                  alt="Teach and Learn"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#1B3C53]/85 to-[#234C6A]/70" />
                
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-20 left-10 w-32 h-32 bg-amber-400 rounded-full blur-3xl" />
                  <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-500 rounded-full blur-3xl" />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <span className="inline-block bg-amber-400/20 text-amber-300 text-sm font-bold px-4 py-2 rounded-full mb-6 border border-amber-400/40">
                      💡 Share Your Passion
                    </span>
                  </motion.div>

                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
                  >
                    Teach What <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200">
                      You Love
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-white/90 max-w-3xl mb-8 leading-relaxed"
                  >
                    Share your expertise and make a real difference in someone's learning journey. Build your teaching profile and impact lives.
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    <Link 
                      to="/add-skill"
                      className="bg-gradient-to-r from-amber-400 to-orange-500 text-[#0F172A] font-bold px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-amber-400/50 transition-all duration-300 transform hover:scale-105 text-center"
                    >
                      List Your Skills
                    </Link>
                    <Link 
                      to="/"
                      className="bg-white/10 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 text-center backdrop-blur-sm"
                    >
                      Discover More
                    </Link>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </motion.div>

        <Mycontainer>
          
          {/* 1. Key Features Section with Background */}
          <section className="py-16 md:py-24 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 relative z-10"
            >
              <motion.span 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-gradient-to-r from-cyan-400/20 to-blue-400/20 text-cyan-600 text-sm font-bold px-4 py-2 rounded-full mb-4 border border-cyan-400/30"
              >
                ✨ Platform Features
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-4">
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Why Choose</span> SkillSwap?
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                A modern platform designed for seamless skill exchange and community learning
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: FaExchangeAlt,
                  title: "Smart Marketplace",
                  desc: "Connect instantly with learners and teachers in your community",
                  gradient: "from-cyan-500 to-blue-600",
                  bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50",
                  accent: "text-cyan-600"
                },
                {
                  icon: FaShieldAlt,
                  title: "Enterprise Security",
                  desc: "Protected with Google Firebase authentication and encryption",
                  gradient: "from-purple-500 to-indigo-600",
                  bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50",
                  accent: "text-purple-600"
                },
                {
                  icon: FaLock,
                  title: "Private & Safe",
                  desc: "Verified bookings and secure communication with verified users",
                  gradient: "from-emerald-500 to-teal-600",
                  bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
                  accent: "text-emerald-600"
                },
                {
                  icon: FaMobileAlt,
                  title: "Fully Responsive",
                  desc: "Beautiful experience across all devices and screen sizes",
                  gradient: "from-orange-500 to-rose-600",
                  bgColor: "bg-gradient-to-br from-orange-50 to-rose-50",
                  accent: "text-orange-600"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  className={`${feature.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-white group relative overflow-hidden`}
                >
                  {/* Background Gradient Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-white to-transparent transition-opacity duration-300" />
                  
                  <div className={`bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="text-white text-2xl" />
                  </div>
                  <h3 className={`text-xl font-bold ${feature.accent} mb-3`}>{feature.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* 2. How It Works Section */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-[#0F172A] via-[#1B3C53] to-[#0F172A] rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-40 h-40 bg-cyan-400 rounded-full blur-3xl" />
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16 relative z-10"
            >
              <motion.span 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-white/10 text-white text-sm font-bold px-4 py-2 rounded-full mb-4 border border-white/20"
              >
                🚀 Getting Started
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                How <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">It Works</span>
              </h2>
              <p className="text-white/80 text-lg max-w-3xl mx-auto">
                Three simple steps to connect, learn, and share your passion with our community
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 max-w-7xl mx-auto px-4">
              {[
                {
                  icon: FaUserPlus,
                  step: "1",
                  title: "Create Account",
                  desc: "Sign up securely with Firebase authentication",
                  color: "from-cyan-400 to-blue-500"
                },
                {
                  icon: FaListAlt,
                  step: "2",
                  title: "Find or List Skills",
                  desc: "Browse available skills or share your expertise",
                  color: "from-purple-400 to-indigo-500"
                },
                {
                  icon: FaCalendarCheck,
                  step: "3",
                  title: "Book Sessions",
                  desc: "Schedule with confidence through our protected system",
                  color: "from-emerald-400 to-teal-500"
                },
                {
                  icon: FaGraduationCap,
                  step: "4",
                  title: "Learn & Grow",
                  desc: "Connect, learn, teach, and build your network",
                  color: "from-orange-400 to-rose-500"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -5 }}
                  className="relative"
                >
                  {/* Connection Line */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-20 left-full w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-transparent -z-10" />
                  )}

                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-sm text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                      className={`bg-gradient-to-br ${item.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    >
                      <item.icon className="text-white text-2xl" />
                    </motion.div>

                    <div className={`bg-gradient-to-br ${item.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 shadow-lg`}>
                      {item.step}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </Mycontainer>

        {/* 3. Popular/Featured Skills Section - Full Width */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-[#0F172A] via-[#1B3C53] to-[#234C6A] relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-20 left-20 w-48 h-48 bg-cyan-400 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-20 right-20 w-48 h-48 bg-blue-400 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.span 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-white/10 text-cyan-300 text-sm font-bold px-4 py-2 rounded-full mb-4 border border-cyan-400/30"
              >
                🔥 Most Popular
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Skills</span>
              </h2>
              <p className="text-white/80 text-lg max-w-3xl mx-auto">
                Explore the most popular skill categories in our growing community
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: FaCode,
                  name: "Coding",
                  tagline: "Web, Mobile & Software",
                  count: "150+ Teachers",
                  gradient: "from-blue-500 to-blue-700",
                  accent: "text-blue-300"
                },
                {
                  icon: FaMusic,
                  name: "Music",
                  tagline: "Instruments & Production",
                  count: "80+ Instructors",
                  gradient: "from-purple-500 to-purple-700",
                  accent: "text-purple-300"
                },
                {
                  icon: FaLanguage,
                  name: "Languages",
                  tagline: "Learn Any Language",
                  count: "120+ Speakers",
                  gradient: "from-emerald-500 to-emerald-700",
                  accent: "text-emerald-300"
                },
                {
                  icon: FaDumbbell,
                  name: "Fitness",
                  tagline: "Training & Wellness",
                  count: "90+ Coaches",
                  gradient: "from-orange-500 to-red-600",
                  accent: "text-orange-300"
                }
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 group hover:border-white/40 transition-all duration-300 cursor-pointer"
                >
                  <div className={`bg-gradient-to-br ${skill.gradient} w-20 h-20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <skill.icon className="text-white text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{skill.name}</h3>
                  <p className="text-white/70 text-sm mb-4">{skill.tagline}</p>
                  <div className={`${skill.accent} text-xs font-bold flex items-center gap-2`}>
                    <span>{skill.count}</span>
                    <span className="text-lg">→</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Link to="/all-skills">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 text-[#0F172A] font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  Explore All Skills →
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 4. Why Choose SkillSwap Section - Full Width */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-white via-cyan-50 to-blue-50 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-30">
            <motion.div
              animate={{ y: [0, 30, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-200 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ y: [0, -30, 0] }}
              transition={{ duration: 7, repeat: Infinity }}
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-[#0F172A]">
                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">SkillSwap?</span>
              </h2>
              <p className="text-gray-700 text-lg max-w-3xl mx-auto">
                Build meaningful connections and unlock your potential in the world's most trusted skill exchange platform
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: FaUsers,
                  title: "Community First",
                  desc: "Join thousands of learners and teachers building a supportive ecosystem"
                },
                {
                  icon: FaUserShield,
                  title: "Enterprise Security",
                  desc: "Google Firebase ensures your data is protected with military-grade encryption"
                },
                {
                  icon: FaHandshake,
                  title: "Seamless Booking",
                  desc: "Our intuitive system makes scheduling and managing sessions effortless"
                },
                {
                  icon: FaMapMarkerAlt,
                  title: "Local & Personal",
                  desc: "Connect with talented individuals in your area and build lasting relationships"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-cyan-200 flex items-start gap-6 group"
                >
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-br from-cyan-500 to-blue-600 p-4 rounded-lg flex-shrink-0"
                  >
                    <item.icon className="text-white text-2xl" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 text-[#0F172A]">{item.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <Mycontainer>

          {/* 5. Trust & Community Section */}
          <section className="py-16 md:py-24 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.span 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-gradient-to-r from-emerald-400/20 to-teal-400/20 text-emerald-700 text-sm font-bold px-4 py-2 rounded-full mb-4 border border-emerald-400/30"
              >
                ✅ Trusted by Thousands
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Trust & </span>Security
              </h2>
              <p className="text-gray-700 text-lg max-w-3xl mx-auto">
                Your safety and privacy are at the core of everything we do
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: FaFireAlt,
                  title: "Firebase Powered",
                  desc: "Google's enterprise-grade authentication for maximum security"
                },
                {
                  icon: FaHeart,
                  title: "Verified Community",
                  desc: "All members go through verification to ensure a safe environment"
                },
                {
                  icon: FaShieldAlt,
                  title: "Data Privacy",
                  desc: "Your information is encrypted and never shared with third parties"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-emerald-100 hover:border-emerald-300 text-center group relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-emerald-400 to-teal-400 transition-opacity duration-300" />
                  
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="bg-gradient-to-br from-emerald-500 to-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                  >
                    <item.icon className="text-white text-2xl" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">{item.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats with animated counters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-[#0F172A] via-[#1B3C53] to-[#234C6A] rounded-3xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 shadow-2xl"
            >
              {[
                { number: "500+", label: "Skills Shared", icon: FaCode },
                { number: "10K+", label: "Active Members", icon: FaUsers },
                { number: "300+", label: "Expert Teachers", icon: FaGraduationCap },
                { number: "4.9★", label: "Average Rating", icon: FaStar }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                    className="mb-4"
                  >
                    <stat.icon className="text-cyan-400 text-3xl mx-auto" />
                  </motion.div>
                  <p className="text-3xl md:text-4xl font-black text-white">{stat.number}</p>
                  <p className="text-white/70 text-sm mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* 6. FAQ Section */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-cyan-50 via-blue-50 to-white rounded-3xl shadow-lg relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-10 right-10 w-40 h-40 border-2 border-cyan-200 rounded-full"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 relative z-10"
            >
              <motion.span 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-gradient-to-r from-blue-400/20 to-cyan-400/20 text-blue-700 text-sm font-bold px-4 py-2 rounded-full mb-4 border border-blue-400/30"
              >
                ❓ Got Questions?
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Frequently</span> Asked Questions
              </h2>
              <p className="text-gray-700 text-lg max-w-3xl mx-auto">
                Find answers to common questions about SkillSwap
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4 relative z-10">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="border-2 border-blue-200 rounded-xl overflow-hidden hover:border-blue-400 transition-colors duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-colors duration-200"
                  >
                    <span className="font-bold text-[#0F172A] text-left text-lg">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {openFaq === index ? (
                        <FaChevronUp className="text-blue-600 flex-shrink-0 text-lg" />
                      ) : (
                        <FaChevronDown className="text-blue-600 flex-shrink-0 text-lg" />
                      )}
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
                    <p className="px-6 py-4 text-gray-700 bg-white border-t-2 border-blue-100">{faq.answer}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 7. Call To Action Section */}
          <section className="py-20 md:py-28 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#0F172A] via-[#1B3C53] to-[#234C6A] rounded-3xl p-8 md:p-16 text-center shadow-2xl relative overflow-hidden"
            >
              {/* Animated Background Elements */}
              <div className="absolute inset-0 opacity-20">
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-10 right-10 w-40 h-40 bg-cyan-400 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute bottom-10 left-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"
                />
              </div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 relative z-10 leading-tight"
              >
                Ready to Share Your Passion?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/90 text-xl mb-10 max-w-2xl mx-auto relative z-10"
              >
                Join thousands of learners and teachers in our vibrant community
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
              >
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 text-[#0F172A] font-bold px-12 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-lg w-full sm:w-auto"
                  >
                    Start Learning Today
                  </motion.button>
                </Link>
                <Link to="/all-skills">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/20 border-2 border-white text-white font-bold px-12 py-4 rounded-xl hover:bg-white/30 transition-all duration-300 text-lg backdrop-blur-sm w-full sm:w-auto"
                  >
                    Browse Skills
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </section>

          {/* Skill Cards Section */}
          <section className="pb-16 md:pb-24 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.span 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-gradient-to-r from-orange-400/20 to-rose-400/20 text-orange-700 text-sm font-bold px-4 py-2 rounded-full mb-4 border border-orange-400/30"
              >
                🎯 Latest Opportunities
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-4">
                Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600">Available Skills</span>
              </h2>
              <p className="text-gray-700 text-lg max-w-3xl mx-auto">
                Explore newly listed skills and connect with top-rated providers in your area
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-3 justify-center mb-12"
            >
              <Mylink
                to="toprated"
                className="bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold hover:scale-105"
              >
                ⭐ Top Rated Providers
              </Mylink>
              <Mylink
                to="howworks"
                className="bg-gradient-to-r from-[#234C6A] to-[#456882] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold hover:scale-105"
              >
                📖 How It Works
              </Mylink>
              <Mylink
                to="testimonials"
                className="bg-gradient-to-r from-[#456882] to-[#0F172A] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold hover:scale-105"
              >
                💬 Testimonials
              </Mylink>
            </motion.div>

            {loading ? (
              <div className="py-20 flex items-center justify-center">
                <DotLoader size={60} color="#1B3C53" />
              </div>
            ) : (
              <>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12"
                >
                  {skill.slice(0, 6).map((s, idx) => (
                    <motion.div
                      key={s.skillId}
                      variants={fadeInUp}
                      whileHover={{ y: -5 }}
                    >
                      <Skillcard skill={s} />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <Link to="/all-skills">
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white font-bold px-12 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-lg"
                    >
                      View All Skills →
                    </motion.button>
                  </Link>
                </motion.div>
              </>
            )}
          </section>

        </Mycontainer>
      </main>
    </div>
  );
};

export default Home;
