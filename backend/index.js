const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db'); // Database connection
const productRoutes = require('./routes/productRoutes'); // Import product routes
const authRoutes = require('./routes/authRoutes'); // Import auth routes
require('dotenv').config();
const swaggerUi = require('swagger-ui-express'); // Import Swagger UI
const swaggerJsdoc = require('swagger-jsdoc'); // Import Swagger JSDoc

const app = express();

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Management API',
      version: '1.0.0',
      description: 'API documentation for the Product Management Application',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Update this to your API's URL
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/api', productRoutes);
app.use('/api/auth', authRoutes);

// Sync Database and Start Server
sequelize.sync({ force: false }) // Set force: true to drop and recreate tables on each sync
  .then(() => {
    console.log('Database & tables created!');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Swagger UI is available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error('Unable to sync the database:', error);
  });
