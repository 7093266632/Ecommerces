const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const fetchProducts = async (params = {}) => {
  try {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.sort) query.append('sort', params.sort);
    if (params.featured) query.append('featured', 'true');
    if (params.popular) query.append('popular', 'true');

    const response = await fetch(`${API_BASE_URL}/products?${query.toString()}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.warn('[API Fetch Error] Could not connect to Express server, trying memory fallback:', error.message);
    // If backend server fails to respond, return sample fallback
    return fetchFallbackProducts(params);
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Product not found: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.warn('[API Fetch Error] Could not connect to Express server, searching fallback:', error.message);
    const fallbackList = await fetchFallbackProducts();
    return fallbackList.find(p => p._id === id || String(p.id) === id) || null;
  }
};

// Fallback dataset for resilient offline UI testing
const fetchFallbackProducts = (params = {}) => {
  const sampleData = [
    {
      _id: "65f1a2b3c4d5e6f7a8b9c001",
      id: "65f1a2b3c4d5e6f7a8b9c001",
      name: "Nike Air Zoom Pegasus 40 Running Shoes",
      description: "Responsive cushioning in the Pegasus provides an energized ride for everyday road running. Dual Zoom Air units deliver maximum bounce.",
      price: 9995,
      originalPrice: 11895,
      category: "Footwear",
      store: "Nike Official Store",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      reviewsCount: 340,
      stock: 18,
      isFeatured: true,
      isPopular: true
    },
    {
      _id: "65f1a2b3c4d5e6f7a8b9c002",
      id: "65f1a2b3c4d5e6f7a8b9c002",
      name: "Sony WH-1000XM5 Wireless Headphones",
      description: "Industry-leading noise canceling with two processors and 8 microphones for unprecedented call quality and sound fidelity.",
      price: 29990,
      originalPrice: 34990,
      category: "Electronics",
      store: "Sony World",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      reviewsCount: 512,
      stock: 12,
      isFeatured: true,
      isPopular: true
    },
    {
      _id: "65f1a2b3c4d5e6f7a8b9c003",
      id: "65f1a2b3c4d5e6f7a8b9c003",
      name: "Levi's Men's Slim Fit Denim Jacket",
      description: "Classic 100% cotton denim jacket with button closure, chest pockets with button flaps, and timeless styling.",
      price: 3499,
      originalPrice: 4999,
      category: "Fashion",
      store: "Levi's Store",
      image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
      rating: 4.5,
      reviewsCount: 188,
      stock: 25,
      isFeatured: true,
      isPopular: false
    },
    {
      _id: "65f1a2b3c4d5e6f7a8b9c004",
      id: "65f1a2b3c4d5e6f7a8b9c004",
      name: "Estée Lauder Advanced Night Repair Serum",
      description: "Deep-penetrating face serum that dramatically reduces the look of multiple signs of aging caused by environmental assaults.",
      price: 5900,
      originalPrice: 6500,
      category: "Beauty",
      store: "Sephora Luxe",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      reviewsCount: 275,
      stock: 30,
      isFeatured: true,
      isPopular: true
    },
    {
      _id: "65f1a2b3c4d5e6f7a8b9c005",
      id: "65f1a2b3c4d5e6f7a8b9c005",
      name: "Fossil Gen 6 Touchscreen Smartwatch",
      description: "Powered by Wear OS by Google, fast charging up to 80% in 30 minutes, heart rate monitor, and SpO2 tracking.",
      price: 18495,
      originalPrice: 24995,
      category: "Accessories",
      store: "Fossil Outlet",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      rating: 4.4,
      reviewsCount: 95,
      stock: 15,
      isFeatured: false,
      isPopular: true
    },
    {
      _id: "65f1a2b3c4d5e6f7a8b9c006",
      id: "65f1a2b3c4d5e6f7a8b9c006",
      name: "Minimalist Nordic Wooden Table Lamp",
      description: "Warm ambient LED desk light with solid oak wood tripod base and linen fabric shade.",
      price: 1999,
      originalPrice: 2999,
      category: "Home & Living",
      store: "IKEA Studio",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
      reviewsCount: 140,
      stock: 40,
      isFeatured: false,
      isPopular: false
    }
  ];

  let list = [...sampleData];
  if (params.category && params.category !== 'All') {
    list = list.filter(p => p.category.toLowerCase() === params.category.toLowerCase());
  }
  if (params.search) {
    const q = params.search.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.store.toLowerCase().includes(q));
  }
  if (params.featured) {
    list = list.filter(p => p.isFeatured);
  }
  if (params.sort === 'price-asc') list.sort((a,b) => a.price - b.price);
  if (params.sort === 'price-desc') list.sort((a,b) => b.price - a.price);
  if (params.sort === 'rating') list.sort((a,b) => b.rating - a.rating);

  return list;
};
