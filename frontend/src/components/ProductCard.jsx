import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Star, ShoppingCart, Store, Check } from 'lucide-react';

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  isInCart = false
}) {
  const navigate = useNavigate();

  const id = product._id || product.id;
  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleCardClick = (e) => {
    // Avoid redirecting when clicking heart or add to cart button
    if (e.target.closest('button')) return;
    navigate(`/products/${id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-slate-800/90 rounded-2xl border border-slate-700/70 overflow-hidden flex flex-col justify-between hover:border-sky-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10 cursor-pointer"
    >
      {/* Top Image Section */}
      <div className="relative aspect-square overflow-hidden bg-slate-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="absolute top-3 left-3 bg-pink-600 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md tracking-wider">
            {discountPercent}% OFF
          </span>
        )}

        {/* Category Pill */}
        <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-sky-400 text-[10px] font-semibold px-2.5 py-1 rounded-lg border border-slate-700/60">
          {product.category}
        </span>

        {/* Wishlist Heart Toggle */}
        <button
          onClick={() => onToggleWishlist(product)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30 scale-110'
              : 'bg-slate-900/70 text-slate-300 hover:text-pink-400 hover:bg-slate-900'
          }`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Store Name */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Store className="w-3.5 h-3.5 text-sky-400" />
            <span className="truncate">{product.store}</span>
          </div>

          {/* Product Title */}
          <Link
            to={`/products/${id}`}
            className="text-sm font-bold text-slate-100 hover:text-sky-400 line-clamp-2 transition-colors leading-snug"
          >
            {product.name}
          </Link>
        </div>

        {/* Rating & Price row */}
        <div className="space-y-2 pt-1 border-t border-slate-700/50">
          
          <div className="flex items-center justify-between">
            {/* Star Rating */}
            <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold text-amber-300">
                {product.rating || 4.5}
              </span>
              <span className="text-[10px] text-slate-400">({product.reviewsCount || 120})</span>
            </div>

            {/* Stock status indicator */}
            <span className={`text-[10px] font-medium ${product.stock > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-white">
              ₹{product.price?.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice?.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={product.stock <= 0}
          className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 ${
            isInCart
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
              : 'bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40'
          } ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isInCart ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>

      </div>
    </div>
  );
}
