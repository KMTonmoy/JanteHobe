'use client'
import React from 'react'

const ContactUsSection = () => {
  return (
    <section className='py-16'>
      <div className='max-w-7xl mx-auto px-6'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>
          Get in Touch
        </h2>
        <div className='flex gap-5 flex-col md:flex-row justify-between items-center'>
          <div className='w-full md:w-1/2 mb-8 md:mb-0'>
            <img
              src='https://aceconsult.co/wp-content/uploads/2023/11/Contact-1.gif'
              alt='Contact Us Image'
              className='w-full h-full object-cover rounded-lg shadow-lg'
            />
          </div>

          <div className='w-full md:w-1/2'>
            <form className='bg-white p-8 rounded-lg shadow-lg'>
              {/* Name Field */}
              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='block text-sm font-semibold text-gray-700'
                >
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  disabled
                  placeholder='Your Name'
                  className='mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600'
                />
              </div>

              {/* Phone Field */}
              <div className='mb-4'>
                <label
                  htmlFor='phone'
                  className='block text-sm font-semibold text-gray-700'
                >
                  Phone
                </label>
                <input
                  type='tel'
                  id='phone'
                  name='phone'
                  disabled
                  placeholder='Your Phone'
                  className='mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600'
                />
              </div>

              {/* Subject Field */}
              <div className='mb-4'>
                <label
                  htmlFor='subject'
                  className='block text-sm font-semibold text-gray-700'
                >
                  Subject
                </label>
                <input
                  type='text'
                  id='subject'
                  name='subject'
                  disabled
                  placeholder='Subject'
                  className='mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600'
                />
              </div>

              {/* Message Field */}
              <div className='mb-4'>
                <label
                  htmlFor='message'
                  className='block text-sm font-semibold text-gray-700'
                >
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  disabled
                  placeholder='Your Message'
                  className='mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600'
                  rows='4'
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className='text-center'>
                <button
                  type='button'
                  disabled
                  className='px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 transition'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUsSection
