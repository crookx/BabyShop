import React, { useState } from 'react';
import { 
  Drawer, 
  Box, 
  TextField, 
  InputAdornment, 
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip
} from '@mui/material';
// Remove TrendingUp from imports
import { Search, Close } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SearchDrawer = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const trendingSearches = [
    'Baby Clothes', 'Organic Diapers', 'Sleep Suits', 'Toys'
  ];

  const recentSearches = [
    'Baby Carrier', 'Stroller', 'Baby Monitor'
  ];

  const handleSearch = (term) => {
    navigate(`/products?search=${encodeURIComponent(term)}`);
    onClose();
  };

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { 
          minHeight: '50vh',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)'
        }
      }}
    >
      <Box sx={{ p: 3 }}>
        <TextField
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          variant="outlined"
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: query && (
              <InputAdornment position="end">
                <IconButton onClick={() => setQuery('')}>
                  <Close />
                </IconButton>
              </InputAdornment>
            ),
            sx: { borderRadius: '50px' }
          }}
        />

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Trending Searches
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {trendingSearches.map((term) => (
              <motion.div
                key={term}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Chip
                  label={term}
                  onClick={() => handleSearch(term)}
                  sx={{ borderRadius: '50px' }}
                />
              </motion.div>
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Recent Searches
          </Typography>
          <List>
            <AnimatePresence>
              {recentSearches.map((term) => (
                <motion.div
                  key={term}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <ListItem 
                    button
                    onClick={() => handleSearch(term)}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <Search />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={term} />
                  </ListItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};

export default SearchDrawer;