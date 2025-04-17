import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableRow, 
  Paper,
  Typography 
} from '@mui/material';

const ProductSpecifications = ({ product }) => {
  if (!product) return null;

  const specifications = [
    { label: 'Brand', value: product.brand },
    { label: 'Age Group', value: product.ageGroup },
    { label: 'Material', value: product.material },
    { label: 'Dimensions', value: product.dimensions },
    { label: 'Weight', value: product.weight },
    { label: 'Safety Standards', value: product.safetyStandards },
    { label: 'Care Instructions', value: product.careInstructions },
  ];

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableBody>
          {specifications.map((spec) => (
            spec.value && (
              <TableRow key={spec.label}>
                <TableCell 
                  component="th" 
                  scope="row"
                  sx={{ 
                    width: '40%',
                    backgroundColor: 'action.hover'
                  }}
                >
                  <Typography variant="subtitle2">
                    {spec.label}
                  </Typography>
                </TableCell>
                <TableCell>{spec.value}</TableCell>
              </TableRow>
            )
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductSpecifications;