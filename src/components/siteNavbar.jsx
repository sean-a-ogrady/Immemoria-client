import React from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import darkModeLogo from '../assets/Immemoria-logo-dark-theme.png';
import lightModeLogo from '../assets/Immemoria-logo-light-theme.png';
import SunIcon from '../assets/sunIcon.jsx';
import MoonIcon from '../assets/moonIcon.jsx';

const DesktopNavbarButton = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className="flex items-center justify-center p-2 rounded-md text-light-primary-text dark:text-dark-primary-text hover:text-light-secondary-text dark:hover:text-dark-secondary-text focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dark-accent">
            {children}
        </button>
    );
};

const MobileNavbarButton = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className="w-full flex items-center justify-center p-3 rounded-md text-light-primary-text dark:text-dark-primary-text hover:text-light-secondary-text dark:hover:text-dark-secondary-text focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dark-accent">
            {children}
        </button>
    );
};

// Function to return the appropriate icon based on the darkMode state
const DarkModeIcon = ({ darkMode }) => {
    return darkMode ? <MoonIcon /> : <SunIcon />;
};

function SiteNavbar({ toggleDarkMode, darkMode }) {

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <Disclosure as="nav" className="bg-light-navbar dark:bg-dark-navbar h-18">
            {({ open }) => (
                <>
                    <div className="flex items-center justify-between p-4">
                        {/* Logo with navigation to root */}
                        <img src={darkMode ? darkModeLogo : lightModeLogo} alt="Logo" className="h-10 w-auto cursor-pointer" onClick={() => handleNavigation('/')} />

                        {/* Mobile Menu Icon */}
                        <Disclosure.Button className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-light-primary-text dark:text-dark-primary-text hover:text-light-secondary-text dark:hover:text-dark-secondary-text focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dark-accent">
                            <span className="sr-only">Open main menu</span>
                            {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                        </Disclosure.Button>


                        <div className="hidden sm:flex sm:items-center sm:space-x-4">
                            {/* Dark Mode Toggle */}
                            <DesktopNavbarButton onClick={toggleDarkMode}>
                                <DarkModeIcon darkMode={darkMode} />
                            </DesktopNavbarButton>

                            {/* Desktop Navigation Buttons */}
                            <DesktopNavbarButton onClick={() => handleNavigation('/signup')}>Sign Up</DesktopNavbarButton>
                            <DesktopNavbarButton onClick={() => handleNavigation('/login')}>Login</DesktopNavbarButton>
                            <DesktopNavbarButton onClick={() => handleNavigation('/play')}>Play</DesktopNavbarButton>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {/* Mobile Dark Mode Toggle */}
                            <MobileNavbarButton onClick={toggleDarkMode}>
                                <DarkModeIcon darkMode={darkMode} />
                            </MobileNavbarButton>
                            {/* Mobile Navigation Buttons */}
                            <MobileNavbarButton onClick={() => handleNavigation('/signup')}>Sign Up</MobileNavbarButton>
                            <MobileNavbarButton onClick={() => handleNavigation('/login')}>Login</MobileNavbarButton>
                            <MobileNavbarButton onClick={() => handleNavigation('/play')}>Play</MobileNavbarButton>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

export default SiteNavbar;
