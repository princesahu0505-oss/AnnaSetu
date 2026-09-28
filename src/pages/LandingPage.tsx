import React from 'react';
import { LandingNavbar } from '../components/navigation/LandingNavbar';
import { Logo } from '../components/brand/Logo';
import { 
  ArrowRight, 
  Cpu, 
  ShieldCheck, 
  TrendingUp, 
  Truck, 
  CheckCircle2, 
  Building2, 
  HeartHandshake, 
  Sparkles,
  Layers,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const steps = [
    { num: '01', title: 'Predict', desc: 'AI forecasts institutional demand based on historical data, weather, and attendance patterns.' },
    { num: '02', title: 'Prevent', desc: 'Real-time kitchen production recommendations adjust batch sizes before overcooking occurs.' },
    { num: '03', title: 'Rescue', desc: 'Surplus detection captures wholesome unserved food immediately with verifiable timestamps.' },
    { num: '04', title: 'Redistribute', desc: 'Intelligent matching pairs surplus batches with verified nearby NGOs and community shelters.' },
    { num: '05', title: 'Reuse', desc: 'Closed-loop tracking guarantees accountability, food safety compliance, and impact metrics.' },
  ];

  const loopNodes = [
    { label: 'Demand Signal', icon: TrendingUp },
    { label: 'Predict ML', icon: Cpu },
    { label: 'Prevent Waste', icon: ShieldCheck },
    { label: 'Surplus Detection', icon: Layers },
    { label: 'Eligibility Audit', icon: CheckCircle2 },
    { label: 'NGO Match', icon: HeartHandshake },
    { label: 'Route Plan', icon: Truck },
    { label: 'Rescue & Trace', icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      <LandingNavbar onNavigate={onNavigate} />

      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 py-20 lg:py-28 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Smart India Hackathon 2026 Prototype • AI Food Resource Network</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
            Turning Surplus Food Into <span className="text-emerald-700">Shared Value.</span>
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            AnnaSetu connects institutional kitchens, intelligent food planning, and food-rescue networks to help prevent avoidable waste and move eligible surplus where it can create immediate social value.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('role-selection')}
              className="px-6 py-3.5 rounded-xl text-white font-semibold shadow-md hover:opacity-95 transition-all flex items-center gap-2 text-base"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('ai-foodloop')}
              className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-all flex items-center gap-2 text-base border border-slate-200"
            >
              <Cpu className="w-5 h-5 text-emerald-700" />
              <span>Explore AI FoodLoop</span>
            </button>
          </div>

          <div className="pt-8 border-t border-slate-100 grid grid-cols-3 gap-6">
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-slate-900">1.4M+ kg</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Food Tracked (Demo)</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-emerald-700">97.4%</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Avoided Waste Rate</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-slate-900">48 Units</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Institutional Kitchens</p>
            </div>
          </div>
        </div>

        {/* Hero Visual Flow */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-50/80 via-slate-50 to-amber-50/50 p-8 rounded-3xl border border-emerald-100/80 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-emerald-200/30 rounded-full blur-2xl pointer-events-none" />
          
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-900 mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-700" />
            <span>AI FoodLoop Flow</span>
          </h3>

          <div className="space-y-3 relative">
            {[
              { label: 'Institutional Kitchen Production', sub: 'Demand Prediction Active', icon: Building2 },
              { label: 'AI FoodLoop Intelligence Layer', sub: 'Real-time surplus detection & matching', icon: Cpu },
              { label: 'Surplus Eligibility Audit', sub: 'Human verified + AI decision support', icon: CheckCircle2 },
              { label: 'NGO & Recipient Dispatch', sub: 'Optimized EV cold-chain routes', icon: Truck },
              { label: 'Circular Economy & Impact', sub: 'Verified QR Food Passport', icon: Sparkles }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3.5 relative z-10"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{item.label}</p>
                    <p className="text-xs text-slate-500 truncate">{item.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-50 py-20 px-6 lg:px-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full">
              Core Methodology
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mt-3">
              The Five Stages of Food Resilience
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              Designed for institutional scale. Rigorous operational controls paired with intelligent automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((st, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-extrabold text-emerald-700/30 font-mono">{st.num}</span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">{st.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{st.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                  <span>Stage {st.num} Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI FoodLoop Dedicated Highlight */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-3xl p-8 lg:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <Cpu className="w-96 h-96" />
          </div>

          <div className="max-w-3xl relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-300">
              <Cpu className="w-4 h-4" />
              <span>AI FoodLoop Intelligence Engine</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
              Predicting surplus before it becomes waste.
            </h2>

            <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
              AnnaSetu continuously aggregates demand signals, weather coefficients, and institutional dining patterns. When surplus is detected, our matching engine coordinates verified NGOs and optimized routing within minutes.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {loopNodes.slice(0, 5).map((node, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{node.label}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('ai-foodloop')}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl transition-all shadow-md flex items-center gap-2 text-sm"
              >
                <span>Launch Interactive AI FoodLoop</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Built for the Food Ecosystem Section */}
      <section className="bg-slate-50 py-20 px-6 lg:px-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full">
              Food Source Network
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mt-3">
              Built for the Food Ecosystem
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              AnnaSetu brings food-generating establishments into one resource and rescue network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Restaurants', desc: 'Fine dining, cafes, and commercial outlets with daily predictable surplus batches.' },
              { title: 'Hotels', desc: 'Hospitality establishments managing banquet and buffet surplus.' },
              { title: 'Institutional Kitchens', desc: 'Large-scale university, corporate, and campus mess facilities.' },
              { title: 'Hostels', desc: 'Student and working professional accommodation dining facilities.' },
              { title: 'Canteens', desc: 'Industrial township and public sector dining canteens.' },
              { title: 'Caterers', desc: 'Event and wedding catering services with late-night recovery needs.' }
            ].map((src, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <h3 className="font-bold text-lg text-slate-900">{src.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{src.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 lg:px-12 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo size="sm" variant="light" />
          </div>
          <p className="text-xs text-slate-500">
            © 2026 AnnaSetu Platform • Smart India Hackathon Prototype. Simulated Demo Data.
          </p>
          <div className="flex items-center gap-6 text-xs font-medium text-slate-400">
            <button onClick={() => onNavigate('login')} className="hover:text-white transition-colors">Sign In</button>
            <button onClick={() => onNavigate('role-selection')} className="hover:text-white transition-colors">Role Select</button>
            <button onClick={() => onNavigate('impact')} className="hover:text-white transition-colors">Impact Analytics</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
