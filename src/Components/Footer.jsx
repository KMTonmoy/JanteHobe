'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const Footer = () => {
  return (
    <motion.footer
      className='bg-gray-900 text-white py-10 px-6'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
        {/* Logo and Description */}
        <motion.div
          className='flex flex-col items-start'
          whileHover={{ scale: 1.05 }}
        >
          <h1 className='text-2xl font-bold mb-2'>janteHobe</h1>
          <p className='text-gray-400'>
            Empowering learners with knowledge. Join us to explore, learn, and
            grow.
          </p>
        </motion.div>

        {/* Links */}
        <motion.div
          className='flex flex-col'
          whileHover={{ x: 10 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
          <ul className='space-y-2'>
            {['Home', 'Courses', 'About Us', 'Services', 'Contact'].map(
              link => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase().replace(' ', '-')}`}
                    className='text-gray-400 hover:text-purple-500 transition-colors'
                  >
                    {link}
                  </Link>
                </li>
              )
            )}
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          className='flex flex-col'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className='text-lg font-semibold mb-4'>Follow Us</h3>
          <div className='flex gap-4'>
            <Link
              href='#'
              className='text-gray-400 hover:text-purple-500 transition-colors'
            >
              <i className='fab fa-facebook-f'></i> Facebook
            </Link>
            <Link
              href='#'
              className='text-gray-400 hover:text-purple-500 transition-colors'
            >
              <i className='fab fa-twitter'></i> Twitter
            </Link>
            <Link
              href='#'
              className='text-gray-400 hover:text-purple-500 transition-colors'
            >
              <i className='fab fa-instagram'></i> Instagram
            </Link>
          </div>
        </motion.div>
      </div>

      <div className='mt-8 border-t border-gray-800 pt-4 text-center text-sm text-gray-500'>
        © 2024 janteHobe. All rights reserved.
      </div>
    </motion.footer>
  )
}

export default Footer
