import React from 'react';
import { Logo } from '../components/brand/Logo';
import { Building2, HeartHandshake, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';

interface RoleSelectionPageProps {
  onSelectRole: (role: 'kitchen' | 'ngo' | 'admin') => void;
  onNavigate: (page: string) => void;
}

export const RoleSelectionPage: React.FC<RoleSelectionPageProps> = ({ onSelectRole, onNavigate }) => {
  const roles = [
    {
      id: 'kitchen' as const,
      title: 'Institutional Kitchen Partner',
      badge: 'Production & Surplus',
      desc: 'Manage food planning, AI production forecasts, inventory health, batch preparation, and automated surplus detection.',
      icon: Building2,
      features: ['Demand Forecast & Prevention', 'Surplus Batch Logging', 'AI Decision Support']
    },
    {
      id: 'ngo' as const,
      title: 'NGO / Recipient Partner',
      badge: 'Collection & Distribution',
      desc: 'Discover eligible surplus food nearby, review quality and preparation windows, request pickups, and track active deliveries.',
      icon: HeartHandshake,
      features: ['Live Surplus Discovery', 'Instant Pickup Requests', 'QR Passport Verification']
    },
    {
      id: 'admin' as const,
      title: 'Ecosystem Administrator',
      badge: 'National Control',
      desc: 'Monitor national network operations, active kitchens, verified NGO partners, systemic recovery funnels, and cumulative impact analytics.',
      icon: ShieldAlert,
      features: ['Ecosystem Overview', 'Recovery Funnel Tracking', 'Simulated Impact Analytics']
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-6 py-12">
      <div className="max-w-5xl w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-block cursor-pointer" onClick={() => onNavigate('landing')}>
            <Logo size="lg" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Choose Your Operational Role</h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Select a portal to experience the AnnaSetu SIH 2026 prototype from the perspective of kitchen operators, NGOs, or administrators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.id}
                onClick={() => onSelectRole(r.id)}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-600 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                      {r.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">{r.title}</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{r.desc}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {r.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-800 group-hover:underline">Launch Dashboard</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={() => onNavigate('landing')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            ← Return to Landing Page
          </button>
        </div>
      </div>
    </div>
  );
};
