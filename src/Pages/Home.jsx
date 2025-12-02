import { useEffect } from "react";
import { motion } from "framer-motion";

// Animation variants for scroll-triggered entrance
const leftVariant = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};
const rightVariant = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};
const titleAnim = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
};
import AOS from "aos";
import "aos/dist/aos.css";
import Mycontainer from "../components/Mycontainer";
import useData from "../hooks/useData";
import Skillcard from "../components/Skillcard";
import { DotLoader } from "react-spinners";
// for swiper
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Mylink from "../components/Mylink";

const Home = () => {
  const { skill, loading } = useData();

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out",
      offset: 80,
      once: true,
    });
  }, []);

  return (
    <div className="">
      <main className="min-h-screen ">
        {/* 1. Hero Section (Swiper) - already present, add framer-motion */}
        <motion.div
          variants={leftVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332"
                  alt=""
                  className="w-full h-full object-cover brightness-75 contrast-125 rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 rounded-lg" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                  <h2 className="text-3xl sm:text-4xl font-bold drop-shadow-lg">
                    “Practice English Daily”
                  </h2>
                  <p className="mt-2 text-lg opacity-90">
                    Every expert was once a beginner.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171"
                  alt=""
                  className="w-full h-full object-cover brightness-75 contrast-125 rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 rounded-lg" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                  <h2 className="text-3xl sm:text-4xl font-bold drop-shadow-lg">
                    “Keep Learning, Keep Growing”
                  </h2>
                  <p className="mt-2 text-lg opacity-90">
                    Consistency beats talent every time.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative">
                <img
                  src="https://plus.unsplash.com/premium_photo-1685086785054-d047cdc0e525?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332"
                  alt=""
                  className="w-full h-full object-cover brightness-75 contrast-125 rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 rounded-lg" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                  <h2 className="text-3xl sm:text-4xl font-bold drop-shadow-lg">
                    “Dream Big, Work Hard”
                  </h2>
                  <p className="mt-2 text-lg opacity-90">
                    Small steps lead to great distances.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332"
                  alt=""
                  className="w-full h-full object-cover brightness-75 contrast-125 rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 rounded-lg" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                  <h2 className="text-3xl sm:text-4xl font-bold drop-shadow-lg">
                    “Turn Effort Into Achievement”
                  </h2>
                  <p className="mt-2 text-lg opacity-90">
                    The harder you work, the luckier you get.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative">
                <img
                  src="https://plus.unsplash.com/premium_photo-1664194584446-6d35dc1b3760?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1237"
                  alt=""
                  className="w-full h-full object-cover brightness-75 contrast-125 rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 rounded-lg" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                  <h2 className="text-3xl sm:text-4xl font-bold drop-shadow-lg">
                    “Make Today Count”
                  </h2>
                  <p className="mt-2 text-lg opacity-90">
                    Don’t wish for it — work for it.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </motion.div>

        <Mycontainer>
          {/* 2. Features/Benefits Section */}
          <motion.section
            variants={rightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="my-16"
          >
            <motion.h2
              variants={titleAnim}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="text-[40px] md:text-4xl font-extrabold text-center mb-4 bg-linear-to-r from-[#CF4B00] to-[#F4991A]  bg-clip-text text-transparent tracking-wide drop-shadow-lg"
            >
              Why Choose Us?
            </motion.h2>
            <div className="flex flex-col items-center mb-6">
              <p className="text-lg text-gray-600 max-w-xl text-center">
                Unlock your potential with our curated platform, designed for
                growth and excellence.
              </p>
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
                alt="Benefits"
                className="mt-4 rounded-xl shadow-lg w-40 h-28 object-cover"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  title: "Verified Experts",
                  desc: "All providers are vetted for quality.",
                  img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
                },
                {
                  title: "Flexible Learning",
                  desc: "Learn at your own pace, anytime.",
                  img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
                },
                {
                  title: "Community Support",
                  desc: "Get help from a vibrant community.",
                  img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
                },
              ].map((f, i) => (
                <motion.div
                  key={f.title}
                  variants={i % 2 === 0 ? leftVariant : rightVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  whileHover={{ scale: 1.07 }}
                  className="rounded-xl p-6 shadow-xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border border-blue-200 flex flex-col items-center"
                >
                  <img
                    src={f.img}
                    alt={f.title}
                    className="w-20 h-20 rounded-full mb-3 shadow-md object-cover"
                  />
                  <h3 className="font-semibold text-lg mb-2 text-blue-600 animate-pulse">
                    {f.title}
                  </h3>
                  <p className="text-gray-700 text-center">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* 3. Top Categories Section */}
          <motion.section
            variants={leftVariant}
            initial="hidden" 
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="my-16"
          >
            <motion.h2
              variants={titleAnim}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="text-3xl md:text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-wide drop-shadow-lg"
            >
              Top Skill Categories
            </motion.h2>
            <div className="flex flex-col items-center mb-6">
              <p className="text-lg text-gray-600 max-w-xl text-center">
                Explore trending categories and find your passion.
              </p>
              <img
                src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
                alt="Categories"
                className="mt-4 rounded-xl shadow-lg w-40 h-28 object-cover"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 justify-center">
              {["Programming", "Design", "Marketing", "Languages"].map(
                (cat, i) => (
                  <motion.div
                    key={cat}
                    variants={i % 2 === 0 ? leftVariant : rightVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    whileHover={{ scale: 1.13, rotate: 2 }}
                    className="rounded-xl p-5 shadow-xl bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 border border-green-200 text-center font-semibold text-lg text-green-700"
                  >
                    {cat}
                  </motion.div>
                )
              )}
            </div>
          </motion.section>

          {/* 4. How It Works Section */}
          <motion.section
            variants={rightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="my-16"
          >
            <motion.h2
              variants={titleAnim}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className=" text-3xl md:text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent tracking-wide drop-shadow-lg"
            >
              How It Works
            </motion.h2>
            <div className="flex flex-col items-center mb-6">
              <p className="text-lg text-gray-600 max-w-xl text-center">
                Get started in three simple steps and begin your learning
                journey.
              </p>
              <img
                src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80"
                alt="How it works"
                className="mt-4 rounded-xl shadow-lg w-40 h-28 object-cover"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              {[
                {
                  step: "Sign Up",
                  desc: "Create your free account.",
                  img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
                },
                {
                  step: "Browse Skills",
                  desc: "Find the skill you want to learn.",
                  img: "https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8f9?auto=format&fit=crop&w=400&q=80",
                },
                {
                  step: "Connect",
                  desc: "Message providers and start learning.",
                  img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80",
                },
              ].map((s, i) => (
                <motion.div
                  key={s.step}
                  variants={i % 2 === 0 ? leftVariant : rightVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  whileHover={{ scale: 1.07 }}
                  className="rounded-xl p-6 shadow-xl bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 border border-yellow-200 w-full md:w-1/3 flex flex-col items-center"
                >
                  <img
                    src={s.img}
                    alt={s.step}
                    className="w-16 h-16 rounded-full mb-3 shadow-md object-cover"
                  />
                  <h3 className="font-semibold text-lg mb-2 text-yellow-600 animate-bounce">
                    {s.step}
                  </h3>
                  <p className="text-gray-700 text-center">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* 5. Testimonials Section */}
          <motion.section
            variants={leftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="my-16"
          >
            <motion.h2
              variants={titleAnim}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="text-3xl md:text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-indigo-400 via-blue-400 to-green-400 bg-clip-text text-transparent tracking-wide drop-shadow-lg"
            >
              What Our Users Say
            </motion.h2>
            <div className="flex flex-col items-center mb-6">
              <p className="text-lg text-gray-600 max-w-xl text-center">
                Real stories from our learners and providers.
              </p>
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
                alt="Testimonials"
                className="mt-4 rounded-xl shadow-lg w-40 h-28 object-cover"
              />
            </div>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
            >
              {[
                {
                  name: "Ava",
                  text: "Amazing platform! I improved my skills quickly.",
                  img: "https://randomuser.me/api/portraits/women/44.jpg",
                },
                {
                  name: "Liam",
                  text: "Great community and support.",
                  img: "https://randomuser.me/api/portraits/men/32.jpg",
                },
                {
                  name: "Sophia",
                  text: "Easy to use and very helpful.",
                  img: "https://randomuser.me/api/portraits/women/65.jpg",
                },
              ].map((t, i) => (
                <SwiperSlide key={t.name}>
                  <motion.div
                    variants={i % 2 === 0 ? leftVariant : rightVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    className="rounded-xl p-8 shadow-2xl bg-gradient-to-br from-indigo-50 via-blue-50 to-green-50 border border-indigo-200 text-center flex flex-col items-center"
                  >
                    <img
                      src={t.img}
                      alt={t.name}
                      className="w-16 h-16 rounded-full mb-3 shadow-md object-cover"
                    />
                    <p className="text-lg italic text-gray-800">“{t.text}”</p>
                    <span className="block mt-4 font-semibold text-indigo-600">
                      - {t.name}
                    </span>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.section>

          {/* 6. Call to Action Section */}
          <motion.section
            variants={rightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="my-16 flex flex-col items-center justify-center"
          >
            <div className="rounded-2xl px-8 py-10 bg-gradient-to-r from-fuchsia-600 via-blue-600 to-cyan-400 shadow-2xl text-center">
              <motion.h2
                variants={titleAnim}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="text-3xl md:text-4xl font-extrabold text-white mb-4 animate-pulse"
              >
                Ready to start learning?
              </motion.h2>
              <p className="text-lg text-blue-100 mb-4">
                Sign up now and unlock a world of opportunities!
              </p>
              <img
                src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
                alt="Join Now"
                className="mx-auto mb-6 rounded-xl shadow-lg w-40 h-28 object-cover"
              />
              <Mylink
                to="signup"
                className="btn btn-lg bg-white text-fuchsia-600 font-bold shadow-lg rounded-xl px-6 py-3 hover:bg-fuchsia-100 transition-all"
              >
                Join Now
              </Mylink>
            </div>
          </motion.section>

          {/* 7. Skill Cards Section (already present, add framer-motion) */}
          <motion.div
            variants={leftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="text-center my-8 md:my-12 space-y-3">
              <motion.h1
                variants={titleAnim}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent tracking-wide drop-shadow-lg animate-bounce"
              >
                Skills that you can use from here
              </motion.h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Discover a wide range of skills and connect with top-rated
                providers.
              </p>
              <img
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80"
                alt="Skills"
                className="mx-auto mt-4 rounded-xl shadow-lg w-40 h-28 object-cover"
              />
              <div className="mx-auto w-20 sm:w-24 h-1 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full" />
            </div>

            {/* Content */}
            {loading ? (
              <div className="py-20 flex items-center justify-center">
                <DotLoader size={100} />
              </div>
            ) : (
              <div>
                <motion.div
                  variants={rightVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  className="mt-4 flex flex-col sm:flex-row gap-3 justify-center mb-4"
                >
                  <Mylink
                    to="toprated"
                    className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl shadow-sm rounded-xl p-4 border border-gray-100 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white font-bold"
                  >
                    Top Rated Providers
                  </Mylink>
                  <Mylink
                    to="howworks"
                    className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl shadow-sm rounded-xl p-4 border border-gray-100 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text- from-[#CF4B00] to-[#F4991A]  font-bold"
                  >
                    How It Works
                  </Mylink>
                  <Mylink
                    to="testimonials"
                    className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl shadow-sm rounded-xl p-4 border border-gray-100 bg-gradient-to-r from-indigo-400 via-blue-400 to-green-400 text-white font-bold"
                  >
                    Testimonials
                  </Mylink>
                </motion.div>

                <section className="grid grid-cols-1 gap-5 lg:grid-cols-3 md:grid-cols-2 md:gap-8 pb-12">
                  {skill.map((s, idx) => (
                    <motion.div
                      key={s.skillId}
                      variants={idx % 2 === 0 ? leftVariant : rightVariant}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Skillcard skill={s} />
                    </motion.div>
                  ))}
                </section>
              </div>
            )}
          </motion.div>
        </Mycontainer>
      </main>
    </div>
  );
};

export default Home;