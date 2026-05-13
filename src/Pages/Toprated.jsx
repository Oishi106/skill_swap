import Mycontainer from "../components/Mycontainer";
import useData from "../hooks/useData";
import Skillcard from "../components/Skillcard";
import { DotLoader } from "react-spinners";
import { FaStar, FaCrown, FaFireAlt } from "react-icons/fa";

const Toprated = () => {
  const { skill, loading } = useData();

  const topRated = !loading
    ? skill
        .filter((s) => Number(s.rating) >= 4.8)
        .sort((a, b) => b.rating - a.rating)
    : [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <Mycontainer>

        {/* HERO HEADER */}
        <section className="text-center py-14 md:py-20 space-y-4">
          <div className="flex justify-center">
            <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
              <FaCrown />
              Elite Providers Only
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500">Top Rated</span> Skill <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B3C53] to-[#234C6A]">Providers</span>
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Discover highly trusted mentors with exceptional ratings (4.8+).
            Learn from the best in the community.
          </p>

          <div className="flex justify-center gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <FaStar className="text-yellow-500" /> Verified Ratings
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <FaFireAlt className="text-red-500" /> Top Performers
            </span>
          </div>
        </section>

        {/* LOADING */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-4">
            <DotLoader size={60} color="#1B3C53" />
            <p className="text-gray-500">Loading top rated providers...</p>
          </div>
        ) : topRated.length === 0 ? (
          /* EMPTY STATE */
          <div className="py-24 text-center">
            <div className="text-6xl mb-4">⭐</div>
            <h2 className="text-xl font-bold text-gray-700">
              No top-rated providers yet
            </h2>
            <p className="text-gray-500 mt-2">
              Check back later as new experts join the platform.
            </p>
          </div>
        ) : (
          <>
            {/* GRID HEADER */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg md:text-xl font-bold text-[#1B3C53]">
                Showing {topRated.length} Elite Providers
              </h2>

              <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
                Sorted by rating
              </span>
            </div>

            {/* CARDS GRID */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
              {topRated.map((s, index) => (
                <div
                  key={s.skillId}
                  className="relative group"
                >
                  {/* rank badge */}
                  <div className="absolute -top-3 -left-3 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    #{index + 1}
                  </div>

                  {/* glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-pink-100 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition"></div>

                  <div className="relative">
                    <Skillcard skill={s} />
                  </div>
                </div>
              ))}
            </section>

            {/* FOOTER NOTE */}
            <div className="text-center pb-12">
              <p className="text-sm text-gray-500">
                Ratings are based on community feedback and verified reviews.
              </p>
            </div>
          </>
        )}
      </Mycontainer>
    </main>
  );
};

export default Toprated;