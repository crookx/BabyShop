import React from 'react';
import { 
  Paper, InputBase, IconButton, 
  Box, Popover, List, ListItem 
} from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';

const SearchBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [query, setQuery] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', query);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Paper
        component="form"
        onSubmit={handleSearch}
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton type="submit">
          <Search />
        </IconButton>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <FilterList />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchBar;