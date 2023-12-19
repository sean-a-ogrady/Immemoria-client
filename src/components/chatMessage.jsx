import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ message, isOwnMessage, actions, handleActionClick, opacity }) => {

    const [showActions, setShowActions] = useState(true);

    const onActionClick = (actionText) => {
        setShowActions(false); // Collapse the buttons
        handleActionClick(actionText); // Call the passed in event
    };

    const markdownStyles = {
        // Headers
        h1: "text-xl font-bold  text-light-primary-text dark:text-dark-primary-text",
        h2: "text-lg font-semibold  text-light-primary-text dark:text-dark-primary-text",
        h3: "text-md font-medium  text-light-primary-text dark:text-dark-primary-text",
        h4: "text-md font-medium  text-light-primary-text dark:text-dark-primary-text",
        h5: "text-md font-medium  text-light-primary-text dark:text-dark-primary-text",
        h6: "text-md font-medium  text-light-primary-text dark:text-dark-primary-text",

        // Paragraph
        p: " text-light-primary-text dark:text-dark-primary-text",

        // Links
        a: "text-light-accent hover:underline dark:text-dark-accent dark:hover:bg-dark-background",

        // Lists
        ul: "list-disc pl-5  text-light-primary-text dark:text-dark-primary-text",
        ol: "list-decimal pl-5  text-light-primary-text dark:text-dark-primary-text",
        li: "mb-1 text-light-primary-text dark:text-dark-primary-text",

        // Blockquotes
        blockquote: "border-l-4 border-light-secondary-text pl-4 italic dark:border-dark-secondary-text",

        // Code
        code: "p-2 bg-light-navbar rounded-md dark:bg-dark-navbar",
        pre: "p-4 bg-light-navbar rounded-md overflow-x-auto dark:bg-dark-navbar",

        // Horizontal Rule
        hr: " border-t border-light-secondary-text dark:border-dark-secondary-text",

        // Emphasis
        em: "italic text-light-primary-text dark:text-dark-primary-text",
        strong: "font-bold text-light-primary-text dark:text-dark-primary-text",

        // Images
        img: " rounded shadow-md dark:shadow-lg",

        // Tables (Assuming you might use tables in your markdown)
        table: "w-full  border-collapse border border-light-secondary-text dark:border-dark-secondary-text",
        th: "px-4 py-2 border border-light-secondary-text dark:border-dark-secondary-text",
        td: "px-4 py-2 border border-light-secondary-text dark:border-dark-secondary-text",
        thead: "bg-light-navbar dark:bg-dark-navbar",
        tbody: "bg-light-background dark:bg-dark-background"
    };

    const components = {
        h1: ({ node, ...props }) => <h1 className={markdownStyles.h1} {...props} />,
        h2: ({ node, ...props }) => <h2 className={markdownStyles.h2} {...props} />,
        h3: ({ node, ...props }) => <h3 className={markdownStyles.h3} {...props} />,
        h4: ({ node, ...props }) => <h4 className={markdownStyles.h4} {...props} />,
        h5: ({ node, ...props }) => <h5 className={markdownStyles.h5} {...props} />,
        h6: ({ node, ...props }) => <h6 className={markdownStyles.h6} {...props} />,
        p: ({ node, ...props }) => <p className={markdownStyles.p} {...props} />,
        a: ({ node, ...props }) => <a className={markdownStyles.a} {...props} />,
        ul: ({ node, ...props }) => <ul className={markdownStyles.ul} {...props} />,
        ol: ({ node, ...props }) => <ol className={markdownStyles.ol} {...props} />,
        li: ({ node, ...props }) => <li className={markdownStyles.li} {...props} />,
        blockquote: ({ node, ...props }) => <blockquote className={markdownStyles.blockquote} {...props} />,
        code: ({ node, ...props }) => <code className={markdownStyles.code} {...props} />,
        pre: ({ node, ...props }) => <pre className={markdownStyles.pre} {...props} />,
        hr: ({ node, ...props }) => <hr className={markdownStyles.hr} {...props} />,
        em: ({ node, ...props }) => <em className={markdownStyles.em} {...props} />,
        strong: ({ node, ...props }) => <strong className={markdownStyles.strong} {...props} />,
        img: ({ node, ...props }) => <img className={markdownStyles.img} {...props} />,
        table: ({ node, ...props }) => <table className={markdownStyles.table} {...props} />,
        th: ({ node, ...props }) => <th className={markdownStyles.th} {...props} />,
        td: ({ node, ...props }) => <td className={markdownStyles.td} {...props} />,
        thead: ({ node, ...props }) => <thead className={markdownStyles.thead} {...props} />,
        tbody: ({ node, ...props }) => <tbody className={markdownStyles.tbody} {...props} />,
    };

    
    const actionContainerStyle = `transition-all duration-300 ${showActions ? "opacity-100" : "opacity-0 h-0"}`;
    const messageContainerStyle = `my-2 animate-fade-in`;
    const messageBubbleStyle = isOwnMessage
        ? "bg-light-navbar dark:bg-dark-navbar" // Slightly lighter shade for user messages
        : "bg-light-navbar dark:bg-dark-navbar"; // Same color as the background for AI messages  
    
    return (
        <div className={`w-full ${messageContainerStyle}`}>
            <div className={`block w-full px-4 py-2 rounded-lg ${messageBubbleStyle} overflow-hidden`} style={{opacity: opacity}}>
                {/* Render the message as markdown */}
                <ReactMarkdown components={components}>
                    {(isOwnMessage ? "**Player:**" : "**System:** ") + "\n\n" + message}
                </ReactMarkdown>

                {/* Render action buttons if actions are provided, it's an AI message, and showActions is true */}
                {!isOwnMessage && actions && showActions && (
                    <div className="flex flex-col justify-center mt-4">
                        {Object.entries(actions).reverse().map(([actionType, actionText]) => (
                            <button
                                key={actionType}
                                className="mb-2 px-4 py-2 text-light-primary-text dark:text-dark-primary-text border border-light-primary-text dark:border-dark-primary-text hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 text-left"
                                onClick={() => onActionClick(actionText)}
                            >
                                <strong>{actionType.charAt(0).toUpperCase() + actionType.slice(1).replace(/_/g, " ")}:</strong> {actionText}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatMessage;
