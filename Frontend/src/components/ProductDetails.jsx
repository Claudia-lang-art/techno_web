import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du produit", error);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) return <Typography>Chargement...</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">{product.name}</Typography>
      <Typography>{product.description}</Typography>
      <Typography variant="h6" color="primary">{product.price} €</Typography>
      <Button variant="contained">Ajouter au panier</Button>
    </Box>
  );
}
