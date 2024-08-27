const productService = require('../services/productService');

const getProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productService.getProductById(id);
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error.message);
    res.status(404).json({ error: error.message });
  }
};

const getProductsByUserId = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const products = await productService.getProductByUserId(userId);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products: ' + error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const userId = req.user.userId; // Get the user ID from the JWT token
    const productData = { ...req.body, user_id: userId }; 
    const product = await productService.createProduct(productData);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  const userId = req.user.userId; 

  try {
    const updatedProduct = await productService.updateProduct(id, productData, userId);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId; 
  try {
    const result = await productService.deleteProduct(id, userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByUserId,
  addProduct,
  updateProduct,
  deleteProduct,
};
