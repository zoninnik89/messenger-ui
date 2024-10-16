import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useLocation } from 'react-router-dom';

const AuthPopup = ({ from, navigate }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Automatically open the popup when on the /login route
  useEffect(() => {
    if (location.pathname === '/login') {
      setOpen(true);
    }
  }, [location.pathname]);

  // Handle closing of the popup and navigate back to home page
  const handleClose = () => {
    setOpen(false);
    navigate(from)
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AuthPopup;