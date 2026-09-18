import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Store, ShieldCheck, Tag } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-slate-900 border-b border-slate-800 py-16 lg:py-24">
      {/* Glow Effects Backdrop */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-sky-400 text-xs font-semibold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>WELCOME TO MALLHUB</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Everything You Love. <br />
              <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
                All in One Mall.
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Discover fashion, electronics, beauty, footwear, and more from your favorite premier mall stores right from your device.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-base font-semibold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white rounded-2xl shadow-xl shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 rounded-2xl transition-all"
              >
                <Store className="w-4 h-4 text-sky-400" />
                <span>Explore Categories</span>
              </Link>
            </div>

            {/* Stats / Highlight Pills */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-2xl font-bold text-white">50+</p>
                <p className="text-xs text-slate-400">Mall Outlets</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="text-xs text-slate-400">Original Brands</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">24h</p>
                <p className="text-xs text-slate-400">Express Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Visual Image Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Banner Image */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl bg-slate-800 group">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80"
                  alt="Mall Shopping Showcase"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">Grand Mall Fest</span>
                      <p className="text-base font-bold text-white">Up to 40% Off Mega Deals</p>
                    </div>
                    <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      LIMITED TIME
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1 */}
              <div className="absolute -top-4 -left-4 glass-panel p-3 rounded-2xl shadow-xl flex items-center gap-3 hidden sm:flex border border-slate-700">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Official Partner</p>
                  <p className="text-[10px] text-slate-400">100% Authentic</p>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute -bottom-4 -right-4 glass-panel p-3 rounded-2xl shadow-xl flex items-center gap-3 hidden sm:flex border border-slate-700">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Best Prices</p>
                  <p className="text-[10px] text-slate-400">Direct Outlet Rates</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
