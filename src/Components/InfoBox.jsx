'use client'
import React from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { FaUserGraduate, FaChalkboardTeacher, FaSchool } from 'react-icons/fa'

const InfoBox = () => {
  return (
    <div className='my-10 max-w-7xl mx-auto'>
      <h2 className='text-2xl md:text-4xl font-bold text-center mb-8'>
        Explore Our Community
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 px-6'>
        {/* Total Students */}
        <motion.div
          className='flex flex-col items-center bg-white shadow-lg rounded-lg p-6 border hover:shadow-2xl transition-all duration-500'
          whileHover={{
            scale: 1.1,
            rotateX: 10,
            rotateY: 10,
            boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
            transition: { duration: 0.3 }
          }}
          whileTap={{
            scale: 0.95,
            transition: { duration: 0.2 }
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          <div className='text-purple-600 text-4xl mb-4'>
            <FaUserGraduate />
          </div>
          <h3 className='text-xl font-semibold mb-2'>Our Total Students</h3>
          <p className='text-2xl font-bold text-gray-800'>
            <CountUp start={0} end={1500} duration={2} />
          </p>
        </motion.div>

        {/* Our Teachers */}
        <motion.div
          className='flex flex-col items-center bg-white shadow-lg rounded-lg p-6 border hover:shadow-2xl transition-all duration-500'
          whileHover={{
            scale: 1.1,
            rotateX: 10,
            rotateY: 10,
            boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
            transition: { duration: 0.3 }
          }}
          whileTap={{
            scale: 0.95,
            transition: { duration: 0.2 }
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          <div className='text-purple-600 text-4xl mb-4'>
            <FaChalkboardTeacher />
          </div>
          <h3 className='text-xl font-semibold mb-2'>Our Teachers</h3>
          <p className='text-2xl font-bold text-gray-800'>
            <CountUp start={0} end={120} duration={2} />
          </p>
        </motion.div>

        {/* Our Branches */}
        <motion.div
          className='flex flex-col items-center bg-white shadow-lg rounded-lg p-6 border hover:shadow-2xl transition-all duration-500'
          whileHover={{
            scale: 1.1,
            rotateX: 10,
            rotateY: 10,
            boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
            transition: { duration: 0.3 }
          }}
          whileTap={{
            scale: 0.95,
            transition: { duration: 0.2 }
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          <div className='text-purple-600 text-4xl mb-4'>
            <FaSchool />
          </div>
          <h3 className='text-xl font-semibold mb-2'>Our Branches</h3>
          <p className='text-2xl font-bold text-gray-800'>
            <CountUp start={0} end={20} duration={2} />
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default InfoBox
