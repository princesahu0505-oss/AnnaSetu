import React from 'react';
import { Logo } from '../brand/Logo';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface LandingNavbarProps {
  onNavigate: (page: string) => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({ onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 lg:px-12 py-4 flex items-center justify-between">
      <div onClick={() => onNavigate('landing')} className="cursor-pointer">
        <Logo size="md" />
      </div>
      
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <button onClick={() => onNavigate('landing')} className="hover:text-emerald-700 transition-colors">How It Works</button>
        <button onClick={() => onNavigate('ai-foodloop')} className="hover:text-emerald-700 transition-colors flex items-center gap-1">
          <span>AI FoodLoop</span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-semibold">Core</span>
        </button>
        <button onClick={() => onNavigate('impact')} className="hover:text-emerald-700 transition-colors">Impact</button>
        <button onClick={() => onNavigate('food-passport')} className="hover:text-emerald-700 transition-colors">Food Passport</button>
      </nav>

      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
          <span>SIH 2026 Prototype</span>
        </div>
        
        <button 
          onClick={() => onNavigate('login')}
          className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-emerald-800 transition-colors"
        >
          Sign In
        </button>

        <button 
          onClick={() => onNavigate('role-selection')}
          className="px-4 py-2 text-sm font-semibold text-white rounded-lg shadow-sm hover:opacity-95 transition-all flex items-center gap-1.5"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
