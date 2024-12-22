'use client';
import Image from 'next/image';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className='flex justify-center py-10'>
            <div className="flex  items-center justify-center min-h-screen bg-gray-50">
                <div className="flex w-full max-w-4xl">

                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>

                        <form className="space-y-4">


                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>




                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <AiFillEyeInvisible size={20} />
                                        ) : (
                                            <AiFillEye size={20} />
                                        )}
                                    </button>
                                </div>
                            </div>




                            <div className="flex items-center my-4">
                                <hr className="w-full border-gray-300" />
                                <span className="mx-2 text-gray-600">or</span>
                                <hr className="w-full border-gray-300" />
                            </div>


                            <div className="flex gap-4">
                                <button
                                    className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-md text-gray-800 hover:bg-gray-100 transition"
                                >
                                    <Image src="/google.png" alt="Google logo" width={20} height={20} />
                                    <span>Google</span>
                                </button>

                                <button
                                    className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-md text-gray-800 hover:bg-gray-100 transition"
                                >
                                    <Image src="/fb.png" alt="Facebook logo" width={20} height={20} />
                                    <span>Facebook</span>
                                </button>
                            </div>


                            <button
                                type="submit"
                                className="w-full py-2 mt-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
                            >
                                Login
                            </button>
                        </form>


                        <p className="text-center text-gray-600 mt-6">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-indigo-600 hover:text-indigo-500">Signup</a>
                        </p>
                    </div>


                    <div className="hidden lg:block w-1/2">
                        <img
                            src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/a78d7491269521.5e3166194e2b2.gif"
                            alt="Login Illustration"
                            className="w-[568px] h-full object-cover rounded-r-lg"
                        />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default LoginPage;
