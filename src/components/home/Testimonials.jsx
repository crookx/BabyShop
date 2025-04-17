import React from 'react';
import { Box, Container, Typography, Avatar, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { FormatQuote } from '@mui/icons-material';
import Slider from 'react-slick';
import styled from '@emotion/styled';

const TestimonialCard = styled(Paper)`
  padding: 40px;
  margin: 20px;
  border-radius: 30px;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
`;

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Emily Thompson",
      role: "New Mom",
      avatar: "/images/testimonials/emily.jpg",
      text: "The quality of baby clothes here is exceptional. My little one loves how soft and comfortable they are!"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Parent of Two",
      avatar: "/images/testimonials/michael.jpg",
      text: "Great selection of products and amazing customer service. This has become our go-to shop for all baby needs."
    },
    {
      id: 3,
      name: "Sarah Williams",
      role: "First-time Mom",
      avatar: "/images/testimonials/sarah.jpg",
      text: "The delivery was super fast and the products exceeded my expectations. Highly recommended!"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <Box sx={{ py: 8, bgcolor: '#FFF5F7' }}>
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" align="center" gutterBottom>
            What Parents Say
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Real experiences from happy parents
          </Typography>

          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id}>
                <TestimonialCard elevation={3}>
                  <FormatQuote sx={{ fontSize: 60, color: 'primary.main', opacity: 0.3 }} />
                  <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem' }}>
                    {testimonial.text}
                  </Typography>
                  <Avatar
                    src={testimonial.avatar}
                    sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
                  />
                  <Typography variant="h6">{testimonial.name}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {testimonial.role}
                  </Typography>
                </TestimonialCard>
              </div>
            ))}
          </Slider>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Testimonials;