import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { getBannerActions } from '../../config/routes';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroBanner = () => {
  const navigate = useNavigate();
  const bannerData = getBannerActions();

  const handleAction = (link) => {
    navigate(link);
  };

  return (
    <Box sx={{ 
      backgroundColor: 'primary.light',
      pt: 4,
      pb: 6,
      position: 'relative'
    }}>
      <Container maxWidth="xl">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
        >
          {bannerData.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box sx={{
                height: '60vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.4)'
                }
              }}>
                <Box sx={{ 
                  position: 'relative', 
                  color: 'white', 
                  p: 4, 
                  maxWidth: '600px',
                  zIndex: 2
                }}>
                  <Typography 
                    variant="h2" 
                    component="h1" 
                    gutterBottom
                    sx={{
                      fontSize: { xs: '2rem', md: '3.75rem' },
                      fontWeight: 'bold'
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      mb: 4
                    }}
                  >
                    {slide.subtitle}
                  </Typography>
                  <Button 
                    variant={slide.cta.variant}
                    color={slide.cta.color}
                    size="large"
                    onClick={() => handleAction(slide.cta.link)}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 2
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {slide.cta.text}
                  </Button>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default HeroBanner;
