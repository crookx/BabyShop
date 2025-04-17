import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  Button
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const [cartOpen, setCartOpen] = React.useState(false);
  const { items, total } = useSelector(state => state.cart);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component={Link} to="/" sx={{ color: 'white', textDecoration: 'none' }}>
            Baby Shop
          </Typography>
          <IconButton color="inherit" onClick={() => setCartOpen(true)}>
            <Badge badgeContent={items.length} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      >
        <Box sx={{ width: 350, p: 2 }}>
          <Typography variant="h6" gutterBottom>Shopping Cart</Typography>
          <List>
            {items.map(item => (
              <ListItem key={item._id}>
                <Box sx={{ width: '100%' }}>
                  <Typography>{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${item.price} x {item.quantity}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
            <Button 
              variant="contained" 
              fullWidth 
              component={Link} 
              to="/checkout"
              sx={{ mt: 2 }}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;