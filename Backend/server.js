import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import productRoutes from './routes/products.js'; // 🛠️ IMPORT DES ROUTES



dotenv.config();

// ✅ Création de l'application Express
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Ajout des middlewares
app.use(cors());
app.use(express.json());

// ✅ Définition des routes APRÈS l'initialisation de `app`
app.use('/products', productRoutes);
app.use('/images', express.static('public/images'));

app.get('/', (req, res) => {
  res.send('Backend fonctionne ! 🚀');
});

// ✅ Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
