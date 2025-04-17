import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  if (!category) return null;

  return (
    <Card
      component={Link}
      to={`/products?category=${category.slug}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={category.image}
        alt={category.name}
        sx={{ objectFit: 'contain', p: 2 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h3" align="center">
          {category.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {category.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;