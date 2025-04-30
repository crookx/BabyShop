import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { styled } from '@mui/material/styles';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BannerSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '70vh',
  minHeight: 500,
  backgroundColor: theme.palette.grey[100],
  overflow: 'hidden',

  '& .swiper': {
    height: '100%',
  },

  '& .swiper-pagination-bullet': {
    width: 12,
    height: 12,
    backgroundColor: theme.palette.common.white,
    opacity: 0.7,
    '&-active': {
      opacity: 1,
    },
  },

  '& .swiper-button-prev, & .swiper-button-next': {
    color: theme.palette.common.white,
    '&::after': {
      fontSize: '24px',
    },
  },
}));

const HeroBanner = () => {
  const banners = [
    {
      id: 1,
      title: "Summer Collection 2024",
      subtitle: "Adorable styles for your little ones",
      buttonText: "Shop Now",
      image: "/images/baby-clothing.jpg",
      link: "/shop?category=summer",
    },
    {
      id: 2,
      title: "Baby Essentials",
      subtitle: "Everything you need for your baby",
      buttonText: "Explore",
      image: "/images/bath-care.jpg",
      link: "/shop?category=essentials",
    },
    {
      id: 3,
      title: "Special Offers",
      subtitle: "Up to 50% off on selected items",
      buttonText: "View Deals",
      image: "/images/baby-toys.jpg",
      link: "/shop?category=offers",
    },
  ];

  return (
    <BannerSection>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Box
              sx={{
                height: '100%',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  zIndex: 1,
                },
              }}
            >
              <Box
                component="img"
                src={banner.image}
                alt={banner.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <Container
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  {banner.title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  }}
                >
                  {banner.subtitle}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  href={banner.link}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                  }}
                >
                  {banner.buttonText}
                </Button>
              </Container>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </BannerSection>
  );
};

export default HeroBanner;
