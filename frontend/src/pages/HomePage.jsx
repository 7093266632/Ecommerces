import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import CategoryCard from '../components/CategoryCard';
import ProductGrid from '../components/ProductGrid';
import { fetchProducts } from '../services/api';
import { Sparkles, ArrowRight, Store, Flame, Award, Tag } from 'lucide-react';

export default function HomePage({ onAddToCart, onToggleWishlist, wishlistIds, cartIds }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categories = [
    { name: 'Fashion', icon: '👗', bgColor: 'bg-pink-500/10 text-pink-400', itemCount: '12 Outlets' },
    { name: 'Electronics', icon: '⚡', bgColor: 'bg-sky-500/10 text-sky-400', itemCount: '8 Tech Hubs' },
    { name: 'Beauty', icon: '💄', bgColor: 'bg-purple-500/10 text-purple-400', itemCount: '15 Luxe Stores' },
    { name: 'Footwear', icon: '👟', bgColor: 'bg-emerald-500/10 text-emerald-400', itemCount: '10 Brand Outlets' },
    { name: 'Accessories', icon: '🕶️', bgColor: 'bg-amber-500/10 text-amber-400', itemCount: '14 Stores' },
    { name: 'Home & Living', icon: '🏡', bgColor: 'bg-indigo-500/10 text-indigo-400', itemCount: '9 Design Studios' },
    { name: 'Sports', icon: '⚽', bgColor: 'bg-red-500/10 text-red-400', itemCount: '7 Arena Outlets' },
    { name: 'Kids', icon: '🧸', bgColor: 'bg-teal-500/10 text-teal-400', itemCount: '11 Toy Hubs' },
    { name: 'Grocery', icon: '🛒', bgColor: 'bg-lime-500/10 text-lime-400', itemCount: 'Gourmet Market' }
  ];

  const featuredStores = [
    { name: 'Nike Official Store', logo: '👟', category: 'Footwear & Apparel' },
    { name: 'Sony World', logo: '🎧', category: 'Premium Audio & TV' },
    { name: 'Sephora Luxe', logo: '✨', category: 'Cosmetics & Perfumes' },
    { name: 'Levi\'s Store', logo: '👖', category: 'Denim & Casuals' },
    { name: 'IKEA Studio', logo: '🪑', category: 'Home Furnishings' },
    { name: 'Decathlon Sports', logo: '🏹', category: 'Sports & Adventure' }
  ];

  useEffect(() => {
    const loadHomeData = async () => {
      setLoading(true);
      const featured = await fetchProducts({ featured: true });
      const popular = await fetchProducts({ popular: true });
      setFeaturedProducts(featured.slice(0, 4));
      setPopularProducts(popular.slice(0, 8));
      setLoading(false);
    };
    loadHomeData();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Mall Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Mall Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Explore Shopping Categories
            </h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.name} category={cat} />
          ))}
        </div>
      </section>

      {/* 3. Featured Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>Handpicked Specials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Mall Highlights
            </h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
          >
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ProductGrid
          products={featuredProducts}
          loading={loading}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          wishlistIds={wishlistIds}
          cartIds={cartIds}
        />
      </section>

      {/* 4. Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 p-8 sm:p-12 border border-purple-500/20 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="bg-pink-500/20 text-pink-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-pink-500/30">
              Weekend Mall Carnival
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Flat 30% Off on Top Electronics & Beauty Outlets
            </h2>
            <p className="text-purple-200 text-sm sm:text-base">
              Shop directly from Sony, Sephora, & Apple Stores with exclusive instant store vouchers and express delivery.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/products?search=Electronics')}
                className="px-6 py-3 bg-pink-500 hover:bg-pink-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-pink-500/30 transition-all"
              >
                Claim Outlet Deals
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Popular Mall Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4" />
              <span>Trending Now</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Most Popular Products
            </h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ProductGrid
          products={popularProducts}
          loading={loading}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          wishlistIds={wishlistIds}
          cartIds={cartIds}
        />
      </section>

      {/* 6. Popular Mall Stores Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Store className="w-4 h-4" />
            <span>Mall Flagships</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Shop From Top Mall Outlets
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredStores.map((store) => (
            <div
              key={store.name}
              onClick={() => navigate(`/products?search=${encodeURIComponent(store.name)}`)}
              className="glass-panel p-5 rounded-2xl text-center cursor-pointer hover:border-sky-500/50 hover:-translate-y-1 transition-all"
            >
              <div className="text-3xl mb-2">{store.logo}</div>
              <h4 className="text-sm font-bold text-white line-clamp-1">{store.name}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{store.category}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
