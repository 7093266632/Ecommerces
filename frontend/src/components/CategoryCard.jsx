import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryCard({ category }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${encodeURIComponent(category.name)}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-800/80 border border-slate-700/60 p-5 hover:border-sky-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${category.bgColor || 'bg-sky-500/10 text-sky-400'} flex items-center justify-center font-semibold text-2xl group-hover:scale-110 transition-transform`}>
          {category.icon}
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-400 group-hover:bg-sky-500 group-hover:text-white transition-all">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      <div>
        <h3 className="text-base font-bold text-white group-hover:text-sky-400 transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          {category.itemCount || 'Explore Outlets'}
        </p>
      </div>
    </div>
  );
}
