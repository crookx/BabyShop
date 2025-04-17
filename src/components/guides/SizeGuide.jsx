import React from 'react';
import { Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Box, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 20px;
    overflow: hidden;
  }
`;

const StyledTableCell = styled(TableCell)`
  background-color: ${props => props.header ? '#FF6B9C' : 'white'};
  color: ${props => props.header ? 'white' : 'inherit'};
  font-weight: ${props => props.header ? 'bold' : 'normal'};
`;

const SizeGuide = ({ open, onClose }) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      component={motion.div}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <DialogTitle sx={{ bgcolor: '#FF6B9C', color: 'white' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          Size Guide
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" sx={{ my: 2 }}>
          Find the perfect fit for your little one with our comprehensive size guide.
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell header>Age</StyledTableCell>
              <StyledTableCell header align="center">Weight (kg)</StyledTableCell>
              <StyledTableCell header align="center">Height (cm)</StyledTableCell>
              <StyledTableCell header align="center">Chest (cm)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { age: '0-3 months', weight: '3-6', height: '50-60', chest: '38-43' },
              { age: '3-6 months', weight: '6-8', height: '60-67', chest: '43-46' },
              { age: '6-12 months', weight: '8-10', height: '67-76', chest: '46-48' },
              { age: '1-2 years', weight: '10-13', height: '76-86', chest: '48-51' },
            ].map((row) => (
              <TableRow key={row.age}>
                <StyledTableCell>{row.age}</StyledTableCell>
                <StyledTableCell align="center">{row.weight}</StyledTableCell>
                <StyledTableCell align="center">{row.height}</StyledTableCell>
                <StyledTableCell align="center">{row.chest}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box sx={{ mt: 4, p: 3, bgcolor: '#FFF5F7', borderRadius: 2 }}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Measuring Tips
          </Typography>
          <Typography variant="body2">
            • Measure your baby's chest at the fullest part
            • For height, measure from top of head to heel
            • Weight should be measured in the morning
          </Typography>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
};

export default SizeGuide;