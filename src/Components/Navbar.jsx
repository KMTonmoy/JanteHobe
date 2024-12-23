"use client";

import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { AuthContext } from '@/Provider/AuthProvider';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileMenuVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0 },
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const { user, logOut } = useContext(AuthContext);

  return (
    <motion.nav
      className="bg-[#EBF3FF]  capitalize shadow-md  w-full top-0 z-50 px-6 py-4 flex justify-between items-center font-inter"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Logo */}
      <motion.div
        className="text-2xl font-bold text-gray-800"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <img
          src="https://i.ibb.co/qNmmYJ8/logo-removebg-preview12.png"
          className="h-[50px]"
          alt="Logo"
        />
      </motion.div>

      {/* Desktop Links */}
      <motion.div
        className="hidden lg:flex gap-6 text-gray-700"
        whileHover={{ opacity: 1 }}
      >
        {['Home', 'class', 'About Us', 'Services', 'Contact',].map((link) => (
          <motion.div
            key={link}
            whileHover={{ y: -3, color: '#7e22ce' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              href={`/${link === 'Home' ? '' : link.toLowerCase().replace(/\s/g, '')}`}
              className={`hover:text-purple-700 ${activeLink === link ? 'text-purple-700 underline' : ''}`}
              onClick={() => handleLinkClick(link)}
            >
              {link}
            </Link>
          </motion.div>
        ))}
        {user && (
          <Link
            href='/dashboard'
            className={`hover:text-purple-700 `}
         
          >
            Dashboard
          </Link>
        )}
      </motion.div>

      {/* User Profile or Login */}
      <div className="hidden lg:flex items-center gap-4">
        {user ? (
          <>
            <img
              src={user.photoURL}
              alt="User Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
            <button
              onClick={logOut}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              LogOut
            </button>
          </>
        ) : (
          <Link href={'/login'}>
            <motion.button
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </Link>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="lg:hidden text-gray-800 text-2xl"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg p-6 lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        variants={mobileMenuVariants}
        initial="hidden"
        animate={isMobileMenuOpen ? 'visible' : 'hidden'}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      >
        <div className="flex flex-col gap-4 text-gray-800">
          {['Home', 'class', 'About Us', 'Services', 'Contact'].map((link) => (
            <motion.div
              key={link}
              whileHover={{ x: 10, color: '#7e22ce' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <Link
                href={`/${link === 'Home' ? '' : link.toLowerCase().replace(/\s/g, '')}`}
                className={`text-lg font-medium ${activeLink === link ? 'text-purple-700 underline' : ''}`}
                onClick={() => {
                  handleLinkClick(link);
                  setIsMobileMenuOpen(false);
                }}
              >
                {link}
              </Link>
            </motion.div>
          ))}

          {!user ? (
            <motion.button
              className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          ) : (
            <button
              onClick={logOut}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              LogOut
            </button>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
