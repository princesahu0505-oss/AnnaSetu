import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { 
  Cpu, 
  TrendingUp, 
  AlertTriangle, 
  PackageCheck, 
  Sliders,
  CheckCircle2,
  Info,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { 
  MOCK_AI_OVERVIEW, 
  MOCK_AI_DEMAND_FORECASTS, 
  MOCK_PRODUCTION_RECOMMENDATIONS, 
  MOCK_SURPLUS_RISKS, 
  MOCK_AI_RECOMMENDATIONS, 
  MOCK_PIPELINE_STAGES 
} from '../data/aiFoodLoop';

interface AiFoodLoopPageProps {
  currentRole: 'kitchen' | 'ngo' | 'admin';
  currentPage: string;
  onNavigate: (page: string) => void;
  onRoleChange: (role: 'kitchen' | 'ngo' | 'admin') => void;
  onLogout: () => void;
}

export const AiFoodLoopPage: React.FC<AiFoodLoopPageProps> = ({
  currentRole,
  currentPage,
  onNavigate,
  onRoleChange,
  onLogout
}) => {
  const [productionPlan, setProductionPlan] = useState(MOCK_PRODUCTION_RECOMMENDATIONS);
  const [selectedRecommendation, setSelectedRecommendation] = useState(MOCK_AI_RECOMMENDATIONS[0]);
  const [simDemand, setSimDemand] = useState(520);
  const [simProd, setSimProd] = useState(600);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const applyRecommendation = (id: string, foodItem: string) => {
    setProductionPlan(prev => prev.filter(p => p.id !== id));
    setToastMessage(`Production recommendation applied for ${foodItem}. Plan updated.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const simDiff = simProd - simDemand;
  const simRisk = simDiff > 100 ? 'HIGH' : simDiff > 0 ? 'MEDIUM' : 'LOW';

  return (
    <DashboardLayout
      currentRole={currentRole}
      currentPage={currentPage}
      onNavigate={onNavigate}
      onRoleChange={onRoleChange}
      onLogout={onLogout}
    >
      <div className="space-y-8 pb-12">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Header Banner */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                DEMO / SIMULATED AI
              </span>
              <span className="text-xs text-slate-400">• AI Signal Strength: 94.8%</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">AI FoodLoop Intelligence</h1>
            <p className="text-sm text-slate-600">AI-assisted decision support for demand, production and surplus prevention.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('overview')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span>Kitchen Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* AI Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Demand Forecast', value: MOCK_AI_OVERVIEW.demandConfidence, icon: TrendingUp, target: 'overview' },
            { label: 'Production Recommendation', value: MOCK_AI_OVERVIEW.productionOptimization, icon: Cpu, target: 'overview' },
            { label: 'Surplus Risk', value: MOCK_AI_OVERVIEW.surplusRiskIndex, icon: AlertTriangle, target: 'surplus' },
            { label: 'Waste Prevention', value: MOCK_AI_OVERVIEW.wastePreventionRate, icon: PackageCheck, target: 'impact' },
          ].map((item, i) => (
            <div 
              key={i} 
              onClick={() => onNavigate(item.target)}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2 cursor-pointer hover:border-emerald-500 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">{item.label}</span>
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                  <item.icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-lg font-bold text-slate-900">{item.value}</p>
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">View module →</span>
            </div>
          ))}
        </div>

        {/* Demand Forecasting Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Demand Forecasting & AI Signals</h2>
              <p className="text-xs text-slate-500">Simulated predictions across meal periods and categories</p>
            </div>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
              Meal Periods: Breakfast, Lunch, Dinner
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 border-b border-slate-100 uppercase bg-slate-50/50">
                <tr>
                  <th className="py-3 px-3">Meal Period & Category</th>
                  <th className="py-3 px-3">Current Plan</th>
                  <th className="py-3 px-3">Expected Demand</th>
                  <th className="py-3 px-3">AI Signal</th>
                  <th className="py-3 px-3">Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_AI_DEMAND_FORECASTS.map(df => (
                  <tr key={df.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">{df.category}</div>
                      <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">{df.mealPeriod}</span>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-700">{df.currentPlan}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">{df.expectedDemand}</td>
                    <td className="py-3 px-3">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                        {df.aiSignal}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-xs text-slate-600 max-w-xs">{df.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Production Recommendation Engine */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">AI Production Recommendations</h2>
              <p className="text-xs text-slate-500">Optimized batch quantities to prevent avoidable surplus</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              Interactive State Sync
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 border-b border-slate-100 uppercase bg-slate-50/50">
                <tr>
                  <th className="py-3 px-3">Food Item</th>
                  <th className="py-3 px-3">Planned Quantity</th>
                  <th className="py-3 px-3">Expected Demand</th>
                  <th className="py-3 px-3">Recommended</th>
                  <th className="py-3 px-3">Difference</th>
                  <th className="py-3 px-3">AI Recommendation</th>
                  <th className="py-3 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {productionPlan.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-xs text-slate-500">
                      All production recommendations have been applied.
                    </td>
                  </tr>
                ) : (
                  productionPlan.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-semibold text-slate-900">{p.foodItem}</td>
                      <td className="py-3 px-3">{p.plannedQuantity}</td>
                      <td className="py-3 px-3">{p.expectedDemand}</td>
                      <td className="py-3 px-3 font-bold text-emerald-700">{p.recommendedQuantity}</td>
                      <td className="py-3 px-3 font-semibold text-amber-700">{p.difference}</td>
                      <td className="py-3 px-3 text-xs text-slate-600 max-w-xs">{p.aiRecommendation}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => applyRecommendation(p.id, p.foodItem)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors"
                          >
                            Apply
                          </button>
                          <button 
                            onClick={() => onNavigate('overview')}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                          >
                            Review
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Surplus Risk Prediction Monitor */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Surplus Risk Monitor</h2>
              <p className="text-xs text-slate-500">Early detection of potential surplus and risk classification</p>
            </div>
            <button
              onClick={() => onNavigate('surplus')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Open Surplus Management →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MOCK_SURPLUS_RISKS.map(sr => {
              const riskColor = sr.riskLevel === 'HIGH' ? 'bg-red-100 text-red-800 border-red-200' : sr.riskLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200';
              return (
                <div key={sr.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{sr.foodItem}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${riskColor}`}>
                      {sr.riskLevel} RISK
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200/60">
                    <div>Demand: <strong className="text-slate-900">{sr.expectedDemand || 'N/A'}</strong></div>
                    <div>Planned: <strong className="text-slate-900">{sr.plannedProduction || 'N/A'}</strong></div>
                    <div>Surplus: <strong className="text-amber-700">+{sr.potentialSurplus}</strong></div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{sr.reason}</p>
                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-emerald-700">{sr.recommendedAction}</span>
                    <button onClick={() => onNavigate('surplus')} className="text-slate-700 font-bold hover:underline">Review →</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* What-If Simulator */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-600" /> AI What-If Simulator
              </h2>
              <p className="text-xs text-slate-500">Test how changes in demand or production affect potential surplus and risk levels.</p>
            </div>
            <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded font-medium">
              Prototype simulation — not a trained predictive model
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-5 bg-slate-50 p-5 rounded-xl border border-slate-100">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">Expected Demand</span>
                  <span className="text-emerald-700 font-bold">{simDemand} meals</span>
                </div>
                <input 
                  type="range" 
                  min="200" 
                  max="1200" 
                  step="10"
                  value={simDemand} 
                  onChange={(e) => setSimDemand(Number(e.target.value))} 
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" 
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">Production Quantity</span>
                  <span className="text-blue-700 font-bold">{simProd} meals</span>
                </div>
                <input 
                  type="range" 
                  min="200" 
                  max="1200" 
                  step="10"
                  value={simProd} 
                  onChange={(e) => setSimProd(Number(e.target.value))} 
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                />
              </div>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Simulation Output</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${simRisk === 'HIGH' ? 'bg-red-500 text-white' : simRisk === 'MEDIUM' ? 'bg-amber-500 text-slate-900' : 'bg-emerald-500 text-slate-900'}`}>
                  {simRisk} RISK
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400">Demand</span>
                  <p className="text-lg font-bold text-white">{simDemand}</p>
                </div>
                <div>
                  <span className="text-slate-400">Production</span>
                  <p className="text-lg font-bold text-white">{simProd}</p>
                </div>
                <div>
                  <span className="text-slate-400">Potential Surplus</span>
                  <p className="text-lg font-bold text-amber-300">+{simDiff > 0 ? simDiff : 0}</p>
                </div>
                <div>
                  <span className="text-slate-400">Potential Shortfall</span>
                  <p className="text-lg font-bold text-red-400">{simDiff < 0 ? Math.abs(simDiff) : 0}</p>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 italic pt-2 border-t border-slate-800">
                {simDiff > 0 
                  ? `Production exceeds demand by ${simDiff} meals. Recommended action: reduce batch or route to NGO.` 
                  : simDiff < 0 
                  ? `Demand exceeds production by ${Math.abs(simDiff)} meals. Recommended action: increase preparation.` 
                  : `Production and demand are perfectly balanced.`}
              </p>
            </div>
          </div>
        </div>

        {/* AI Recommendations & Explainable AI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">FoodLoop AI Recommendations</h3>
            <div className="space-y-3">
              {MOCK_AI_RECOMMENDATIONS.map(r => (
                <div 
                  key={r.id} 
                  onClick={() => setSelectedRecommendation(r)} 
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedRecommendation.id === r.id ? 'border-emerald-600 bg-emerald-50/50 shadow-xs' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">{r.category}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${r.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>{r.priority} Priority</span>
                  </div>
                  <p className="font-bold text-slate-900 text-sm">{r.title}</p>
                  <p className="text-xs text-slate-600 mt-1">{r.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Info className="w-5 h-5 text-emerald-600"/> Why did AI recommend this?
                </h3>
                <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  Explainable demo logic
                </span>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">Selected Insight:</p>
                <p className="text-sm font-semibold text-slate-900">"{selectedRecommendation.title}"</p>
                <p className="text-xs text-slate-600">{selectedRecommendation.explanation}</p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">Contributing Factors:</p>
                <ul className="space-y-2 text-xs text-slate-600">
                  {selectedRecommendation.explainableFactors.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button 
              onClick={() => onNavigate(selectedRecommendation.actionTarget)} 
              className="w-full mt-4 bg-emerald-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>{selectedRecommendation.actionText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AI Pipeline Visualization */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">AI Pipeline Architecture</h3>
            <span className="text-xs text-slate-400">Food Source → Inventory → Demand → AI Analysis → Production → Surplus → Rescue</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 pt-2">
            {MOCK_PIPELINE_STAGES.map((s, i) => (
              <div 
                key={i} 
                onClick={() => onNavigate(s.target)}
                className="bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-300 border border-slate-200/80 p-3.5 rounded-xl text-xs space-y-2 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                    {s.step}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Active</span>
                </div>
                <div>
                  <p className="font-bold text-slate-900">{s.title}</p>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{s.desc}</p>
                </div>
                <div className="pt-2 border-t border-slate-200/60 text-[10px] text-emerald-700 font-semibold">
                  Open module →
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Honesty Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-bold">Demo / Simulated AI Notice:</strong>
            <p className="leading-relaxed">
              All AI predictions, confidence ratings, and surplus risk classifications are simulated for prototype demonstration purposes (SIH 2026). They do not represent real-world machine learning accuracy, live institutional data, or certified food safety validations.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
