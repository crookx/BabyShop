import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  Divider,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const QASection = ({ productId }) => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState({});
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchQuestions();
  }, [productId, sort, page]);

  const fetchQuestions = async () => {
    try {
      const { data } = await axios.get(`/api/questions/product/${productId}`, {
        params: { sort, page }
      });
      setQuestions(prev => 
        page === 1 ? data.data.questions : [...prev, ...data.data.questions]
      );
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/questions/product/${productId}`, {
        question: newQuestion
      });
      setNewQuestion('');
      fetchQuestions();
    } catch (error) {
      console.error('Error asking question:', error);
    }
  };

  const handleAddAnswer = async (questionId) => {
    try {
      await axios.post(`/api/questions/${questionId}/answers`, {
        answer: newAnswer[questionId]
      });
      setNewAnswer(prev => ({ ...prev, [questionId]: '' }));
      fetchQuestions();
    } catch (error) {
      console.error('Error adding answer:', error);
    }
  };

  const handleHelpful = async (type, id, answerId) => {
    try {
      if (type === 'question') {
        await axios.post(`/api/questions/${id}/helpful`);
      } else {
        await axios.post(`/api/questions/${id}/answers/${answerId}/helpful`);
      }
      fetchQuestions();
    } catch (error) {
      console.error('Error marking helpful:', error);
    }
  };

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Questions & Answers</Typography>
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          size="small"
        >
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="mostAnswers">Most answered</MenuItem>
          <MenuItem value="helpful">Most helpful</MenuItem>
        </Select>
      </Box>

      <Box component="form" onSubmit={handleAskQuestion} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Ask a question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          sx={{ mb: 1 }}
        />
        <Button type="submit" variant="contained" disabled={!newQuestion.trim()}>
          Submit Question
        </Button>
      </Box>

      <List>
        {questions.map((question) => (
          <React.Fragment key={question._id}>
            <ListItem alignItems="flex-start" sx={{ flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', width: '100%', mb: 1 }}>
                <Typography variant="body1" sx={{ flex: 1 }}>
                  Q: {question.question}
                </Typography>
                <IconButton 
                  onClick={() => handleHelpful('question', question._id)}
                  size="small"
                >
                  <ThumbUpIcon fontSize="small" />
                  <Typography variant="caption" sx={{ ml: 0.5 }}>
                    {question.helpful}
                  </Typography>
                </IconButton>
              </Box>

              {question.answers.map((answer) => (
                <Box key={answer._id} sx={{ ml: 4, my: 1, width: '100%' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      A: {answer.answer}
                    </Typography>
                    <IconButton
                      onClick={() => handleHelpful('answer', question._id, answer._id)}
                      size="small"
                    >
                      <ThumbUpIcon fontSize="small" />
                      <Typography variant="caption" sx={{ ml: 0.5 }}>
                        {answer.helpful}
                      </Typography>
                    </IconButton>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    By {answer.user?.name} on {new Date(answer.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}

              <Box sx={{ mt: 2, width: '100%' }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Add an answer"
                  value={newAnswer[question._id] || ''}
                  onChange={(e) => setNewAnswer(prev => ({
                    ...prev,
                    [question._id]: e.target.value
                  }))}
                  sx={{ mb: 1 }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleAddAnswer(question._id)}
                  disabled={!newAnswer[question._id]?.trim()}
                >
                  Add Answer
                </Button>
              </Box>
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>

      {questions.length > 0 && (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="outlined" 
            onClick={() => setPage(p => p + 1)}
          >
            Load more questions
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default QASection;