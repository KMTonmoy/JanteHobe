'use client'
import { AuthContext } from '@/Provider/AuthProvider';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

const DashboardPage = () => {
    const [data, setData] = useState([]);
    const [blockedUsers, setBlockedUsers] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalClasses, setTotalClasses] = useState(0);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');  // Search term state

    const { user, logOut } = useContext(AuthContext);
    const email = user?.email || "";
    const role = data?.role;

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:8000/users/${email}`)
                .then((res) => res.json())
                .then(setData)
                .catch(console.error);
        }
    }, [email]);

    useEffect(() => {
        // Fetching counts for blocked users, total users, and total classes
        if (role === 'admin') {
            fetch('http://localhost:8000/users') // Fetch all users
                .then(res => res.json())
                .then(users => {
                    setUsers(users);
                    setTotalUsers(users.length);
                    setBlockedUsers(users.filter(user => user?.status === 'blocked').length);
                })
                .catch(console.error);

            fetch('http://localhost:8000/classes') // Fetch all classes
                .then(res => res.json())
                .then(classes => setTotalClasses(classes.length))
                .catch(console.error);
        }
    }, [role]);

    const handleBlockUser = (userId) => {
        fetch(`http://localhost:8000/users/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify({ status: 'blocked' }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((updatedUser) => {
                setUsers(users.map(user =>
                    user?._id === userId ? { ...user, status: 'blocked' } : user
                ));
            })
            .catch(console.error);
    };

    // Filter users by search term
    const filteredUsers = users.filter(user =>
        user?.name && typeof user?.name === 'string' && user?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );



    return (
        <div className="min-h-screen w-full p-10 ">
            {role === 'admin' && (
                <div>
                    {/* Dashboard Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Blocked Users Box */}
                        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white p-10 rounded-lg shadow-lg flex flex-col justify-center items-center">
                            <h3 className="text-xl font-semibold mb-4">Blocked Users</h3>
                            <p className="text-3xl">{blockedUsers}</p>
                        </div>

                        {/* Total Users Box */}
                        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white p-10 rounded-lg shadow-lg flex flex-col justify-center items-center">
                            <h3 className="text-xl font-semibold mb-4">Total Users</h3>
                            <p className="text-3xl">{totalUsers}</p>
                        </div>

                        {/* Total Classes Box */}
                        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white p-10 rounded-lg shadow-lg flex flex-col justify-center items-center">
                            <h3 className="text-xl font-semibold mb-4">Total Classes</h3>
                            <p className="text-3xl">{totalClasses}</p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search by name"
                            className="p-2 w-full max-w-md border rounded-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* User Table */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-2xl font-semibold mb-4">Users List</h3>
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">Photo</th>
                                    <th className="px-4 py-2 text-left">Name</th>
                                    <th className="px-4 py-2 text-left">Registration Time</th>
                                    <th className="px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user?._id} className="border-b">
                                        <td className="px-4 py-2">
                                            <img src={user?.photo} alt={user?.name} className="w-12 h-12 rounded-full" />
                                        </td>
                                        <td className="px-4 py-2">{user?.name}</td>
                                        <td className="px-4 py-2">
                                            {new Date(user?.timestamp).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-2">
                                            {user?.status !== 'blocked' ? (
                                                <button
                                                    onClick={() => handleBlockUser(user?._id)}
                                                    className="bg-red-600 text-white py-1 px-4 rounded-lg hover:bg-red-700"
                                                >
                                                    Block User
                                                </button>
                                            ) : (
                                                <span className="text-gray-500">Blocked</span>
                                            )}

                                            <Link href={`dashboard/${user?.email}`}>
                                                <button

                                                    className="bg-red-600 text-white py-1 px-4 rounded-lg hover:bg-red-700"
                                                >
                                                    User Details
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
            }
            {
                role !== 'admin' && (
                    <div className="text-white text-center">
                        <p>You do not have permission to view this dashboard.</p>
                    </div>
                )
            }
        </div >
    );
};

export default DashboardPage;
