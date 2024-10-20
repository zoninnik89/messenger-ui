import React, { useEffect } from 'react';
import ChatList from './chat_list/ChatList';
import ChatWindow from './chat_window/ChatWindow';
import './ChatPage.css'; 
import { useStore } from '../../../store/useStore';

const ChatPage = () => {

  const {webSocketStore} = useStore();
  if (!webSocketStore.isConnected) {
    webSocketStore.connect();
  }

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