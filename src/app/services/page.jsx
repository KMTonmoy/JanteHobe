'use client';
import React from 'react';
import { motion } from 'framer-motion';

const OurServices = () => {
    const services = [
        {
            title: "Learn English Grammar",
            description: "Master English grammar with structured lessons, quizzes, and real-life examples designed for all levels. Our courses cover everything from basic tenses to advanced sentence structures.",
            icon: "📚",
            image: "https://play-lh.googleusercontent.com/AprwM9xSIYiTOjRSDImAK3t6ASy-r3CZz6YlILPOJWx_1yMz8HsKpzc1WW6tcY8UDA",
        },
        {
            title: "Improve Speaking Skills",
            description: "Enhance your fluency and confidence in spoken English with interactive speaking sessions, group discussions, and expert guidance. Our focus is on conversational skills, pronunciation, and effective communication.",
            icon: "🗣️",
            image: "https://dpi.ac/wp-content/uploads/2023/04/image.png",
        },
        {
            title: "Access Learning Resources",
            description: "Explore a wide range of free learning materials, including e-books, videos, podcasts, and practice exercises. We have resources for every learner, from beginners to advanced.",
            icon: "📖",
            image: "https://lh6.googleusercontent.com/proxy/5JeQjDD67RqTOMhw3MsLczs-4m702RfB4KI0MyZphbeRO0F24XyVK3HJCJQEWYNYD2MoX1_K5xwgCtRMzmGXSdp50Wq23JQolEWzjczGt3DtM9maVd2whbJC-FuoVWlhqM0MLKwK6BFIMA",
        },
        {
            title: "Prepare for Exams",
            description: "Get ready for IELTS, TOEFL, and other English proficiency exams with our targeted practice modules. We provide mock tests, exam strategies, and personalized feedback to help you succeed.",
            icon: "🎓",
            image: "https://seofiles.s3.amazonaws.com/seo/media/lr/images/blog/d69c3ffd-4eaf-40b0-bab6-1ab27ea74494.jpg",
        },
        {
            title: "Business English Training",
            description: "Improve your business English skills with courses tailored for professionals. Learn how to write emails, create presentations, and engage in meetings with confidence.",
            icon: "💼",
            image: "https://static1.squarespace.com/static/5970f2036f4ca391f33df1ec/t/5ee8f72e6366267772e9569b/1592325938515/Business-English-TEFL.jpg?format=1500w",
        },
        {
            title: "Personalized Learning Path",
            description: "Receive personalized learning paths based on your current level and learning goals. Our expert instructors will guide you every step of the way to ensure you progress at your own pace.",
            icon: "📝",
            image: "https://elearningindustry.com/wp-content/uploads/2015/11/7-tips-to-create-personal-learning-paths-in-elearning-e1448614319869.jpg",
        },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-purple-600">
                    Explore Our Services
                </h2>
                <motion.div
                    className="space-y-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center md:gap-12`}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                        >
                            <motion.img
                                src={service.image}
                                alt={service.title}
                                className="w-full md:w-1/2 rounded-lg shadow-md"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.4 }}
                            />
                            <div className="text-center md:text-left mt-6 md:mt-0">
                                <div className="text-4xl text-purple-600 mb-4">{service.icon}</div>
                                <h3 className="text-2xl font-semibold text-purple-600 mb-4">{service.title}</h3>
                                <p className="text-lg text-gray-700 mb-4">{service.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default OurServices;
