'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import Link from 'next/link'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')


  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  }

  const mobileMenuVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0 }
  }

  const handleLinkClick = link => {
    setActiveLink(link)
  }

  return (
    <motion.nav
      className='bg-[#EBF3FF] capitalize shadow-md fixed w-full  top-0 z-50 px-6 py-4 flex justify-between items-center font-inter'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Logo */}
      <motion.div
        className='text-2xl font-bold text-gray-800'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <img
          src='https://i.ibb.co/qNmmYJ8/logo-removebg-preview12.png'
          className='h-[50px]'
        />
      </motion.div>

      {/* Desktop Links */}
      <motion.div
        className='hidden lg:flex gap-6 text-gray-700'
        whileHover={{ opacity: 1 }}
      >
        <motion.div
          key='Home'
          whileHover={{ y: -3, color: '#7e22ce' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Link
            href='/'
            className={`hover:text-purple-700 ${activeLink === 'Home' ? 'text-purple-700 underline' : ''
              }`}
            onClick={() => handleLinkClick('Home')}
          >
            Home
          </Link>
        </motion.div>

        <motion.div
          key='class'
          whileHover={{ y: -3, color: '#7e22ce' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Link
            href='/class'
            className={`hover:text-purple-700 ${activeLink === 'class' ? 'text-purple-700 underline' : ''
              }`}
            onClick={() => handleLinkClick('class')}
          >
            class
          </Link>
        </motion.div>

        <motion.div
          key='About Us'
          whileHover={{ y: -3, color: '#7e22ce' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Link
            href='/about'
            className={`hover:text-purple-700 ${activeLink === 'About Us' ? 'text-purple-700 underline' : ''
              }`}
            onClick={() => handleLinkClick('About Us')}
          >
            About Us
          </Link>
        </motion.div>

        <motion.div
          key='Services'
          whileHover={{ y: -3, color: '#7e22ce' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Link
            href='/services'
            className={`hover:text-purple-700 ${activeLink === 'Services' ? 'text-purple-700 underline' : ''
              }`}
            onClick={() => handleLinkClick('Services')}
          >
            Services
          </Link>
        </motion.div>

        <motion.div
          key='Contact'
          whileHover={{ y: -3, color: '#7e22ce' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Link
            href='/contact'
            className={`hover:text-purple-700 ${activeLink === 'Contact' ? 'text-purple-700 underline' : ''
              }`}
            onClick={() => handleLinkClick('Contact')}
          >
            Contact
          </Link>
        </motion.div>
      </motion.div>

      {/* Login Button */}
      <Link href={'/login'}>
        <motion.button
          className='hidden lg:block px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
        </Link>

      {/* Mobile Menu Toggle */}
      <button
        className='lg:hidden text-gray-800 text-2xl'
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg p-6 lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'
          }`}
        variants={mobileMenuVariants}
        initial='hidden'
        animate={isMobileMenuOpen ? 'visible' : 'hidden'}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      >
        <div className='flex flex-col gap-4 text-gray-800'>
          <motion.div
            key='Home'
            whileHover={{ x: 10, color: '#7e22ce' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <Link
              href='/'
              className={`text-lg font-medium ${activeLink === 'Home' ? 'text-purple-700 underline' : ''
                }`}
              onClick={() => handleLinkClick('Home')}
            >
              Home
            </Link>
          </motion.div>

          <motion.div
            key='class'
            whileHover={{ x: 10, color: '#7e22ce' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <Link
              href='/class'
              className={`text-lg font-medium ${activeLink === 'class' ? 'text-purple-700 underline' : ''
                }`}
              onClick={() => handleLinkClick('class')}
            >
              Class
            </Link>
          </motion.div>

          <motion.div
            key='About Us'
            whileHover={{ x: 10, color: '#7e22ce' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <Link
              href='/about'
              className={`text-lg font-medium ${activeLink === 'About Us' ? 'text-purple-700 underline' : ''
                }`}
              onClick={() => handleLinkClick('About Us')}
            >
              About Us
            </Link>
          </motion.div>

          <motion.div
            key='Services'
            whileHover={{ x: 10, color: '#7e22ce' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <Link
              href='/services'
              className={`text-lg font-medium ${activeLink === 'Services' ? 'text-purple-700 underline' : ''
                }`}
              onClick={() => handleLinkClick('Services')}
            >
              Services
            </Link>
          </motion.div>

          <motion.div
            key='Contact'
            whileHover={{ x: 10, color: '#7e22ce' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <Link
              href='/contact'
              className={`text-lg font-medium ${activeLink === 'Contact' ? 'text-purple-700 underline' : ''
                }`}
              onClick={() => handleLinkClick('Contact')}
            >
              Contact
            </Link>
          </motion.div>

          <motion.button
            className='mt-6 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </div>
      </motion.div>
    </motion.nav>
  )
}

export default Navbar
