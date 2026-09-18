import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import {
  Star,
  Heart,
  ShoppingCart,
  Store,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  ArrowLeft,
  Check,
  Zap
} from 'lucide-react';

export default function ProductDetailsPage({ onAddToCart, onToggleWishlist, wishlistIds = [], cartIds = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');

  const pId = product?._id || product?.id;
  const isWishlisted = wishlistIds.includes(pId);
  const isInCart = cartIds.includes(pId);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const data = await fetchProductById(id);
      if (data) {
        setProduct(data);
        setSelectedImage(data.image);
      }
      setLoading(false);
    };
    getProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-400 font-medium">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="inline-block bg-sky-500 text-white font-medium px-6 py-2.5 rounded-xl">
          Back to Products
        </Link>
      </div>
    );
  }

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const imagesList = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleBuyNow = () => {
    onAddToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to products</span>
      </button>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-800 border border-slate-700/60 shadow-2xl">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-pink-600 text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-lg">
                {discountPercent}% DISCOUNT
              </span>
            )}
            <button
              onClick={() => onToggleWishlist(product)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all ${
                isWishlisted ? 'bg-pink-500 text-white shadow-lg' : 'bg-slate-900/70 text-slate-300 hover:text-pink-400'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {imagesList.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {imagesList.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === imgUrl ? 'border-sky-500 scale-95' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Information */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Store & Category */}
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-sky-500/10 text-sky-400 text-xs font-bold border border-sky-500/20">
              {product.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Store className="w-4 h-4 text-sky-400" />
              <span>{product.store}</span>
            </div>
          </div>

          {/* Product Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            {product.name}
          </h1>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-1.5 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-amber-300">{product.rating || 4.5}</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Based on {product.reviewsCount || 120} verified store customer reviews
            </span>
          </div>

          {/* Pricing */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-white">
                ₹{product.price?.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-slate-400 line-through">
                  ₹{product.originalPrice?.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <p className="text-xs text-emerald-400 font-semibold">Inclusive of all local mall outlet taxes</p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-200">Description</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Options (e.g. Size Selector for Fashion/Footwear) */}
          {['Fashion', 'Footwear', 'Sports'].includes(product.category) && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-200">Select Size / Variant</h4>
              <div className="flex items-center gap-3">
                {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-11 h-11 rounded-xl font-bold text-sm border transition-all ${
                      selectedSize === sz
                        ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/20'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-200">Quantity</h4>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-white text-base">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <span className="text-xs text-slate-400">
                {product.stock} items available in store stock
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-800">
            <button
              onClick={() => onAddToCart(product, quantity)}
              disabled={product.stock <= 0}
              className={`w-full sm:w-1/2 py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all active:scale-95 ${
                isInCart
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg'
                  : 'bg-sky-500 hover:bg-sky-400 text-white shadow-xl shadow-sky-500/20'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
              className="w-full sm:w-1/2 py-3.5 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 active:scale-95"
            >
              <Zap className="w-5 h-5 fill-current" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Mall Express Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Original Brand</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-pink-400 shrink-0" />
              <span>7 Day Easy Return</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
