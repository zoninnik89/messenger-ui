import React, { useState } from 'react';
import './ChatList.css';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../store/useStore';

const ChatList = observer(() => {
  const { chatStore } = useStore();
  const [chatName, setChatName] = useState('');

  const handleAddChat = () => {
    if (chatName.trim() === '') return; // Check if chatname is empty
    chatStore.addChat({ name: chatName, messages: [] }); // Add chat
    setChatName(''); // Clear input field
  };

  return (
    <div className="chat-list-container">
      <h2>Chats</h2>

      <div className="add-chat-container">
        <input
          type="text"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
          placeholder="New chat name"
          className="add-chat-input"
        />
        <button onClick={handleAddChat} className="add-chat-button">
          Add Chat
        </button>
      </div>

      {chatStore.chats.map((chat, index) => (
        <div
          key={index}
          className="chat-item"
          onClick={() => chatStore.selectChat(chat.id)}
        >
          {chat.name}
        </div>
      ))}

    </div>
  );
});

export default ChatList;