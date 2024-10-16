
import './App.css'; 
import React from 'react';
import { observer } from 'mobx-react-lite';
import ChatPage from './components/pages/ChatPage/ChatPage';
import LoginModalWrapper from './components/modals/LoginModal/LoginModal';
import TopMenu from './components/top_menu/TopMenu';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

const App = observer(() => {

  return (
    <Router>
      <div className="app">
        <TopMenu /> {/* MenuBar will always stay at the top */}
        <div className="content">
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/login" element={<LoginModalWrapper />} />
          </Routes>
          <LoginModalWrapper />
        </div>
      </div>
    </Router>
  );

  });

export default App;
