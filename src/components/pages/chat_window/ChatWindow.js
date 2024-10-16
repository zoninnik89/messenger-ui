import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import './ChatWindow.css';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../store/useStore';

const ChatWindow = observer(() => {
  const { chatStore } = useStore();
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    // Send the message via the store
    chatStore.sendMessage(newMessage);
    setNewMessage('');
  };

  

  if (!chatStore.selectedChat) {
    console.log("Chat window rendering:", chatStore.selectedChat);
    return <div className="no-chat-selected">Select a chat to start messaging</div>;
  }

  return (
    <div className="chat-window-container">
      <div className="messages">
        {chatStore.selectedChat.messages.map((msg, index) => (
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
});

export default ChatWindow;