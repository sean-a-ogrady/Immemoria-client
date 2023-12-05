import React from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import darkModeLogo from '../assets/Immemoria-logo-dark-theme.png';
import lightModeLogo from '../assets/Immemoria-logo-light-theme.png';

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
    return darkMode ? (
        // Moon Icon
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
    ) : (
        // Sun Icon
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
    );
};

function SiteNavbar({ toggleDarkMode, darkMode }) {
    return (
        <Disclosure as="nav" className="bg-light-navbar dark:bg-dark-navbar">
            {({ open }) => (
                <>
                    <div className="flex items-center justify-between p-4">
                        <img src={darkMode ? darkModeLogo : lightModeLogo} alt="Logo" className="h-10 w-auto" />

                        <div className="sm:hidden">
                            {/* Mobile Menu Icon */}
                            <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-light-primary-text dark:text-dark-primary-text hover:text-light-secondary-text dark:hover:text-dark-secondary-text focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dark-accent">
                                <span className="sr-only">Open main menu</span>
                                {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                            </Disclosure.Button>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:space-x-4">
                            {/* Dark Mode Toggle */}
                            <DesktopNavbarButton onClick={toggleDarkMode}>
                                <DarkModeIcon darkMode={darkMode} />
                            </DesktopNavbarButton>

                            {/* Other Buttons */}
                            <DesktopNavbarButton>Sign Up</DesktopNavbarButton>
                            <DesktopNavbarButton>Login</DesktopNavbarButton>
                            <DesktopNavbarButton>Play</DesktopNavbarButton>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {/* Mobile Dark Mode Toggle */}
                            <MobileNavbarButton onClick={toggleDarkMode}>
                                <DarkModeIcon darkMode={darkMode} />
                            </MobileNavbarButton>
                            {/* Other Mobile Buttons */}
                            <MobileNavbarButton>Sign Up</MobileNavbarButton>
                            <MobileNavbarButton>Login</MobileNavbarButton>
                            <MobileNavbarButton>Play</MobileNavbarButton>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

export default SiteNavbar;
