import * as React from 'react';
import { Box, Toolbar, Typography, Button, IconButton, Divider } from '@mui/material';
import icon from '/public/icon.svg';
import cart from '/src/assets/logo/cart.svg';

export default function Header() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        bgcolor: '#FFFFFF',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        px: 4,
        py: 0,
      }}
    >
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" sx={{ mr: 1, padding: 0 }}>
            <img src={icon} alt="icon enterprise" width={28} height={28} />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Inter, sans-serif', fontSize: '20px', letterSpacing: '0.5px', color: '#1C1C1C' }}>
            SUN CO.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<img src={cart} alt="Panier" style={{ width: 18 }} />}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '14px',
            borderColor: '#1C1C1C',
            color: '#1C1C1C',
            padding: '6px 12px',
            borderRadius: '6px',
            fontFamily: 'Inter, sans-serif',
            '&:hover': {
              backgroundColor: '#F9F9F9',
            },
          }}
        >
          View Cart
        </Button>
      </Toolbar>
      <Divider sx={{ borderColor: '#E0E0E0', opacity: 0.6 }} />
    </Box>
  );
}
