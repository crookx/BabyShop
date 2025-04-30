import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Stack, Divider } from '@mui/material';
import Reviews from './Reviews';
import QASection from './QASection';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderDescription = () => (
    <Box>
      <Typography variant="body1" paragraph>
        {product.description}
      </Typography>
      
      {product.specifications?.length > 0 && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>Specifications</Typography>
          <Stack spacing={2}>
            {product.specifications.map((spec, index) => (
              <Box key={index}>
                <Typography variant="subtitle2" color="text.secondary">
                  {spec.name}
                </Typography>
                <Typography variant="body1">
                  {spec.value}
                </Typography>
              </Box>
            ))}
          </Stack>
        </>
      )}
    </Box>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Description" />
        <Tab label="Reviews" />
        <Tab label="Q&A" />
      </Tabs>

      <Box sx={{ py: 3 }}>
        {activeTab === 0 && renderDescription()}
        {activeTab === 1 && <Reviews productId={product._id} />}
        {activeTab === 2 && <QASection productId={product._id} />}
      </Box>
    </Box>
  );
};

export default ProductTabs;