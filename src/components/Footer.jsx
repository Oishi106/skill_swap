import React from 'react'
import { Link } from 'react-router'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition">
              <img 
                src="/logo.png" 
                alt="SkillSwap Logo"
                className="w-12 h-12 object-contain"
              />
              <div>
                <h2 className="text-2xl font-black text-cyan-400">SkillSwap</h2>
                <p className="text-xs text-slate-400">Learn & Share Skills</p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 mt-4">
              Connecting learners and professionals to share skills and grow together.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition text-lg">
                <FaFacebook />
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition text-lg">
                <FaTwitter />
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition text-lg">
                <FaLinkedin />
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition text-lg">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Services</h3>
            <div className="space-y-3">
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition block">
                Learn Skills
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition block">
                Teach Skills
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition block">
                Find Experts
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition block">
                Pricing Plans
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Company</h3>
            <div className="space-y-3">
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition block">
                About Us
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition block">
                Blog
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition block">
                Careers
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition block">
                Press Kit
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Support</h3>
            <div className="space-y-3">
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition block">
                Help Center
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition block">
                Contact Us
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition block">
                FAQ
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition block">
                Community
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-cyan-400 text-lg" />
                <a href="mailto:info@skillswap.com" className="text-slate-400 hover:text-cyan-400 transition">
                  info@skillswap.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-cyan-400 text-lg" />
                <a href="tel:+1234567890" className="text-slate-400 hover:text-cyan-400 transition">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-12"></div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Copyright */}
          <div className="text-slate-400 text-sm">
            <p>&copy; 2026 SkillSwap. All rights reserved.</p>
          </div>

          {/* Bottom Links */}
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition">
              Terms of Service
            </a>
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition">
              Cookie Policy
            </a>
          </div>

          {/* Made With Love */}
          <div className="text-slate-400 text-sm text-right">
            <p>Made with ❤️ for the learning community</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer