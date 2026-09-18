import React from 'react';
import ProductCard from './ProductCard';
import { PackageOpen } from 'lucide-react';

export default function ProductGrid({
  products = [],
  loading = false,
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
  cartIds = []
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/50 space-y-4">
            <div className="w-full h-48 rounded-xl animate-shimmer" />
            <div className="h-4 w-3/4 rounded animate-shimmer" />
            <div className="h-3 w-1/2 rounded animate-shimmer" />
            <div className="h-8 w-full rounded-xl animate-shimmer" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-12 text-center my-8">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
          <PackageOpen className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white mb-1">No products found</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          We couldn't find any products matching your selected category or search filter. Try clearing filters or searching for something else.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        const pId = product._id || product.id;
        return (
          <ProductCard
            key={pId}
            product={product}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            isWishlisted={wishlistIds.includes(pId)}
            isInCart={cartIds.includes(pId)}
          />
        );
      })}
    </div>
  );
}
