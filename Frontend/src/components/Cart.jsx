import React from 'react';
import { Box, Card, CardMedia, Typography } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: '16px',
        backgroundColor: '#f9f9f9',
        p: 2,
        textAlign: 'left',
      }}
    >
      <CardMedia
        component="img"
        image={product.image} 
        alt={product.name}
        sx={{
          height: 180,
          objectFit: 'contain',
          borderRadius: '12px',
          mb: 2,
        }}
      />
      <Typography variant="subtitle1" fontWeight={600}>
        {product.brand}
      </Typography>
      <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
        {product.name}
      </Typography>
      <Typography variant="subtitle2" fontWeight={600}>
        ${product.price}
      </Typography>
    </Card>
  );
};

export default ProductCard;
