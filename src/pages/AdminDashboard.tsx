import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { MOCK_IMPACT_METRICS, MOCK_SURPLUS_BATCHES } from '../data/mockData';
import { 
  Building2, 
  HeartHandshake, 
  RefreshCw, 
  CheckCircle2, 
  BarChart3
} from 'lucide-react';

interface AdminDashboardProps {
  currentRole: 'kitchen' | 'ngo' | 'admin';
  currentPage: string;
  onNavigate: (page: string) => void;
  onRoleChange: (role: 'kitchen' | 'ngo' | 'admin') => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentRole,
  currentPage,
  onNavigate,
  onRoleChange,
  onLogout
}) => {
  const funnelSteps = [
    { label: 'Prepared', count: '1,425 Batches', pct: '100%' },
    { label: 'Surplus', count: '184 Batches', pct: '12.9%' },
    { label: 'Eligible', count: '172 Batches', pct: '93.4%' },
    { label: 'Matched', count: '168 Batches', pct: '97.6%' },
    { label: 'Picked Up', count: '165 Batches', pct: '98.2%' },
    { label: 'Delivered', count: '165 Batches', pct: '100%' }
  ];

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
                National Ecosystem Administrator Portal
              </span>
              <span className="text-xs text-slate-400">• Demo / Simulated Data</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">National Control Center</h1>
            <p className="text-xs text-slate-600">Real-time supervision of institutional kitchens, verified NGO networks, and recovery funnels.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('impact')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Impact Analytics</span>
            </button>
          </div>
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Kitchens', value: MOCK_IMPACT_METRICS.activeKitchens, change: 'All active nodes', icon: Building2, color: 'text-emerald-700 bg-emerald-50' },
            { label: 'Active NGOs', value: MOCK_IMPACT_METRICS.activeNGOs, change: 'Verified partners', icon: HeartHandshake, color: 'text-blue-700 bg-blue-50' },
            { label: 'Open Surplus', value: '18 Batches', change: 'Currently matching', icon: RefreshCw, color: 'text-amber-700 bg-amber-50' },
            { label: 'Recovered Food', value: MOCK_IMPACT_METRICS.foodRecovered, change: 'Avoided waste', icon: CheckCircle2, color: 'text-emerald-700 bg-emerald-50' },
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
                  <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">{stat.change}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recovery Funnel Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">National Recovery Funnel</h3>
              <p className="text-xs text-slate-500">End-to-end conversion from institutional preparation to verified rescue</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Conversion Rate: 97.4%
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
            {funnelSteps.map((step, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center space-y-1 relative">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                  Stage {idx + 1}
                </span>
                <p className="text-sm font-bold text-slate-900 mt-2">{step.label}</p>
                <p className="text-lg font-extrabold text-emerald-700">{step.count}</p>
                <p className="text-[10px] text-slate-500 font-medium">Conversion: {step.pct}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent System Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Active Surplus Batches</h3>
            <p className="text-xs text-slate-500">Live operational monitoring</p>

            <div className="space-y-3">
              {MOCK_SURPLUS_BATCHES.map((b) => (
                <div key={b.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{b.batchId} • {b.foodType}</p>
                    <p className="text-[10px] text-slate-500">{b.sourceKitchen}</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Operational Alerts & Compliance</h3>
            <p className="text-xs text-slate-500">Automated safety & SOP monitoring</p>

            <div className="space-y-3">
              {[
                { title: 'Cold-chain telemetry normal', time: '10 mins ago', type: 'success' },
                { title: 'New NGO partner verified: Hope Youth', time: '45 mins ago', type: 'info' },
                { title: 'AI Forecast batch adjustment completed', time: '2 hours ago', type: 'success' },
                { title: 'Temperature log verified for Sector 4 Kitchen', time: '3 hours ago', type: 'success' },
              ].map((alert, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium text-slate-800">{alert.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{alert.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
