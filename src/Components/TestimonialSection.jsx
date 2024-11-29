'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaQuoteLeft, FaStar } from 'react-icons/fa'

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('./testimonials.json')
      const data = await response.json()
      setTestimonials(data)
    }
    fetchData()
  }, [])

  const displayedTestimonials = showAll ? testimonials : testimonials.slice(-3)

  return (
    <section className='py-16'>
      <div className='max-w-7xl mx-auto px-6'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>
          What Our Students Say
        </h2>
        <div className='overflow-hidden'>
          <motion.div
            className='flex flex-wrap justify-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {displayedTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className='w-full md:w-1/3 p-4'
                initial={{ opacity: 0, x: showAll ? '100%' : '-100%' }}
                animate={{ opacity: 1, x: '0%' }}
                exit={{ opacity: 0, x: showAll ? '-100%' : '100%' }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className='bg-white rounded-lg shadow-lg p-6'>
                  <div className='flex items-center mb-4'>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className='w-16 h-16 rounded-full shadow-lg mr-4'
                    />
                    <div>
                      <h3 className='text-xl font-semibold'>
                        {testimonial.name}
                      </h3>
                      <p className='text-sm text-gray-600'>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className='text-gray-700 text-sm mb-4'>
                    <FaQuoteLeft className='text-purple-600 mr-2 inline' />
                    {testimonial.feedback}
                  </p>
                  <div className='flex items-center'>
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <FaStar key={i} className='text-yellow-500' />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {testimonials.length > 3 && (
          <div className='text-center mt-8'>
            <button
              onClick={() => setShowAll(!showAll)}
              className='mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 transition'
            >
              {showAll ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default TestimonialSection
