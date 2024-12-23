'use client';
import { imageUpload } from '@/api/utils';
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import { AuthContext } from '@/Provider/AuthProvider';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Swal from 'sweetalert2';

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [image, setImage] = useState(null);

    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);

    const handleProfilePicChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            Swal.fire({
                title: 'Password Mismatch',
                text: 'Password and Confirm Password do not match.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        if (!image) {
            Swal.fire({
                title: 'Profile Picture Required',
                text: 'Please upload a profile picture.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return;
        }

        try {
            const imageUrl = await imageUpload(image);
            await createUser(email, password);
            await updateUserProfile(name, imageUrl);

            const userInfo = { name, email, contactNo, imageUrl };
            await axiosPublic.post('/users', userInfo);

            Swal.fire({
                title: 'Signup Successful',
                text: 'You have successfully signed up.',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch (err) {
            Swal.fire({
                title: 'Signup Failed',
                text: err.message || 'An unexpected error occurred. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithGoogle();
            if (result && result.user) {
                const userInfo = {
                    email: result.user.email || '',
                    name: result.user.displayName || '',
                };
                await axiosPublic.post('/users', userInfo);
                Swal.fire({
                    title: 'Google Sign-In Successful',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Google Sign-In Failed',
                text: error.message || 'Unknown error',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className='flex justify-center py-10'>
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="flex w-full max-w-4xl">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Signup</h2>

                        <form onSubmit={handleSignup} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="contactno" className="block text-sm font-medium text-gray-700">Contact No</label>
                                <input
                                    type="tel"
                                    id="contactno"
                                    value={contactNo}
                                    onChange={(e) => setContactNo(e.target.value)}
                                    placeholder="Enter your contact number"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm your password"
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-3 flex items-center"
                                    >
                                        {showConfirmPassword ? (
                                            <AiFillEyeInvisible size={20} />
                                        ) : (
                                            <AiFillEye size={20} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Upload Photo</label>
                                <input
                                    type="file"
                                    id="photo"
                                    onChange={handleProfilePicChange}
                                    name="photo"
                                    accept="image/*"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 mt-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
                            >
                                Signup
                            </button>

                            <div className="flex items-center my-4">
                                <hr className="w-full border-gray-300" />
                                <span className="mx-2 text-gray-600">or</span>
                                <hr className="w-full border-gray-300" />
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-md text-gray-800 hover:bg-gray-100 transition"
                            >
                                <Image src="/google.png" alt="Google logo" width={20} height={20} />
                                <span>Sign up with Google</span>
                            </button>


                        </form>

                        <p className="text-center text-gray-600 mt-6">
                            Already have an account?{' '}
                            <a href="/login" className="text-indigo-600 hover:text-indigo-500">Login</a>
                        </p>
                    </div>

                    <div className="hidden lg:block w-1/2">
                        <img
                            src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/a78d7491269521.5e3166194e2b2.gif"
                            alt="Signup Illustration"
                            className="w-[568px] h-full object-cover rounded-r-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
