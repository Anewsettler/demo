const express = require('express');
const authService = require('../services/authService');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: API for user authentication
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in and receive a JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *                 example: otter
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: password
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for authentication
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Unauthorized, invalid credentials
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authService.authenticateUser(username, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
