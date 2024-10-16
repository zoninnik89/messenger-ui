import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal'; 

const LoginModalWrapper = () => {
  const location = useLocation();

  console.log('Location in ModalWrapper:', location);

  const from = location.state?.from || '/'; // Get the previous location
  const isLoginRoute = location.pathname === '/login';  

  console.log('Location in ModalWrapper:', from);

  return (
    <>
      {<LoginModal open={isLoginRoute} from={from} />}
    </>
  );
};

export default LoginModalWrapper;