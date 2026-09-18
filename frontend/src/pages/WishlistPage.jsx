import React, { useEffect, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import { fetchProducts } from '../services/api';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WishlistPage({ wishlistIds = [], onAddToCart, onToggleWishlist, cartIds = [] }) {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      setLoading(true);
      if (wishlistIds.length === 0) {
        setWishlistProducts([]);
        setLoading(false);
        return;
      }
      const allProducts = await fetchProducts({});
      const filtered = allProducts.filter(p => wishlistIds.includes(p._id || p.id));
      setWishlistProducts(filtered);
      setLoading(false);
    };
    loadWishlist();
  }, [wishlistIds]);

  if (!loading && wishlistProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-pink-400 border border-slate-700">
          <Heart className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Your Wishlist is Empty</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Save your favorite items from mall stores here by clicking the heart icon on any product card!
          </p>
        </div>
        <div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-pink-500 hover:bg-pink-400 text-white font-bold text-sm rounded-2xl shadow-xl shadow-pink-500/20 transition-all"
          >
            <span>Explore Mall Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-white">My Saved Wishlist</h1>
        <p className="text-slate-400 text-sm mt-1">
          {wishlistProducts.length} saved item{wishlistProducts.length > 1 ? 's' : ''}
        </p>
      </div>

      <ProductGrid
        products={wishlistProducts}
        loading={loading}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlistIds={wishlistIds}
        cartIds={cartIds}
      />
    </div>
  );
}
