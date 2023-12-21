import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { url } from '../main';
import cyberpunk from '../assets/background/cyberpunk.png';
import egypt from '../assets/background/egypt.png';
import fantasy from '../assets/background/fantasy.png';
import forest from '../assets/background/forest.png';
import greece from '../assets/background/greece.png';
import knight from '../assets/background/knight.png';
import love from '../assets/background/love.png';
import primal from '../assets/background/primal.png';
import space_battle from '../assets/background/space_battle.png';
import urban_fantasy from '../assets/background/urban_fantasy.png';
import victorian from '../assets/background/victorian.png';

function LandingPage() {
    const navigate = useNavigate();
    // index of the current image being displayed
    const [currentImage, setCurrentImage] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);

    const images = [
        cyberpunk, egypt, fantasy, forest, greece,
        knight, love, primal, space_battle, urban_fantasy, victorian
    ];

    useEffect(() => {
        const interval = setInterval(() => {
          setFadeIn(false);
          setTimeout(() => {
            setCurrentImage((currentImage + 1) % images.length);
            setFadeIn(true);
          }, 2000); // Fade out duration
        }, 4000); // Total duration for each image
    
        return () => clearInterval(interval);
      }, [currentImage])

    const startGame = () => {
        navigate('/play');

        // TODO: Uncomment this code when the backend is ready
        // fetch('http://localhost:5001/api/current_user', {
        //     method: 'GET',
        //     credentials: "include",
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data)
        //         if (data.status === 200){
        //             navigate('/play');
        //         } else {
        //             navigate("/login");
        //         }
        //     });
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-72px)] text-center px-4">
            {/* ^^^ Adjust min-h based on the height of navbar  - Currently set to 72px */}
            {/* Background color div */}
            <div className="absolute top-0 left-0 w-full h-full bg-light-background dark:bg-dark-background -z-20"></div>
            {/* background image */}
            <img 
                src={images[currentImage]} 
                alt="Immemoria background" 
                className={`-z-10 absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-2000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
            />
            <div className="relative z-10 flex flex-col items-center justify-center space-y-6 bg-white dark:bg-black dark:bg-opacity-50 bg-opacity-50 p-6 rounded-md border border-light-primary-text dark:border-dark-primary-text">
                <h1 className="text-4xl font-bold text-light-primary-text dark:text-dark-primary-text">
                    Welcome to Immemoria
                </h1>
                <p className="text-lg text-light-primary-text dark:text-dark-primary-text">
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
