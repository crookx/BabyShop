import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Box } from '@mui/material';
import { useDebounce } from '../../hooks/useDebounce';

const AddressAutocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.length > 3) {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${debouncedQuery}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
        .then(res => res.json())
        .then(data => {
          setSuggestions(data.features.map(feature => ({
            label: feature.place_name,
            coordinates: feature.center,
            details: feature.context
          })));
        });
    }
  }, [debouncedQuery]);

  return (
    <Autocomplete
      freeSolo
      options={suggestions}
      getOptionLabel={(option) => option.label || ''}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Address"
          onChange={(e) => setQuery(e.target.value)}
        />
      )}
      onChange={(_, value) => onSelect(value)}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option.label}
        </Box>
      )}
    />
  );
};

export default AddressAutocomplete;