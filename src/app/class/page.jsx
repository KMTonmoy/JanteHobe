'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaTable, FaTh } from 'react-icons/fa';

const Page = () => {
    const [classInfo, setClassInfo] = useState([]);
    const [isTableLayout, setIsTableLayout] = useState(false);
    const [selectedClass, setSelectedClass] = useState('');

    useEffect(() => {
        fetch('./class.json')
            .then(response => response.json())
            .then(data => setClassInfo(data))
            .catch(error => console.error('Error fetching class data:', error));
    }, []);

    const toggleLayout = () => {
        setIsTableLayout(!isTableLayout);
    };

    const handleClassSelect = (event) => {
        setSelectedClass(event.target.value);
    };

    const filteredClassInfo = selectedClass
        ? classInfo.filter(classItem => classItem._id === selectedClass)
        : classInfo;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-semibold text-center text-gray-800 w-full">Class-wise Learning</h1>
                <motion.button
                    onClick={toggleLayout}
                    className="bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 transition duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isTableLayout ? (
                        <FaTh size={20} />
                    ) : (
                        <FaTable size={20} />
                    )}
                </motion.button>
            </div>

            <div className="flex justify-center mb-6">
                <select
                    value={selectedClass}
                    onChange={handleClassSelect}
                    className="border-2 border-gray-300 py-2 px-4 rounded-lg text-gray-700"
                >
                    <option value="">Select a class</option>
                    {classInfo.map((classItem, index) => (
                        <option key={index} value={classItem._id}>
                            {classItem.className}
                        </option>
                    ))}
                </select>
            </div>

            {isTableLayout ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-lg rounded-lg">
                        <thead>
                            <tr className="text-left border-b">
                                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Image</th>
                                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Class Name</th>
                                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Description</th>
                                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClassInfo.map((classItem, index) => (
                                <motion.tr
                                    key={index}
                                    className="border-b"
                                    initial={{ opacity: 0, x: -100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.2
                                    }}
                                >
                                    <td className="px-6 py-4">
                                        <img src={classItem.image || 'https://via.placeholder.com/150'} alt={classItem.className} className="w-16 h-16 object-cover rounded-full" />
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">{classItem.className}</td>
                                    <td className="px-6 py-4 text-gray-600">{classItem.description}</td>
                                    <td className="px-6 py-4">
                                        <Link href={classItem._id}>
                                            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-6 rounded-full hover:from-purple-700 hover:to-indigo-700 transition duration-300">
                                                Read Now
                                            </button>
                                        </Link>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredClassInfo.map((classItem, index) => (
                        <motion.div
                            key={index}
                            className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.2
                            }}
                        >
                            <img src={classItem.image || 'https://via.placeholder.com/150'} alt={classItem.className} className="w-full h-40 object-cover" />
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-800">{classItem.className}</h2>
                                <p className="text-gray-600 mt-2">{classItem.description}</p>
                                <Link href={`/class/${classItem._id}`}>
                                    <button className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-6 rounded-full hover:from-purple-700 hover:to-indigo-700 transition duration-300">
                                        Read Now
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Page;
