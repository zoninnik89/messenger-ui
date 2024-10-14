import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import './ChatWindow.css';

function ChatWindow({ chat }) {
  const [messages, setMessages] = useState(chat.messages);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    setMessages([...messages, newMessage]);
    setNewMessage('');
  };

  return (
    <div className="chat-window-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>
          <IoSend />
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;