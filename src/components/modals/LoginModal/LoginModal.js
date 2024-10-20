import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store/useStore';

const LoginModal = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // For registration
  const [uiValidationErrors, setUIValidationErrors] = useState({ email: '', password: '', confirmPassword: '' });
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [successMessage, setSuccessMessage] = useState(''); // For success message
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // To track registration success
  const [backendErrorMessage, setBackendErrorMessage] = useState(''); // To track backend error messages

  const { userStore, webSocketStore } = useStore();

  const loginUrl = 'http://127.0.0.1:3002/login'
  const registerUrl = 'http://127.0.0.1:3002/register'

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  // Handle closing of the popup and cleaning all fields
  const handleClose = () => {
    clearForm();
    onClose();
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleFormSubmit = async () => {
    let valid = true;
    let emailError = '';
    let passwordError = '';
    let confirmPasswordError = '';

    // Validate email
    if (!email) {
      emailError = 'Email is required';
      valid = false;
    } else if (!validateEmail(email)) {
      emailError = 'Invalid email address';
      valid = false;
    }

    // Validate password
    if (!password) {
      passwordError = 'Password is required';
      valid = false;
    }

    // Validate confirm password (only for registration)
    if (!isLogin && password !== confirmPassword) {
        confirmPasswordError = 'Passwords do not match';
        valid = false;
    }

    setUIValidationErrors({ email: emailError, password: passwordError, confirmPassword: confirmPasswordError });

    // If form is valid, proceed with login request
    if (valid) {
        try {
            const url = isLogin ? loginUrl : registerUrl
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login: email, password: password }),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                if (isLogin) {
                  userStore.saveUserData(data["auth_token"]);
                  console.log('Login successful:', data);
                  webSocketStore.connect();
                  handleClose();
                } else {
                  console.log('Registration successful:', data);
                  setSuccessMessage('Registration successful! Please log in.'); // Set success message
                  setRegistrationSuccess(true); // Mark registration as successful
                  clearForm();
                }
                setBackendErrorMessage(''); // Clear any existing backend error message
            } else {
              const error = data.error || 'An error occurred on backend';
              setBackendErrorMessage(error);
              console.error(isLogin ? 'Login failed:' : 'Registration failed:', error);
            }
        } catch (error) {
          setBackendErrorMessage('Internal server error, please try again later');
          console.error('Error:', error)
        }
    }
  }

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setUIValidationErrors({ email: '', password: '', confirmPassword: '' });
    setSuccessMessage('');
    setRegistrationSuccess(false); // Reset registration success state
    setBackendErrorMessage(''); // Clear backend error messagee
    clearForm();
  };

  return (

    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isLogin ? 'Login' : 'Register'}</DialogTitle>
      <DialogContent>
        {registrationSuccess ? (
          // Show success message and link back to login form
          <>
            <div style={{ color: 'green', marginBottom: '1em' }}>
              {successMessage}
            </div>
            <div>
              <Button onClick={toggleForm} color="primary" style={{ textTransform: 'none', marginTop: '1em' }}>
                Go to Login
              </Button>
            </div>
          </>
        ) : (
          // Show form fields when not registered
          <>
            {backendErrorMessage && (
              <div style={{ color: 'red', marginBottom: '1em' }}>
                {backendErrorMessage}
              </div>
            )}
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!uiValidationErrors.email}
              helperText={uiValidationErrors.email}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!uiValidationErrors.password}
              helperText={uiValidationErrors.password}
            />
            {!isLogin && (
              <TextField
                margin="dense"
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
                variant="standard"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!uiValidationErrors.confirmPassword}
                helperText={uiValidationErrors.confirmPassword}
              />
            )}
          </>
        )}
      </DialogContent>
      {!registrationSuccess && (
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleFormSubmit}>{isLogin ? 'Login' : 'Register'}</Button>
        </DialogActions>
      )}
      {!registrationSuccess && (
        <DialogActions>
          <span>{isLogin ? 'New here? ' : 'Already registered? '}</span>
          <Button onClick={toggleForm} color="primary" style={{ textTransform: 'none' }}>
            {isLogin ? 'Register' : 'Log in'}
          </Button>
        </DialogActions>
      )}
  </Dialog>

  );
};

export default LoginModal;