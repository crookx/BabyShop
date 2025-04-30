import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Categories = ({ categories = [] }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${encodeURIComponent(category.name.toLowerCase())}`);
  };

  if (!categories?.length) {
    return null;
  }

  return (
    <Grid container spacing={3}>
      {categories.map((category, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={category?._id || index}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card 
              onClick={() => handleCategoryClick(category)}
              sx={{ 
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-5px)' }
              }}
            >
              <Box
                component="img"
                src={category?.image}
                alt={category?.name}
                sx={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover'
                }}
              />
              <CardContent>
                <Typography variant="h6">{category?.name}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default Categories;