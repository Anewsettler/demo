const express = require('express');
const {
  getProducts,
  getProductById,
  getProductsByUserId,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController.js');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: API for products in the system
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products] 
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The product ID
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The product name
 *                     example: Apple
 */
router.get('/products/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retrieve a single product by ID
 *     tags: [Products] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Apple
 */
router.get('/products/:id', getProductById);  

/**
 * @swagger
 * /api/myproducts:
 *   get:
 *     summary: Retrieve products by the authenticated user
 *     tags: [Products] 
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of products owned by the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The product ID
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The product name
 *                     example: Apple
 *       401:
 *         description: Unauthorized, token missing or invalid
 */
router.get('/myproducts', authenticateJWT, getProductsByUserId);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products] 
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The product name
 *                 example: New Product
 *               description:
 *                 type: string
 *                 description: The product description
 *                 example: A description of the new product
 *               price:
 *                 type: number
 *                 description: The product price
 *                 example: 19.99
 *               product_detail:
 *                 type: string
 *                 description: Additional details about the product
 *                 example: Detailed information about the new product
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The product ID
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The product name
 *                   example: New Product
 *       401:
 *         description: Unauthorized, token missing or invalid
 */
router.post('/products/', authenticateJWT, addProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update an existing product by ID
 *     tags: [Products] 
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated product name
 *                 example: Updated Product
 *               description:
 *                 type: string
 *                 description: The updated product description
 *                 example: Updated description of the product
 *               price:
 *                 type: number
 *                 description: The updated product price
 *                 example: 29.99
 *               product_detail:
 *                 type: string
 *                 description: Updated details about the product
 *                 example: Updated detailed information about the product
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The product ID
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The updated product name
 *                   example: Updated Product
 *       401:
 *         description: Unauthorized, token missing or invalid
 */
router.put('/products/:id', authenticateJWT, updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete an existing product by ID
 *     tags: [Products] 
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized, token missing or invalid
 */
router.delete('/products/:id', authenticateJWT, deleteProduct);

module.exports = router;
