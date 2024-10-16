
import './App.css'; 
import React from 'react';
import { observer } from 'mobx-react-lite';
import ChatPage from './components/pages/ChatPage';
import TopMenu from './components/top_menu/TopMenu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = observer(() => {
  
    return (
      <Router>
        <div className="app">
          <TopMenu /> {/* MenuBar will always stay at the top */}
          <div className="content">
            <Routes>
              <Route path="/" element={<ChatPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    );

  });

export default App;
