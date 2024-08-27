const Product = require('../models/Product');

const getAllProducts = async () => {
  try {
    return await Product.findAll();
  } catch (error) {
    throw new Error('Error fetching products');
  }
};

const getProductById = async (id) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw new Error('Error fetching product');
  }
};

const getProductByUserId = async (userId) => {
  try {
    const products = await Product.findAll({ where: { user_id: userId } });
    return products;
  } catch (error) {
    throw new Error('Error fetching products by user ID: ' + error.message);
  }
};

const createProduct = async (productData) => {
  try {
    if (!productData.user_id) {
      throw new Error('User ID is required to create a product');
    }

    const product = await Product.create(productData);
    return product;
  } catch (error) {
    throw new Error(`Error creating product: ${error.message}`);
  }
};


const updateProduct = async (id, productData, userId) => {
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      throw new Error('Product not found');
    }

    // Check if the product belongs to the user making the request
    console.log("checking")
    if (product.user_id !== userId) {
      throw new Error('You do not have permission to update this product');
    }

    await product.update(productData);
    return product;
  } catch (error) {
    throw new Error(`Failed to update product: ${error.message}`);
  }
};

const deleteProduct = async (id, userId) => {
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      throw new Error('Product not found');
    }

    // Check if the product belongs to the user making the request
    if (product.user_id !== userId) {
      throw new Error('You do not have permission to delete this product');
    }

    await product.destroy();
    return { message: 'Product deleted successfully' };
  } catch (error) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }
};

  
module.exports = {
  getAllProducts,
  getProductById,
  getProductByUserId,
  createProduct,
  updateProduct,
  deleteProduct,
};
