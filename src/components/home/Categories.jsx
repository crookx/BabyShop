import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Categories = ({ categories }) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3}>
      {categories.map((category) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={category._id}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card 
              onClick={() => navigate(`/categories/${category.slug}`)}
              sx={{ 
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: 2
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={category.image}
                alt={category.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}>
                  {category.description}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default Categories;