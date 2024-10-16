import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal'; 

const LoginModalWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || '/'; // Get the previous location
  const isLoginRoute = location.pathname === '/login';  

  return (
    <>
      {isLoginRoute && <LoginModal from={from} nav={navigate} />}
    </>
  );
};

export default LoginModalWrapper;