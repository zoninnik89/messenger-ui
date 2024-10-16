import React from 'react';
import './TopMenu.css'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';

const TopMenu = () => {
  const location = useLocation(); 

  return (
    <div className="fixed-menu">
      <div className="logo">
        <h1>Messenger</h1>
      </div>
      <div className="menu-items">
        <Link to="/">Chat</Link>
        <Link to="/login" state={{ from: location.pathname }}>Login</Link>
      </div>
    </div>
  );
};

export default TopMenu;