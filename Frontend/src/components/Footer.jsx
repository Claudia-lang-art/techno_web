import * as React from 'react';
import { Box, Toolbar, Typography, IconButton, Divider } from '@mui/material';
import icon from '/public/icon.svg';
import path1 from '/src/assets/logo/path1.svg';
import path2 from '/src/assets/logo/path2.svg';
import path from '/src/assets/logo/path.svg';
import bg from '/src/assets/logo/bg.svg';

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: '#000000',
        zIndex: 1200,
        px: 3,
        pt: 2,
        pb: 2,
      }}
    >
      <Divider sx={{ borderColor: 'white', opacity: 0.1 }} />

      {/* Logo + Décorations */}
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 56 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="large" edge="start" sx={{ p: 0 }}>
            <img src={icon} alt="icon enterprise" style={{ width: 28, height: 28 }} />
          </IconButton>
          <Typography variant="body1" sx={{ color: 'white', fontWeight: 700, fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
            SUN CO.
          </Typography>
        </Box>

             {/* Copyright aligné avec les autres éléments */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: -1 }}>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            lineHeight: '16px',
            color: '#98A2B3',
            opacity: 0.7,
            textAlign: 'center',
          }}
        >
          © 2023 dot.cards text task. All rights reserved.
        </Typography>
      </Box>

        {/* Décorations SVG */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {[path1, path2, path].map((decor, index) => (
            <Box key={index} sx={{ width: 32, height: 32, position: 'relative' }}>
              <img src={bg} alt="cercle" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
              <img src={decor} alt={`decor ${index + 1}`} style={{ width: 16, height: 16, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            </Box>
          ))}
        </Box>
      </Toolbar>

 
    </Box>
  );
}
