import React from 'react';
import './TopMenu.css'; 
import { Link } from 'react-router-dom';

const TopMenu = () => {
  return (
    <div className="fixed-menu">
      <div className="logo">
        <h1>Messenger</h1>
      </div>
      <div className="menu-items">
        <Link to="/">Chat</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default TopMenu;