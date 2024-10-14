import React from 'react';
import './ChatList.css';

function ChatList({ chats, onSelectChat }) {
  return (
    <div className="chat-list-container">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="chat-item"
          onClick={() => onSelectChat(chat)}
        >
          {chat.name}
        </div>
      ))}
    </div>
  );
}

export default ChatList;