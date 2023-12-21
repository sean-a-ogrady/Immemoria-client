import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        // Perform login logic here
        fetch('http://localhost:5001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email_address: email,
                password: password
            }),
        })
        .then(response => {
            if (!response.ok) {
                console.log(response)
                throw new Error('Username or password is incorrect.');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful login
            navigate('/dashboard'); // Redirect to dashboard or appropriate page
        })
        .catch(error => {
            setError(error.message);
        });
    };

    const navigateToSignUp = () => {
        navigate('/signup'); // Navigate to the signup route
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] bg-light-background dark:bg-dark-background text-center px-4">
            <div className="flex flex-col items-center justify-center space-y-6">
                <h1 className="text-4xl font-bold text-light-primary-text dark:text-dark-primary-text">
                    Login to <em>Immemoria</em>
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full max-w-xs px-4 py-2 border border-light-primary-text dark:bg-dark-background dark:text-dark-primary-text dark:border-dark-primary-text rounded-md focus:outline-none focus:ring-2 focus:ring-dark-accent"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full max-w-xs px-4 py-2 border border-light-primary-text dark:bg-dark-background dark:text-dark-primary-text dark:border-dark-primary-text rounded-md focus:outline-none focus:ring-2 focus:ring-dark-accent"
                />

                {error && (
                    <div className="text-light-interactive dark:text-dark-interactive">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleLogin}
                    className="px-5 py-3 rounded-md text-lg text-center sm:text-center text-light-primary-text dark:text-dark-primary-text bg-light-accent dark:bg-dark-accent hover:bg-light-sidebar dark:hover:bg-dark-sidebar focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dark-accent"
                >
                    Log In
                </button>
                {/* Route to Sign Up Page */}
                <p className="text-light-secondary-text dark:text-dark-secondary-text cursor-pointer hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-200"
                   onClick={navigateToSignUp}>
                    Don't have an account? Sign Up
                </p>
            </div>
        </div>
    );
}

export default Login;
