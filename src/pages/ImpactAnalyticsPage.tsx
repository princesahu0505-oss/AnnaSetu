import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { MOCK_IMPACT_METRICS } from '../data/mockData';
import { initialFoodSources } from '../data/foodSources';
import { INITIAL_NGOS } from '../data/ngos';
import { CIRCULAR_PATHWAYS } from '../data/circularEconomy';
import { 
  TrendingUp, ShieldCheck, Recycle, ArrowRight, 
  Layers, AlertTriangle, CheckCircle2, MapPin, Building2, HeartHandshake, Sparkles
} from 'lucide-react';

interface ImpactAnalyticsPageProps {
  currentRole: 'kitchen' | 'ngo' | 'admin';
  currentPage: string;
  onNavigate: (page: string) => void;
  onRoleChange: (role: 'kitchen' | 'ngo' | 'admin') => void;
  onLogout: () => void;
}

export const ImpactAnalyticsPage: React.FC<ImpactAnalyticsPageProps> = ({
  currentRole,
  currentPage,
  onNavigate,
  onRoleChange,
  onLogout
}) => {
  const [timeFilter, setTimeFilter] = useState<'today' | '7days' | '30days' | 'all'>('all');

  // Calculation engine values from demo data
  const potentialSurplusQty = 184200; // kg
  const recoveredQty = 142500; // kg
  const demoRecoveryRate = ((recoveredQty / potentialSurplusQty) * 100).toFixed(1);

  // Impact funnel values from demo data
  const totalPreparedQty = 1425890; // kg equivalent
  const rescueEligibleQty = 162000; // kg
  const ngoMatchedQty = 151200; // kg
  const pickedUpQty = 145000; // kg
  const deliveredQty = 142500; // kg

  // Root-cause demo data
  const rootCauses = [
    { category: 'Demand mismatch', count: 42, quantity: '65,200 kg', pct: '35.4%' },
    { category: 'Overproduction', count: 31, quantity: '48,100 kg', pct: '26.1%' },
    { category: 'Event cancellation', count: 18, quantity: '32,400 kg', pct: '17.6%' },
    { category: 'Preparation variance', count: 14, quantity: '21,500 kg', pct: '11.7%' },
    { category: 'Inventory expiry risk', count: 9, quantity: '17,000 kg', pct: '9.2%' },
  ];

  return (
    <DashboardLayout
      currentRole={currentRole}
      currentPage={currentPage}
      onNavigate={onNavigate}
      onRoleChange={onRoleChange}
      onLogout={onLogout}
    >
      <div className="space-y-8 pb-12">
        {/* Header with Demo Disclosure */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                Impact & Circular Economy Center
              </span>
              <span className="text-xs text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded font-bold">
                DEMO / SIMULATED DATA
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Impact & Circular Economy</h1>
            <p className="text-xs text-slate-600">
              Measure recovered food, operational outcomes and circular resource recovery across the AnnaSetu network.
            </p>
          </div>

          {/* Time Filter */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700">
            <button 
              onClick={() => setTimeFilter('today')}
              className={`px-3 py-1.5 rounded-lg transition-all ${timeFilter === 'today' ? 'bg-white shadow-sm text-slate-900 font-bold' : 'hover:text-slate-900'}`}
            >
              Today
            </button>
            <button 
              onClick={() => setTimeFilter('7days')}
              className={`px-3 py-1.5 rounded-lg transition-all ${timeFilter === '7days' ? 'bg-white shadow-sm text-slate-900 font-bold' : 'hover:text-slate-900'}`}
            >
              7 Days
            </button>
            <button 
              onClick={() => setTimeFilter('30days')}
              className={`px-3 py-1.5 rounded-lg transition-all ${timeFilter === '30days' ? 'bg-white shadow-sm text-slate-900 font-bold' : 'hover:text-slate-900'}`}
            >
              30 Days
            </button>
            <button 
              onClick={() => setTimeFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${timeFilter === 'all' ? 'bg-white shadow-sm text-slate-900 font-bold' : 'hover:text-slate-900'}`}
            >
              All Demo Data
            </button>
          </div>
        </div>

        {/* Top Impact Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Food Prepared', value: MOCK_IMPACT_METRICS.foodPrepared, icon: Layers, color: 'text-blue-600 bg-blue-50' },
            { label: 'Potential Surplus', value: MOCK_IMPACT_METRICS.potentialSurplus, icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
            { label: 'Food Recovered', value: MOCK_IMPACT_METRICS.foodRecovered, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'Food Delivered', value: MOCK_IMPACT_METRICS.mealsEquivalent, icon: HeartHandshake, color: 'text-purple-600 bg-purple-50' },
            { label: 'Avoided Waste Rate', value: MOCK_IMPACT_METRICS.avoidedWaste, icon: TrendingUp, color: 'text-indigo-600 bg-indigo-50' },
            { label: 'Active Food Sources', value: MOCK_IMPACT_METRICS.activeKitchens, icon: Building2, color: 'text-cyan-600 bg-cyan-50' },
            { label: 'Active NGOs', value: MOCK_IMPACT_METRICS.activeNGOs, icon: MapPin, color: 'text-rose-600 bg-rose-50' },
            { label: 'Completed Rescues', value: '1,540 Batches', icon: ShieldCheck, color: 'text-teal-600 bg-teal-50' },
          ].map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">{m.label}</span>
                  <div className={`p-2 rounded-xl ${m.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{m.value}</p>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded mt-1 inline-block">
                    DEMO / SIMULATED DATA
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Impact Funnel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Ecosystem Impact Funnel</h3>
              <p className="text-xs text-slate-500">Visualizing how food moves through the AnnaSetu operational stages.</p>
            </div>
            <span className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded">
              DEMO / SIMULATED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 pt-2">
            {[
              { label: 'Prepared', count: `${totalPreparedQty.toLocaleString()} kg`, desc: 'Total production', width: '100%' },
              { label: 'Potential Surplus', count: `${potentialSurplusQty.toLocaleString()} kg`, desc: 'Identified surplus', width: '85%' },
              { label: 'Rescue Eligible', count: `${rescueEligibleQty.toLocaleString()} kg`, desc: 'Passed AI safety check', width: '70%' },
              { label: 'NGO Matched', count: `${ngoMatchedQty.toLocaleString()} kg`, desc: 'Assigned to partners', width: '60%' },
              { label: 'Picked Up', count: `${pickedUpQty.toLocaleString()} kg`, desc: 'EV fleet transit', width: '50%' },
              { label: 'Delivered', count: `${deliveredQty.toLocaleString()} kg`, desc: 'Successfully served', width: '42%' },
            ].map((step, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between space-y-2 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400">STAGE 0{idx + 1}</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{step.label}</h4>
                  <p className="text-lg font-extrabold text-slate-900 mt-1">{step.count}</p>
                </div>
                <p className="text-[10px] text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Calculation Engine */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">Impact Calculation Engine</h3>
              <p className="text-xs text-slate-500">Deterministic prototype calculations based on demo operational datasets.</p>
            </div>
            <span className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded">
              Prototype Recovery Rate: {demoRecoveryRate}%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-700 block">Potential Surplus Formula</span>
              <p className="text-slate-600">Prepared Quantity − Expected Demand</p>
              <p className="text-slate-900 font-extrabold pt-1">Result: 184,200 kg</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-700 block">Recovered Food Formula</span>
              <p className="text-slate-600">Eligible Batches Successfully Delivered</p>
              <p className="text-slate-900 font-extrabold pt-1">Result: 142,500 kg</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-700 block">Recovery Rate Formula</span>
              <p className="text-slate-600">(Recovered Food ÷ Potential Surplus) × 100</p>
              <p className="text-emerald-700 font-extrabold pt-1">Result: {demoRecoveryRate}% (Demo Efficiency)</p>
            </div>
          </div>
        </div>

        {/* 3 Columns: Social, Environmental, Economic Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Social Impact */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">Social Impact</h3>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Community
                </span>
              </div>
              <p className="text-xs text-slate-600">Summary of redistribution milestones and recipient engagement.</p>

              <div className="space-y-2 pt-2 text-xs">
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-600">Rescue Batches Completed</span>
                  <span className="font-bold text-slate-900">1,540 Batches</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-600">Portions / Units Delivered</span>
                  <span className="font-bold text-slate-900">3.82 Million Meals</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-600">Recipient Organizations</span>
                  <span className="font-bold text-slate-900">32 Verified NGOs</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-600">Participating Food Sources</span>
                  <span className="font-bold text-slate-900">48 Kitchens & Hotels</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 mt-4">
              <span className="font-bold block mb-0.5">Beneficiary Note</span>
              Beneficiary estimation can be integrated in a future production deployment.
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">Environmental Impact</h3>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Sustainability
                </span>
              </div>
              <p className="text-xs text-slate-600">Resource recovery and avoided landfill waste indicators.</p>

              <div className="space-y-2 pt-2 text-xs">
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-600">Food Waste Diverted</span>
                  <span className="font-bold text-slate-900">142,500 kg</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-600">Organic Waste Routed</span>
                  <span className="font-bold text-slate-900">18,400 kg (Compost/Feed)</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-600">Estimated Avoided Emissions</span>
                  <span className="font-bold text-slate-900">356.8 tCO2e</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-600">Prototype Conversion Factor</span>
                  <span className="font-bold text-slate-900">2.5 kg CO2e / kg food</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-900 mt-4">
              <span className="font-bold block mb-0.5">Prototype estimate</span>
              Calculated as Recovered Food × configurable conversion factor. Future integration: full lifecycle impact factors.
            </div>
          </div>

          {/* Economic Impact */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">Economic Impact</h3>
                <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                  DEMO / SIMULATED
                </span>
              </div>
              <p className="text-xs text-slate-600">Illustrative metrics regarding recovery value and efficiency.</p>

              <div className="space-y-2 pt-2 text-xs">
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-600">Estimated Value Recovered</span>
                  <span className="font-bold text-slate-900">₹71.25 Lakhs</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-600">Potential Waste-Cost Reduction</span>
                  <span className="font-bold text-slate-900">12.4% avg. savings</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-600">Logistics Efficiency</span>
                  <span className="font-bold text-slate-900">96.8% On-time</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-600">Assumed Unit Value</span>
                  <span className="font-bold text-slate-900">₹50 / meal equivalent</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 mt-4">
              <span className="font-bold block mb-0.5">Disclaimer</span>
              Illustrative prototype calculation — not measured financial savings.
            </div>
          </div>
        </div>

        {/* Waste Root-Cause Analytics & AI FoodLoop Connection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Root-Cause Analytics */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Why Food Becomes Surplus</h3>
                <p className="text-xs text-slate-500">Root-cause breakdown across AnnaSetu kitchens.</p>
              </div>
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
                Prototype Analytics
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {rootCauses.map((rc, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{rc.category}</span>
                    <span className="font-bold text-emerald-800">{rc.quantity} ({rc.pct})</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: rc.pct }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI FoodLoop Connection */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-bold text-slate-900">AI FoodLoop → Impact Connection</h3>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                  Workflow
                </span>
              </div>
              <p className="text-xs text-slate-600">
                How predictive decision support connects prevention and rescue to measurable outcomes.
              </p>

              {/* Funnel chain */}
              <div className="space-y-2 pt-2">
                {[
                  { step: '01', title: 'AI Demand Forecast', desc: 'Predicting headcounts & meal requirements' },
                  { step: '02', title: 'Production Adjustment', desc: 'Optimizing cooking quantities to lower surplus risk' },
                  { step: '03', title: 'Surplus Identification', desc: 'Detecting wholesome excess safely' },
                  { step: '04', title: 'Rescue & Redistribution', desc: 'Matching with verified NGOs and dispatching transit' },
                  { step: '05', title: 'Measured Impact', desc: 'Recording carbon, food, and social milestones' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-lg">
                      {item.step}
                    </span>
                    <div>
                      <span className="font-bold text-slate-800 block">{item.title}</span>
                      <span className="text-slate-500 text-[11px]">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-900 mt-4">
              <span className="font-bold block mb-0.5">Prototype AI-assisted decision support</span>
              Do not claim measured AI effectiveness. All AI signals are simulated demonstration insights.
            </div>
          </div>
        </div>

        {/* Circular Economy Center */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <Recycle className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-900">Circular Economy Center</h3>
              </div>
              <p className="text-xs text-slate-500">
                Food that cannot be redistributed enters appropriate recovery pathways subject to rules and authorized handling.
              </p>
            </div>
            <span className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded">
              Potential Pathways
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CIRCULAR_PATHWAYS.map((path) => (
              <div key={path.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                      {path.status}
                    </span>
                    {path.futureCapability && (
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        Future Integration
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{path.name}</h4>
                  <p className="text-xs text-slate-600">{path.description}</p>
                </div>
                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700 block">Criteria:</span>
                  {path.eligibilityCriteria}
                </div>
              </div>
            ))}
          </div>

          {/* Circular Routing Diagram Flow */}
          <div className="p-5 bg-slate-950 text-white rounded-2xl space-y-4">
            <h4 className="text-sm font-bold text-emerald-400">Circular Routing & Recovery Flow</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 block">01. Food Surplus Detected</span>
                <p className="text-slate-400">Prepared excess recorded in AnnaSetu surplus management module.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 block">02. Eligibility Assessment</span>
                <p className="text-slate-400">Safety checklist & AI screening determines compliance category.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 block">03. Routed Pathway</span>
                <p className="text-slate-400">Redistribution to NGO, Animal Feed, or Composting based on rules.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Food Source Impact Table & NGO Impact Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Food Source Impact */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Impact by Food Source</h3>
              <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                DEMO / SIMULATED
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="pb-3 font-semibold">Food Source</th>
                    <th className="pb-3 font-semibold">Production</th>
                    <th className="pb-3 font-semibold">Recovered</th>
                    <th className="pb-3 font-semibold">Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {initialFoodSources.map((source) => (
                    <tr key={source.id} className="hover:bg-slate-50">
                      <td className="py-3 font-medium text-slate-900">{source.name}</td>
                      <td className="py-3 text-slate-600">{source.analytics.productionVolume}</td>
                      <td className="py-3 font-bold text-emerald-700">{source.analytics.rescuedFood}</td>
                      <td className="py-3 text-slate-800">92.5%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* NGO Impact */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Impact by NGO Partner</h3>
              <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                DEMO / SIMULATED
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="pb-3 font-semibold">NGO Organization</th>
                    <th className="pb-3 font-semibold">Type</th>
                    <th className="pb-3 font-semibold">Completed Rescues</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {INITIAL_NGOS.map((ngo) => (
                    <tr key={ngo.id} className="hover:bg-slate-50">
                      <td className="py-3 font-medium text-slate-900">{ngo.name}</td>
                      <td className="py-3 text-slate-600">{ngo.organizationType}</td>
                      <td className="py-3 font-bold text-slate-900">{ngo.completedRescues} batches</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {ngo.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Insight Cards & Prevention Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Prototype Insights */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Ecosystem Prototype Insights</h3>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                Analytics
              </span>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 block">Highest surplus category: Prepared Meals & Rice</span>
                <p className="text-slate-600">Accounting for ~42% of total recorded surplus across institutional kitchens.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 block">Food source with most recovered quantity: MANIT Campus Mess</span>
                <p className="text-slate-600">Recorded 1,500 meals/wk redistributed successfully to nearby shelter partners.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 block">Most common surplus cause: Demand Mismatch</span>
                <p className="text-slate-600">Friday and Saturday banquets show highest attendance variance.</p>
              </div>
            </div>
          </div>

          {/* Prevention Recommendations */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Prevention Recommendations</h3>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                Action Plan
              </span>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1 text-emerald-900">
                <span className="font-bold block">Review production quantities against demand forecast</span>
                <p className="text-emerald-800">Apply AI production reduction before cooking phase begins on high-variance days.</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1 text-emerald-900">
                <span className="font-bold block">Prioritize FEFO inventory handling</span>
                <p className="text-emerald-800">Ensure ingredients with under 48 hours expiry are utilized first in daily prep.</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1 text-emerald-900">
                <span className="font-bold block">Review pickup windows & route planning</span>
                <p className="text-emerald-800">Pre-match surplus with NGO partners 60 minutes before batch closure to maintain transit efficiency.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Traceability Connection & Disclaimers */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-emerald-400">Source-to-Impact Traceability</h3>
              <p className="text-xs text-slate-300">
                Verify individual rescue journeys, safety certifications, and chain of custody using Food Passports.
              </p>
            </div>
            <button
              onClick={() => onNavigate('food-passport')}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition-all flex items-center gap-2 shadow-sm"
            >
              <span>View Food Passport</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] text-slate-300">
            <div className="space-y-2">
              <span className="font-bold text-white block">Circular Economy Disclaimer</span>
              <p>
                "AnnaSetu presents potential circular pathways for prototype demonstration. Actual reuse, feed, composting, energy recovery and disposal decisions must follow applicable food-safety, environmental and regulatory requirements."
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-bold text-white block">Demo Data Disclosure</span>
              <p>
                "All impact values shown in this prototype are DEMO / SIMULATED DATA and do not represent measured real-world results."
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
