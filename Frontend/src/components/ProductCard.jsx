import React from 'react';
import { CardMedia, CardContent, Typography } from '@mui/material';

export default function ProductCard({ product }) {
  return (
    <div sx={{ maxWidth: 400 }}>
      <CardMedia
        component="img"
        image={product.image_url || '/default-image.jpg'}
        alt={product.name}
      />
      <CardContent sx={{ textAlign: 'left', pl: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.2rem', md: '1.4rem' }, 
            color: '#1C1C1C',
            mb: 1,
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontWeight: 400, 
            fontSize: { xs: '0.9rem', md: '1rem' }, 
            color: '#666',
            mb: 1.5, 
          }}
        >
          {product.description}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600, 
            fontSize: { xs: '1rem', md: '1.2rem' }, 
            color: '#1C1C1C', 
          }}
        >
          ${product.price % 1 === 0 ? Math.floor(product.price) : product.price}
        </Typography>
      </CardContent>
    </div>
  );
}
