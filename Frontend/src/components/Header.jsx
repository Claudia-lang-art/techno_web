// Header.jsx
import * as React from 'react';
import { Box, Toolbar, Typography, Button, IconButton, Divider } from '@mui/material';
import icon from "/public/icon.svg";
import cart from "/src/assets/logo/cart.svg";

export default function Header() {
  return (
    <Box sx={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 1100, 
      bgcolor: 'white',
    }}>
      <Toolbar>
        <IconButton size="large" edge="start" sx={{ mr: 0 }}>
          <img src={icon} alt="icon enterprise" />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          SUN CO.
        </Typography>
        <Button variant="outlined" color='' startIcon={<img src={cart} />}>
          View Cart
        </Button>
      </Toolbar>
      <Divider />
    </Box>
  );
}
