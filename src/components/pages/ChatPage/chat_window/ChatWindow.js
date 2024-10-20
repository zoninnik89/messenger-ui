import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { Box, Avatar, TextField, IconButton, Typography } from '@mui/material';
import './ChatWindow.css';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../store/useStore';
import WebSocketService from '../../../websocketservice/WebSocketService';

const ChatWindow = observer(() => {
  const { chatStore, userStore } = useStore(); // Store for current user and chat messages
  const [newMessage, setNewMessage] = useState('');
  const currentUserID = userStore.getUserID()

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    console.log('attempting to send the message: ', newMessage)

    const websocketService = WebSocketService.instance;
    if (websocketService) {
    websocketService.sendMessage(
      JSON.stringify(
        {
          chat_id: String(chatStore.selectedChatID),
          message_text: newMessage,
        }
      )
    );
    setNewMessage('');
  } else {
    console.error('WebSocketService is not available')
  }
  }

  if (!chatStore.selectedChatID) {
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
        {chatStore.chats[chatStore.selectedChatID].messages.map((msg, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection={msg.sender_id === currentUserID ? 'row-reverse' : 'row'}
            alignItems="flex-end"
            mb={2}
          >
            {/* Avatar
            <Avatar src={msg.sender.avatar} alt="Avatar" /> */}

            {/* Message content */}
            <Box
              ml={msg.sender_id === currentUserID ? 0 : 2}
              mr={msg.sender_id === currentUserID ? 2 : 0}
              bgcolor={msg.sender_id === currentUserID ? '#dcf8c6' : '#e0e0e0'}
              p={2}
              borderRadius={2}
              maxWidth="60%"
            >
              <Typography variant="body1">{msg.message_text}</Typography>
              <Typography variant="caption" color="textSecondary" textAlign="right">
                {new Date(msg.sent_ts * 1000).toLocaleString()}
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