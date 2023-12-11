import React from 'react';

const ChatMessage = ({ message, isOwnMessage }) => {
  const messageContainerStyle = isOwnMessage
    ? "self-end text-right mr-2" // Right margin for user messages
    : "self-start text-left ml-2"; // Left margin for AI messages

  const messageBubbleStyle = isOwnMessage
    ? "bg-light-interactive dark:bg-dark-interactive text-light-background dark:text-dark-background"
    : "bg-light-secondary-text dark:bg-dark-secondary-text text-dark-primary-text dark:text-dark-primary-text";

  return (
    <div className={`w-full ${messageContainerStyle} max-w-[75%]`}>
      <div className={`inline-block px-4 py-2 rounded-lg ${messageBubbleStyle} break-words overflow-hidden`}>
        <p className="whitespace-normal">
          {message}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
