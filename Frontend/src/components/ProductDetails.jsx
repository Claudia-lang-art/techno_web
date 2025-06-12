import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        backgroundImage: `linear-gradient(rgba(255,192,203,0.6), rgba(255,192,203,0.6)), url('/Home.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >
      {/* Logo */}
      <img
        src="/logo.png" // Remplace par le chemin réel de ton logo
        alt="Logo BBS"
        style={{ maxWidth: '250px', marginBottom: '20px' }}
      />

      {/* Titre de l'école */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          color: '#C2185B',
          textShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        Bank and Business School
      </Typography>

      {/* Boutons Login & Register */}
      <Box mt={4}>
        <Button
          onClick={() => navigate('/login')}
          sx={{
            backgroundColor: '#D81B60',
            color: 'white',
            px: 4,
            py: 1.5,
            mx: 1,
            borderRadius: '30px',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#AD1457',
            },
          }}
        >
          Login
        </Button>

        <Button
          onClick={() => navigate('/register')}
          sx={{
            backgroundColor: '#D81B60',
            color: 'white',
            px: 4,
            py: 1.5,
            mx: 1,
            borderRadius: '30px',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#AD1457',
            },
          }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
