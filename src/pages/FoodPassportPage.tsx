import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { generatePassportsFromRescueBatches } from '../data/foodPassport';
import { INITIAL_RESCUE_BATCHES } from '../data/rescueBatches';
import { 
  QrCode, 
  CheckCircle2, 
  Search, 
  Printer, 
  ShieldCheck, 
  ArrowRight,
  Building2,
  HeartHandshake
} from 'lucide-react';

interface FoodPassportPageProps {
  currentRole: 'kitchen' | 'ngo' | 'admin';
  currentPage: string;
  onNavigate: (page: string) => void;
  onRoleChange: (role: 'kitchen' | 'ngo' | 'admin') => void;
  onLogout: () => void;
}

export const FoodPassportPage: React.FC<FoodPassportPageProps> = ({
  currentRole,
  currentPage,
  onNavigate,
  onRoleChange,
  onLogout
}) => {
  const allPassports = generatePassportsFromRescueBatches();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPassportId, setSelectedPassportId] = useState(allPassports[0].passportId);

  const filteredPassports = allPassports.filter(p => 
    p.passportId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.foodItem.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.foodSourceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activePassport = allPassports.find(p => p.passportId === selectedPassportId) || allPassports[0];
  const matchingRescueBatch = INITIAL_RESCUE_BATCHES.find(b => b.batchId === activePassport.batchId);

  const handlePrint = () => {
    window.print();
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
                DEMO / SIMULATED PASSPORT
              </span>
              <span className="text-xs text-slate-400">• Cryptographic Provenance Prototype</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">QR Food Rescue Passport</h1>
            <p className="text-xs text-slate-600">Trace the end-to-end journey of rescued food batches from source kitchen to recipient organization.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Passport</span>
            </button>
            <button
              onClick={() => onNavigate('routes')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span>View Fleet Routes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Search & Selector Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Passport ID, Batch ID, Food Item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-slate-500 shrink-0">Select Passport:</span>
            <select
              value={selectedPassportId}
              onChange={(e) => setSelectedPassportId(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600 flex-1 sm:w-64"
            >
              {filteredPassports.map(p => (
                <option key={p.passportId} value={p.passportId}>
                  {p.passportId} — {p.batchId} ({p.foodItem})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Passport Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* QR Code & Digital Signature Column */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-between text-center space-y-6">
            <div className="space-y-1 w-full text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Digital Identifier</span>
              <p className="font-mono font-bold text-emerald-800 text-base">{activePassport.passportId}</p>
            </div>

            <div className="w-52 h-52 bg-slate-900 rounded-2xl flex flex-col items-center justify-center p-6 text-white relative shadow-inner">
              <QrCode className="w-32 h-32 text-emerald-400" />
              <span className="text-[10px] font-mono text-slate-300 mt-2">ANNASETU|{activePassport.passportId}</span>
            </div>

            <div className="w-full space-y-2 text-left bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Encoded Reference:</span>
                <span className="font-mono text-slate-800 font-bold">ANNASETU|{activePassport.passportId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Blockchain Hash:</span>
                <span className="font-mono text-emerald-700 text-[10px]">0x7f8a...9c41 (Simulated)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Verification Status:</span>
                <span className="font-bold text-emerald-700">Valid Prototype Signature</span>
              </div>
            </div>

            <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-semibold">
              Prototype QR Verification Active
            </span>
          </div>

          {/* Details & Traceability Timeline Column */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded">
                  Food Rescue Provenance
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{activePassport.foodItem}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold">
                  Food Eligibility: {activePassport.eligibilityStatus}
                </span>
                <span className="px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-full text-xs font-bold">
                  Logistics: {activePassport.logisticsStatus}
                </span>
              </div>
            </div>

            {/* Core Batch Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium">Batch ID</span>
                <p className="font-mono font-bold text-slate-900 mt-0.5">{activePassport.batchId}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium">Quantity</span>
                <p className="font-bold text-slate-900 mt-0.5">{activePassport.quantity} {activePassport.unit}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium">Storage Condition</span>
                <p className="font-bold text-slate-900 mt-0.5">{activePassport.storageCondition}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium">Pickup Deadline</span>
                <p className="font-bold text-slate-900 mt-0.5">{activePassport.pickupDeadline}</p>
              </div>
            </div>

            {/* Entities Involved */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>Origin Food Source</span>
                </div>
                <p className="text-sm font-bold text-slate-900">{activePassport.foodSourceName}</p>
                <p className="text-xs text-slate-500">Prepared: {activePassport.preparationDate}, {activePassport.preparationTime}</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                  <HeartHandshake className="w-4 h-4 text-emerald-600" />
                  <span>Recipient Organization</span>
                </div>
                <p className="text-sm font-bold text-slate-900">{activePassport.ngoName || 'Awaiting Assignment'}</p>
                <p className="text-xs text-slate-500">Matched: {activePassport.matchedAt || 'Pending'}</p>
              </div>
            </div>

            {matchingRescueBatch && matchingRescueBatch.assessment && (
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" /> AI-Assessed & Human Verification Audit
                  </span>
                  <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded">
                    Confidence: {matchingRescueBatch.assessment.confidence}%
                  </span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {matchingRescueBatch.assessment.safetyDisclaimer}
                </p>
              </div>
            )}

            {/* Traceability Timeline */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">End-to-End Traceability Timeline</h4>
              
              <div className="space-y-2">
                {activePassport.events.map((ev, i) => (
                  <div key={ev.id || i} className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs">
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{ev.eventType.replace(/_/g, ' ')}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{ev.timestamp}</span>
                      </div>
                      <p className="text-slate-600">{ev.description}</p>
                      <p className="text-[10px] text-emerald-700 font-semibold">Actor / Entity: {ev.actor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Safety Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-bold">Compliance & Safety Notice:</strong>
            <p className="leading-relaxed">
              AnnaSetu uses AI-assisted rules and operational signals to support review. It does not certify food safety. Final eligibility must be determined by an authorized person following applicable food-safety procedures. QR codes provide digital traceability provenance and do not constitute independent medical or food-safety certification.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
