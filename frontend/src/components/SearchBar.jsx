import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

export default function SearchBar({ placeholder = "Search products, brands & stores...", className = "" }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <form onSubmit={handleSearch} className={`relative flex items-center w-full ${className}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-800/90 text-slate-100 text-sm placeholder-slate-400 pl-10 pr-10 py-2.5 rounded-full border border-slate-700/80 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
      />
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 text-slate-400 hover:text-slate-200 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </form>
  );
}
