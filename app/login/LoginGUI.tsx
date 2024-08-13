'use client';

import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import { useRouter } from 'next/navigation';

const Register = () => {
    const [showSignUp, setShowSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const router = useRouter(); // Initialize useRouter

    const handleLogin = () => {
        // Handle login logic using email and password state values
        console.log('Logging in with:', email, password);
        setIsLoggedIn(true);

        // Redirect to /transaction after successful login
        router.push('/transaction');
    };

    const handleSignUp = () => {
        // Handle signup logic using name, email, and password state values
        console.log('Signing up with:', name, email, password);
    };

    const toggleForm = () => {
        setShowSignUp(!showSignUp);
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col items-center">
                {isLoggedIn ? (
                    <div className="text-5xl font-bold">Redirecting...</div>
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
