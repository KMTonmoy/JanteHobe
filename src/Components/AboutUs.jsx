'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'

const AboutUs = () => {
  return (
    <section className=' flex flex-col md:flex-row items-center max-w-7xl mx-auto my-16 px-6'>
      <motion.div
        className='md:w-1/2'
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src='https://www.venkateshwaragroup.in/vgiblog/wp-content/uploads/2022/09/Untitled-design-2-1.jpg'
          alt='About Us'
          className='w-full rounded-lg shadow-lg'
        />
      </motion.div>
      <motion.div
        className='md:w-1/2 md:pl-12 mt-8 md:mt-0'
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className='text-2xl md:text-4xl font-bold text-gray-800 mb-6'>
          Why Choose Us?
        </h2>
        <ul className='space-y-4 text-lg text-gray-700'>
          <motion.li
            className='flex items-center hover:cursor-pointer'
            whileHover={{ scale: 1.1, color: '#6b46c1' }}
            transition={{ duration: 0.3 }}
          >
            <FaCheckCircle className='text-purple-600 mr-3' />
            24/7 Customer Support
          </motion.li>
          <motion.li
            className='flex items-center hover:cursor-pointer'
            whileHover={{ scale: 1.1, color: '#6b46c1' }}
            transition={{ duration: 0.3 }}
          >
            <FaCheckCircle className='text-purple-600 mr-3' />
            Reliable and Trusted Service
          </motion.li>
          <motion.li
            className='flex items-center hover:cursor-pointer'
            whileHover={{ scale: 1.1, color: '#6b46c1' }}
            transition={{ duration: 0.3 }}
          >
            <FaCheckCircle className='text-purple-600 mr-3' />
            Affordable Pricing Plans
          </motion.li>
          <motion.li
            className='flex items-center hover:cursor-pointer'
            whileHover={{ scale: 1.1, color: '#6b46c1' }}
            transition={{ duration: 0.3 }}
          >
            <FaCheckCircle className='text-purple-600 mr-3' />
            Experienced Professionals
          </motion.li>
          <motion.li
            className='flex items-center hover:cursor-pointer'
            whileHover={{ scale: 1.1, color: '#6b46c1' }}
            transition={{ duration: 0.3 }}
          >
            <FaCheckCircle className='text-purple-600 mr-3' />
            Advanced Technology Solutions
          </motion.li>
          <motion.li
            className='flex items-center hover:cursor-pointer'
            whileHover={{ scale: 1.1, color: '#6b46c1' }}
            transition={{ duration: 0.3 }}
          >
            <FaCheckCircle className='text-purple-600 mr-3' />
            Tailored Services for Every Client
          </motion.li>
          <motion.li
            className='flex items-center hover:cursor-pointer'
            whileHover={{ scale: 1.1, color: '#6b46c1' }}
            transition={{ duration: 0.3 }}
          >
            <FaCheckCircle className='text-purple-600 mr-3' />
            Commitment to Quality
          </motion.li>
          <motion.li
            className='flex items-center hover:cursor-pointer'
            whileHover={{ scale: 1.1, color: '#6b46c1' }}
            transition={{ duration: 0.3 }}
          >
            <FaCheckCircle className='text-purple-600 mr-3' />
            Environmentally Friendly Practices
          </motion.li>
          <motion.li
            className='flex items-center hover:cursor-pointer'
            whileHover={{ scale: 1.1, color: '#6b46c1' }}
            transition={{ duration: 0.3 }}
          >
            <FaCheckCircle className='text-purple-600 mr-3' />
            Global Network and Resources
          </motion.li>
          <motion.li
            className='flex items-center hover:cursor-pointer'
            whileHover={{ scale: 1.1, color: '#6b46c1' }}
            transition={{ duration: 0.3 }}
          >
            <FaCheckCircle className='text-purple-600 mr-3' />
            Positive Customer Feedback
          </motion.li>
        </ul>
      </motion.div>
    </section>
  )
}

export default AboutUs
