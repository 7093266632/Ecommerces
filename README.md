# MALLHUB — Mall E-Commerce Application (Phase 1)

A modern, high-performance full-stack customer-side e-commerce web application for a premier shopping mall. **MALLHUB** enables shoppers to discover products across 9 luxury shopping categories and flagship mall outlets, view rich product details, manage wishlists and shopping carts with local persistence, and interact with a RESTful Express.js backend backed by MongoDB Atlas.

---

## 🚀 Phase 1 Features

- **Full-Stack Architecture**: Clean separation between React frontend (`frontend/`) and Express backend (`backend/`).
- **Mall Directory & Categories**: 9 major shopping categories:
  - 👗 Fashion
  - ⚡ Electronics
  - 💄 Beauty
  - 👟 Footwear
  - 🕶️ Accessories
  - 🏡 Home & Living
  - ⚽ Sports
  - 🧸 Kids
  - 🛒 Grocery
- **Store Outlets**: Flagship mall stores such as *Nike Official Store*, *Sony World*, *Levi's Store*, *Sephora Luxe*, *IKEA Studio*, and *Decathlon Sports*.
- **Interactive Home Page**: Hero banner with CTA buttons, category directory, featured handpicked items, popular deals, promotional carnival banner, and flagship store showcase.
- **Product Filtering & Search**:
  - Live search bar by product title, store, or category.
  - Sidebar category filter.
  - Price sorting (Low → High, High → Low) and Customer Rating sorting.
- **Product Details Page**: Image gallery with thumbnail switcher, stock status, ratings & reviews count, option selectors (sizes), quantity controls, Add to Cart, and Buy Now checkout initiation.
- **Cart & Wishlist Persistence**: Real-time counter badges in Navbar, localStorage state retention across browser reloads, subtotal/tax/delivery breakdown, item removal, and quantity updates.
- **MongoDB Atlas Integration**: Mongoose Product Schema, `.env` URI configuration, and a `seed.js` script with 20+ realistic products in Indian Rupees (₹).
- **Graceful API Fallback**: Robust error handling ensuring smooth UI showcase even if database or server is offline.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS (with Glassmorphism & Custom Animations)
- **Icons**: Lucide React
- **Routing**: React Router DOM (v6)
- **HTTP Client**: Fetch API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas (with Mongoose ORM)
- **Middleware**: CORS, Dotenv, Nodemon

---

## 📁 Project Structure

```text
mall-ecommerce/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── CartItem.jsx
│   │   │   └── Toast.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── ProductDetailsPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   └── WishlistPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── controllers/
│   │   └── productController.js
│   ├── seedData.js
│   ├── seed.js
│   ├── server.js
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

---

## ⚡ Installation & Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)
- [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas) (or local MongoDB)

---

### 1. Environment Setup

In the `backend/` directory, configure your `.env` file:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mallhub?retryWrites=true&w=majority
```

---

### 2. Backend Setup & Data Seeding

1. Open a terminal and navigate to `backend`:
   ```bash
   cd backend
   npm install
   ```

2. Seed the MongoDB database with sample products:
   ```bash
   npm run seed
   ```

3. Start the Express development server:
   ```bash
   npm run dev
   ```
   *The backend will start at `http://localhost:5000`.*

---

### 3. Frontend Setup

1. Open a second terminal and navigate to `frontend`:
   ```bash
   cd frontend
   npm install
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The React app will launch at `http://localhost:3000`.*

---

## 🔗 Available REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Health check route |
| `GET` | `/api/products` | Retrieve all products (supports `?category=`, `?search=`, `?sort=`, `?featured=true`, `?popular=true`) |
| `GET` | `/api/products/:id` | Get single product details by ID |
| `GET` | `/api/products/category/:category` | Get products filtered by category |

---

## 📌 Phase 1 Scope & Notes

Phase 1 focuses on building the solid foundation, UI/UX design system, product catalog, cart/wishlist local state management, Express server, and MongoDB connection.

*Phase 2 & Phase 3 (Admin Dashboard, User Auth, Payment Gateway, Order Tracking) will be added in subsequent phases.*
