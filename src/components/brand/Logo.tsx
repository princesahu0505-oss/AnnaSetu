import React from 'react';
import { Leaf, Cpu } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', variant = 'dark' }) => {
  const textSizes = { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl' };

  const isLight = variant === 'light';

  return (
    <div className="flex items-center gap-2.5 cursor-pointer select-none">
      <div 
        className="relative flex items-center justify-center rounded-xl p-2 shadow-sm"
        style={{ 
          backgroundColor: isLight ? 'rgba(255,255,255,0.15)' : 'var(--primary)',
          color: '#FFFFFF'
        }}
      >
        <Leaf className="w-5 h-5" />
        <Cpu className="w-3 h-3 absolute -bottom-1 -right-1 text-amber-300" />
      </div>
      <div className="flex flex-col">
        <span className={`font-bold tracking-tight ${textSizes[size]}`} style={{ color: isLight ? '#FFFFFF' : 'var(--text-main)' }}>
          Anna<span style={{ color: isLight ? '#E59A24' : 'var(--primary)' }}>Setu</span>
        </span>
        {size !== 'sm' && (
          <span className="text-[10px] uppercase tracking-wider font-semibold opacity-75" style={{ color: isLight ? '#E2E8F0' : 'var(--text-muted)' }}>
            AI FoodLoop
          </span>
        )}
      </div>
    </div>
  );
};
