'use client';

import React, { useState } from 'react';

interface SignupProps {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    handleSignUp: () => void;
    toggleForm: () => void;
}

const Signup: React.FC<SignupProps> = ({ email, setEmail, password, setPassword, name, setName, handleSignUp, toggleForm }) => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleSignUp();
    };

    return (
        <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="Name" className="input input-bordered" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="Email" className="input input-bordered" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="Password" className="input input-bordered" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="text-center mt-4 flex justify-center w-full">
                <p className="text-lg">
                    Already have an account?{' '}
                    <a href="#" className="link link-primary" onClick={toggleForm}>
                        Login
                    </a>
                </p>
            </div>
            <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </div>
        </form>
    );
};

export default Signup;
