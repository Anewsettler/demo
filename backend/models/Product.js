// backend/models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  product_detail: {
    type: DataTypes.TEXT, 
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at', // Map to the existing `created_at` column
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at', // Map to the `updated_at` column
  },
}, {
  timestamps: true,
});

Product.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Product;
