import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Health Check Route
app.get('/', (req, res) => {
  res.json({
    message: 'MALLHUB E-Commerce API is running smoothly',
    version: '1.0.0',
    status: 'Healthy'
  });
});

// API Routes
app.use('/api/products', productRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[Express] MALLHUB backend server running on http://localhost:${PORT}`);
});
