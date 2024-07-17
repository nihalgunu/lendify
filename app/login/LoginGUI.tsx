'use client';

import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const Register = () => {
    const [showSignUp, setShowSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        // Handle login logic using email and password state values
        console.log('Logging in with:', email, password);
        setIsLoggedIn(true);
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
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Congrats, you logged in!</h1>
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
