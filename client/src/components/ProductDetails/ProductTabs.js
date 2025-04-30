import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import Description from './Description';
import ReviewSection from './ReviewSection';
import QASection from './QASection';

const ProductTabs = ({ product }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Description" />
          <Tab label={`Reviews (${product.reviewCount || 0})`} />
          <Tab label="Q&A" />
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        {value === 0 && <Description product={product} />}
        {value === 1 && <ReviewSection productId={product._id} />}
        {value === 2 && <QASection productId={product._id} />}
      </Box>
    </Box>
  );
};

export default ProductTabs;