"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Page = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://jantehobeback.vercel.app/users");
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleBlockUser = async (email) => {
        try {
            const response = await fetch(
                `https://jantehobeback.vercel.app/users/${email}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ role: "blocked" }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to block user");
            }

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.email === email ? { ...user, role: "blocked" } : user
                )
            );

            Swal.fire({
                title: "Success!",
                text: `User with email ${email} has been blocked.`,
                icon: "success",
                confirmButtonText: "OK",
            });
        } catch (err) {
            Swal.fire({
                title: "Error!",
                text: err.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = users.filter(
        (user) =>
            (user.name &&
                user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (user.email &&
                user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="p-6 w-full h-[100%] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
            <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded outline-none"
            />
            <div className="bg-white shadow-md rounded-lg p-4">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers
                            .filter((user) => user.role === "user")
                            .map((user) => (
                                <tr key={user.email} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <img
                                            src={user.photo}
                                            alt="Profile"
                                            className="w-12 h-12 rounded-full"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded"
                                            onClick={() => handleBlockUser(user.email)}
                                        >
                                            Block
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Page;
