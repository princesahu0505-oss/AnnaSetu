import React, { useState, useMemo } from 'react';
import { Search, Plus, Download, MapPin } from 'lucide-react';
import { type FoodSource, initialFoodSources } from '../../data/foodSources';

interface FoodSourcesPageProps {
  onNavigate: (page: string) => void;
}

export const FoodSourcesPage: React.FC<FoodSourcesPageProps> = ({ onNavigate }) => {
  const [sources] = useState<FoodSource[]>(initialFoodSources);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter states
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredSources = useMemo(() => {
    return sources.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            s.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            s.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'All' || s.type === typeFilter;
      const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [sources, searchTerm, typeFilter, statusFilter]);

  const metrics = [
    { label: 'Active Food Sources', value: sources.length },
    { label: 'Restaurants', value: sources.filter(s => s.type === 'Restaurant').length },
    { label: 'Hotels', value: sources.filter(s => s.type === 'Hotel').length },
    { label: 'Rescue-Ready', value: sources.filter(s => s.status === 'RESCUE READY').length },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Food Source Network</h1>
          <p className="text-slate-600 mt-1">Connect the places where food is prepared with the network that can help recover eligible surplus.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold hover:bg-slate-50">
            <Download className="w-4 h-4" />
            Import Demo Sources
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-lg text-sm font-semibold hover:bg-emerald-800">
            <Plus className="w-4 h-4" />
            Add Food Source
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-xs font-medium">{m.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{m.value}</p>
            <p className="text-[10px] text-emerald-700 font-semibold mt-2">Demo / Simulated</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search food sources by name or location..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="px-3 py-2 rounded-lg border border-slate-300 text-sm" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option>All Types</option>
          <option>Restaurant</option>
          <option>Hotel</option>
          <option>Institutional Kitchen</option>
        </select>
        <select className="px-3 py-2 rounded-lg border border-slate-300 text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All Statuses</option>
          <option>ACTIVE</option>
          <option>RESCUE READY</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSources.map(s => (
          <div key={s.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900">{s.name}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-medium">{s.type}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {s.location} • {s.distanceKm} km
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500 text-xs">Meals / day</p>
                <p className="font-semibold text-slate-900">{s.mealsPerDay}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Typical surplus</p>
                <p className="font-semibold text-slate-900">{s.typicalSurplus}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full ${s.status === 'RESCUE READY' ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${s.status === 'RESCUE READY' ? 'bg-emerald-600' : 'bg-slate-400'}`} />
                {s.status}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => onNavigate(`source-profile-${s.id}`)}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
                >
                  View Profile
                </button>
                {s.currentSurplus && (
                  <button className="px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold border border-emerald-200 hover:bg-emerald-100">
                    View Surplus
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
