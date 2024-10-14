import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, receiveMessage } from './redux/chatSlice';
import { Container, TextField, IconButton, Box, Typography, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const App = () => {
  const dispatch = useDispatch();
  const { messages, user } = useSelector((state) => state.chat);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim() === '') return;
    const message = {
      id: Date.now(),
      text: newMessage,
      user: user.name,
      timestamp: new Date().toLocaleTimeString(),
    };
    dispatch(sendMessage(message));
    setNewMessage('');

    setTimeout(() => {
      const botMessage = {
        id: Date.now(),
        text: 'Received your message!',
        user: 'Bot',
        timestamp: new Date().toLocaleTimeString(),
      };
      dispatch(receiveMessage(botMessage));
    }, 1000);
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(to bottom right, #f0f4f8, #d9e2ec)`, // Set a path to your background image
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" gutterBottom align="center" sx={{ color: 'primary.main' }}>
            Chat Application
          </Typography>
          <Box
            sx={{
              maxHeight: '400px',
              overflowY: 'auto',
              mb: 2,
              p: 2,
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: 'flex',
                  flexDirection: msg.user === user.name ? 'row-reverse' : 'row',
                  alignItems: 'flex-start',
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    maxWidth: '70%',
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: msg.user === user.name ? 'primary.main' : 'grey.300',
                    color: msg.user === user.name ? 'white' : 'black',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  <Typography variant="body1">{msg.text}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {msg.timestamp} - {msg.user}
                  </Typography>
                </Box>
              </Box>
            ))}
            <div ref={chatEndRef} />
          </Box>
          <Box display="flex" alignItems="center">
            <TextField
              fullWidth
              variant="outlined"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              sx={{
                backgroundColor: 'white',
                borderRadius: 2,
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              sx={{
                ml: 1,
                bgcolor: newMessage.trim() === '' ? 'grey.300' : 'primary.main',
                '&:hover': {
                  bgcolor: newMessage.trim() === '' ? 'grey.400' : 'primary.dark',
                },
                color: newMessage.trim() === '' ? 'black' : 'white',
                borderRadius: '50%',
                p: 2,
              }}
              disabled={newMessage.trim() === ''}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default App;
