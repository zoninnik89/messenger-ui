import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal'; 

const LoginModalWrapper = () => {
  const location = useLocation();
  const from = location.state?.from || '/'; // Get the previous location
  const isLoginRoute = location.pathname === '/login';  

  return (
    <>
      {isLoginRoute && <LoginModal open={isLoginRoute} from={from} />}
    </>
  );
};

export default LoginModalWrapper;