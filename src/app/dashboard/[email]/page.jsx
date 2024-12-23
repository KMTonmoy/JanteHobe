'use client'
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const page = ({ params }) => {
    const { email } = React.use(params);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`https://jantehobeback.vercel.app/users/${email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [email]);

    if (loading) {
        return (
            <div className="text-center p-10 text-lg text-gray-500">
                Loading user details...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-10 text-lg text-red-500">
                Error: {error}
            </div>
        );
    }

    return (
        <motion.div
            className="min-h-screen w-full p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="flex items-center justify-center mb-6">
                    <motion.img
                        src={user?.photo}
                        alt={user?.name}
                        className="w-32 h-32 rounded-full object-cover"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1 }}
                    />
                </div>
                <div className="text-center mb-6">
                    <motion.h1
                        className="text-3xl font-bold text-gray-800 mb-2"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {user?.name}
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-600"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {user?.email}
                    </motion.p>
                    <motion.p
                        className="text-xl text-gray-600"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {user?.role === 'user' ? 'Student' : 'Admin'}
                    </motion.p>
                </div>
                <div className="space-y-4">
                    <motion.div
                        className="flex justify-between"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="font-semibold text-lg text-gray-700">Registration Time:</h3>
                        <p className="text-gray-600">
                            {new Date(user?.timestamp).toLocaleString()}
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex justify-between"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="font-semibold text-lg text-gray-700">Status:</h3>
                        <p className="text-gray-600">
                            {user?.status === 'blocked' ? 'Inactive' : 'Active'}
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                className="mt-8 text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <button
                    onClick={() => window.location.href = '/dashboard'}  
                    className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Back to Dashboard
                </button>
            </motion.div>
        </motion.div>
    );
};

export default page;
