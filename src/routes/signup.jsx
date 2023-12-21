// TODO: Handle validation criteria on the backend
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    // State variables for each validation criteria
    const [emailValid, setEmailValid] = useState({ format: false, length: false });
    const [usernameValid, setUsernameValid] = useState({ format: false, length: false });
    const [passwordValid, setPasswordValid] = useState({ length: false, uppercase: false, lowercase: false, number: false });
    const [confirmPasswordMatch, setConfirmPasswordMatch] = useState(false);
    // State variables to track field focus
    const [fieldFocus, setFieldFocus] = useState({ email: false, username: false, password: false, confirmPassword: false });

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailValid({
            format: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            length: value.length <= 255
        });
    };

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        setUsernameValid({
            format: /^[A-Za-z0-9]+$/.test(value),
            length: value.length <= 32 && value.length > 0
        });
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordValid({
            length: value.length >= 8 && value.length <= 255,
            uppercase: /[A-Z]/.test(value),
            lowercase: /[a-z]/.test(value),
            number: /\d/.test(value)
        });
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setConfirmPasswordMatch(value === password);
    };

    const handleSignUp = () => {
        // Check if all validation criteria are met
        if (!emailValid.format || !emailValid.length ||
            !usernameValid.format || !usernameValid.length ||
            !passwordValid.length || !passwordValid.uppercase ||
            !passwordValid.lowercase || !passwordValid.number ||
            !confirmPasswordMatch) {
            setError('Please ensure all fields are correctly filled and passwords match.');
            return;
        }

        fetch('http://localhost:5001/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email_address: email,
                username: username,
                password: password
             }),
        })
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    const errorType = response.status === 409 ? 'Username or email already exists.' : 'Signup failed.';
                    throw new Error(errorType);
                }
                return response.json();
            })
            .then(data => {
                alert('Signup successful')
                navigate('/login');
            })
            .catch(error => {
                setError(error.message);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] bg-light-background dark:bg-dark-background text-center px-4">
            <div className="flex flex-col items-center justify-center space-y-6">
                <h1 className="text-4xl font-bold text-light-primary-text dark:text-dark-primary-text">
                    Sign Up for <em>Immemoria</em>
                </h1>
    
                {/* Username Input and Validation Messages */}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    onFocus={() => setFieldFocus({ ...fieldFocus, username: true })}
                    onBlur={() => setFieldFocus({ ...fieldFocus, username: false })}
                    className="w-full max-w-xs px-4 py-2 border border-light-primary-text dark:bg-dark-background dark:text-dark-primary-text dark:border-dark-primary-text rounded-md focus:outline-none focus:ring-2 focus:ring-dark-accent"
                />
                {fieldFocus.username && (
                    <>
                        <p className={`${usernameValid.format ? "text-green-500" : "text-red-500"}`}>
                            Format: Only letters and numbers.
                        </p>
                        <p className={`${usernameValid.length ? "text-green-500" : "text-red-500"}`}>
                            Length: Minimum 1 character, max 32 characters.
                        </p>
                    </>
                )}
    
                {/* Email Input and Validation Messages */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    onFocus={() => setFieldFocus({ ...fieldFocus, email: true })}
                    onBlur={() => setFieldFocus({ ...fieldFocus, email: false })}
                    className="w-full max-w-xs px-4 py-2 border border-light-primary-text dark:bg-dark-background dark:text-dark-primary-text dark:border-dark-primary-text rounded-md focus:outline-none focus:ring-2 focus:ring-dark-accent"
                />
                {fieldFocus.email && (
                    <>
                        <p className={`${emailValid.format ? "text-green-500" : "text-red-500"}`}>
                            Format: Valid email format.
                        </p>
                        <p className={`${emailValid.length ? "text-green-500" : "text-red-500"}`}>
                            Length: Max 255 characters.
                        </p>
                    </>
                )}
    
                {/* Password Input and Validation Messages */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    onFocus={() => setFieldFocus({ ...fieldFocus, password: true })}
                    onBlur={() => setFieldFocus({ ...fieldFocus, password: false })}
                    className="w-full max-w-xs px-4 py-2 border border-light-primary-text dark:bg-dark-background dark:text-dark-primary-text dark:border-dark-primary-text rounded-md focus:outline-none focus:ring-2 focus:ring-dark-accent"
                />
                {fieldFocus.password && (
                    <>
                        <p className={`${passwordValid.length ? "text-green-500" : "text-red-500"}`}>
                            Length: 8-255 characters.
                        </p>
                        <p className={`${passwordValid.uppercase ? "text-green-500" : "text-red-500"}`}>
                            Contains: At least one uppercase letter.
                        </p>
                        <p className={`${passwordValid.lowercase ? "text-green-500" : "text-red-500"}`}>
                            Contains: At least one lowercase letter.
                        </p>
                        <p className={`${passwordValid.number ? "text-green-500" : "text-red-500"}`}>
                            Contains: At least one number.
                        </p>
                    </>
                )}
    
                {/* Confirm Password Input and Validation Messages */}
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onFocus={() => setFieldFocus({ ...fieldFocus, confirmPassword: true })}
                    onBlur={() => setFieldFocus({ ...fieldFocus, confirmPassword: false })}
                    className="w-full max-w-xs px-4 py-2 border border-light-primary-text dark:bg-dark-background dark:text-dark-primary-text dark:border-dark-primary-text rounded-md focus:outline-none focus:ring-2 focus:ring-dark-accent"
                />
                {fieldFocus.confirmPassword && (
                    <p className={`${confirmPasswordMatch ? "text-green-500" : "text-red-500"}`}>
                        Match: Confirm password must match the password.
                    </p>
                )}
    
                {/* Error Message and Submit Button */}
                {error && (
                    <div className="text-light-interactive dark:text-dark-interactive">
                        {error}
                    </div>
                )}
                <button
                    onClick={handleSignUp}
                    className="px-5 py-3 rounded-md text-lg text-center sm:text-center text-light-primary-text dark:text-dark-primary-text bg-light-accent dark:bg-dark-accent hover:bg-light-sidebar dark:hover:bg-dark-sidebar focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dark-accent"
                >
                    Sign Up
                </button>
                {/* Route to Login Page */}
                <p className="text-light-secondary-text dark:text-dark-secondary-text cursor-pointer hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-200"
                   onClick={() => navigate("/login")}>
                    Already have an account? Log In
                </p>
            </div>
        </div>
    );
    
}

export default Signup;