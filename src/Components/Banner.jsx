'use client'
import { useState, useEffect } from 'react'

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/banners')
      .then(response => response.json())
      .then(data => setSlides(data))
      .catch(error => console.error('Error fetching banner data:', error))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [slides])

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length)
  }

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)
  }

  if (slides.length === 0) return <div>Loading...</div>

  return (
    <div className='relative rounded-lg my-10 w-full max-w-7xl mx-auto h-[600px] overflow-hidden'>
      <div
        className='w-full h-full flex transition-transform duration-500'
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map(slide => (
          <div key={slide.id} className='w-full h-full flex-shrink-0 relative'>
            <img
              src={slide.url}
              alt={slide.text}
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 flex items-center pl-12 bg-black bg-opacity-50'>
              <div className='max-w-lg text-white space-y-4 md:ml-10 md:text-left text-center'>
                <h2 className='text-2xl md:text-4xl font-bold'>{slide.heading}</h2>
                <p className='text-base md:text-lg'>{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 right-6 flex space-x-4">
        <button
          onClick={handlePrev}
          className='bg-black text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none z-10'
        >
          &#8592;
        </button>
        <button
          onClick={handleNext}
          className='bg-black text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none z-10'
        >
          &#8594;
        </button>
      </div>
    </div>
  )
}

export default Banner
