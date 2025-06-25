import React from 'react';

interface ChatBubbleProps {
    onClick: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ onClick }) => {
    return (
        <div id="chat-popup" onClick={onClick}>
            <div className="bubble">Hola!, <br /> ¿Podemos <br /> ayudarte?</div>
            <img src="/assets/chatbot.png" alt="WhatsApp Vaca" className="cow-img" />
        </div>
    );
};

export default ChatBubble;  