import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Box } from '@mui/material';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
