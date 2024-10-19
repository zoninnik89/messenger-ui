import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useStore } from '../../../store/useStore';

const LogoutModal = ({ open, onClose }) => {

  const { userStore } = useStore();

  const handleLogout = () => {
    userStore.removeUserData();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  }

  return (

    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>{'Logging out'}</DialogTitle>
      <DialogContent>
        <div style={{ color: 'black', marginBottom: '1em' }}>
            {'Please confirm that you want to log out'}
        </div>
      </DialogContent>
        <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleLogout}>{'Log out'}</Button>
        </DialogActions>
    </Dialog>
  );
};

export default LogoutModal;