import { useEffect } from "react";
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
    <Mycontainer>
      <main className="min-h-screen">
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
                src="https://images.unsplash.com/photo-1565022536102-f7645c84354a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1173"
                alt=""
                className="w-full h-[500px] object-cover brightness-75 contrast-125 rounded-lg"
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
                className="w-full h-[500px] object-cover brightness-75 contrast-125 rounded-lg"
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
                className="w-full h-[500px] object-cover brightness-75 contrast-125 rounded-lg"
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
                className="w-full h-[500px] object-cover brightness-75 contrast-125 rounded-lg"
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
                className="w-full h-[500px] object-cover brightness-75 contrast-125 rounded-lg"
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
          ...
        </Swiper>

        {/* Heading */}
        <div className="text-center my-8 md:my-12 space-y-3" data-aos="fade-up">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent tracking-wide">
            Skills that you can use from here
          </h1>

          <div
            className="mx-auto w-20 sm:w-24 h-1 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
            data-aos="zoom-in"
            data-aos-delay="120"
          />
        </div>

        {/* Content */}
        {loading ? (
          <div
            className="py-20 flex items-center justify-center"
            data-aos="fade-up"
          >
            <DotLoader size={100} />
          </div>
        ) : (
          <div>
            <div
              className="mt-4 flex flex-col sm:flex-row gap-3 justify-center mb-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <Mylink
                to="toprated"
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl shadow-sm rounded-xl p-4 border border-gray-100 bg-[#8FABD4]  text-white"
              >
                Top Rated Providers
              </Mylink>
              <Mylink
                to="howworks"
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl shadow-sm rounded-xl p-4 border border-gray-100 bg-[#8FABD4]  text-white"
              >
                How It Works
              </Mylink>
              <Mylink
                to="testimonials"
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl shadow-sm rounded-xl p-4 border border-gray-100 bg-[#8FABD4]  text-white"
              >
                Testimonials
              </Mylink>
            </div>

            <section
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-8 pb-12"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {skill.map((s, idx) => (
                <div
                  key={s.skillId}
                  data-aos="fade-up"
                  data-aos-delay={idx * 50}
                >
                  <Skillcard skill={s} />
                </div>
              ))}
            </section>
          </div>
        )}
      </main>
    </Mycontainer>
  );
};

export default Home;
