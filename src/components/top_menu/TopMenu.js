import React, { useState } from 'react';
import './TopMenu.css'; 
import Button from '@mui/material/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import LoginModal from '../modals/LoginModal/LoginModal'; 
import LogoutModal from '../modals/LogoutModal/LogoutModal';
import { observer } from 'mobx-react-lite';

const TopMenu = observer (() => {
  const { userStore } = useStore();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false); // State to control LoginModal visibility
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false); // State to control LogoutModal visibility
  const isAuthenticatedUser = userStore.currentUser.id !== '';

  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false); // Close the login modal
  };

  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalOpen(false); // Close the logout modal
  };

  return (
    <div className="fixed-menu">
      <div className="logo">
        <h1>Messenger</h1>
      </div>
      <div className="menu-items">
        <Link to="/">Chat</Link>
        {isAuthenticatedUser ? (
          <Button onClick={handleLogoutClick} color="primary" style={{ textTransform: 'none' }}>Log out</Button>
        ) : (
          <Button onClick={handleLoginClick} color="primary" style={{ textTransform: 'none' }}>Log in</Button>
        )}
      </div>
      <LoginModal open={isLoginModalOpen} onClose={closeLoginModal} />
      <LogoutModal open={isLogoutModalOpen} onClose={closeLogoutModal} />
    </div>
  );
});

export default TopMenu;