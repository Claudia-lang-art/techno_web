/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Gestion du panier
 */

import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         product_id:
 *           type: integer
 *           example: 3
 *         quantity:
 *           type: integer
 *           example: 2
 *         added_at:
 *           type: string
 *           format: date-time
 *         name:
 *           type: string
 *           example: Produit X
 *         description:
 *           type: string
 *           example: Description du produit
 *         price:
 *           type: number
 *           example: 15.5
 *         image_url:
 *           type: string
 *           example: /images/product1.png
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Ajouter un produit au panier
 *     tags: [Cart]
 *     requestBody:
 *       description: ID du produit et quantité à ajouter
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - quantity
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 3
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Produit ajouté au panier
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 *       400:
 *         description: Champs requis manquants
 *       404:
 *         description: Produit introuvable
 *       500:
 *         description: Erreur serveur
 */
router.post('/', async (req, res) => {
  console.log('Received cart add request:', req.body); // Debug

  try {
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity) {
      return res.status(400).json({ error: 'Champs requis manquants' });
    }

    const productCheck = await pool.query(
      'SELECT id FROM products WHERE id = $1',
      [product_id]
    );
    if (productCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Produit introuvable' });
    }

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
    res.status(500).json({
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
});

/**
 * @swagger
 * /cart/{id}:
 *   put:
 *     summary: Mettre à jour la quantité d’un produit dans le panier
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'élément panier à modifier
 *     requestBody:
 *       description: Nouvelle quantité
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Quantité mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 *       404:
 *         description: Item non trouvé dans le panier
 *       500:
 *         description: Erreur serveur
 */
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

/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     summary: Supprimer un produit du panier
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'élément panier à supprimer
 *     responses:
 *       200:
 *         description: Produit retiré du panier avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Produit retiré du panier avec succès
 *       404:
 *         description: Item non trouvé dans le panier
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM cart WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item non trouvé dans le panier" });
    }

    res.json({ message: "Produit retiré du panier avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Récupérer tous les produits du panier
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Liste des produits dans le panier
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 *       500:
 *         description: Erreur serveur
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT cart.*, products.name, products.description, products.price, products.image_url
      FROM cart
      JOIN products ON cart.product_id = products.id
      ORDER BY cart.added_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Vider le panier entièrement
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Panier vidé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Panier vidé avec succès
 *       500:
 *         description: Erreur serveur
 */
router.delete('/', async (req, res) => {
  try {
    await pool.query('DELETE FROM cart');
    res.json({ message: "Panier vidé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
