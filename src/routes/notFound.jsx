import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-light-navbar dark:bg-dark-background"> {/* Adjust the min-h value based on the height of your navigation bar */}
            <h1 className="text-3xl mb-2 font-bold text-light-primary-text dark:text-dark-primary-text">404 Page Not Found</h1>
            <p className="mb-2 text-lg text-light-secondary-text dark:text-dark-secondary-text">
                You've wandered into an uncharted fragment of Immemoria. Perhaps this memory has yet to be written, or maybe it has been forgotten.
            </p>
            <p className="mb-4 text-lg text-light-secondary-text dark:text-dark-secondary-text">
                Fear not, for not all who wander are lost.
            </p>
            <button onClick={goHome} className="px-5 py-3 rounded-md text-lg text-light-primary-text dark:text-dark-primary-text bg-light-accent dark:bg-dark-accent hover:bg-light-sidebar dark:hover:bg-dark-sidebar focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dark-accent">
                Return to the known
            </button>
        </div>
    );
}

export default NotFound;
