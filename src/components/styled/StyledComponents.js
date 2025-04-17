import { styled } from '@mui/material/styles';
import { Box, Button, Card } from '@mui/material';

export const ResponsiveContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}));

export const AccessibleButton = styled(Button)(({ theme }) => ({
  '&:focus': {
    outline: `3px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },
  '&[aria-disabled="true"]': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}));

export const ProductCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
  '&:focus-within': {
    outline: `2px solid ${theme.palette.primary.main}`,
  },
}));