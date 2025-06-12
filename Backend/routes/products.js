/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gestion des produits
 */

import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
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
 *         stock:
 *           type: integer
 *           example: 10
 *         category:
 *           type: string
 *           example: Électronique
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Récupérer tous les produits
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Liste des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Erreur serveur
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Récupérer un produit par son ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du produit
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du produit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur serveur
 */
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

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Ajouter un nouveau produit
 *     tags: [Products]
 *     requestBody:
 *       description: Données du produit à créer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: Produit X
 *               description:
 *                 type: string
 *                 example: Description détaillée du produit
 *               price:
 *                 type: number
 *                 example: 19.99
 *               image_url:
 *                 type: string
 *                 example: /images/product1.png
 *               stock:
 *                 type: integer
 *                 example: 10
 *               category:
 *                 type: string
 *                 example: Électronique
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Données invalides ou manquantes
 *       500:
 *         description: Erreur serveur
 */
router.post('/', async (req, res) => {
  try {
    const { name, description, price, image_url, stock, category } = req.body;

    if (!name || !description || !price || stock === undefined) {
      return res.status(400).json({ error: "Champs requis manquants" });
    }

    const result = await pool.query(
      `INSERT INTO products (name, description, price, image_url, stock, category)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, description, price, image_url || null, stock, category || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Mettre à jour un produit existant
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du produit à mettre à jour
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Données à mettre à jour
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image_url:
 *                 type: string
 *               stock:
 *                 type: integer
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Produit mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produit non trouvé
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image_url, stock, category } = req.body;

    // Vérification existence produit
    const productExist = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (productExist.rows.length === 0) {
      return res.status(404).json({ error: "Produit non trouvé" });
    }

    // Mise à jour avec données non nulles uniquement
    const updatedProduct = await pool.query(
      `UPDATE products
       SET name = COALESCE($1, name),
           description = COALESCE($2, description),
           price = COALESCE($3, price),
           image_url = COALESCE($4, image_url),
           stock = COALESCE($5, stock),
           category = COALESCE($6, category)
       WHERE id = $7
       RETURNING *`,
      [name, description, price, image_url, stock, category, id]
    );

    res.json(updatedProduct.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Supprimer un produit par son ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID du produit à supprimer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Produit supprimé avec succès
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if (deleted.rows.length === 0) {
      return res.status(404).json({ error: "Produit non trouvé" });
    }

    res.json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
