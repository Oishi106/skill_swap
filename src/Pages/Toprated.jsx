// src/pages/TopRatedProviders.jsx
import Mycontainer from "../components/Mycontainer";
import useData from "../hooks/useData";
import Skillcard from "../components/Skillcard";
import { DotLoader } from "react-spinners";

const Toprated = () => {
  const { skill, loading } = useData();

  // Filter & sort by rating desc
  const topRated = !loading
    ? skill.filter((s) => Number(s.rating) >= 4.8).sort((a, b) => b.rating - a.rating)
    : [];

  return (
    <main className="min-h-screen">
      <Mycontainer>
        <div className="text-center my-8 md:my-12 space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Top Rated Providers
          </h1>
          <p className="text-base text-gray-600">
            Only courses with rating <span className="font-semibold">4.8+</span>
          </p>
        </div>

        {loading ? (
          <div className="py-16 flex items-center justify-center">
            <DotLoader size={30} />
          </div>
        ) : topRated.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            No top-rated courses found yet. Check back soon!
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-8 pb-12">
            {topRated.map((s) => (
              <Skillcard key={s.skillId} skill={s} />
            ))}
          </section>
        )}
      </Mycontainer>
    </main>
  );
};

export default Toprated;
