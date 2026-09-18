import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';
import { sampleProducts } from './seedData.js';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    console.log('[Seed] Clearing existing products...');
    await Product.deleteMany({});

    console.log('[Seed] Inserting sample products...');
    await Product.insertMany(sampleProducts);

    console.log('[Seed] Data successfully imported into MongoDB Atlas!');
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Error] ${error.message}`);
    process.exit(1);
  }
};

importData();
