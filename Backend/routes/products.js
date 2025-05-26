import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Produit non trouvé" });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.post('/', async (req, res) => {
    try {
      const { name, description, price, image_url, stock, category } = req.body;
      const result = await pool.query(
        'INSERT INTO products (name, description, price, image_url, stock, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, description, price, image_url, stock, category]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

export default router;
