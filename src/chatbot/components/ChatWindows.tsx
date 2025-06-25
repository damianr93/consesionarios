import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types/types';
import BotMessage from './BotMessage';
import UserMessage from './UserMessage';

interface ChatWindowProps {
  messages: Message[];
  onClose: () => void;
  onSendMessage: (message: string) => void;
  onButtonClick: (value: string, text: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ 
  messages, 
  onClose, 
  onSendMessage,
  onButtonClick
}) => {
  const [inputValue, setInputValue] = useState('');
  const chatContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div id="chat-box">
      <div id="chat-header">
        Consecionario Bot
        <span id="chat-close" onClick={onClose}>✖</span>
      </div>
      <div id="chat-content" ref={chatContentRef}>
        {messages.map((message, index) => (
          message.type === "bot" 
            ? <BotMessage 
                key={index} 
                text={message.text} 
                buttons={message.buttons}
                media={message.media}
                onButtonClick={onButtonClick}
              />
            : <UserMessage key={index} text={message.text} />
        ))}
      </div>
      <div className="chat-input-container">
        <input 
          type="text" 
          id="chat-input" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe un mensaje..." 
        />
        <button 
          className="send-button"
          onClick={handleSendMessage}
          disabled={!inputValue.trim()}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            fill="currentColor" 
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;