import React, { useState } from 'react';

interface SignupProps {
    toggleForm: () => void;
}

const Signup: React.FC<SignupProps> = ({ toggleForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault();
        
        console.log('Signup button pressed'); // Check if this log appears

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
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
            </div>
        </form>
    );
};

export default Signup;
