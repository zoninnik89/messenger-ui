
import './App.css'; 
import React from 'react';
import { observer } from 'mobx-react-lite';
import ChatPage from './components/pages/ChatPage/ChatPage';
import StartPage from './components/pages/StartPage/StartPage';
import TopMenu from './components/top_menu/TopMenu';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from './store/useStore'
import { InitializeWebSocketService } from './services'

const App = observer(() => {
  InitializeWebSocketService();

  const { userStore } = useStore();
  const isAuthenticatedUser = userStore.currentUser.id !== '';

  return (
    <Router>
      <div className="app">
        <TopMenu /> {/* MenuBar will always stay at the top */}
        <div className="content">
          <Routes>
            <Route path="/" element= {isAuthenticatedUser ? <ChatPage /> : <StartPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );

  });

export default App;
