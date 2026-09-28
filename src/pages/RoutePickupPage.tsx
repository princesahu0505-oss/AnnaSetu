import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { 
  Navigation, 
  ArrowRight,
  ShieldAlert,
  CheckCircle,
  Truck
} from 'lucide-react';

interface RouteItem {
  id: string;
  batchId: string;
  foodItem: string;
  quantity: string;
  pickup: string;
  destination: string;
  driver: string;
  vehicle: string;
  distance: string;
  eta: string;
  pickupWindow: string;
  status: 'Pickup Assigned' | 'Driver En Route' | 'Arrived at Source' | 'Picked Up' | 'Delivered';
  pickupTimestamp?: string;
  deliveryTimestamp?: string;
}

const INITIAL_ROUTES: RouteItem[] = [
  {
    id: 'RT-2026-101',
    batchId: 'RES-2026-002',
    foodItem: 'Buffet Assorted Veg Curry & Naan',
    quantity: '140 portions',
    pickup: 'City Central Grand Hotel',
    destination: 'Aashirwad Annakshetra Relief Foundation',
    driver: 'Ramesh Verma',
    vehicle: 'Tata Ace EV Cold-Van (MP-04-EA-1029)',
    distance: '4.1 km',
    eta: '12 mins',
    pickupWindow: 'Today, 2:00 PM – 3:30 PM',
    status: 'Driver En Route',
    pickupTimestamp: 'Today, 2:10 PM'
  },
  {
    id: 'RT-2026-102',
    batchId: 'RES-2026-001',
    foodItem: 'Jeera Rice & Yellow Dal Tadka',
    quantity: '85 portions',
    pickup: 'Green Leaf Fine Dining & Banquets',
    destination: 'Seva Sahyog Food Security Network',
    driver: 'Anil Sen',
    vehicle: 'Mahindra Treo Zor EV (MP-04-EZ-4412)',
    distance: '2.8 km',
    eta: '8 mins',
    pickupWindow: 'Today, 4:00 PM – 5:00 PM',
    status: 'Pickup Assigned'
  }
];

interface RoutePickupPageProps {
  currentRole: 'kitchen' | 'ngo' | 'admin';
  currentPage: string;
  onNavigate: (page: string) => void;
  onRoleChange: (role: 'kitchen' | 'ngo' | 'admin') => void;
  onLogout: () => void;
}

export const RoutePickupPage: React.FC<RoutePickupPageProps> = ({
  currentRole,
  currentPage,
  onNavigate,
  onRoleChange,
  onLogout
}) => {
  const [routes, setRoutes] = useState<RouteItem[]>(INITIAL_ROUTES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const advanceStatus = (id: string) => {
    const statuses: RouteItem['status'][] = [
      'Pickup Assigned',
      'Driver En Route',
      'Arrived at Source',
      'Picked Up',
      'Delivered'
    ];

    setRoutes(routes.map(r => {
      if (r.id === id) {
        const currentIndex = statuses.indexOf(r.status);
        const nextStatus = statuses[Math.min(currentIndex + 1, statuses.length - 1)];
        
        let updateTimestamps = {};
        if (nextStatus === 'Picked Up') {
          updateTimestamps = { pickupTimestamp: 'Today, Just Now' };
        } else if (nextStatus === 'Delivered') {
          updateTimestamps = { deliveryTimestamp: 'Today, Just Now' };
        }

        showToast(`Route ${r.id} status updated to: ${nextStatus}`);
        return { ...r, status: nextStatus, ...updateTimestamps };
      }
      return r;
    }));
  };

  return (
    <DashboardLayout
      currentRole={currentRole}
      currentPage={currentPage}
      onNavigate={onNavigate}
      onRoleChange={onRoleChange}
      onLogout={onLogout}
    >
      <div className="space-y-6 relative">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 text-xs font-semibold animate-bounce">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                Logistics & Fleet
              </span>
              <span className="text-xs text-slate-400">• DEMO / SIMULATED ROUTE & ETA</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Route & Pickup Dispatch Center</h1>
            <p className="text-xs text-slate-600">Track EV transport units, manage pickup statuses, and generate verifiable delivery timestamps.</p>
          </div>

          <button
            onClick={() => onNavigate('food-passport')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <span>View Food Rescue Passport (Part 07 Ready)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Conceptual Telemetry Map Banner */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-lg min-h-[200px] flex flex-col justify-between">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-300">
              <Navigation className="w-3.5 h-3.5" />
              <span>Simulated EV Telemetry Map</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">Simulated GPS Ping: Active</span>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Active Fleet</p>
              <p className="text-xl font-bold text-white mt-1">12 EVs in Operation</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Average Simulated ETA</p>
              <p className="text-xl font-bold text-emerald-400 mt-1">11.8 Minutes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Cold Chain Temperature</p>
              <p className="text-xl font-bold text-white mt-1">4.2°C (Compliant)</p>
            </div>
          </div>
        </div>

        {/* Active Routes List */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Active Logistics & Dispatch Routes ({routes.length})</h3>

          <div className="space-y-4">
            {routes.map((rt) => (
              <div key={rt.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded">
                      {rt.id}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">Batch: {rt.batchId} • {rt.foodItem} ({rt.quantity})</h4>
                      <p className="text-xs text-slate-500">{rt.driver} • {rt.vehicle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      rt.status === 'Delivered' 
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                        : 'bg-blue-50 text-blue-800 border-blue-200'
                    }`}>
                      Status: {rt.status}
                    </span>
                    {rt.status !== 'Delivered' ? (
                      <button
                        onClick={() => advanceStatus(rt.id)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs flex items-center gap-1.5"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Advance Status →</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onNavigate('food-passport')}
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors border border-slate-200 flex items-center gap-1.5"
                      >
                        <span>View Food Passport →</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-slate-600">
                  <div>
                    <p className="text-slate-400 font-medium">Origin Food Source</p>
                    <p className="font-bold text-slate-900 mt-0.5">{rt.pickup}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium">Destination NGO</p>
                    <p className="font-bold text-slate-900 mt-0.5">{rt.destination}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium">Distance & Simulated ETA</p>
                    <p className="font-bold text-emerald-700 mt-0.5">{rt.distance} ({rt.eta})</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium">Pickup Window / Delivery Info</p>
                    <p className="font-bold text-slate-900 mt-0.5">
                      {rt.deliveryTimestamp ? `Delivered: ${rt.deliveryTimestamp}` : rt.pickupWindow}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <span>
            <strong>Disclaimer:</strong> Route optimization, ETA predictions, and GPS telemetry are simulated demonstration features for SIH 2026.
          </span>
        </div>
      </div>
    </DashboardLayout>
  );
};
