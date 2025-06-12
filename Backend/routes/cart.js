import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Ajouter un produit au panier (sans user_id)
router.post('/', async (req, res) => {
  console.log('Received cart add request:', req.body); // Debug

  try {
    const { product_id, quantity } = req.body;

    // Validation
    if (!product_id || !quantity) {
      console.error('Missing required fields');
      return res.status(400).json({ error: 'Champs requis manquants' });
    }

    // Vérifier que le produit existe
    const productCheck = await pool.query(
      'SELECT id FROM products WHERE id = $1',
      [product_id]
    );
    if (productCheck.rows.length === 0) {
      console.error('Produit introuvable');
      return res.status(404).json({ error: 'Produit introuvable' });
    }

    // Vérifier si le produit est déjà dans le panier
    const existingItem = await pool.query(
      'SELECT * FROM cart WHERE product_id = $1',
      [product_id]
    );

    if (existingItem.rows.length > 0) {
      const updatedItem = await pool.query(
        'UPDATE cart SET quantity = quantity + $1 WHERE product_id = $2 RETURNING *',
        [quantity, product_id]
      );
      return res.status(200).json(updatedItem.rows[0]);
    } else {
      const newItem = await pool.query(
        'INSERT INTO cart (product_id, quantity, added_at) VALUES ($1, $2, NOW()) RETURNING *',
        [product_id, quantity]
      );
      return res.status(201).json(newItem.rows[0]);
    }
  } catch (error) {
    console.error('Erreur dans cart POST:', error);
    res.status(500).json({
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Mettre à jour la quantité d’un produit dans le panier
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const result = await pool.query(
      'UPDATE cart SET quantity = $1 WHERE id = $2 RETURNING *',
      [quantity, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item non trouvé dans le panier" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer un produit du panier
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM cart WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item non trouvé dans le panier" });
    }

    res.json({ message: "Produit retiré du panier avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer tous les produits du panier
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT cart.*, products.name, products.description,  products.price, products.image_url
      FROM cart
      JOIN products ON cart.product_id = products.id
      ORDER BY cart.added_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Vider le panier entièrement (plus de /user/:userId)
router.delete('/', async (req, res) => {
  try {
    await pool.query('DELETE FROM cart');
    res.json({ message: "Panier vidé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
