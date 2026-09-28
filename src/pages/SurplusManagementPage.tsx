import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useAppData } from '../context/AppDataContext';
import type { RescueBatch, RescueStatus, VerificationChecklist } from '../data/rescueBatches';
import { initialFoodSources } from '../data/foodSources';
import { 
  Plus, 
  X
} from 'lucide-react';

interface SurplusManagementPageProps {
  currentRole: 'kitchen' | 'ngo' | 'admin';
  currentPage: string;
  onNavigate: (page: string) => void;
  onRoleChange: (role: 'kitchen' | 'ngo' | 'admin') => void;
  onLogout: () => void;
}

export const SurplusManagementPage: React.FC<SurplusManagementPageProps> = ({
  currentRole,
  currentPage,
  onNavigate,
  onRoleChange,
  onLogout
}) => {
  const { state, dispatch } = useAppData();
  const batches = state.surplusBatches;
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<RescueBatch | null>(null);

  // Create Batch Form State
  const [foodItem, setFoodItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedSourceId, setSelectedSourceId] = useState(initialFoodSources[0].id);

  const handleCreateRescueBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const source = initialFoodSources.find(s => s.id === selectedSourceId);
    
    const newBatch: RescueBatch = {
      id: `res-${Date.now()}`,
      batchId: `RES-2026-${String(batches.length + 1).padStart(3, '0')}`,
      foodItem: foodItem,
      category: 'Prepared Meals',
      quantity: Number(quantity),
      unit: 'portions',
      mealPeriod: 'Lunch',
      preparedAt: 'Today, 01:00 PM',
      preparationDate: '2026-09-20',
      storageCondition: 'Hot Holding (>65°C)',
      pickupDeadline: 'Today, 07:00 PM',
      foodSourceId: selectedSourceId,
      foodSourceName: source?.name || 'Unknown',
      status: 'Detected',
      riskLevel: 'LOW',
      assessment: {
        status: 'ELIGIBILITY INDICATED',
        confidence: 92,
        reasoning: ['✓ Preparation timestamp recorded', '✓ Storage condition confirmed', '✓ Pickup deadline provided'],
        safetyDisclaimer: 'AI provides decision support only. Final food safety verification must be performed by an authorized human.'
      },
      verification: {
        prepTimeRecorded: false,
        storageConfirmed: false,
        temperatureChecked: false,
        appearanceChecked: false,
        packagingChecked: false,
        pickupWindowAcceptable: false
      },
      isDemo: true
    };

    dispatch({ type: 'ADD_SURPLUS_BATCH', payload: newBatch });
    setShowAddModal(false);
    setFoodItem('');
    setQuantity('');
  };

  const updateBatchStatus = (id: string, status: RescueStatus) => {
    dispatch({ type: 'UPDATE_SURPLUS_STATUS', payload: { id, status } });
    setSelectedBatch(prev => prev && prev.id === id ? {...prev, status} : prev);
  };


  const toggleVerification = (key: keyof VerificationChecklist) => {
    if (!selectedBatch) return;
    setSelectedBatch(prev => prev ? {
      ...prev,
      verification: { ...prev.verification, [key]: !prev.verification[key] }
    } : null);
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
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                Surplus Rescue Center
              </span>
              <span className="text-xs text-slate-400">• DEMO / SIMULATED</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Surplus Rescue Center</h1>
            <p className="text-xs text-slate-600">Convert potential surplus into verified rescue opportunities.</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Rescue Batch</span>
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { label: 'Potential Surplus', val: '420 portions' },
            { label: 'Rescue Batches', val: batches.length },
            { label: 'Under Review', val: batches.filter(b => b.status === 'Under Review').length },
            { label: 'Eligible', val: batches.filter(b => b.status === 'Eligible').length },
          ].map((m, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-[10px] text-slate-500 font-bold uppercase">{m.label}</p>
              <p className="text-lg font-bold text-slate-900 mt-1">{m.val}</p>
            </div>
          ))}
        </div>

        {/* Batches Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-6">Batch ID</th>
                <th className="py-3.5 px-6">Food</th>
                <th className="py-3.5 px-6">Quantity</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {batches.map(b => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-mono font-bold text-emerald-800">{b.batchId}</td>
                  <td className="py-4 px-6 font-medium text-slate-900">{b.foodItem}</td>
                  <td className="py-4 px-6">{b.quantity} {b.unit}</td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">{b.status}</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button onClick={() => setSelectedBatch(b)} className="text-emerald-700 font-bold hover:underline">View Audit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Create Batch Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
              <h2 className="text-lg font-bold">Create Rescue Batch</h2>
              <form onSubmit={handleCreateRescueBatch} className="space-y-3 text-xs">
                <input required type="text" placeholder="Food Item" value={foodItem} onChange={e => setFoodItem(e.target.value)} className="w-full p-2 border rounded" />
                <input required type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full p-2 border rounded" />
                <select onChange={e => setSelectedSourceId(e.target.value)} className="w-full p-2 border rounded">
                  {initialFoodSources.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 p-2 border rounded">Cancel</button>
                  <button type="submit" className="flex-1 p-2 bg-emerald-600 text-white rounded">Create Batch</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Review/Verification Modal */}
        {selectedBatch && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Audit: {selectedBatch.batchId}</h2>
                <button onClick={() => setSelectedBatch(null)}><X /></button>
              </div>
              
              {/* AI Assessment */}
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <h4 className="font-bold text-emerald-900">AI-Assisted Screening</h4>
                <p className="text-[11px] text-emerald-800">{selectedBatch.assessment.status}</p>
                <ul className="mt-2 space-y-1">
                  {selectedBatch.assessment.reasoning.map((r, i) => <li key={i} className="text-[10px] text-emerald-800">{r}</li>)}
                </ul>
              </div>

              {/* Human Verification */}
              <div className="space-y-3">
                <h4 className="font-bold">Human Verification</h4>
                {(Object.keys(selectedBatch.verification) as Array<keyof VerificationChecklist>).map(key => (
                  <label key={key} className="flex items-center gap-2 text-xs">
                    <input type="checkbox" checked={selectedBatch.verification[key]} onChange={() => toggleVerification(key)} />
                    {key}
                  </label>
                ))}
              </div>

              {selectedBatch.status === 'Eligible' && (
                <button onClick={() => onNavigate('ngo-matching')} className="w-full p-2 bg-blue-600 text-white rounded">Ready for NGO Matching</button>
              )}
              
              <div className="flex gap-2">
                <button onClick={() => updateBatchStatus(selectedBatch.id, 'Eligible')} className="flex-1 p-2 bg-emerald-600 text-white rounded">Mark Eligible</button>
                <button onClick={() => updateBatchStatus(selectedBatch.id, 'Not Eligible')} className="flex-1 p-2 bg-red-600 text-white rounded">Mark Not Eligible</button>
              </div>

              <p className="text-[10px] text-slate-500 border-t pt-2 italic">
                AnnaSetu uses AI-assisted rules and operational signals to support review. It does not certify food safety. Final eligibility must be determined by an authorized person following applicable food-safety procedures.
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
