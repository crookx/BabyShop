import React, { useState, useEffect } from 'react';
import {
  TextField,
  Autocomplete,
  Box,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { productService } from '../../services/productService';

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const searchProducts = async (term) => {
    if (!term) return;
    setLoading(true);
    try {
      const results = await productService.searchProducts(term);
      setOptions(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(searchProducts, 300);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  return (
    <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={options}
      loading={loading}
      getOptionLabel={(option) => option.name}
      onChange={(_, value) => {
        if (value) {
          navigate(`/product/${value._id}`);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search products..."
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
          sx={{
            width: { xs: '100%', sm: 300 },
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px'
            }
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img
              src={option.image}
              alt={option.name}
              style={{ width: 40, height: 40, objectFit: 'cover' }}
            />
            <Box>
              {option.name}
              <Box component="span" sx={{ color: 'primary.main', ml: 1 }}>
                ${option.price}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    />
  );
};

export default SearchBar;