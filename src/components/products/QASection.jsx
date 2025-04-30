import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Button, List, ListItem, 
  Avatar, Stack, Paper, CircularProgress, Alert, 
  IconButton, Collapse, Chip, Divider
} from '@mui/material';
import {
  ThumbUp, ExpandMore, ExpandLess, 
  QuestionAnswer, Person
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

const QASection = ({ productId }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/questions/product/${productId}`);
        console.log('API Response:', data);
        if (data.status === 'success' && Array.isArray(data.data.questions)) {
          setQuestions(data.data.questions);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Failed to load questions');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchQuestions();
    }
  }, [productId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      {questions.length > 0 ? (
        <List>
          {questions.map((qa) => (
            <Paper key={qa._id} sx={{ mb: 2, overflow: 'hidden' }}>
              <ListItem sx={{ display: 'block' }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <Person />
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {qa.question}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                      <Chip
                        icon={<ThumbUp fontSize="small" />}
                        label={`Helpful (${qa.helpful})`}
                        size="small"
                        variant="outlined"
                      />
                      {qa.answers?.length > 0 && (
                        <Chip
                          icon={<QuestionAnswer fontSize="small" />}
                          label={`${qa.answers.length} Answer${qa.answers.length > 1 ? 's' : ''}`}
                          size="small"
                          onClick={() => setExpandedQuestions(prev => ({
                            ...prev,
                            [qa._id]: !prev[qa._id]
                          }))}
                          variant="outlined"
                          color="primary"
                        />
                      )}
                      <Typography variant="caption" color="text.secondary">
                        {new Date(qa.createdAt).toLocaleDateString()}
                      </Typography>
                    </Stack>

                    {qa.answers?.length > 0 && (
                      <Collapse in={expandedQuestions[qa._id]} timeout="auto">
                        <List sx={{ pl: 2, mt: 1 }}>
                          {qa.answers.map((answer) => (
                            <ListItem key={answer._id} sx={{ display: 'block', py: 1 }}>
                              <Stack direction="row" spacing={2}>
                                <Avatar sx={{ width: 32, height: 32, bgcolor: 'success.light' }}>
                                  <Person fontSize="small" />
                                </Avatar>
                                <Box flex={1}>
                                  <Typography variant="body2">
                                    {answer.answer}
                                  </Typography>
                                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                                    <Chip
                                      icon={<ThumbUp fontSize="small" />}
                                      label={`Helpful (${answer.helpful})`}
                                      size="small"
                                      variant="outlined"
                                    />
                                    <Typography variant="caption" color="text.secondary">
                                      {new Date(answer.createdAt).toLocaleDateString()}
                                    </Typography>
                                  </Stack>
                                </Box>
                              </Stack>
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </Box>
                  {qa.answers?.length > 0 && (
                    <IconButton
                      onClick={() => setExpandedQuestions(prev => ({
                        ...prev,
                        [qa._id]: !prev[qa._id]
                      }))}
                      size="small"
                    >
                      {expandedQuestions[qa._id] ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  )}
                </Stack>
              </ListItem>
            </Paper>
          ))}
        </List>
      ) : (
        <Typography color="text.secondary" align="center">
          No questions yet. Be the first to ask!
        </Typography>
      )}
    </Box>
  );
};

export default QASection;