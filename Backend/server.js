import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import setupSwagger from './swagger.js';  // Import swagger

// 1. Créer app AVANT tout
const app = express();
const PORT = process.env.PORT || 5000;

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Routes
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/images', express.static('public/images'));

// 4. Swagger (après création app et avant app.listen)
setupSwagger(app);

// 5. Route de test simple
app.get('/', (req, res) => {
  res.send('Backend fonctionne ! 🚀');
});

// 6. Lancer serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
