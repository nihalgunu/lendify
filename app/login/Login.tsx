'use client';

import React, { useState } from 'react';

interface LoginProps {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    handleLogin: () => void;
    toggleForm: () => void;
}

const Login: React.FC<LoginProps> = ({ email, setEmail, password, setPassword, handleLogin, toggleForm }) => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleLogin();
    };

    return (
        <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
            </div>
            <div className="text-center mt-4 flex justify-center w-full">
                <p className="text-lg">
                    Don&#39;t have an account?{' '}
                    <a href="#" className="link link-primary" onClick={toggleForm}>
                        Sign up
                    </a>
                </p>
            </div>
            <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">Login</button>
            </div>
        </form>
    );
};

export default Login;
