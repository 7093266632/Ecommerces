import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, RefreshCw, PhoneCall, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 mt-auto">
      {/* Top Banner Features */}
      <div className="border-b border-slate-800/60 bg-slate-900/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Express Mall Delivery</h4>
              <p className="text-xs text-slate-400">Same day delivery from mall stores</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-200">100% Authentic Brands</h4>
              <p className="text-xs text-slate-400">Verified official flagship outlets</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="p-3 bg-pink-500/10 text-pink-400 rounded-xl">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Easy 7-Day Returns</h4>
              <p className="text-xs text-slate-400">Hassle-free store returns & exchanges</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-200">24/7 Customer Help</h4>
              <p className="text-xs text-slate-400">Dedicated concierge support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Col */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-wider text-white">
              MALL<span className="text-sky-400">HUB</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Everything you love. All in one grand digital mall. Explore top fashion, electronics, beauty, and home lifestyle stores online.
          </p>
          <div className="space-y-2 text-xs text-slate-400">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
              <span>MallHub Grand Plaza, Sector 62, City Center</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <span>support@mallhub-ecommerce.com</span>
            </p>
          </div>
        </div>

        {/* Mall Categories */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Mall Categories</h3>
          <ul className="space-y-2.5 text-sm">
            {['Fashion', 'Electronics', 'Beauty', 'Footwear', 'Accessories', 'Home & Living'].map(cat => (
              <li key={cat}>
                <Link to={`/category/${encodeURIComponent(cat)}`} className="hover:text-sky-400 transition-colors">
                  {cat} Store
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Stores */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Featured Outlets</h3>
          <ul className="space-y-2.5 text-sm">
            {['Nike Official Store', 'Sony World', 'Levi\'s Store', 'Sephora Luxe', 'IKEA Studio', 'Decathlon Sports'].map(store => (
              <li key={store}>
                <Link to={`/products?search=${encodeURIComponent(store)}`} className="hover:text-sky-400 transition-colors">
                  {store}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Mall Digest</h3>
          <p className="text-sm text-slate-400">
            Subscribe for exclusive mall outlet discounts, seasonal sales & reward points.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to MallHub newsletter!'); }} className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full bg-slate-900 text-slate-100 text-sm px-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-400 text-white font-medium py-2.5 rounded-xl text-sm transition-all"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} MALLHUB E-Commerce. All rights reserved. Built for College Portfolio & Academic Showcase.</p>
      </div>
    </footer>
  );
}
