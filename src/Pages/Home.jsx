import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaExchangeAlt, FaShieldAlt, FaLock, FaMobileAlt, FaUserPlus, FaListAlt, FaCalendarCheck, FaGraduationCap, FaUsers, FaHandshake, FaHeart, FaMapMarkerAlt, FaFireAlt, FaUserShield, FaChevronDown, FaChevronUp, FaCode, FaMusic, FaLanguage, FaDumbbell } from "react-icons/fa";
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
    <div className="bg-gradient-to-b from-white to-[#E3E3E3]">
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
          >
            <SwiperSlide>
              <div className="relative h-[400px] md:h-[500px]">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                  alt="Skill Exchange"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1B3C53]/90 to-[#234C6A]/70" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                  <h2 className="text-3xl sm:text-5xl font-bold mb-4">
                    Share Skills, Grow Together
                  </h2>
                  <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                    Connect with your community and exchange knowledge through meaningful skill sharing
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative h-[400px] md:h-[500px]">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                  alt="Learning Together"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1B3C53]/90 to-[#456882]/70" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                  <h2 className="text-3xl sm:text-5xl font-bold mb-4">
                    Learn From Local Experts
                  </h2>
                  <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                    Discover talented individuals in your area ready to share their expertise
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative h-[400px] md:h-[500px]">
                <img
                  src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                  alt="Teach and Learn"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#234C6A]/90 to-[#1B3C53]/70" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                  <h2 className="text-3xl sm:text-5xl font-bold mb-4">
                    Teach What You Love
                  </h2>
                  <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                    Share your passion and make a difference in someone's learning journey
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </motion.div>

        <Mycontainer>
          
          {/* 1. Key Features Section */}
          <section className="py-16 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-block bg-[#1B3C53]/10 text-[#1B3C53] text-sm font-semibold px-4 py-2 rounded-full mb-4">
                ✨ Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B3C53] mb-4">
               <span className="text-[#BF124D]">Why Skill</span>  Exchange?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                A modern platform built for meaningful skill exchange
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: FaExchangeAlt,
                  title: "Skill Exchange Marketplace",
                  desc: "Connect with others to share and learn new skills in your local community",
                  gradient: "from-[#1B3C53] to-[#234C6A]",
                  bgColor: "bg-[#1B3C53]/5",
                  borderColor: "border-[#1B3C53]/20"
                },
                {
                  icon: FaShieldAlt,
                  title: "Secure Firebase Auth",
                  desc: "Your account is protected with industry-standard Firebase Authentication",
                  gradient: "from-[#234C6A] to-[#456882]",
                  bgColor: "bg-[#234C6A]/5",
                  borderColor: "border-[#234C6A]/20"
                },
                {
                  icon: FaLock,
                  title: "Protected Booking",
                  desc: "Private routes ensure only verified users can access booking features",
                  gradient: "from-[#456882] to-[#1B3C53]",
                  bgColor: "bg-[#456882]/5",
                  borderColor: "border-[#456882]/20"
                },
                {
                  icon: FaMobileAlt,
                  title: "Responsive & Minimal UI",
                  desc: "Clean, modern design that works beautifully on any device",
                  gradient: "from-[#1B3C53] to-[#456882]",
                  bgColor: "bg-[#1B3C53]/5",
                  borderColor: "border-[#1B3C53]/20"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`${feature.bgColor} rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border ${feature.borderColor} group hover:-translate-y-1`}
                >
                  <div className={`bg-gradient-to-br ${feature.gradient} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <feature.icon className="text-white text-xl" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1B3C53] mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* 2. How It Works Section */}
          <section className="py-16 md:py-20  bg-white rounded-3xl shadow-sm -mx-4 px-4 md:-mx-8 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B3C53] mb-4">
                How <span className="text-[#BF124D]">It Works</span> 
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Get started in four simple steps
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: FaUserPlus,
                  step: "01",
                  title: "Sign Up Securely",
                  desc: "Create your free account with secure Firebase authentication"
                },
                {
                  icon: FaListAlt,
                  step: "02",
                  title: "Browse or List Skills",
                  desc: "Share what you can teach or find skills you want to learn"
                },
                {
                  icon: FaCalendarCheck,
                  step: "03",
                  title: "Book with Confidence",
                  desc: "Schedule sessions through our protected booking system"
                },
                {
                  icon: FaGraduationCap,
                  step: "04",
                  title: "Learn & Grow",
                  desc: "Connect, learn, teach, and grow together as a community"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center relative"
                >
                  <div className="bg-gradient-to-br from-[#1B3C53] to-[#234C6A] w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <item.icon className="text-white text-3xl" />
                  </div>
                  <span className="absolute top-0 right-1/2 transform translate-x-14 -translate-y-2 bg-[#BF124D] text-white text-xs font-bold px-2 py-1 rounded-full">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold text-[#1B3C53] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </Mycontainer>

        {/* 3. Popular/Featured Skills Section - Full Width */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-[#1B3C53] via-[#234C6A] to-[#456882]">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
                🔥 Trending Now
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Popular Skills
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Explore trending skill categories in our community
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                {
                  icon: FaCode,
                  name: "Coding",
                  tagline: "Web, Mobile & Software Development",
                  iconBg: "bg-gradient-to-br from-blue-500 to-blue-700",
                  accent: "text-blue-400"
                },
                {
                  icon: FaMusic,
                  name: "Music",
                  tagline: "Instruments, Vocals & Production",
                  iconBg: "bg-gradient-to-br from-purple-500 to-purple-700",
                  accent: "text-purple-400"
                },
                {
                  icon: FaLanguage,
                  name: "Languages",
                  tagline: "Learn Any Language from Natives",
                  iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-700",
                  accent: "text-emerald-400"
                },
                {
                  icon: FaDumbbell,
                  name: "Fitness",
                  tagline: "Training, Yoga & Wellness",
                  iconBg: "bg-gradient-to-br from-orange-500 to-red-600",
                  accent: "text-orange-400"
                }
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 group hover:bg-white/20 hover:-translate-y-2 transition-all duration-300"
                >
                  <div className={`${skill.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <skill.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
                  <p className="text-white/70 text-sm mb-4">{skill.tagline}</p>
                  <div className={`${skill.accent} text-xs font-semibold`}>Learn More →</div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link to="/all-skills">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Explore All Skills
                </motion.button>
              </Link>
            </div>
          </div>
        </section>

        {/* 4. Why Choose SkillSwap Section - Full Width */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1B3C53]">
                Why Choose Skill Exchange?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Built with your needs in mind
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: FaUsers,
                  title: "Community-Driven Learning",
                  desc: "Learn from real people in your community who share your passion"
                },
                {
                  icon: FaUserShield,
                  title: "Secure & Private Accounts",
                  desc: "Your data is protected with industry-leading security measures"
                },
                {
                  icon: FaHandshake,
                  title: "Simple Booking Process",
                  desc: "Intuitive scheduling that makes connecting effortless"
                },
                {
                  icon: FaMapMarkerAlt,
                  title: "Meaningful Local Connections",
                  desc: "Build relationships with skilled individuals in your area"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#E3E3E3] to-white rounded-xl p-6 flex items-start gap-4 hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="bg-gradient-to-br from-[#1B3C53] to-[#234C6A] p-3 rounded-lg">
                    <item.icon className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-[#1B3C53]">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Mycontainer>

          {/* 5. Trust & Community Section */}
          <section className="py-16 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B3C53] mb-4">
                 <span className="text-[#BF124D]">Trust & </span> Community
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Safety and reliability at the core of everything we do
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: FaFireAlt,
                  title: "Firebase Security",
                  desc: "Industry-standard authentication powered by Google's Firebase platform"
                },
                {
                  icon: FaHeart,
                  title: "Inclusive Community",
                  desc: "Respectful guidelines ensure a welcoming environment for all learners"
                },
                {
                  icon: FaShieldAlt,
                  title: "Privacy Protected",
                  desc: "Your personal information is encrypted and never shared with third parties"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg text-center border border-gray-100"
                >
                  <div className="bg-gradient-to-br from-[#456882]/20 to-[#234C6A]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="text-[#234C6A] text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1B3C53] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#E3E3E3] rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { number: "500+", label: "Skills Shared" },
                { number: "1,200+", label: "Active Learners" },
                { number: "300+", label: "Expert Teachers" },
                { number: "98%", label: "Satisfaction Rate" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-[#1B3C53]">{stat.number}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </section>

          {/* 6. FAQ Section */}
          <section className="py-16 md:py-20 bg-white rounded-3xl shadow-sm -mx-4 px-4 md:-mx-8 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B3C53] mb-4">
                 <span className="text-[#BF124D]">Frequently</span> Asked <span className="text-[#BF124D]">Questions</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Quick answers to common questions
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <span className="font-semibold text-[#1B3C53] text-left">{faq.question}</span>
                    {openFaq === index ? (
                      <FaChevronUp className="text-[#234C6A] flex-shrink-0" />
                    ) : (
                      <FaChevronDown className="text-[#234C6A] flex-shrink-0" />
                    )}
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
                    <p className="px-6 py-4 text-gray-600 bg-white">{faq.answer}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 7. Call To Action Section */}
          <section className="py-20 md:py-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-[#1B3C53] via-[#234C6A] to-[#456882] rounded-3xl p-8 md:p-16 text-center shadow-2xl"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to share your skills or learn something new?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Join our growing community of learners and teachers today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Get Started
                  </motion.button>
                </Link>
                <Link to="/all-skills">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-[#1B3C53] font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Browse Skills
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </section>

          {/* Skill Cards Section */}
          <section className="pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B3C53] mb-4">
                Available Skills
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Discover a wide range of skills and connect with top-rated providers
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <Mylink
                to="toprated"
                className="bg-[#1B3C53] text-white px-6 py-3 rounded-xl hover:bg-[#234C6A] transition-colors"
              >
                Top Rated Providers
              </Mylink>
              <Mylink
                to="howworks"
                className="bg-[#234C6A] text-white px-6 py-3 rounded-xl hover:bg-[#1B3C53] transition-colors"
              >
                How It Works
              </Mylink>
              <Mylink
                to="testimonials"
                className="bg-[#456882] text-white px-6 py-3 rounded-xl hover:bg-[#234C6A] transition-colors"
              >
                Testimonials
              </Mylink>
            </div>

            {loading ? (
              <div className="py-20 flex items-center justify-center">
                <DotLoader size={60} color="#234C6A" />
              </div>
            ) : (
              <>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                  {skill.slice(0, 6).map((s, idx) => (
                    <motion.div
                      key={s.skillId}
                      variants={fadeInUp}
                    >
                      <Skillcard skill={s} />
                    </motion.div>
                  ))}
                </motion.div>

                <div className="text-center mt-12">
                  <Link to="/all-skills">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      View All Skills
                    </motion.button>
                  </Link>
                </div>
              </>
            )}
          </section>

        </Mycontainer>
      </main>
    </div>
  );
};

export default Home;
