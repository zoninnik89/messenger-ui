import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const AuthPopup = ({ open, from }) => {
  const [isOpened, setOpen] = useState(open);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // For registration
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const navigate = useNavigate();

  const loginUrl = 'http://localhost:8080/login'
  const registerUrl = 'http://localhost:8080/register'

  // Handle closing of the popup and navigate back to home page
  const handleClose = () => {
    setOpen(false);
    navigate(from)
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

    setErrors({ email: emailError, password: passwordError, confirmPassword: confirmPasswordError });

    // If form is valid, proceed with login request
    if (valid) {
        try {
            const url = isLogin ? loginUrl : registerUrl
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(isLogin ? 'Login successful:' : 'Registration successful:', data);
                // Store the token in user store
            } else {
                console.error('Login failed:', response.statusText)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }
  }

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({ email: '', password: '', confirmPassword: '' });
  };

  return (

      <Dialog open={isOpened} onClose={handleClose}>
        <DialogTitle>{isLogin ? 'Login' : 'Register'}</DialogTitle>
        <DialogContent>
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
            error={!!errors.email}
            helperText={errors.email}
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
            error={!!errors.password}
            helperText={errors.password}
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
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
            />
          )}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleFormSubmit}>Login</Button>
        </DialogActions>
        <DialogActions>
            <span>{isLogin ? 'New here? ' : 'Already registered? '}</span>
            <Button onClick={toggleForm} color="primary" style={{ textTransform: 'none' }}>
                {isLogin ? 'Register' : 'Log in'}
            </Button>
        </DialogActions>
      </Dialog>

  );
};

export default AuthPopup;