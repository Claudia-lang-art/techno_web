import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image_url || '/default-image.jpg'}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2">{product.price}€</Typography>
        <Button component={Link} to={`/product/${product.id}`} variant="contained">
          Voir détails
        </Button>
      </CardContent>
    </Card>
  );
}
