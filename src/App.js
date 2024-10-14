
import './App.css'; 
import ChatList from './components/chat_list/ChatList';
import ChatWindow from './components/chat_window/ChatWindow';


function App() {
  return (
    <div className="app">
      <div className="chat-list">
        <ChatList chats={chats} onSelectChat={setSelectedChat} />
      </div>
      <div className="chat-window">
        {selectedChat ? (
          <ChatWindow chat={selectedChat} />
        ) : (
          <div className="no-chat-selected">Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
}

export default App;
