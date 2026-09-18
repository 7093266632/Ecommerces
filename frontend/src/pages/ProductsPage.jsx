import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';
import { fetchProducts } from '../services/api';
import { Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function ProductsPage({ onAddToCart, onToggleWishlist, wishlistIds, cartIds }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = [
    'All',
    'Fashion',
    'Electronics',
    'Beauty',
    'Footwear',
    'Accessories',
    'Home & Living',
    'Sports',
    'Kids',
    'Grocery'
  ];

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts({
        category: selectedCategory,
        search: searchQuery,
        sort: currentSort
      });
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, [selectedCategory, searchQuery, currentSort]);

  const handleSelectCategory = (cat) => {
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (e) => {
    const val = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (!val) {
      newParams.delete('sort');
    } else {
      newParams.set('sort', val);
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title & Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Mall Product Directory</h1>
          <p className="text-slate-400 text-sm mt-1">
            Browse products across all mall stores ({products.length} items found)
          </p>
        </div>

        {/* Search Bar in Header */}
        <div className="w-full md:w-80">
          <SearchBar placeholder="Filter products or stores..." />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-700/60 space-y-6 sticky top-28">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
              <div className="flex items-center gap-2 font-bold text-white text-base">
                <Filter className="w-4 h-4 text-sky-400" />
                <span>Filters</span>
              </div>
              {(selectedCategory !== 'All' || searchQuery || currentSort) && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-slate-400 hover:text-sky-400 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Categories
              </h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleSelectCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-sky-500 text-white font-semibold shadow-md shadow-sky-500/20'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Main Product List Area */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Controls Bar: Mobile Filter Toggle & Sort Dropdown */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-800/80 rounded-2xl border border-slate-700/60">
            
            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-slate-700/80 text-white text-sm font-medium rounded-xl border border-slate-600"
            >
              <SlidersHorizontal className="w-4 h-4 text-sky-400" />
              <span>Filters ({selectedCategory})</span>
            </button>

            {/* Active Search / Filter Tag */}
            <div className="text-xs text-slate-400">
              {searchQuery && (
                <span>Search results for: <strong className="text-sky-400">"{searchQuery}"</strong></span>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs font-semibold text-slate-400 hidden sm:inline">Sort by:</span>
              <select
                value={currentSort}
                onChange={handleSortChange}
                className="bg-slate-900 text-slate-200 text-sm font-medium px-3.5 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-sky-500 cursor-pointer"
              >
                <option value="">Default Featured</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          {mobileFilterOpen && (
            <div className="lg:hidden glass-panel p-4 rounded-2xl space-y-4 border border-slate-700">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Category</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      handleSelectCategory(cat);
                      setMobileFilterOpen(false);
                    }}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-medium ${
                      selectedCategory === cat ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Product Cards Grid */}
          <ProductGrid
            products={products}
            loading={loading}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            wishlistIds={wishlistIds}
            cartIds={cartIds}
          />
        </main>

      </div>
    </div>
  );
}
