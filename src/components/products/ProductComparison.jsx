import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCompare } from '../../store/slices/compareSlice';

const ProductComparison = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const comparedProducts = useSelector(state => state.compare.products);

  const allSpecs = [...new Set(comparedProducts.flatMap(
    product => Object.keys(product.specifications || {})
  ))];

  if (comparedProducts.length === 0) return null;

  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        overflowX: 'auto',
        mt: 2,
        '& th, & td': {
          minWidth: isMobile ? 120 : 200
        }
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Specifications</TableCell>
            {comparedProducts.map(product => (
              <TableCell key={product._id} align="center">
                <Box sx={{ position: 'relative', pb: 2 }}>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(removeFromCompare(product._id))}
                    sx={{ position: 'absolute', top: -8, right: -8 }}
                  >
                    <Close />
                  </IconButton>
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{ width: 80, height: 80, objectFit: 'cover', mb: 1 }}
                  />
                  <Typography variant="subtitle2">{product.name}</Typography>
                  <Typography variant="body2" color="primary">
                    ${product.price}
                  </Typography>
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {allSpecs.map(spec => (
            <TableRow key={spec}>
              <TableCell component="th" scope="row">
                {spec}
              </TableCell>
              {comparedProducts.map(product => (
                <TableCell key={product._id} align="center">
                  {product.specifications?.[spec] || '-'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(ProductComparison);