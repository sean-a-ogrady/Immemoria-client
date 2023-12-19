import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

const SidebarSection = ({ title, content, handleSectionToggle, openSections, isSmallScreen, isDesktopSidebarOpen, isMobileMenuOpen }) => {
    const [displayContent, setDisplayContent] = useState(false);

    const handleToggle = () => {
        handleSectionToggle(title);
        if (!openSections[title]) {
            setDisplayContent(false); // Reset display content when closing
        }
    };

    useEffect(() => {
        if (isSmallScreen) {
            setDisplayContent(true); // Display content immediately on mobile
            return;
        }
        if (openSections[title] && isDesktopSidebarOpen) {
            // Delay the display of content when sidebar is opening
            const timer = setTimeout(() => {
                setDisplayContent(true);
            }, 300); // Adjust delay to match the sidebar opening duration
            return () => clearTimeout(timer);
        } else if (!isDesktopSidebarOpen) {
            // Immediately hide content when sidebar is closing
            setDisplayContent(false);
        }
    }, [openSections[title], isMobileMenuOpen, isDesktopSidebarOpen, isSmallScreen]);

    const contentClass = displayContent ? 'sm:animate-fade-in' : 'opacity-0 h-0';
    const shouldRenderContent = (isMobileMenuOpen || isDesktopSidebarOpen) && displayContent;

    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <Disclosure.Button onClick={handleToggle} className="flex justify-between w-full py-2 text-sm font-medium text-left text-light-primary-text dark:text-dark-primary-text hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-200">
                        {title}
                        <span className="ml-2">
                            {open ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                        </span>
                    </Disclosure.Button>
                    <Disclosure.Panel className={`px-4 pt-4 pb-2 text-sm text-light-secondary-text dark:text-dark-secondary-text transition-all ease-in-out duration-300 ${contentClass}`}>
                        {/* Render content based on sidebar state and displayContent flag */}
                        {shouldRenderContent && (
                            <div>
                                {content}
                            </div>
                        )}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default SidebarSection;