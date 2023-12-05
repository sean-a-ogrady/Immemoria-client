import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-light-navbar dark:bg-dark-background"> {/* Adjust the min-h value based on the height of your navigation bar */}
            <h1 className="text-2xl mb-1 font-bold text-light-primary-text dark:text-dark-primary-text">404 Not Found</h1>
            <p className="mb-4 text-light-secondary-text dark:text-dark-secondary-text">The page you are looking for has been <em>forgotten.</em></p>
            <button onClick={goHome} className="px-4 py-2 rounded-md text-light-primary-text dark:text-dark-primary-text bg-light-accent dark:bg-dark-accent hover:bg-light-sidebar dark:hover:bg-dark-sidebar focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dark-accent">
                Return Home
            </button>
        </div>
    );
}

export default NotFound;
