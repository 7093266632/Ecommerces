import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Error] Connection failed: ${error.message}`);
    // Do not crash the app immediately if offline or invalid URI, allows graceful fallback
    console.warn('[MongoDB Warning] Server running in fallback mode if database is unreachable.');
  }
};

export default connectDB;
