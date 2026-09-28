import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { MOCK_NGO_MATCHES } from '../data/mockData';
import { 
  HeartHandshake, 
  MapPin, 
  Clock, 
  Truck, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Building2
} from 'lucide-react';

interface NgoDashboardProps {
  currentRole: 'kitchen' | 'ngo' | 'admin';
  currentPage: string;
  onNavigate: (page: string) => void;
  onRoleChange: (role: 'kitchen' | 'ngo' | 'admin') => void;
  onLogout: () => void;
}

export const NgoDashboard: React.FC<NgoDashboardProps> = ({
  currentRole,
  currentPage,
  onNavigate,
  onRoleChange,
  onLogout
}) => {
  const [requestedIds, setRequestedIds] = useState<string[]>([]);

  const handleRequestPickup = (id: string) => {
    if (!requestedIds.includes(id)) {
      setRequestedIds([...requestedIds, id]);
    }
  };

  return (
    <DashboardLayout
      currentRole={currentRole}
      currentPage={currentPage}
      onNavigate={onNavigate}
      onRoleChange={onRoleChange}
      onLogout={onLogout}
    >
      <div className="space-y-6">
        {/* Header Banner */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                NGO / Recipient Portal
              </span>
              <span className="text-xs text-slate-400">• Demo / Simulated Data</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Seva Food Network Hub</h1>
            <p className="text-xs text-slate-600">Discover nearby eligible surplus food batches and coordinate rapid collection.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('routes')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Active Pickups ({requestedIds.length})</span>
            </button>
          </div>
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Available Surplus', value: '4 Batches', change: 'Within 8 km radius', icon: HeartHandshake, color: 'text-emerald-700 bg-emerald-50' },
            { label: 'Active Pickups', value: `${requestedIds.length} Assigned`, change: 'In transit / Scheduled', icon: Truck, color: 'text-blue-700 bg-blue-50' },
            { label: 'Completed Rescues', value: '314 Batches', change: 'Total this quarter', icon: CheckCircle2, color: 'text-emerald-700 bg-emerald-50' },
            { label: 'Meals Distributed', value: '18,450 Meals', change: 'Verified delivery', icon: Sparkles, color: 'text-amber-700 bg-amber-50' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">{stat.label}</span>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">{stat.change}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Available Surplus Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Nearby Surplus Opportunities</h3>
              <p className="text-xs text-slate-500">AI-matched eligible food batches ready for claim</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {MOCK_NGO_MATCHES.length} Active Listings
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_NGO_MATCHES.map((item) => {
              const isRequested = requestedIds.includes(item.id);
              return (
                <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full">
                        {item.urgency} Urgency
                      </span>
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {item.distance}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-900">{item.foodType}</h4>
                      <p className="text-xs font-semibold text-emerald-700 mt-0.5">{item.quantity}</p>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{item.pickupLocation}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Pickup: {item.pickupWindow}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-medium">{item.capacityMatch}</span>
                    <button
                      onClick={() => handleRequestPickup(item.id)}
                      disabled={isRequested}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        isRequested 
                          ? 'bg-emerald-100 text-emerald-800 cursor-default' 
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      }`}
                    >
                      <span>{isRequested ? 'Pickup Requested' : 'Request Pickup'}</span>
                      {!isRequested && <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
