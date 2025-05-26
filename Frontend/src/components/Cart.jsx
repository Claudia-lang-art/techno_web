import React, { useState } from 'react';
import { Box, Typography, Button, List, ListItem } from '@mui/material';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Panier</Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            {item.name} - {item.price}€
          </ListItem>
        ))}
      </List>
      <Button variant="contained">Passer la commande</Button>
    </Box>
  );
}
