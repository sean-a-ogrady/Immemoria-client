// ChatMessage.jsx
import React from 'react';

const ChatMessage = ({ message, isOwnMessage }) => {
  const messageContainerStyle = isOwnMessage
    ? "self-end text-right"
    : "self-start text-left";

  const messageBubbleStyle = isOwnMessage
    ? "bg-light-interactive dark:bg-dark-interactive text-light-background dark:text-dark-background"
    : "bg-light-secondary-text dark:bg-dark-secondary-text text-dark-primary-text dark:text-dark-primary-text";

  return (
    <div className={`max-w-xs md:max-w-md lg:max-w-lg ${messageContainerStyle}`}>
      <div className={`inline-block px-4 py-2 rounded-lg ${messageBubbleStyle}`}>
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
