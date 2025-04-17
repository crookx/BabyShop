import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, IconButton, Typography, Avatar, Badge } from '@mui/material';
import { Send, Close, ChatBubble } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import io from 'socket.io-client';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [agentTyping, setAgentTyping] = useState(false);

  useEffect(() => {
    const newSocket = io('/chat');
    setSocket(newSocket);

    newSocket.on('message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    newSocket.on('agentTyping', (typing) => {
      setAgentTyping(typing);
    });

    return () => newSocket.close();
  }, []);

  const sendMessage = () => {
    if (message.trim() && socket) {
      socket.emit('message', {
        text: message,
        sender: 'user',
        timestamp: new Date()
      });
      setMessage('');
    }
  };

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        sx={{ position: 'fixed', bottom: 20, right: 20 }}
      >
        <Badge badgeContent={messages.filter(m => !m.read).length} color="error">
          <ChatBubble />
        </Badge>
      </IconButton>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
          >
            <Paper
              sx={{
                position: 'fixed',
                bottom: 80,
                right: 20,
                width: 320,
                height: 400,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Chat implementation */}
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChat;