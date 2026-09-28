import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { MOCK_PRODUCTION_PLAN, MOCK_DEMAND } from '../data/inventory';
import { 
  ChefHat, 
  TrendingUp, 
  AlertTriangle, 
  Sparkles, 
  PackageCheck,
  ChevronDown,
  X,
  CheckCircle,
  Building2
} from 'lucide-react';

interface KitchenDashboardProps {
  currentRole: 'kitchen' | 'ngo' | 'admin';
  currentPage: string;
  onNavigate: (page: string) => void;
  onRoleChange: (role: 'kitchen' | 'ngo' | 'admin') => void;
  onLogout: () => void;
}

export const KitchenDashboard: React.FC<KitchenDashboardProps> = ({
  currentRole,
  currentPage,
  onNavigate,
  onRoleChange,
  onLogout
}) => {
  const [productionPlan, setProductionPlan] = useState(MOCK_PRODUCTION_PLAN);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [selectedPlanItem, setSelectedPlanItem] = useState(productionPlan[0]);
  const [newPlannedQty, setNewPlannedQty] = useState(selectedPlanItem.plannedQuantity);
  const [adjustmentReason, setAdjustmentReason] = useState('Lower weekend demand forecast');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const totalProduction = productionPlan.reduce((acc, curr) => acc + curr.plannedQuantity, 0);
  const totalDemand = MOCK_DEMAND.total;
  const potentialSurplus = Math.max(0, totalProduction - totalDemand);
  const inventoryHealth = 92;

  const handleSaveAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    setProductionPlan(productionPlan.map(item => {
      if (item.id === selectedPlanItem.id) {
        const diff = Number(newPlannedQty) - item.expectedDemand;
        return {
          ...item,
          plannedQuantity: Number(newPlannedQty),
          difference: diff,
          status: diff > 50 ? 'Review' : 'On Track'
        };
      }
      return item;
    }));
    setShowAdjustModal(false);
    showToast('Production plan updated.');
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
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2 text-xs font-semibold animate-bounce">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Food Source Connection Banner */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">Current Food Source:</span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Campus Community Kitchen</span>
              </div>
              <p className="text-[10px] text-slate-500">Institutional Kitchen • Bhopal • Demo / Simulated Data</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('food-sources')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>Change Food Source</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Header Banner */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                Kitchen Overview
              </span>
              <span className="text-xs text-slate-400">• Demo / Simulated Data</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Kitchen Overview</h1>
            <p className="text-sm text-slate-600">Plan production, monitor inventory and identify potential surplus before it becomes avoidable waste.</p>
          </div>
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "TODAY'S PRODUCTION", value: `${totalProduction.toLocaleString()} meals`, sub: 'Demo / Simulated Data', icon: ChefHat, color: 'text-emerald-700 bg-emerald-50' },
            { label: 'EXPECTED DEMAND', value: `${totalDemand.toLocaleString()} meals`, sub: 'Demo / Simulated Data', icon: TrendingUp, color: 'text-blue-700 bg-blue-50' },
            { label: 'POTENTIAL SURPLUS', value: `${potentialSurplus} meals`, sub: 'Demo / Simulated Data', icon: AlertTriangle, color: 'text-amber-700 bg-amber-50' },
            { label: 'INVENTORY HEALTH', value: `${inventoryHealth}%`, sub: 'Demo / Simulated Data', icon: PackageCheck, color: 'text-emerald-700 bg-emerald-50' },
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
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">{stat.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI FoodLoop Recommendation Card */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-6 rounded-2xl shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">AI FoodLoop Recommendation</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-white/10 px-2.5 py-1 rounded-full text-emerald-300 font-semibold">Demo AI-assisted insight</span>
              <button
                onClick={() => onNavigate('ai-foodloop')}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
              >
                <span>Review AI Analysis</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-100">
              "Expected lunch demand is lower than the current production plan."
            </p>
            <p className="text-xs text-emerald-300 font-semibold">
              Recommended action: "Consider reducing the next production batch."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs">
            <div className="bg-white/5 p-3 rounded-xl">
              <span className="text-slate-400 text-[10px]">Expected Demand</span>
              <p className="font-bold text-white text-sm mt-0.5">1,120 meals</p>
            </div>
            <div className="bg-white/5 p-3 rounded-xl">
              <span className="text-slate-400 text-[10px]">Planned Production</span>
              <p className="font-bold text-white text-sm mt-0.5">1,250 meals</p>
            </div>
            <div className="bg-white/5 p-3 rounded-xl">
              <span className="text-slate-400 text-[10px]">Difference</span>
              <p className="font-bold text-amber-300 text-sm mt-0.5">130 meals</p>
            </div>
          </div>
        </div>

        {/* Demand Overview & Potential Surplus Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expected Demand Overview */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Expected Demand</h3>
              <span className="text-[10px] text-slate-400 font-semibold">Demo / Simulated Demand</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Breakfast</span>
                <p className="text-base font-bold text-slate-900 mt-1">{MOCK_DEMAND.breakfast} meals</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Lunch</span>
                <p className="text-base font-bold text-slate-900 mt-1">{MOCK_DEMAND.lunch} meals</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Dinner</span>
                <p className="text-base font-bold text-slate-900 mt-1">{MOCK_DEMAND.dinner} meals</p>
              </div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-900">Total Expected Demand:</span>
              <span className="font-bold text-emerald-900">{MOCK_DEMAND.total} meals</span>
            </div>
          </div>

          {/* Potential Surplus Alert & Comparison */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">Potential Surplus Detected</h3>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">2:30 PM Expected</span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div>
                  <span className="text-slate-500">Planned Production:</span>
                  <p className="font-bold text-slate-900 text-sm">1,250</p>
                </div>
                <div>
                  <span className="text-slate-500">Expected Demand:</span>
                  <p className="font-bold text-slate-900 text-sm">1,120</p>
                </div>
                <div>
                  <span className="text-slate-500">Potential Surplus:</span>
                  <p className="font-bold text-amber-600 text-sm">130 meals</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-500">Potential categories: Rice, Dal, Vegetable Curry</p>
            </div>
            <button
              onClick={() => onNavigate('surplus')}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors text-center"
            >
              Review Surplus →
            </button>
          </div>
        </div>

        {/* Today's Production Plan Table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Today's Production Plan</h3>
              <p className="text-xs text-slate-500">Item-wise batch breakdown and recommended adjustment</p>
            </div>
            <button
              onClick={() => setShowAdjustModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
            >
              Adjust Production
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Food Item</th>
                  <th className="px-4 py-3">Planned</th>
                  <th className="px-4 py-3">Expected Demand</th>
                  <th className="px-4 py-3">Recommended</th>
                  <th className="px-4 py-3">Difference</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {productionPlan.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-bold text-slate-900">{item.foodItem}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{item.plannedQuantity}</td>
                    <td className="px-4 py-3 text-slate-600">{item.expectedDemand}</td>
                    <td className="px-4 py-3 text-emerald-700 font-medium">{item.recommendedQuantity}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{item.difference > 0 ? `+${item.difference}` : item.difference}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.status === 'On Track' ? 'bg-emerald-100 text-emerald-800' :
                        item.status === 'Review' ? 'bg-amber-100 text-amber-800' :
                        item.status === 'Reduce' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Adjust Production Modal */}
        {showAdjustModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Adjust Production Plan</h3>
                <button onClick={() => setShowAdjustModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveAdjustment} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Food Item</label>
                  <select
                    value={selectedPlanItem.id}
                    onChange={(e) => {
                      const found = productionPlan.find(p => p.id === e.target.value);
                      if (found) {
                        setSelectedPlanItem(found);
                        setNewPlannedQty(found.plannedQuantity);
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-600 font-medium text-slate-800"
                  >
                    {productionPlan.map(p => (
                      <option key={p.id} value={p.id}>{p.foodItem} (Current: {p.plannedQuantity})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-slate-500">Current Planned Qty:</span>
                    <p className="font-bold text-slate-900 text-sm mt-0.5">{selectedPlanItem.plannedQuantity}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Recommended Qty:</span>
                    <p className="font-bold text-emerald-700 text-sm mt-0.5">{selectedPlanItem.recommendedQuantity}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">New Planned Quantity</label>
                  <input
                    type="number"
                    required
                    value={newPlannedQty}
                    onChange={(e) => setNewPlannedQty(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-600 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Reason for Adjustment</label>
                  <input
                    type="text"
                    required
                    value={adjustmentReason}
                    onChange={(e) => setAdjustmentReason(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAdjustModal(false)}
                    className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg font-semibold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-semibold text-white shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
