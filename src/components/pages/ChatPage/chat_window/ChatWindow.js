import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { Box, Avatar, TextField, IconButton, Typography } from '@mui/material';
import './ChatWindow.css';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../store/useStore';

const ChatWindow = observer(() => {
  const { chatStore } = useStore(); // Store for current user and chat messages
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    // Sending the message through the store
    chatStore.sendMessage({
      text: newMessage,
      sender: chatStore.currentUser.id,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // time of sending
    });
    setNewMessage('');
  };

  if (!chatStore.selectedChat) {
    return (
      <Box className="no-chat-selected" textAlign="center" m="auto">
        Select a chat to start messaging
      </Box>
    );
  }

  return (
    <Box className="chat-window-container" display="flex" flexDirection="column" height="100%">
      {/* Messages section */}
      <Box className="messages" flex="1" p={2} overflow="auto">
        {chatStore.selectedChat.messages.map((msg, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection={msg.sender.id === chatStore.currentUser.id ? 'row-reverse' : 'row'}
            alignItems="flex-end"
            mb={2}
          >
            {/* Avatar */}
            <Avatar src={msg.sender.avatar} alt="Avatar" />

            {/* Message content */}
            <Box
              ml={msg.sender.id === chatStore.currentUser.id ? 0 : 2}
              mr={msg.sender.id === chatStore.currentUser.id ? 2 : 0}
              bgcolor={msg.sender.id === chatStore.currentUser.id ? '#dcf8c6' : '#e0e0e0'}
              p={2}
              borderRadius={2}
              maxWidth="60%"
            >
              <Typography variant="body1">{msg.text}</Typography>
              <Typography variant="caption" color="textSecondary" textAlign="right">
                {msg.time}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Input field for new message */}
      <Box display="flex" p={2} borderTop="1px solid #ddd">
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <IconButton onClick={sendMessage} color="primary" sx={{ ml: 1 }}>
          <IoSend />
        </IconButton>
      </Box>
    </Box>
  );
});

export default ChatWindow;