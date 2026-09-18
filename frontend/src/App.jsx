import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';

// Auto Scroll To Top Helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  // 1. Initialize Cart state from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      return [];
    }
  });

  // 2. Initialize Wishlist state from localStorage
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (e) {
      return [];
    }
  });

  // 3. Toast Message State
  const [toastMessage, setToastMessage] = useState('');

  // Synchronize Cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Synchronize Wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Add item to cart
  const handleAddToCart = (product, qty = 1) => {
    const pId = product._id || product.id;
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => (item.product._id || item.product.id) === pId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [...prevCart, { product, quantity: qty }];
      }
    });
    setToastMessage(`✓ ${product.name} added to cart!`);
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => {
        const pId = item.product._id || item.product.id;
        if (pId === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Remove item from cart
  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => (item.product._id || item.product.id) !== productId));
    setToastMessage('Item removed from cart');
  };

  // Clear all cart items
  const handleClearCart = () => {
    setCart([]);
    setToastMessage('Cart cleared');
  };

  // Toggle wishlist item
  const handleToggleWishlist = (product) => {
    const pId = product._id || product.id;
    if (wishlistIds.includes(pId)) {
      setWishlistIds((prev) => prev.filter((id) => id !== pId));
      setToastMessage(`Removed ${product.name} from wishlist`);
    } else {
      setWishlistIds((prev) => [...prev, pId]);
      setToastMessage(`♥ Saved ${product.name} to wishlist`);
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartProductIds = cart.map((item) => item.product._id || item.product.id);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans selection:bg-sky-500 selection:text-white">
        
        {/* Navigation Bar */}
        <Navbar cartCount={totalCartCount} wishlistCount={wishlistIds.length} />

        {/* Global Toast Notification */}
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />

        {/* Main Route Views */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  wishlistIds={wishlistIds}
                  cartIds={cartProductIds}
                />
              }
            />

            <Route
              path="/products"
              element={
                <ProductsPage
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  wishlistIds={wishlistIds}
                  cartIds={cartProductIds}
                />
              }
            />

            <Route
              path="/category/:category"
              element={
                <ProductsPage
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  wishlistIds={wishlistIds}
                  cartIds={cartProductIds}
                />
              }
            />

            <Route
              path="/products/:id"
              element={
                <ProductDetailsPage
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  wishlistIds={wishlistIds}
                  cartIds={cartProductIds}
                />
              }
            />

            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onClearCart={handleClearCart}
                />
              }
            />

            <Route
              path="/wishlist"
              element={
                <WishlistPage
                  wishlistIds={wishlistIds}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  cartIds={cartProductIds}
                />
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
