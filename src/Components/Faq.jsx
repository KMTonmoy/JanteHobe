'use client'
import { useState } from "react";
import { motion } from "framer-motion";

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };

    const faqData = [
        {
            question: "What is janteHobe?",
            answer: "janteHobe is an online platform designed to empower learners with knowledge and skills in various fields."
        },
        {
            question: "How do I register on janteHobe?",
            answer: "You can register by visiting the 'Register' section and filling out the necessary details."
        },
        {
            question: "What courses do you offer?",
            answer: "We offer a wide range of courses, including web development, marketing, entrepreneurship, and more."
        },
        {
            question: "Can I contact support for help?",
            answer: "Yes, we have 24/7 customer support available to assist you with any issues or questions."
        },
        {
            question: "What are the payment options?",
            answer: "We accept various payment methods including credit cards, PayPal, and bank transfers."
        }
    ];

    return (
        <div className="p-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    className="text-3xl font-semibold mb-8 text-center"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Frequently Asked Questions
                </motion.h2>
                <div>
                    {faqData.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="mb-4 border-b border-gray-300 pb-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                className="text-xl font-medium cursor-pointer"
                                onClick={() => toggleAnswer(index)}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                {faq.question}
                            </motion.div>
                            {activeIndex === index && (
                                <motion.div
                                    className="mt-2 text-lg text-gray-200"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {faq.answer}
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;
