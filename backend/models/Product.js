import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Product description is required']
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: 0
    },
    originalPrice: {
      type: Number,
      required: [true, 'Product original price is required'],
      min: 0
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: [
        'Fashion',
        'Electronics',
        'Beauty',
        'Footwear',
        'Accessories',
        'Home & Living',
        'Sports',
        'Kids',
        'Grocery'
      ]
    },
    store: {
      type: String,
      required: [true, 'Store name is required']
    },
    image: {
      type: String,
      required: [true, 'Product image URL is required']
    },
    images: {
      type: [String],
      default: []
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5
    },
    reviewsCount: {
      type: Number,
      default: 120
    },
    stock: {
      type: Number,
      required: true,
      default: 25
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    isPopular: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
