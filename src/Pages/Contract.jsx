import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaClock, FaLinkedin, FaGithub, FaShieldAlt } from 'react-icons/fa';

const Contract = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-neutral-light">
      {/* Hero Section */}
      <motion.div 
        className="text-[#0f3c5f] py-16 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
           <span className='text-[#BF124D]'>Get in Touch with </span> Skill Exchange
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Have a question, suggestion, or need support? We're here to help.
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Contact Form - Main Focus (2/3 width) */}
          <motion.div 
            className="md:col-span-2"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-8 md:p-10"
              variants={fadeInUp}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              
              {submitSuccess && (
                <motion.div 
                  className="bg-primary-light/10 border border-primary-light text-primary-dark px-4 py-3 rounded-lg mb-6 flex items-center gap-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Message sent successfully! We'll get back to you soon.</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <motion.div variants={fadeInUp}>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.fullName ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary-medium'
                    } focus:outline-none focus:ring-2 focus:ring-primary-light/30 transition-all duration-200`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                  )}
                </motion.div>

                {/* Email Address */}
                <motion.div variants={fadeInUp}>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary-medium'
                    } focus:outline-none focus:ring-2 focus:ring-primary-light/30 transition-all duration-200`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </motion.div>

                {/* Subject Dropdown */}
                <motion.div variants={fadeInUp}>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-medium focus:outline-none focus:ring-2 focus:ring-primary-light/30 transition-all duration-200 bg-white"
                  >
                    <option>General Inquiry</option>
                    <option>Booking Issue</option>
                    <option>Account Support</option>
                    <option>Feedback</option>
                  </select>
                </motion.div>

                {/* Message */}
                <motion.div variants={fadeInUp}>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.message ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary-medium'
                    } focus:outline-none focus:ring-2 focus:ring-primary-light/30 transition-all duration-200 resize-none`}
                    placeholder="Tell us how we can help you..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={fadeInUp}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-[#1B3C53] to-[#234C6A] hover:bg-[#1B3C53] text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </motion.div>

                {/* Trust & Privacy Note */}
                <motion.div 
                  className="text-center pt-4 space-y-2"
                  variants={fadeInUp}
                >
                  <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                    <FaShieldAlt className="text-primary-medium" />
                    Your information is protected and never shared.
                  </p>
                
                </motion.div>
              </form>
            </motion.div>
          </motion.div>

          {/* Support Information Panel (1/3 width) */}
          <motion.div 
            className="md:col-span-1 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Contact Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Support Information</h3>
              
              <div className="space-y-5">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-primary-light/20 p-3 rounded-lg">
                    <FaEnvelope className="text-primary-medium text-xl" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Email Us</p>
                    <a href="mailto:support@skillswap.com" className="text-primary-medium hover:text-primary-dark font-medium transition-colors">
                      support@skillswap.com
                    </a>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start gap-4">
                  <div className="bg-primary-medium/20 p-3 rounded-lg">
                    <FaClock className="text-primary-light text-xl" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Response Time</p>
                    <p className="text-sm text-gray-600">We usually respond within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* Social Media */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Connect With Us</p>
                <div className="flex gap-3">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-primary-light/20 hover:bg-primary-light/30 p-3 rounded-lg transition-colors duration-200"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="text-primary-medium text-xl" />
                  </a>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition-colors duration-200"
                    aria-label="GitHub"
                  >
                    <FaGithub className="text-gray-700 text-xl" />
                  </a>
                </div>
              </div>
            </div>

         

            {/* Community Note */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Join Our Community</h4>
                  <p className="text-sm text-gray-600">
                    Connect with other skill-sharers and get peer support in real-time.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contract;