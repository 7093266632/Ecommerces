import express from 'express';
import {
  getProducts,
  getProductById,
  getProductsByCategory
} from '../controllers/productController.js';

const router = express.Router();

// GET /api/products
router.get('/', getProducts);

// GET /api/products/category/:category
router.get('/category/:category', getProductsByCategory);

// GET /api/products/:id
router.get('/:id', getProductById);

export default router;
