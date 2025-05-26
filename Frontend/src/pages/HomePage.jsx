import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import kir from '../assets/logo/Frame 1168.svg'; // Assure-toi que le chemin est correct

function HomePage() {
  return (
    <Box
      sx={{
        pt: '80px',
        pb: '80px',
        minHeight: '100vh',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Header />
      <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box
          sx={{
            width: 350,
            height: 449,
            backgroundColor: '#EAEEEF',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
          }}
        >

          {/* ✅ Image produit */}
          <Box sx={{ mb: 2 }}>
            <img src={kir} alt="Produit promo" style={{ maxWidth: '100%', height: 'auto' }} />
          </Box>

          {/* ✅ Badge 25% OFF */}
          <Box
          >
            <Typography
              sx={{
                fontFamily: 'DM Sans',
                fontWeight: 700,
                fontSize: '36px',
                lineHeight: '42px',
                letterSpacing: '-1px',
                color: '#EC5E2A',
                textAlign: 'center',
              }}
            >
              25% OFF
            </Typography>
          </Box>
          {/* ✅ Titre Summer Sale */}
          <Typography
            sx={{
              width: 295,
              height: 55,
              fontFamily: 'DM Sans',
              fontWeight: 700,
              fontSize: '48px',
              lineHeight: '54.75px',
              letterSpacing: '-1px',
              color: '#201B21',
              textAlign: 'center',
              mb: 1,
            }}
          >
            Summer Sale
          </Typography>

          {/* ✅ Texte description */}
          <Typography
            sx={{
              width: 277,
              height: 20,
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '0px',
              color: '#67696E',
              textAlign: 'center',
              mb: 3,
            }}
          >
            Discover our summer styles with discount
          </Typography>

          {/* ✅ Bouton avec flèche */}
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              width: 302,
              height: 48,
              backgroundColor: '#201B21',
              color: '#FFFFFF',
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: '16px',
              lineHeight: '20px',
              borderRadius: '10px',
              padding: '12px 80px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#000000',
              },
            }}
          >
            Shop Now
          </Button>
        </Box>
      </main>
      <Footer />
    </Box>
  );
}

export default HomePage;
