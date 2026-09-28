import React, { useState } from 'react';
import { Search, Bell, CheckCircle2, X } from 'lucide-react';

interface DashboardTopbarProps {
  currentRole: 'kitchen' | 'ngo' | 'admin';
  onRoleChange: (role: 'kitchen' | 'ngo' | 'admin') => void;
  onNavigate: (page: string) => void;
}

export const DashboardTopbar: React.FC<DashboardTopbarProps> = ({ currentRole, onRoleChange }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: 1, title: 'Surplus Batch Detected', time: '5m ago', type: 'success' },
    { id: 2, title: 'AI Demand Forecast Updated', time: '12m ago', type: 'info' },
    { id: 3, title: 'NGO Match Confirmed for Batch #8911', time: '25m ago', type: 'success' },
  ];

  const roleNames = {
    kitchen: 'Central Institutional Kitchen',
    ngo: 'Seva Food Network Hub',
    admin: 'National Ecosystem Control Center'
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search batches, NGOs, routes, or metrics..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-sm text-slate-800 focus:outline-none focus:border-emerald-600 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Role Switcher Pill */}
        <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => onRoleChange('kitchen')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              currentRole === 'kitchen' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kitchen
          </button>
          <button
            onClick={() => onRoleChange('ngo')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              currentRole === 'ngo' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            NGO
          </button>
          <button
            onClick={() => onRoleChange('admin')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              currentRole === 'admin' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Admin
          </button>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 py-3 z-50">
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Notifications</span>
                <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className="px-4 py-2.5 hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-slate-800">{n.title}</p>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold text-xs">
            {currentRole === 'kitchen' ? 'K' : currentRole === 'ngo' ? 'N' : 'A'}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-slate-800 capitalize">{currentRole} Demo User</p>
            <p className="text-[10px] text-slate-500 truncate max-w-[140px]">{roleNames[currentRole]}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
