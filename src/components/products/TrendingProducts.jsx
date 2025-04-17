import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import Slider from 'react-slick';
import styled from '@emotion/styled';

const ProductCard = styled(motion.div)`
  padding: 20px;
  margin: 10px;
  border-radius: 20px;
  background: white;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
`;

const SliderArrow = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  background: white !important;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  &:hover {
    background: white !important;
  }
`;

const TrendingProducts = () => {
  const products = [
    {
      id: 1,
      name: "Organic Sleep Suit",
      price: 29.99,
      image: "/images/products/sleepsuit.jpg",
      rating: 4.8
    },
    // Add more products
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" gutterBottom align="center">
            Trending Now
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Our most popular products
          </Typography>

          <Box sx={{ position: 'relative' }}>
            <Slider {...settings}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Product card content */}
                </ProductCard>
              ))}
            </Slider>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TrendingProducts;