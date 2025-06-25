import { useState } from 'react';
import './appBot.css';
import ChatBubble from './components/ChatBubble';

import { useChat } from './hooks/useChat';
import ChatWindow from './components/ChatWindows';

function AppBot() {
  const [showChat, setShowChat] = useState(false);
  const { 
    messages, 
    sendMessage, 
    handleButtonClick, 
    resetChat 
  } = useChat();


  return (
    <div className="App">
      {/* Botón flotante con el robot */}
      <ChatBubble 
        onClick={() => {
          setShowChat(true);
          if (messages.length === 0) {
            sendMessage("inicio");
          }
        }} 
      />

      {/* Chatbox */}
      {showChat && (
        <ChatWindow 
          messages={messages}
          onClose={() => {
            setShowChat(false);
            resetChat();
          }}
          onSendMessage={sendMessage}
          onButtonClick={handleButtonClick}
        />
      )}
    </div>
  );
}

export default AppBot;