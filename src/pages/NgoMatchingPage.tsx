import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useAppData } from '../context/AppDataContext';
import { 
  ShieldAlert,
  ArrowRight,
  CheckCircle,
  Truck
} from 'lucide-react';

interface NgoMatchingPageProps {
  currentRole: 'kitchen' | 'ngo' | 'admin';
  currentPage: string;
  onNavigate: (page: string) => void;
  onRoleChange: (role: 'kitchen' | 'ngo' | 'admin') => void;
  onLogout: () => void;
}

export const NgoMatchingPage: React.FC<NgoMatchingPageProps> = ({
  currentRole,
  currentPage,
  onNavigate,
  onRoleChange,
  onLogout
}) => {
  const { state, dispatch } = useAppData();
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const eligibleBatches = state.surplusBatches.filter(b => b.status === 'Eligible' || b.status === 'Matched');
  const selectedBatch = eligibleBatches.find(b => b.id === selectedBatchId) || eligibleBatches[0];

  const handleSelectNgo = (batchId: string, ngoName: string, ngoId: string) => {
    dispatch({ type: 'UPDATE_SURPLUS_STATUS', payload: { id: batchId, status: 'Matched' } });
    
    // Create new match record
    dispatch({
      type: 'ADD_MATCH_RECORD',
      payload: {
        id: `match-${Date.now()}`,
        batchId: batchId,
        ngoId: ngoId,
        ngoName: ngoName,
        matchScore: 98,
        matchedAt: 'Today, Just Now',
        logisticsStatus: 'Pickup Assigned',
        factors: {
          categoryMatch: true,
          capacityAvailable: true,
          withinDistance: true,
          windowCompatible: true
        },
        isDemo: true
      }
    });
    
    showToast(`Successfully matched batch ${batchId} with ${ngoName}! Pickup assigned.`);
  };

  // Build a map of matches from state.matchRecords
  const matchedMap: Record<string, { ngoId: string; ngoName: string; status: string }> = {};
  state.matchRecords.forEach(m => {
    // If there are multiple match records for the same batch, the latest one is used
    matchedMap[m.batchId] = {
      ngoId: m.ngoId,
      ngoName: m.ngoName,
      status: m.logisticsStatus
    };
  });


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
                NGO Matching Center
              </span>
              <span className="text-xs text-slate-400">• DEMO / SIMULATED</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Intelligent NGO & Recipient Pairing</h1>
            <p className="text-xs text-slate-600">Match verified surplus food with suitable recipient organizations using prototype heuristics.</p>
          </div>

          <button
            onClick={() => onNavigate('routes')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <span>View Active Routes & Dispatch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Rescue Pipeline Tracker */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Rescue Pipeline Status</p>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
            {['Eligible', 'NGO Matched', 'Pickup Assigned', 'Driver En Route', 'Picked Up', 'Delivered'].map((stage, idx) => (
              <div key={idx} className={`p-3 rounded-xl border ${idx <= 2 ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-bold' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                <p className="text-[10px] opacity-70">Step 0{idx + 1}</p>
                <p className="mt-0.5">{stage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Eligible Batches & Matching Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Eligible Rescue Batches ({eligibleBatches.length})</h3>
            <div className="space-y-3">
              {eligibleBatches.map(b => {
                const matchInfo = matchedMap[b.id];
                const isSelected = selectedBatch?.id === b.id;
                return (
                  <div 
                    key={b.id} 
                    onClick={() => setSelectedBatchId(b.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${isSelected ? 'border-emerald-600 bg-emerald-50/70 shadow-xs' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-emerald-800">{b.batchId}</span>
                      {matchInfo ? (
                        <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                          {matchInfo.status}
                        </span>
                      ) : (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                          Ready for Match
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{b.foodItem}</p>
                      <p className="text-xs text-slate-500">{b.quantity} {b.unit} • Source: {b.foodSourceName}</p>
                    </div>
                    <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200/60 flex items-center justify-between">
                      <span>Deadline: {b.pickupDeadline}</span>
                      {matchInfo && <strong className="text-slate-800">NGO: {matchInfo.ngoName}</strong>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended NGO Matches */}
          <div className="lg:col-span-2 space-y-4">
            {selectedBatch ? (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      Prototype Match Analysis
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">Recommended NGOs for {selectedBatch.batchId}</h3>
                    <p className="text-xs text-slate-500">Food Item: <strong className="text-slate-800">{selectedBatch.foodItem} ({selectedBatch.quantity} {selectedBatch.unit})</strong></p>
                  </div>
                  {matchedMap[selectedBatch.id] && (
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl text-xs text-blue-900 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <p className="font-bold">Assigned to: {matchedMap[selectedBatch.id].ngoName}</p>
                        <p className="text-[10px] text-blue-700">Status: {matchedMap[selectedBatch.id].status}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {state.ngos.map(ngo => {
                    const isMatched = matchedMap[selectedBatch.id]?.ngoId === ngo.id;
                    return (
                      <div key={ngo.id} className={`p-5 rounded-2xl border transition-all space-y-3 ${isMatched ? 'border-emerald-600 bg-emerald-50/50' : 'border-slate-200 bg-slate-50/50'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-900 text-base">{ngo.name}</h4>
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                                98% Prototype Match Score
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">{ngo.organizationType} • {ngo.address}</p>
                          </div>
                          
                          <button
                            onClick={() => handleSelectNgo(selectedBatch.id, ngo.name, ngo.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-colors ${isMatched ? 'bg-emerald-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
                          >
                            {isMatched ? 'Pickup Assigned ✓' : 'Select NGO & Assign'}
                          </button>
                        </div>

                        {/* Explainable Matching Factors */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px]">
                          <div className="bg-white p-2 rounded-lg border border-slate-200/60 flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Food Compatibility ✓</span>
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-slate-200/60 flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Capacity Available ({ngo.availableCapacity} max)</span>
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-slate-200/60 flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Distance ({ngo.distanceKm} km)</span>
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-slate-200/60 flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>ETA ({ngo.estimatedTravelMinutes} mins)</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-2xl p-12 bg-white">
                Select an eligible rescue batch from the left to view AI-assisted NGO match recommendations.
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <span>
            <strong>Disclaimer:</strong> Match scores are generated via prototype simulation heuristics for SIH 2026. Do not claim real-world ML accuracy or certified partnerships.
          </span>
        </div>
      </div>
    </DashboardLayout>
  );
};
