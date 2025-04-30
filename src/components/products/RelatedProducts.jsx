import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Skeleton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import ProductCard from './ProductCard';
import { productApi } from '../../services/api';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const RelatedProducts = ({ currentProductId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const slider = React.useRef(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!currentProductId) return;
      
      try {
        setLoading(true);
        const response = await productApi.getRelatedProducts(currentProductId);
        if (response?.status === 'success') {
          setProducts(response.data || []);
        } else {
          throw new Error('Failed to fetch related products');
        }
      } catch (error) {
        console.error('Failed to fetch related products:', error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProductId]);

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
        breakpoint: 768,
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', gap: 2, overflow: 'hidden' }}>
        {[1, 2, 3, 4].map((key) => (
          <Skeleton
            key={key}
            variant="rectangular"
            width={280}
            height={400}
            sx={{ borderRadius: 2 }}
          />
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (products.length === 0) return null;

  return (
    <Box sx={{ position: 'relative' }}>
      <IconButton
        onClick={() => slider.current?.slickPrev()}
        sx={{
          position: 'absolute',
          left: -20,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          bgcolor: 'background.paper',
          boxShadow: 2,
          '&:hover': { bgcolor: 'background.paper' }
        }}
      >
        <ArrowBack />
      </IconButton>

      <IconButton
        onClick={() => slider.current?.slickNext()}
        sx={{
          position: 'absolute',
          right: -20,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          bgcolor: 'background.paper',
          boxShadow: 2,
          '&:hover': { bgcolor: 'background.paper' }
        }}
      >
        <ArrowForward />
      </IconButton>

      <Box sx={{ mx: 4 }}>
        <Slider ref={slider} {...settings}>
          {products.map((product) => (
            <Box key={product._id} sx={{ p: 1 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default RelatedProducts;