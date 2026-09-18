import React from 'react';
import { Plus, Minus, Trash2, Store } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartItem({ item, onUpdateQuantity, onRemoveItem }) {
  const pId = item.product._id || item.product.id;
  const itemTotal = item.product.price * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-800/80 rounded-2xl border border-slate-700/60 hover:border-slate-600 transition-all">
      
      {/* Left: Product Image & Details */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-20 h-20 object-cover rounded-xl bg-slate-900 border border-slate-700/80 shrink-0"
        />
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Store className="w-3 h-3 text-sky-400" />
            <span>{item.product.store}</span>
          </div>
          <Link
            to={`/products/${pId}`}
            className="text-sm font-bold text-white hover:text-sky-400 line-clamp-1 transition-colors"
          >
            {item.product.name}
          </Link>
          <div className="text-xs text-sky-400 font-semibold">
            ₹{item.product.price?.toLocaleString('en-IN')} each
          </div>
        </div>
      </div>

      {/* Right: Quantity Controls & Price */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-700/50">
        
        {/* Quantity Controls */}
        <div className="flex items-center bg-slate-900 rounded-xl border border-slate-700/80 p-1">
          <button
            onClick={() => onUpdateQuantity(pId, item.quantity - 1)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Decrease Quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <span className="w-8 text-center text-sm font-bold text-white">
            {item.quantity}
          </span>
          
          <button
            onClick={() => onUpdateQuantity(pId, item.quantity + 1)}
            disabled={item.quantity >= item.product.stock}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-40"
            title="Increase Quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Item Total */}
        <div className="text-right min-w-[90px]">
          <p className="text-xs text-slate-400">Subtotal</p>
          <p className="text-base font-extrabold text-white">
            ₹{itemTotal?.toLocaleString('en-IN')}
          </p>
        </div>

        {/* Delete Item */}
        <button
          onClick={() => onRemoveItem(pId)}
          className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
          title="Remove Item"
        >
          <Trash2 className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
