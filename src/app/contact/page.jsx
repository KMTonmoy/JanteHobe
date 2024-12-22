'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ContactPage = () => {
    const [images, setImages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageIndex, setModalImageIndex] = useState(0);
    const [showAllImages, setShowAllImages] = useState(false);

    useEffect(() => {
        // Fetch the JSON data
        fetch('./gallery.json')
            .then(response => response.json())
            .then(data => setImages(data))
            .catch(error => console.error("Error fetching images:", error));
    }, []);

    const openModal = (index) => {
        setModalImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const nextImage = () => {
        setModalImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setModalImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <main className="py-12 max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="bg-white p-8 shadow-md rounded-lg"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">Subject</label>
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">Message</label>
                                <textarea
                                    placeholder="Your Message"
                                    rows="5"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                ></textarea>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2 px-4 rounded-md shadow-lg"
                            >
                                Submit
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="flex flex-col justify-center"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
                        <p className="text-gray-600 mb-4">
                            Feel free to reach out to us through any of the following methods. Our team is here to assist you.
                        </p>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold text-gray-700">Address:</h3>
                                <p className="text-gray-600">123 Knowledge Lane, Learning City, Country</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-700">Phone:</h3>
                                <p className="text-gray-600">+1 (123) 456-7890</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-700">Email:</h3>
                                <p className="text-gray-600">support@janteHobe.com</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Gallery with Animation */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {images.slice(0, showAllImages ? images.length : 6).map((image, index) => (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
                            key={index}
                            onClick={() => openModal(index)}
                        >
                            <img
                                src={image.src}
                                alt={`Image ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Toggle Show More / Show Less */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4 text-center"
                >
                    <button
                        onClick={() => setShowAllImages((prev) => !prev)}
                        className="bg-purple-600 text-white py-2 px-4 rounded-md"
                    >
                        {showAllImages ? 'Show Less' : `Show More`}
                    </button>
                </motion.div>

                {/* Modal for Viewing Images */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-gray-600 font-bold text-xl"
                            >
                                X
                            </button>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <img
                                    src={images[modalImageIndex].src}
                                    alt={`Modal Image ${modalImageIndex + 1}`}
                                    className="w-full h-96 object-cover mb-4 rounded-lg"
                                />
                                <p className="text-gray-700 text-center">{images[modalImageIndex].description}</p>
                            </motion.div>
                            <div className="flex justify-between mt-4">
                                <button onClick={prevImage} className="text-purple-600 font-bold">Prev</button>
                                <button onClick={nextImage} className="text-purple-600 font-bold">Next</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ContactPage;
