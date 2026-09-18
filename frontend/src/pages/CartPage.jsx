import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { ShoppingBag, ArrowRight, ShieldCheck, Trash2, ArrowLeft } from 'lucide-react';

export default function CartPage({ cart = [], onUpdateQuantity, onRemoveItem, onClearCart }) {
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 2000 || subtotal === 0 ? 0 : 150;
  const tax = Math.round(subtotal * 0.05); // 5% Mall GST
  const total = subtotal + deliveryFee + tax;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-sky-400 border border-slate-700">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Your Mall Cart is Empty</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Looks like you haven't added any items from our mall stores yet. Explore our premier categories to get started!
          </p>
        </div>
        <div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm rounded-2xl shadow-xl shadow-sky-500/20 transition-all"
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
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Customer Shopping Cart</h1>
          <p className="text-slate-400 text-sm mt-1">
            {cart.length} product{cart.length > 1 ? 's' : ''} in your cart
          </p>
        </div>

        <button
          onClick={onClearCart}
          className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 bg-rose-500/10 px-3 py-2 rounded-xl border border-rose-500/20"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      {/* Cart Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <CartItem
              key={item.product._id || item.product.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
            />
          ))}

          <div className="pt-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping at MallHub</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary Box */}
        <div className="lg:col-span-4">
          <div className="glass-panel p-6 rounded-3xl border border-slate-700/60 space-y-6 sticky top-28">
            <h3 className="text-lg font-bold text-white border-b border-slate-700/60 pb-4">
              Order Summary
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span className="font-semibold text-white">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Estimated GST (5%)</span>
                <span className="font-semibold text-white">₹{tax.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Express Mall Delivery</span>
                {deliveryFee === 0 ? (
                  <span className="text-emerald-400 font-bold">FREE</span>
                ) : (
                  <span className="font-semibold text-white">₹{deliveryFee}</span>
                )}
              </div>

              {deliveryFee > 0 && (
                <p className="text-[11px] text-sky-400 bg-sky-500/10 p-2 rounded-lg border border-sky-500/20">
                  Add ₹{(2000 - subtotal).toLocaleString('en-IN')} more to unlock FREE Delivery!
                </p>
              )}
            </div>

            {/* Total Price */}
            <div className="border-t border-slate-700/60 pt-4 flex justify-between items-baseline">
              <span className="text-base font-bold text-white">Total Amount</span>
              <span className="text-2xl font-extrabold text-sky-400">
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Checkout Mock Button */}
            <button
              onClick={() => alert('Phase 1 Notice: Payment gateway and order checkout will be implemented in Phase 2!')}
              className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-sky-500/25 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Secure Mall Encrypted Order</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
