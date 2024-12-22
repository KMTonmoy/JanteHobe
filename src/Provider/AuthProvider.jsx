'use client';
import axios from 'axios';
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const createUser = async (email, password) => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email, password) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            router.push('/');
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logOut = async () => {
        setLoading(true);
        try {
            await axios.get(`http://localhost:8000/logout`, {
                withCredentials: true,
            });
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = async (name, photo) => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photo,
            });
        } catch (error) {
            throw error;
        }
    };

    const saveUser = async (user) => {
        try {
            const existingUserResponse = await axios.get(
                `http://localhost:8000/users/${user?.email}`
            );
            if (existingUserResponse.data) {
                return existingUserResponse.data;
            }
            const currentUser = {
                email: user?.email,
                name: user?.displayName,
                photo: user?.photoURL,
                password: user?.password,
                contactno: user?.contactno,
                role: 'user',
            };
            const { data } = await axios.put(
                `http://localhost:8000/user`,
                currentUser
            );
            return data;
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                try {
                    await saveUser(currentUser);
                } catch (error) {
                    console.error('Error handling auth state change:', error);
                }
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
        updateUserProfile,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
