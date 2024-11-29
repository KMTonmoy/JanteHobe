'use client'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ContactUsSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      // Sending the form data to Formspree
      const response = await fetch('https://formspree.io/f/xoqgnwlz', {
        method: 'POST',
        body: new URLSearchParams(formData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      if (response.ok) {
        toast.success('Thank you! Your message has been submitted.') // Success toast
        setFormData({
          name: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        toast.error('Oops! Something went wrong. Please try again later.') // Error toast
      }
    } catch (error) {
      toast.error('Oops! Something went wrong. Please try again later.') // Error toast
    }
  }

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
            <form
              onSubmit={handleSubmit}
              className='bg-white p-8 rounded-lg shadow-lg'
            >
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
                  value={formData.name}
                  onChange={handleChange}
                  required
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
                  value={formData.phone}
                  onChange={handleChange}
                  required
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
                  value={formData.subject}
                  onChange={handleChange}
                  required
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
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className='mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600'
                  rows='4'
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className='text-center'>
                <button
                  type='submit'
                  className='px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </section>
  )
}

export default ContactUsSection
