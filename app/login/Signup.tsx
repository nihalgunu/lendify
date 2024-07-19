import React, { useState } from 'react';
import { db } from '../api/auth/index';
import { usersTable } from '../api/auth/schema';
import bcrypt from 'bcrypt';

interface SignupProps {
    toggleForm: () => void;
}

const Signup: React.FC<SignupProps> = ({ toggleForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault();

        console.log('Signup button pressed'); // Log when the button is pressed

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert the new user into the database
            await db.insert(usersTable).values({
                name,
                email,
                password: hashedPassword,
            }).run();

            console.log('User registered successfully');
            // Optionally, you can redirect or show a success message here
            toggleForm(); // Switch back to login form after successful signup
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <form className="card-body" onSubmit={handleSignUp}>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
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
                <button
                    type="submit" // Ensure that clicking the button triggers form submission
                    className="btn btn-primary"
                >
                    Hi Test NOTHING CHANGEd?
                </button>
            </div>
        </form>
    );
};

export default Signup;
