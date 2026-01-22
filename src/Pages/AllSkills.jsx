import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { 
  FaSearch, FaTimes, FaStar, FaUsers, FaFire, FaTh, FaList, 
  FaSortAmountDown, FaSortAmountUp, FaChevronDown, FaPlus,
  FaMusic, FaLanguage, FaCode, FaPalette, FaDumbbell, FaChartLine,
  FaRobot, FaBullhorn, FaPaintBrush, FaFilter, FaCalendarAlt
} from 'react-icons/fa';
import useData from '../hooks/useData';
import Skillcard from '../components/Skillcard';
import { DotLoader } from 'react-spinners';

const AllSkills = () => {
  const { skill, loading } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Categories with icons and colors
  const categories = [
    { name: 'All', icon: FaFilter, color: 'bg-gradient-to-r from-[#1B3C53] to-[#234C6A]' },
    { name: 'Music', icon: FaMusic, color: 'bg-gradient-to-r from-purple-500 to-purple-700' },
    { name: 'Language', icon: FaLanguage, color: 'bg-gradient-to-r from-emerald-500 to-emerald-700' },
    { name: 'Programming', icon: FaCode, color: 'bg-gradient-to-r from-blue-500 to-blue-700' },
    { name: 'Design', icon: FaPalette, color: 'bg-gradient-to-r from-pink-500 to-rose-600' },
    { name: 'Fitness', icon: FaDumbbell, color: 'bg-gradient-to-r from-orange-500 to-red-600' },
    { name: 'Data Science', icon: FaChartLine, color: 'bg-gradient-to-r from-cyan-500 to-cyan-700' },
    { name: 'Artificial Intelligence', icon: FaRobot, color: 'bg-gradient-to-r from-violet-500 to-violet-700' },
    { name: 'Marketing', icon: FaBullhorn, color: 'bg-gradient-to-r from-amber-500 to-amber-700' },
    { name: 'Creative', icon: FaPaintBrush, color: 'bg-gradient-to-r from-teal-500 to-teal-700' },
    { name: 'Communication', icon: FaBullhorn, color: 'bg-gradient-to-r from-indigo-500 to-indigo-700' },
  ];

  // Sort options
  const sortOptions = [
    { value: 'popularity', label: 'Popularity', icon: FaFire },
    { value: 'rating-high', label: 'Rating: High → Low', icon: FaSortAmountDown },
    { value: 'price-low', label: 'Price: Low → High', icon: FaSortAmountUp },
    { value: 'price-high', label: 'Price: High → Low', icon: FaSortAmountDown },
    { value: 'latest', label: 'Latest Added', icon: FaCalendarAlt },
  ];

  // Filter and sort skills
  const filteredSkills = useMemo(() => {
    let result = [...skill];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(s => 
        s.skillName?.toLowerCase().includes(term) ||
        s.providerName?.toLowerCase().includes(term) ||
        s.category?.toLowerCase().includes(term) ||
        s.description?.toLowerCase().includes(term)
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(s => s.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'rating-high':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'latest':
        result.sort((a, b) => b.skillId - a.skillId);
        break;
      case 'popularity':
      default:
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [skill, searchTerm, selectedCategory, sortBy]);

  // Get trending skills (top 4 by rating)
  const trendingSkills = useMemo(() => {
    return [...skill].sort((a, b) => b.rating - a.rating).slice(0, 4);
  }, [skill]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('popularity');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
  };

  // Skill Card Component
  const SkillCard = ({ skill, isListView = false }) => {
    const getCategoryColor = (category) => {
      const cat = categories.find(c => c.name === category);
      return cat ? cat.color : 'bg-gradient-to-r from-gray-500 to-gray-700';
    };

    if (isListView) {
      return (
        <motion.div
          variants={fadeInUp}
          className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col md:flex-row"
        >
          <div className="md:w-64 h-48 md:h-auto relative overflow-hidden">
            <img 
              src={skill.image} 
              alt={skill.skillName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className={`absolute top-3 left-3 ${getCategoryColor(skill.category)} text-white text-xs font-semibold px-3 py-1.5 rounded-full`}>
              {skill.category}
            </span>
          </div>
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#1B3C53] mb-2 hover:text-[#234C6A] transition-colors">
                {skill.skillName}
              </h3>
              <p className="text-gray-500 text-sm mb-3">by {skill.providerName}</p>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">{skill.description}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="font-semibold text-[#1B3C53]">{skill.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <FaUsers className="text-[#456882]" />
                  <span>{skill.slotsAvailable} slots</span>
                </div>
                <span className="text-2xl font-bold text-[#1B3C53]">${skill.price}</span>
              </div>
              <Link to={`/viewdetails/${skill.skillId}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white font-semibold px-6 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  View / Book Now
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        variants={fadeInUp}
        className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={skill.image} 
            alt={skill.skillName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className={`absolute top-3 left-3 ${getCategoryColor(skill.category)} text-white text-xs font-semibold px-3 py-1.5 rounded-full`}>
            {skill.category}
          </span>
          {skill.rating >= 4.8 && (
            <span className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <FaFire className="text-xs" /> Hot
            </span>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-[#1B3C53] mb-1 group-hover:text-[#234C6A] transition-colors line-clamp-1">
            {skill.skillName}
          </h3>
          <p className="text-gray-500 text-sm mb-2">by {skill.providerName}</p>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400 text-sm" />
              <span className="font-semibold text-[#1B3C53] text-sm">{skill.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <FaUsers className="text-[#456882]" />
              <span>{skill.slotsAvailable} slots available</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2 mb-4">{skill.description}</p>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-2xl font-bold text-[#1B3C53]">${skill.price}</span>
            <Link to={`/viewdetails/${skill.skillId}`}>
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-[#E3E3E3]">
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#1B3C53] via-[#234C6A] to-[#456882] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            All Skills
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Browse, learn, or book skills from local experts.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        
        {/* Search & Filter Section */}
        <motion.section 
          className="bg-white rounded-2xl shadow-lg p-6 mb-10 -mt-12 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search skills or providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-gray-200 focus:border-[#234C6A] focus:outline-none transition-colors text-gray-700"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-3 px-5 py-4 rounded-xl border-2 border-gray-200 hover:border-[#234C6A] transition-colors bg-white min-w-[200px] justify-between"
              >
                <span className="text-gray-700">
                  {sortOptions.find(o => o.value === sortBy)?.label}
                </span>
                <FaChevronDown className={`text-gray-400 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {showSortDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => { setSortBy(option.value); setShowSortDropdown(false); }}
                        className={`w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-gray-50 transition-colors ${
                          sortBy === option.value ? 'bg-[#E3E3E3] text-[#1B3C53] font-semibold' : 'text-gray-700'
                        }`}
                      >
                        <option.icon className="text-[#456882]" />
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 border-2 border-gray-200 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-[#1B3C53] text-white' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <FaTh />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === 'list' 
                    ? 'bg-[#1B3C53] text-white' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <FaList />
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedCategory === category.name
                    ? `${category.color} text-white shadow-md`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon className="text-sm" />
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Featured / Trending Skills Section */}
        {selectedCategory === 'All' && !searchTerm && (
          <motion.section 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <FaFire className="text-orange-500 text-2xl" />
              <h2 className="text-2xl font-bold text-[#1B3C53]">Trending Skills</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingSkills.map((s) => (
                <motion.div
                  key={s.skillId}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-[#1B3C53] to-[#234C6A] rounded-2xl p-5 text-white relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12" />
                  <div className="flex items-start gap-4">
                    <img 
                      src={s.image} 
                      alt={s.skillName}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-sm line-clamp-1">{s.skillName}</h3>
                      <p className="text-white/70 text-xs mt-1">by {s.providerName}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <FaStar className="text-yellow-400 text-xs" />
                        <span className="text-sm font-semibold">{s.rating}</span>
                        <span className="text-white/60 text-xs">• ${s.price}</span>
                      </div>
                    </div>
                  </div>
                  <Link to={`/details/${s.skillId}`}>
                    <button className="w-full mt-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white text-sm font-semibold py-2.5 rounded-lg transition-all">
                      View Details
                    </button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Results Count & Active Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <p className="text-gray-600">
            Showing <span className="font-bold text-[#1B3C53]">{filteredSkills.length}</span> skills
            {selectedCategory !== 'All' && (
              <span> in <span className="font-semibold text-[#234C6A]">{selectedCategory}</span></span>
            )}
            {searchTerm && (
              <span> for "<span className="font-semibold text-[#234C6A]">{searchTerm}</span>"</span>
            )}
          </p>
          {(selectedCategory !== 'All' || searchTerm || sortBy !== 'popularity') && (
            <button 
              onClick={clearFilters}
              className="text-[#BF124D] hover:text-[#a01040] font-medium text-sm flex items-center gap-1 transition-colors"
            >
              <FaTimes className="text-xs" />
              Clear All Filters
            </button>
          )}
        </div>

        {/* Skills Grid/List */}
        <section className="mb-16">
          {loading ? (
            <div className="py-20 flex items-center justify-center">
              <DotLoader size={60} color="#234C6A" />
            </div>
          ) : filteredSkills.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-6"
              }
            >
              {filteredSkills.map((s, idx) => (
                <motion.div key={s.skillId} variants={fadeInUp}>
                  <Skillcard skill={s} index={idx} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white rounded-2xl shadow-sm"
            >
              <div className="bg-[#E3E3E3] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaSearch className="text-[#456882] text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-[#1B3C53] mb-3">No Skills Found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                No skills match your current filter/search. Try adjusting your filters.
              </p>
              
              {/* Suggest Popular Skills */}
              <div className="mb-8">
                <p className="text-gray-500 text-sm mb-4">Try these popular categories:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Programming', 'Music', 'Design', 'Language'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); setSearchTerm(''); }}
                      className="px-4 py-2 bg-gray-100 hover:bg-[#E3E3E3] text-gray-700 rounded-full text-sm transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={clearFilters}
                className="bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white font-semibold px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                View All Skills
              </button>
            </motion.div>
          )}
        </section>

        {/* Call To Action Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#1B3C53] via-[#234C6A] to-[#456882] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-20 -translate-y-20" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full translate-x-20 translate-y-20" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Have a Skill to Share?
              </h3>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Join our community of skill providers. Share your expertise and help others learn something new!
              </p>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                >
                  <FaPlus />
                  Add Skill
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AllSkills;
