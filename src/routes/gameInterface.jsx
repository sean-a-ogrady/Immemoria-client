import React, { useState, useRef, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon, Cog6ToothIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import ChatMessage from '../components/chatMessage';
import SidebarSection from '../components/sidebarSection';
import initializationOptions from '../assets/initialization_options.json';


export default function GameInterface() {

    // messages: An array that holds all chat messages.
    const [messages, setMessages] = useState([]);

    // isSmallScreen: A boolean that indicates whether the screen size is small (less than 640px).
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

    // isDesktopSidebarOpen: A boolean that controls the visibility of the desktop sidebar.
    const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);

    // isMobileMenuOpen: A boolean that controls the visibility of the mobile menu.
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // summary: An array that holds the summary of the game.
    const [summary, setSummary] = useState([]);

    // openSections: An object that tracks which sections are open (Character, Inventory, Map) in the sidebar/menu.
    const [openSections, setOpenSections] = useState({
        Character: false,
        Inventory: false,
        Map: false
    });

    // Ref used to access the chat container element for displaying chat messages.
    const chatContainerRef = useRef(null);
    // Ref used to access the textarea element for user input.
    const textareaRef = useRef(null);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;

        // Temporarily shrink to get the correct scrollHeight
        textarea.style.height = '2px'; // Set to a small height to force scrollHeight to adjust

        // Calculate the necessary height (either scrollHeight or max-height)
        const newHeight = Math.min(textarea.scrollHeight, 128); // 128px as the maximum height

        // Apply the new height
        textarea.style.height = `${newHeight}px`;
    };

    /*
    * Scrolls the chat container to the bottom.
    * This function is called whenever the messages array is updated.
    */
    const scrollToBottom = () => {
        const chatContainer = chatContainerRef.current;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    /*
    * Calculates the opacity of a chat message based on its index.
    * The most recent message will have an opacity of 1, and the opacity will decrease by 0.05 for each older message.
    * Since only the most recent 10 messages are displayed, the oldest message will have an opacity of 0.5.
    */
    const calculateOpacity = index => {
        const totalMessages = messages.length;
        const age = totalMessages - index;
        return (100 - age * 5 + 5) / 100;
    };

    // Returns a random initialization option from the specified category
    const getRandomOption = (category) => {
        const options = initializationOptions.actions[category];
        return options[Math.floor(Math.random() * options.length)].description;
    };

    // Initialize the game with a welcome message
    const initializeGameMessage = () => {
        setMessages([{
            text: `Welcome to *Immemoria*, a text-based RPG where your memories shape reality. In this ever-changing world, each decision you make influences the course of your journey.
                As you explore various locations across time, interact with NPCs, and face challenges, remember that your choices not only affect the present but also alter the past and future.
                To begin your adventure in Immemoria, simply choose an action from the list below to kickstart the gameplay, or write your own. Your actions will determine the path you take and the form Immemoria holds.
                \n\n**How to Play:**
                \n- Immemoria responds to your inputs, creating a narrative based on your choices.
                \n- The game tracks your interactions and decisions through the *conversation history* (what you're currently looking at) and *summary* (available in the menu).
                \n- The conversation history shows recent exchanges, helping maintain the story's context. It's limited to the 10 most recent messages.
                \n- The 'summary' provides an overview of key developments and decisions, capturing your journey's essence.
                \n- Everything that is viewable on your screen is what Immemoria remembers. Beyond that, the world and history evolve and change, just as with memory.
                \nRemember, in *Immemoria*, your memories are the key to shaping your destiny.`,
            isOwnMessage: false,
            actions: {
                awaken_in_mystery: "I open my eyes.",
                time_period: getRandomOption("time_period"),
                start_in_a_location: getRandomOption("start_in_a_location"),
                establish_a_genre: getRandomOption("establish_a_genre"),
                player_motivation: getRandomOption("player_motivation"),
                encounter_a_situation: getRandomOption("encounter_a_situation"),
                explore_a_memory: getRandomOption("explore_a_memory")
            }
        }]);
    }

    // Initialize the game with a welcome message
    useEffect(() => {
        // TODO: Initialize from database
        // If there is no conversation history, initialize the game with a welcome message
        initializeGameMessage();
    }, []);

    // Scroll to the bottom of the chat container whenever the messages array is updated
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Listen for window resize events and update isSmallScreen accordingly
    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 640);
        };
        window.addEventListener('resize', checkScreenSize);
        return () => {
            window.removeEventListener('resize', checkScreenSize);// Clean up
        };
    }, []);

    // Placeholder function for handling settings button click
    // TODO: Replace with actual function
    // For now, this will reset the conversation history
    const handleSettingsClick = () => {
        // For now, this will reset the conversation history
        setMessages([]);
        setSummary([]);
        fetch('http://localhost:5000/ai/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert("Conversation reset.")
            })
        initializeGameMessage();
    };

    /*
    * Handles the Enter key press event for the textarea.
    * If the Enter key is pressed without the Shift key, the submit function will be called.
    * Otherwise, a new line will be created.
    */
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevents the default action (new line)
            handleSubmit(); // Calls submit function
        }
    };

    /* 
    * Fetches the AI response and adds it to the messages array.
    * This function is called whenever the user submits a message.
    * If the user clicked an action button, the action text will be passed in as a parameter.
    * Otherwise, the textarea value will be used.
    * The textarea will be reset if the user used the textarea to submit a message.
    */
    const handleSubmit = (actionText = null) => {
        const wasActionClicked = actionText !== null;
        // If the user clicked an action button, use the action text instead of the textarea value
        const userMessage = wasActionClicked ? actionText : textareaRef.current.value.trim();
        if (userMessage) {
            // Add user message to messages array
            setMessages(prevMessages => {
                // Create a new array with the new message
                const updatedMessages = [...prevMessages, { text: userMessage, isOwnMessage: true }];
                // Keep only the last 10 messages
                return updatedMessages.slice(-10);
            });

            // Get example AI response
            fetch('http://localhost:5000/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: userMessage
                })
            })
                .then(response => response.json())
                .then(data => {
                    setMessages(prevMessages => {
                        const updatedMessages = [...prevMessages, { text: data.description, isOwnMessage: false, actions: data.actions }]
                        return updatedMessages.slice(-10);
                    });
                    setSummary(data.summary);
                })
        }
        // Reset textarea if text field was used
        if (!wasActionClicked) {
            textareaRef.current.value = '';
            adjustTextareaHeight();
        }
    };

    /*
    * Handles the toggling of sidebar sections.
    * This function is passed to the SidebarSection component as a prop.
    * The sectionTitle parameter is the title of the section that was clicked.
    * The openSections state is updated accordingly.
    */
    const handleSectionToggle = (sectionTitle) => {
        setOpenSections(prev => ({
            ...prev,
            [sectionTitle]: !prev[sectionTitle]
        }));
    };

    // Toggles the visibility of the desktop sidebar
    const toggleSidebar = () => { setIsDesktopSidebarOpen(!isDesktopSidebarOpen); };

    // Calculates the width of the sidebar based on the sidebar state and screen size
    const isAnySectionOpen = Object.values(openSections).some(value => value);
    const sidebarSectionOpenWidthToggler = isSmallScreen ? "100vw" : (isAnySectionOpen ? '420px' : '320px');

    return (
        <div className="flex flex-row min-h-[calc(100vh-72px)] max-h-[calc(100vh-72px)] border-t border-light-primary-text dark:border-dark-primary-text bg-light-background dark:bg-dark-background">
            {/* Sidebar */}
            <Disclosure as="nav">
                {({ open }) => (
                    <>
                        {/* Mobile Sidebar Toggle Button */}
                        <div className={`${open ? "bottom-4" : "bottom-20"} sm:hidden fixed right-4 z-20`}>
                            <Disclosure.Button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-full text-light-primary-text dark:text-dark-primary-text hover:bg-light-secondary-text dark:hover:bg-dark-secondary-text transition-colors duration-200">
                                <span className="sr-only">Toggle sidebar</span>
                                {open ? <ChevronDownIcon className="h-6 w-6" /> : <ChevronUpIcon className="h-6 w-6" />}
                            </Disclosure.Button>
                        </div>


                        {/* Combined Sidebar Content for Mobile and Desktop */}
                        <div
                            className={`${open ? 'block' : 'hidden'} h-full sm:block px-4 py-2 sm:max-w-[420px]
                                ${isDesktopSidebarOpen ? `sm:w-[${sidebarSectionOpenWidthToggler}] sm:px-4` : 'sm:w-0 sm:px-0'} 
                                w-[100vw] bg-light-sidebar dark:bg-dark-sidebar z-10 flex flex-col overflow-y-auto
                                ${(isSmallScreen || !isDesktopSidebarOpen) ? "" : "border-r border-light-primary-text dark:border-dark-primary-text"}
                                transition-all ease-in-out duration-300`}
                            style={{ width: isDesktopSidebarOpen ? sidebarSectionOpenWidthToggler : '0px' }}
                        >
                            {/* Section header - Memories */}
                            <h2 className="py-2 text-m font-medium text-light-primary-text dark:text-dark-primary-text">Memories</h2>
                            <hr className="my-4 border-light-secondary-text dark:border-dark-secondary-text" />

                            {/* Summary Dropdown */}
                            <SidebarSection
                                title="Summary"
                                handleSectionToggle={handleSectionToggle}
                                content={summary} openSections={openSections}
                                isSmallScreen={isSmallScreen}
                                isDesktopSidebarOpen={isDesktopSidebarOpen}
                                isMobileMenuOpen={isMobileMenuOpen}
                            />
                            <hr className="my-4 border-light-secondary-text dark:border-dark-secondary-text" />

                            {/* Settings */}
                            {/* TODO: Replace with actual settings */}
                            <button
                                onClick={handleSettingsClick}
                                className="flex items-center w-full mb-3 text-left font-semibold text-light-primary-text dark:text-dark-primary-text hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-200 whitespace-nowrap"
                            >
                                <Cog6ToothIcon className="h-5 w-5 mr-2 min-w-[20px]" />
                                Reset Conversation
                            </button>
                        </div>
                    </>
                )}
            </Disclosure>

            {/* Sidebar Toggle Button for Desktop */}
            <div className={`hidden sm:flex sm:absolute sm:left-[${sidebarSectionOpenWidthToggler}] sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-1 z-20 transition-all ease-in-out duration-300`} style={{ left: isDesktopSidebarOpen ? sidebarSectionOpenWidthToggler : '0px' }}>
                <button
                    onClick={toggleSidebar}
                    className="text-light-primary-text dark:text-dark-primary-text hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-200"
                >
                    {isDesktopSidebarOpen ? <ChevronLeftIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
                </button>
            </div>

            {/* Center Content */}
            <div className={`${(isMobileMenuOpen && isSmallScreen) ? "hidden" : ""} flex-grow flex flex-col justify-between bg-light-background dark:bg-dark-background`}>
                {/* Chat Container */}
                <div ref={chatContainerRef} className="flex flex-col overflow-y-auto overflow-x-hidden py-3 px-7 max-w-3xl w-full mx-auto">
                    {/* Render chat messages */}
                    {messages.map((msg, index) => (
                        <ChatMessage
                            key={index}
                            message={msg.text}
                            isOwnMessage={msg.isOwnMessage}
                            actions={msg.actions}
                            handleActionClick={handleSubmit}
                            opacity={calculateOpacity(index)}
                        />
                    ))}

                </div>

                {/* Input Area */}
                <div className="flex items-center justify-center p-4">
                    <div className="flex items-center max-w-3xl w-full">
                        <textarea
                            ref={textareaRef}
                            onChange={adjustTextareaHeight}
                            onKeyDown={handleKeyPress}
                            placeholder="Type your action (experimental)"
                            className="flex-grow resize-none p-2 rounded-md border border-light-secondary-text dark:border-dark-secondary-text bg-light-background dark:bg-dark-background text-light-primary-text dark:text-dark-primary-text overflow-auto h-10 max-h-32"
                        />
                        <button
                            onClick={handleSubmit}
                            className="ml-2 flex items-center justify-center p-2 rounded-md text-light-primary-text dark:text-dark-primary-text hover:bg-light-secondary-text dark:hover:bg-dark-secondary-text transition-colors duration-200"
                        >
                            <PaperAirplaneIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}