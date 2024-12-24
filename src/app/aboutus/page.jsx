'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Page = () => {
    return (
        <section className="py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
                    <span className="bg-gradient-to-r from-purple-600 to-purple-400 text-transparent bg-clip-text">
                        Welcome to Our Learning Platform
                    </span>
                </h2>

                {/* Services Section */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div>
                        <h3 className="text-3xl font-bold mb-4 text-gray-800">
                            Our <span className="text-purple-600">Services</span>
                        </h3>
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                            We provide <span className="font-semibold text-purple-600">free learning resources</span> to help you excel in coding. For a more personalized approach, we offer a premium coaching center with expert guidance tailored to your goals.
                        </p>
                        <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-500 transition">
                            Learn More
                        </button>
                    </div>
                    <motion.img
                        src="https://www.ncwlibraries.org/wp-content/uploads/educator-resources_blog-1080x675.jpg"
                        alt="Learning Center"
                        className="rounded-lg shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                    />
                </motion.div>

                {/* Head Teacher Section */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.img
                        src="https://i.ibb.co.com/6s03Tmz/276135413-5106827936072419-768008308068333860-n.jpg"
                        alt="Head Teacher"
                        className="rounded-lg shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                    />
                    <div>
                        <h3 className="text-3xl font-bold mb-4 text-gray-800">
                            Our <span className="text-purple-600">Head Teacher</span>
                        </h3>
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                            Meet <span className="font-semibold text-purple-600">Rafique Sir</span>, our experienced and dedicated educator, committed to nurturing your skills and guiding you towards success.
                        </p>
                        <ul className="space-y-2 text-gray-700">
                            <li>📞 Contact: +880123456789</li>
                            <li>📧 Email: rafique@example.com</li>
                            <li>
                                🌐 Facebook:{" "}
                                <a href="#" className="text-purple-600 hover:underline">
                                    View Profile
                                </a>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Web Developer Section */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div>
                        <h3 className="text-3xl font-bold mb-4 text-gray-800">
                            Our <span className="text-purple-600">Web Developer</span>
                        </h3>
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                            Meet <span className="font-semibold text-purple-600">Tonmoy Ahamed</span>, the creator of this platform. He is a passionate developer who specializes in creating innovative and user-friendly web solutions.
                        </p>
                        <ul className="space-y-2 text-gray-700">
                            <li>📞 Contact: +8801731158705</li>
                            <li>📧 Email: tonmoyahamed2009@gmail.com</li>
                            <li>
                                🌐 GitHub:{" "}
                                <a
                                    href="https://github.com/KMTonmoy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-600 hover:underline"
                                >
                                    @KMTonmoy
                                </a>
                            </li>
                            <li>
                                🌐 Portfolio:{" "}
                                <a
                                    href="https://devtonmoy.vercel.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-600 hover:underline"
                                >
                                    devtonmoy.vercel.app
                                </a>
                            </li>
                        </ul>
                    </div>
                    <motion.img
                        src="https://i.ibb.co.com/h1CCmyV/467525721-541729678777227-884255802110847914-n-1.jpg"
                        alt="Tonmoy Ahamed"
                        className="rounded-lg shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Page;
