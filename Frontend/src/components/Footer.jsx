// Footer.jsx
import * as React from 'react';
import { Box, Toolbar, Typography, IconButton, Divider } from '@mui/material';

import icon from "/public/icon.svg";
import path1 from "/src/assets/logo/path1.svg";
import path2 from "/src/assets/logo/path2.svg";
import path from "/src/assets/logo/path.svg";
import bg from "/src/assets/logo/bg.svg";

export default function Footer() {
  return (
    <Box sx={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      bgcolor: 'black',
      zIndex: 1200,
      px: 2,
      pt: 1,
    }}>
      <Divider sx={{ borderColor: 'white', opacity: 0.1 }} />

      {/* Ligne principale : logo + décorations */}
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 48 }}>
        {/* Gauche : Logo + texte */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="large" edge="start" sx={{ mr: 1 }}>
            <img src={icon} alt="icon enterprise" style={{ width: 24, height: 24 }} />
          </IconButton>
          <Typography variant="body1" color='white'>
            SUN CO.
          </Typography>
        </Box>

        {/* Droite : Décorations SVG dans cercles */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {[path1, path2, path].map((decor, index) => (
            <Box
              key={index}
              sx={{
                width: 28,
                height: 28,
                position: 'relative',
              }}
            >
              <img
                src={bg}
                alt="cercle"
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              />
              <img
                src={decor}
                alt={`decor ${index + 1}`}
                style={{
                  width: 14,
                  height: 14,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </Box>
          ))}
        </Box>
      </Toolbar>

      {/* Texte */}
      <Box sx={{ width: 167, height: 36, pl: 2.5, mt: 1 }}>
        <Typography sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: '18px',
          letterSpacing: '0%',
          color: '#D9DBE1',
          opacity: 0.7,
        }}>
          © 2023 dot.cards text task. 
        </Typography>
        <Typography sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: '18px',
          letterSpacing: '0%',
          color: '#D9DBE1',
          opacity: 0.7,
        }}>
          All rights reserved
         </Typography>
      </Box>
    </Box>
  );
}
