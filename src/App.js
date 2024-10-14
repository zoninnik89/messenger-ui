
import './App.css'; 
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from './store/useStore';
import ChatList from './components/chat_list/ChatList';
import ChatWindow from './components/chat_window/ChatWindow';


const App = observer(() => {
    const { chatStore } = useStore(); // Access the store
  
    return (
      <div className="app">
        <div className="chat-list">
          <ChatList />
        </div>
        <div className="chat-window">
          {chatStore.selectedChat ? (
            <ChatWindow chat={chatStore.selectedChat} />
          ) : (
            <div className="no-chat-selected">Select a chat to start messaging</div>
          )}
        </div>
      </div>
    );
  });

export default App;
