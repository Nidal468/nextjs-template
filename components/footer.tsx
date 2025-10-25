'use client'

import Link from 'next/link';
import { Twitter, Facebook, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-gray-50 py-10 px-6 border-t border-gray-200">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8"
      >
        {/* Logo & Description */}
        <div className="md:col-span-1 flex flex-col space-y-4">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-serif font-bold text-[#3a506b]">FreeChapters</span>
          </Link>
          <p className="text-sm text-gray-600 font-sans">
            Your digital library for discovering and exploring a vast collection of novels.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="md:col-span-2 grid grid-cols-2 gap-6">
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-semibold text-[#3a506b] uppercase tracking-wider font-sans">Explore</h3>
            <nav className="flex flex-col space-y-2">
              {['Home', 'About', 'Services', 'Blog'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-sm text-gray-600 hover:text-[#3a506b] transition-colors font-sans"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-semibold text-[#3a506b] uppercase tracking-wider font-sans">Help</h3>
            <nav className="flex flex-col space-y-2">
              {['Pricing', 'FAQ', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-sm text-gray-600 hover:text-[#3a506b] transition-colors font-sans"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-sm font-semibold text-[#3a506b] uppercase tracking-wider font-sans">Connect</h3>
          <div className="flex space-x-4">
            {[
              { icon: Twitter, url: 'https://twitter.com/freechapters' },
              { icon: Facebook, url: 'https://facebook.com/freechapters' },
              { icon: Linkedin, url: 'https://linkedin.com/company/freechapters' },
              { icon: Github, url: 'https://github.com/freechapters' },
            ].map((social, index) => (
              <Link
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#5bc0be] transition-colors"
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Copyright */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-7xl mx-auto pt-8 mt-8 border-t border-gray-200"
      >
        <p className="text-xs text-gray-500 text-center font-sans">
          © {new Date().getFullYear()} FreeChapters. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;