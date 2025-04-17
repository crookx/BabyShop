import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoryGrid = ({ categories = [], loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <Skeleton variant="rectangular" height={200} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {categories.map((category) => (
        <Grid item xs={12} sm={6} md={4} key={category._id}>
          <Card
            component={motion.div}
            whileHover={{ y: -5 }}
            sx={{ 
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                boxShadow: 6
              }
            }}
            onClick={() => navigate(`/products?category=${category.slug}`)}
          >
            <CardMedia
              component="img"
              height={200}
              image={category.image}
              alt={category.name}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {category.name}
              </Typography>
              {category.description && (
                <Typography variant="body2" color="text.secondary">
                  {category.description}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryGrid;