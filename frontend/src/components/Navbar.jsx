import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, ShoppingCart, User, Menu, X, Sparkles } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Navbar({ cartCount = 0, wishlistCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/products' },
    { name: 'Products', path: '/products' },
    { name: 'Stores', path: '/products?search=Store' }
  ];

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mall Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-100 to-sky-400 bg-clip-text text-transparent font-sans">
                MALL<span className="text-sky-400">HUB</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-widest uppercase font-medium -mt-1">
                Luxury Shopping Mall
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-sky-400 ${
                    isActive ? 'text-sky-400 font-semibold' : 'text-slate-300'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Search Bar - Center Desktop */}
          <div className="hidden lg:block w-72 xl:w-96">
            <SearchBar />
          </div>

          {/* User Controls / Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative p-2.5 text-slate-300 hover:text-pink-400 hover:bg-slate-800/60 rounded-xl transition-all"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2.5 text-slate-300 hover:text-sky-400 hover:bg-slate-800/60 rounded-xl transition-all"
              title="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Login Button */}
            <button
              onClick={() => alert('Login functionality will be activated in Phase 2!')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 transition-all active:scale-95"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 lg:hidden">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-slate-200 hover:bg-slate-800/80 rounded-lg text-base font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                alert('Login functionality will be activated in Phase 2!');
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-sky-500 text-white rounded-xl font-medium"
            >
              <User className="w-4 h-4" />
              <span>Customer Login</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
