import Product from '../models/Product.js';
import { sampleProducts } from '../seedData.js';

// @desc    Get all products (with optional filtering & sorting)
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { category, search, sort, featured, popular } = req.query;
    
    // Check if DB is connected
    const dbState = Product.db.readyState;
    
    if (dbState === 1) {
      let query = {};

      if (category && category !== 'All') {
        query.category = { $regex: new RegExp(`^${category}$`, 'i') };
      }

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { store: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } }
        ];
      }

      if (featured === 'true') {
        query.isFeatured = true;
      }

      if (popular === 'true') {
        query.isPopular = true;
      }

      let reqQuery = Product.find(query);

      if (sort === 'price-asc') {
        reqQuery = reqQuery.sort({ price: 1 });
      } else if (sort === 'price-desc') {
        reqQuery = reqQuery.sort({ price: -1 });
      } else if (sort === 'rating') {
        reqQuery = reqQuery.sort({ rating: -1 });
      } else {
        reqQuery = reqQuery.sort({ createdAt: -1 });
      }

      const products = await reqQuery.exec();
      
      if (products && products.length > 0) {
        return res.json({ success: true, count: products.length, data: products });
      }
    }

    // Fallback to sample data if DB is empty or disconnected
    console.log('[ProductController] Using memory sample data fallback');
    let filtered = [...sampleProducts];

    if (category && category !== 'All') {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.store.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (featured === 'true') {
      filtered = filtered.filter(p => p.isFeatured);
    }

    if (popular === 'true') {
      filtered = filtered.filter(p => p.isPopular);
    }

    if (sort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    res.json({ success: true, count: filtered.length, data: filtered, isFallback: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error fetching products', error: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const dbState = Product.db.readyState;

    if (dbState === 1 && id.match(/^[0-9a-fA-F]{24}$/)) {
      const product = await Product.findById(id);
      if (product) {
        return res.json({ success: true, data: product });
      }
    }

    // Fallback search by ID or string ID in sample products
    const product = sampleProducts.find(p => p._id === id || String(p.id) === id);

    if (product) {
      return res.json({ success: true, data: product });
    }

    res.status(404).json({ success: false, message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving product', error: error.message });
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    req.query.category = category;
    return getProducts(req, res);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error filtering products by category', error: error.message });
  }
};
