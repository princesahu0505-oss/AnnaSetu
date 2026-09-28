import React from 'react';
import { ArrowLeft, MapPin, Sparkles } from 'lucide-react';
import { initialFoodSources } from '../../data/foodSources';

interface FoodSourceProfilePageProps {
  sourceId: string;
  onNavigate: (page: string) => void;
}

export const FoodSourceProfilePage: React.FC<FoodSourceProfilePageProps> = ({ sourceId, onNavigate }) => {
  const source = initialFoodSources.find(s => s.id === sourceId) || initialFoodSources[0];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <button 
        onClick={() => onNavigate('food-sources')}
        className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Food Sources
      </button>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">{source.name}</h1>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-semibold">
              Demo / Simulated Data
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
            <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-medium">{source.type}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {source.location}, {source.city}</span>
            <span>•</span>
            <span>{source.distanceKm} km away</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-sm font-semibold hover:bg-emerald-800">
            Contact Kitchen
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 font-medium">Meals / Day</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{source.mealsPerDay}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 font-medium">Typical Surplus</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{source.typicalSurplus}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 font-medium">Rescue Batches</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{source.rescueHistory.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 font-medium">Recovery Rate (Demo)</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">94.5%</p>
        </div>
      </div>

      {source.currentSurplus && (
        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-emerald-900 text-lg">Current Active Surplus Detected</h3>
            </div>
            <span className="bg-emerald-200 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold">
              {source.currentSurplus.status}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-emerald-200">
            <div>
              <p className="text-xs text-slate-500">Food Items</p>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{source.currentSurplus.food}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Quantity</p>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{source.currentSurplus.quantity}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Eligibility Window</p>
              <p className="font-bold text-emerald-700 text-sm mt-0.5">{source.currentSurplus.eligibilityWindow}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button 
              onClick={() => onNavigate('ngo-matching')}
              className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-sm font-semibold hover:bg-emerald-800"
            >
              Find NGO & Match
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Operational Details</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-slate-500 text-xs">Operating Hours</p>
              <p className="font-semibold text-slate-800">{source.operatingHours}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">Pickup Availability</p>
              <p className="font-semibold text-slate-800">{source.pickupAvailability}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">Food Categories</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {source.foodCategories.map((cat, i) => (
                  <span key={i} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-xs">Kitchen Capacity</p>
              <p className="font-semibold text-slate-800">{source.kitchenCapacity}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="font-bold text-slate-900 text-base">AI FoodLoop Insights</h3>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
              <p className="text-sm text-slate-700">Potential surplus tends to increase near the end of the operating day, particularly on Friday and Saturday dinner shifts.</p>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
              <p className="text-sm text-slate-700">Prepared meal volume appears higher on selected weekdays with average rescue adherence above 95%.</p>
            </div>
          </div>

          <h3 className="font-bold text-slate-900 text-base pt-4">Recent Rescue History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-xs">
                  <th className="pb-2">Batch ID</th>
                  <th className="pb-2">Food</th>
                  <th className="pb-2">Quantity</th>
                  <th className="pb-2">Recipient NGO</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {source.rescueHistory.map((hist, i) => (
                  <tr key={i}>
                    <td className="py-2.5 font-medium text-slate-900">{hist.batchId}</td>
                    <td className="py-2.5 text-slate-600">{hist.food}</td>
                    <td className="py-2.5 text-slate-600">{hist.quantity}</td>
                    <td className="py-2.5 text-slate-600">{hist.recipientNgo}</td>
                    <td className="py-2.5"><span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-xs font-semibold">{hist.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
