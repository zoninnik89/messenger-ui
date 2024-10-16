import React from 'react';
import ChatList from './chat_list/ChatList';
import ChatWindow from './chat_window/ChatWindow';
import { useStore } from '../../../store/useStore';
import './ChatPage.css'; 

const ChatPage = () => {
  const { chatStore } = useStore();

  return (
    <div className="chat-page">
      <div className="chat-list">
        <ChatList />
      </div>
      <div className="chat-window">
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatPage;