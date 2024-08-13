'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import Login from './Login';
import Signup from './Signup';

const Register = () => {
    const [showSignUp, setShowSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const router = useRouter(); // Initialize the useRouter hook

    const handleLogin = async () => {
        console.log('Logging in with:', email, password);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    setIsLoggedIn(true);
                    router.push('/transactions'); // Redirect to /transactions
                } else {
                    console.error('Login failed:', result.message);
                }
            } else {
                console.error('Failed to login:', response.statusText);
            }
        } catch (error: any) {
            console.error('Error logging in:', error.message);
        }
    };

    const handleSignUp = async () => {
        console.log('Signing up with:', name, email, password);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                console.log('User registered successfully');
                toggleForm(); // Switch back to login form after successful signup
            } else {
                console.error('Failed to register user:', response.statusText);
            }
        } catch (error: any) {
            console.error('Error registering user:', error.message);
        }
    };

    const toggleForm = () => {
        setShowSignUp(!showSignUp);
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col items-center">
                {isLoggedIn ? (
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Redirecting...</h1>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-8">
                            <h1 className="text-5xl font-bold">Login now!</h1>
                        </div>
                        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                            {showSignUp ? (
                                <Signup
                                    toggleForm={toggleForm}
                                />
                            ) : (
                                <Login
                                    email={email}
                                    setEmail={setEmail}
                                    password={password}
                                    setPassword={setPassword}
                                    handleLogin={handleLogin}
                                    toggleForm={toggleForm}
                                />
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Register;
