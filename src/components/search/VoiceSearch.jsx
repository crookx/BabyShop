import React, { useState, useEffect } from 'react';
import { IconButton, CircularProgress, Tooltip } from '@mui/material';
import { Mic, MicOff } from '@mui/icons-material';

const VoiceSearch = ({ onResult }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (window.webkitSpeechRecognition) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      setRecognition(recognition);
    }
  }, [onResult]);

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
    } else {
      recognition?.start();
    }
    setIsListening(!isListening);
  };

  return (
    <Tooltip title={isListening ? "Stop listening" : "Search by voice"}>
      <IconButton onClick={toggleListening} color={isListening ? "primary" : "default"}>
        {isListening ? (
          <>
            <MicOff />
            <CircularProgress size={24} thickness={2} sx={{ position: 'absolute' }} />
          </>
        ) : (
          <Mic />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default VoiceSearch;