'use client';
import { AuthContext } from '@/Provider/AuthProvider';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import CountUp from 'react-countup'; // Import CountUp

const DashboardPage = () => {
    const [data, setData] = useState([]);
    const [blockedUsers, setBlockedUsers] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalClasses, setTotalClasses] = useState(0);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const { user } = useContext(AuthContext);
    const email = user?.email || "";
    const role = data?.role;

    useEffect(() => {
        if (email) {
            fetch(`https://jantehobeback.vercel.app/users/${email}`)
                .then((res) => res.json())
                .then(setData)
                .catch(console.error);
        }
    }, [email]);

    useEffect(() => {
        if (role === 'admin') {
            fetch('https://jantehobeback.vercel.app/users')
                .then(res => res.json())
                .then(users => {
                    setUsers(users);
                    setTotalUsers(users.length);
                    setBlockedUsers(users.filter(user => user?.role === 'blocked').length);
                })
                .catch(console.error);

            fetch('https://jantehobeback.vercel.app/editor-content')
                .then(res => res.json())
                .then(classes => setTotalClasses(classes.length))
                .catch(console.error);
        }
    }, [role]);

    const filteredUsers = users.filter(user =>
        user?.name && typeof user?.name === 'string' && user?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen w-full p-10 bg-gray-100">
            {role === 'admin' ? (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white p-10 rounded-lg shadow-lg flex flex-col justify-center items-center">
                            <h3 className="text-xl font-semibold mb-4">Blocked Users</h3>
                            <p className="text-3xl font-bold">
                                <CountUp end={blockedUsers} duration={2} />
                            </p>
                        </div>
                        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white p-10 rounded-lg shadow-lg flex flex-col justify-center items-center">
                            <h3 className="text-xl font-semibold mb-4">Total Users</h3>
                            <p className="text-3xl font-bold">
                                <CountUp end={totalUsers} duration={2} />
                            </p>
                        </div>
                        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white p-10 rounded-lg shadow-lg flex flex-col justify-center items-center">
                            <h3 className="text-xl font-semibold mb-4">Total Chapters Added</h3>
                            <p className="text-3xl font-bold">
                                <CountUp end={totalClasses} duration={2} />
                            </p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search by name"
                            className="p-2 w-full max-w-md border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
                        <h3 className="text-2xl font-semibold mb-4">Users List</h3>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 capitalize py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                                    <th className="px-6 capitalize py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 capitalize py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Time</th>
                                    <th className="px-6 capitalize py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th className="px-6 capitalize py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.map((user) => (
                                    <tr key={user?._id} className="hover:bg-gray-50">
                                        <td className="px-6 capitalize py-4">
                                            <img src={user?.photo} alt={user?.name} className="w-12 h-12 rounded-full" />
                                        </td>
                                        <td className="px-6 capitalize py-4 text-sm text-gray-700">{user?.name}</td>
                                        <td className="px-6 capitalize py-4 text-sm text-gray-500">
                                            {new Date(user?.timestamp).toLocaleString()}
                                        </td>
                                        <td className="px-6 capitalize py-4 text-sm text-gray-500">
                                            {user?.role}
                                        </td>
                                        <td className="px-6 capitalize py-4 space-x-2">
                                            <Link href={`dashboard/${user?.email}`}>
                                                <button className="bg-indigo-500 text-white py-1 px-4 rounded-lg hover:bg-indigo-600">
                                                    Details
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-700">
                    <p>You do not have permission to view this dashboard.</p>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
