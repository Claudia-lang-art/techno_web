import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Container,
  CardMedia,
} from '@mui/material';
import ProductCard from './ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.slice(1, data.length - 2); 
        setProducts(filtered);
      })
      .catch((err) => console.error('Erreur de chargement des produits :', err));
  }, []);

  return (
    <Box sx={{ backgroundColor: '#fff', minHeight: '100vh', py: 4 }}>
      <Container 
        maxWidth="lg" 
        sx={{ 
          px: { xs: 2, md: 3, },
          mx: 'auto',
        }}
      >
        {/* SECTION PROMOTIONNELLE */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#E8F0F0',
            borderRadius: '24px',
            px: { xs: 2, md: 3 },
            py: { xs: 2, md: 3 },
            mb: 2,
            mt: 6,
            mx: 0, 
            maxWidth: '90%', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Image en arrière-plan pour mobile */}
          <CardMedia
            component="img"
            image="http://localhost:5000/images/NikeVert.svg"
            alt="Promotion Shoe"
            sx={{
              display: { xs: 'block', md: 'none' },
              width: '100%',
              maxWidth: 300,
              height: 'auto',
              objectFit: 'contain',
              mb: 4,
              alignSelf: 'center',
            }}
          />

          <Box sx={{ flex: 1, maxWidth: { md: '50%' } , mx:4 , }}>
            <Typography
              variant="h6"
              sx={{
                color: '#FF6B35',
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' }, 
                mb: 1,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              25% OFF
            </Typography>
            
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 1,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                color: '#1C1C1C',
                lineHeight: 1.2,
              }}
            >
              Summer Sale
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: '#666',
                mb: 4,
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.6,
                maxWidth: '400px',
              }}
            >
              Discover our summer styles with discount
            </Typography>
            
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#2C2C2C',
                color: '#fff',
                borderRadius: '12px',
                px: { xs: 6, md: 14 },
                py: { xs: 1.2, md: 1.5 },
                fontWeight: 600,
                fontSize: { xs: '0.9rem', md: '1rem' },
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#1a1a1a',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Shop Now
              <span style={{ marginLeft: 8, fontSize: '1.1rem' }}>→</span>
            </Button>
          </Box>

          {/* Image pour desktop */}
          <CardMedia
            component="img"
            image="http://localhost:5000/images/NikeVert.svg"
            alt="Promotion Shoe"
            sx={{
              display: { xs: 'none', md: 'block' },
              width: { md: 350, lg: 450 },
              height: 'auto',
              objectFit: 'contain',
              ml: 4,
              mr:4 ,
              transform: 'rotate(-5deg)',
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))',
            }}
          />
        </Box>

        {/* SECTION PRODUITS */}
        <Box sx={{ 
          mx: 0, 
          maxWidth: '100%',
          py: 3, 
        }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              mb: 4,
              color: '#1C1C1C',
              fontSize: { xs: '1rem', sm: '1rem', md: '2rem' },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            Explore our latest drops
          </Typography>

          {/* GRILLE DE PRODUITS */}
          <Grid container spacing={2} sx={{ pb: 8 }}>
            {products.map((product) => (
              <Grid itemxs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;