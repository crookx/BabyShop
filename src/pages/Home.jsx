import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, CircularProgress, Grid, Button, Alert } from '@mui/material';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from '@emotion/styled';
import HeroBanner from '../components/home/HeroBanner';
import FeaturedProducts from '../components/products/FeaturedProducts';
import { fetchCategories, fetchFeaturedProducts, fetchSpecialOffers } from '../store/slices/productSlice';
import ProductCard from '../components/products/ProductCard';
import ProductList from '../components/products/ProductList';

const ScrollSection = styled(Box)`
  position: relative;
  padding: 40px 0;
  
  .swiper-button-next,
  .swiper-button-prev {
    background: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    
    &::after {
      font-size: 20px;
      color: #333;
    }
    
    &:hover {
      background: #f5f5f5;
    }
  }
`;

const ViewMoreButton = styled(Button)`
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 2;
`;

const CategoryCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  cursor: pointer;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 80px;
    height: 80px;
    margin-bottom: 12px;
    object-fit: cover;
  }
`;

const OfferCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  height: 100%;
  position: relative;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .discount-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: #ff4081;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-weight: bold;
    z-index: 1;
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    featured = [],
    specialOffers = [],
    categories = [],
    loading = false,
    error = null
  } = useSelector(state => ({
    featured: state?.products?.featured || [],
    specialOffers: state?.products?.specialOffers || [],
    categories: state?.products?.categories || [],
    loading: state?.products?.loading || false,
    error: state?.products?.error || null
  }));

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
    dispatch(fetchFeaturedProducts());
    dispatch(fetchSpecialOffers());
  }, [dispatch, categories.length]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={() => window.location.reload()}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box>
      <HeroBanner />
      <Container maxWidth="xl">
        {/* Featured Products Section */}
        <ScrollSection>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
            Featured Products
          </Typography>
          <ViewMoreButton 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/products?featured=true')}
          >
            View All
          </ViewMoreButton>
          
          {Array.isArray(featured) && featured.length > 0 ? (
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={20}
              breakpoints={{
                320: { slidesPerView: 1.2 },
                480: { slidesPerView: 2.2 },
                768: { slidesPerView: 3.2 },
                1024: { slidesPerView: 4.2 }
              }}
            >
              {featured.slice(0, 8).map((product) => (
                <SwiperSlide key={product._id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography>No featured products available</Typography>
            </Box>
          )}
        </ScrollSection>

        {/* Categories Section */}
        <ScrollSection>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
            Shop by Category
          </Typography>
          
          {Array.isArray(categories) && categories.length > 0 ? (
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={20}
              breakpoints={{
                320: { slidesPerView: 1.2 },
                480: { slidesPerView: 2.2 },
                768: { slidesPerView: 3.2 },
                1024: { slidesPerView: 4.2 }
              }}
            >
              {categories.map((category) => (
                <SwiperSlide key={category._id}>
                  <CategoryCard
                    onClick={() => navigate(`/products?category=${category.slug}`)}
                  >
                    <Box
                      component="img"
                      src={category.image}
                      alt={category.name}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        marginBottom: 2
                      }}
                    />
                    <Typography variant="h6" gutterBottom>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category.description}
                    </Typography>
                  </CategoryCard>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography>No categories available</Typography>
            </Box>
          )}
        </ScrollSection>

        {/* Special Offers Section */}
        <ScrollSection sx={{ bgcolor: '#f5f5f5', py: 6 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
            Special Offers
          </Typography>
          <ViewMoreButton 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/shop?offers=true')}
          >
            View All
          </ViewMoreButton>
          
          {Array.isArray(specialOffers) && specialOffers.length > 0 ? (
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={20}
              breakpoints={{
                320: { slidesPerView: 1.2 },
                480: { slidesPerView: 2.2 },
                768: { slidesPerView: 3.2 },
                1024: { slidesPerView: 4.2 }
              }}
            >
              {specialOffers.map((offer) => offer?.product && (
                <SwiperSlide key={offer._id}>
                  <ProductCard 
                    product={{
                      ...offer.product,
                      discountedPrice: offer.product.price * (1 - (offer.discount / 100)),
                      discount: offer.discount
                    }}
                    isOffer
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography>No special offers available</Typography>
            </Box>
          )}
        </ScrollSection>
      </Container>
    </Box>
  );
};

export default Home;