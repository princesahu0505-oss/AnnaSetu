import React from 'react';
import { Logo } from '../brand/Logo';
import { 
  LayoutDashboard, 
  Cpu, 
  Store,
  Package, 
  RefreshCw, 
  Users, 
  MapPin, 
  QrCode, 
  BarChart3, 
  LogOut,
  ShieldAlert
} from 'lucide-react';

interface DashboardSidebarProps {
  currentRole: 'kitchen' | 'ngo' | 'admin';
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  currentRole, 
  currentPage, 
  onNavigate,
  onLogout 
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, roles: ['kitchen', 'ngo', 'admin'] },
    { id: 'ai-foodloop', label: 'AI FoodLoop', icon: Cpu, roles: ['kitchen', 'ngo', 'admin'] },
    { id: 'food-sources', label: 'Food Sources', icon: Store, roles: ['kitchen', 'admin'] },
    { id: 'inventory', label: 'Inventory', icon: Package, roles: ['kitchen', 'admin'] },
    { id: 'surplus', label: 'Surplus Management', icon: RefreshCw, roles: ['kitchen', 'ngo', 'admin'] },
    { id: 'ngo-matching', label: 'NGO Matching', icon: Users, roles: ['kitchen', 'ngo', 'admin'] },
    { id: 'routes', label: 'Route & Pickup', icon: MapPin, roles: ['kitchen', 'ngo', 'admin'] },
    { id: 'food-passport', label: 'QR Food Passport', icon: QrCode, roles: ['kitchen', 'ngo', 'admin'] },
    { id: 'impact', label: 'Impact Analytics', icon: BarChart3, roles: ['kitchen', 'ngo', 'admin'] },
  ];

  const filteredItems = navItems.filter(item => item.roles.includes(currentRole));

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div onClick={() => onNavigate('landing')} className="cursor-pointer">
          <Logo size="sm" />
        </div>
        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
          {currentRole}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {filteredItems.map(item => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                isActive 
                  ? 'bg-emerald-50 text-emerald-900 font-semibold shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="mb-3 flex items-center gap-2 text-xs text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200/60">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span className="font-medium">Demo Data Simulated</span>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Role / Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
