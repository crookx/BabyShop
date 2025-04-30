import React from 'react';
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
  Button
} from '@mui/material';
import { Close, ShoppingCart } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCompare, clearCompare } from '../../store/slices/compareSlice';
import { addToCart } from '../../store/slices/cartSlice';

const CompareRow = ({ label, getProperty }) => {
  const items = useSelector(state => state.compare.items);
  
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Typography fontWeight="bold">{label}</Typography>
      </TableCell>
      {items.map(item => (
        <TableCell key={item._id} align="center">
          {getProperty(item)}
        </TableCell>
      ))}
    </TableRow>
  );
};

const ProductCompare = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.compare.items);

  if (items.length === 0) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">
          Compare Products ({items.length})
        </Typography>
        <Button 
          startIcon={<Close />}
          onClick={() => dispatch(clearCompare())}
        >
          Clear All
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Feature</TableCell>
              {items.map(item => (
                <TableCell key={item._id} align="center">
                  <Box sx={{ position: 'relative', p: 2 }}>
                    <IconButton
                      size="small"
                      sx={{ position: 'absolute', top: 0, right: 0 }}
                      onClick={() => dispatch(removeFromCompare(item._id))}
                    >
                      <Close />
                    </IconButton>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: 100,
                        height: 100,
                        objectFit: 'contain',
                        mb: 1
                      }}
                    />
                    <Typography variant="subtitle1" gutterBottom>
                      {item.name}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<ShoppingCart />}
                      onClick={() => dispatch(addToCart({ product: item, quantity: 1 }))}
                      fullWidth
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <CompareRow
              label="Price"
              getProperty={item => `$${item.price.toFixed(2)}`}
            />
            <CompareRow
              label="Brand"
              getProperty={item => item.brand}
            />
            <CompareRow
              label="Age Group"
              getProperty={item => item.ageGroup}
            />
            <CompareRow
              label="Rating"
              getProperty={item => `${item.rating}/5 (${item.reviewCount} reviews)`}
            />
            <CompareRow
              label="Stock"
              getProperty={item => item.stock > 0 ? 'In Stock' : 'Out of Stock'}
            />
            <CompareRow
              label="Colors"
              getProperty={item => item.colors?.join(', ')}
            />
            <CompareRow
              label="Sizes"
              getProperty={item => item.sizes?.join(', ')}
            />
            <CompareRow
              label="Material"
              getProperty={item => item.specifications?.material}
            />
            <CompareRow
              label="Care"
              getProperty={item => item.specifications?.care?.join(', ')}
            />
            <CompareRow
              label="Warranty"
              getProperty={item => item.specifications?.warranty}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default React.memo(ProductCompare);