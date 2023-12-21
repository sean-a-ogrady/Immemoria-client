import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    const startGame = () => {
        navigate('/play'); // Update with the actual route to start the game
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] bg-light-background dark:bg-dark-background text-center px-4">
          {/* ^^^ Adjust min-h based on the height of navbar  - Currently set to 72px */}
            <div className="flex flex-col items-center justify-center space-y-6">
                <h1 className="text-4xl font-bold text-light-primary-text dark:text-dark-primary-text">
                    Welcome to Immemoria
                </h1>
                <p className="text-lg text-light-secondary-text dark:text-dark-secondary-text">
                    Embark on a journey through a world where memories shape reality. Explore forgotten lands, uncover lost stories, and reshape the fabric of existence.
                </p>
                <button 
                    onClick={startGame}
                    className="px-5 py-3 rounded-md text-lg text-center sm:text-center text-light-primary-text dark:text-dark-primary-text bg-light-accent dark:bg-dark-accent hover:bg-light-sidebar dark:hover:bg-dark-sidebar focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dark-accent"
                >
                    Play Now
                </button>
            </div>
        </div>
    );
}

export default LandingPage;
