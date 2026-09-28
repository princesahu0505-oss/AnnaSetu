import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { MOCK_INVENTORY, type InventoryItem } from '../data/inventory';
import { 
  Package, 
  AlertTriangle, 
  Clock, 
  Plus, 
  Search, 
  X,
  CheckCircle,
  ShieldAlert
} from 'lucide-react';

interface InventoryPageProps {
  currentRole: 'kitchen' | 'ngo' | 'admin';
  currentPage: string;
  onNavigate: (page: string) => void;
  onRoleChange: (role: 'kitchen' | 'ngo' | 'admin') => void;
  onLogout: () => void;
}

export const InventoryPage: React.FC<InventoryPageProps> = ({
  currentRole,
  currentPage,
  onNavigate,
  onRoleChange,
  onLogout
}) => {
  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [fefoFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'expiry' | 'quantity' | 'fefo' | 'status'>('fefo');

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New item form state
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<'Grains' | 'Pulses' | 'Vegetables' | 'Fruits' | 'Dairy' | 'Bakery' | 'Other'>('Grains');
  const [newQuantity, setNewQuantity] = useState(50);
  const [newUnit, setNewUnit] = useState('kg');
  const [newExpiry, setNewExpiry] = useState('2026-10-05');
  const [newMinStock, setNewMinStock] = useState(20);
  const [newStorage, setNewStorage] = useState<'Ambient' | 'Refrigerated' | 'Frozen'>('Ambient');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const newItem: InventoryItem = {
      id: `inv-00${inventory.length + 1}`,
      name: newName,
      category: newCategory,
      quantity: Number(newQuantity),
      unit: newUnit,
      expiryDate: newExpiry,
      daysRemaining: 7,
      minimumStock: Number(newMinStock),
      stockStatus: 'Healthy',
      fefoPriority: 'Medium',
      storageType: newStorage,
      lastUpdated: new Date().toISOString().split('T')[0],
      isDemo: true
    };

    setInventory([newItem, ...inventory]);
    setShowAddModal(false);
    setNewName('');
    showToast('Inventory item added.');
  };

  // Filtering & Sorting
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || item.stockStatus === statusFilter;
    const matchesFefo = fefoFilter === 'All' || item.fefoPriority === fefoFilter;
    return matchesSearch && matchesCategory && matchesStatus && matchesFefo;
  }).sort((a, b) => {
    if (sortBy === 'expiry') return a.daysRemaining - b.daysRemaining;
    if (sortBy === 'quantity') return b.quantity - a.quantity;
    if (sortBy === 'fefo') {
      const rank = { High: 3, Medium: 2, Low: 1 };
      return rank[b.fefoPriority] - rank[a.fefoPriority];
    }
    return a.stockStatus.localeCompare(b.stockStatus);
  });

  const totalItems = inventory.length;
  const lowStockCount = inventory.filter(i => i.stockStatus === 'Low Stock' || i.stockStatus === 'Critical').length;
  const expiringSoonCount = inventory.filter(i => i.daysRemaining <= 3).length;
  const healthyCount = inventory.filter(i => i.stockStatus === 'Healthy').length;

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

        {/* Header Banner */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                Smart Inventory
              </span>
              <span className="text-xs text-slate-400">• Demo / Simulated Data</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Smart Inventory</h1>
            <p className="text-sm text-slate-600">Monitor ingredients, expiry windows and stock levels before planning the next production cycle.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Inventory Item</span>
            </button>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Items', value: totalItems, sub: 'Inventory Items', icon: Package, color: 'text-emerald-700 bg-emerald-50' },
            { label: 'Low Stock', value: lowStockCount, sub: 'Needs Attention', icon: AlertTriangle, color: 'text-amber-700 bg-amber-50' },
            { label: 'Expiring Soon', value: expiringSoonCount, sub: 'Within 3 Days', icon: Clock, color: 'text-red-700 bg-red-50' },
            { label: 'Healthy Stock', value: healthyCount, sub: 'Adequate Levels', icon: CheckCircle, color: 'text-emerald-700 bg-emerald-50' },
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
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">{stat.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* FEFO Explanation & Expiry Alerts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FEFO Explanation Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-md space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                  FEFO Protocol
                </span>
                <span className="text-[10px] text-slate-400">First Expire, First Out</span>
              </div>
              <h3 className="text-base font-bold text-white">Prioritize Earliest Expiry Stock</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                "FEFO prioritizes ingredients with the earliest expiry for use before later-expiring stock."
              </p>
            </div>
            <div className="pt-3 border-t border-slate-700 text-[10px] text-slate-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Demo Simulated Expiry Priority System</span>
            </div>
          </div>

          {/* Expiry Alerts */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span>Expiry Alerts</span>
              </h3>
              <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-semibold">Action Required</span>
            </div>
            <div className="space-y-2.5">
              {inventory.filter(i => i.daysRemaining <= 2).map(item => (
                <div key={item.id} className="p-3 bg-red-50/50 border border-red-100 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">⚠ {item.name}</p>
                    <p className="text-[10px] text-red-700 font-medium">Expires in {item.daysRemaining === 1 ? 'tomorrow' : `${item.daysRemaining} days`} ({item.quantity} {item.unit})</p>
                  </div>
                  <span className="text-[10px] bg-red-600 text-white px-2 py-1 rounded font-semibold">Prioritize</span>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-amber-500" />
                <span>Low Stock Alerts</span>
              </h3>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">Restock Soon</span>
            </div>
            <div className="space-y-2.5">
              {inventory.filter(i => i.stockStatus === 'Low Stock' || i.stockStatus === 'Critical').map(item => (
                <div key={item.id} className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{item.name}</p>
                    <p className="text-[10px] text-slate-600">Stock: {item.quantity} {item.unit} (Min: {item.minimumStock} {item.unit})</p>
                  </div>
                  <span className="text-[10px] bg-amber-600 text-white px-2 py-1 rounded font-semibold">Review</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inventory Table Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Ingredient Inventory</h3>
              <p className="text-xs text-slate-500">Search, filter and manage raw materials</p>
            </div>
            {/* Search and Filters */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ingredient..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-emerald-600"
              >
                <option value="All">All Categories</option>
                <option value="Grains">Grains</option>
                <option value="Pulses">Pulses</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Dairy">Dairy</option>
                <option value="Bakery">Bakery</option>
                <option value="Other">Other</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-emerald-600"
              >
                <option value="All">All Statuses</option>
                <option value="Healthy">Healthy</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Expiring Soon">Expiring Soon</option>
                <option value="Critical">Critical</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-emerald-600"
              >
                <option value="fefo">Sort by: FEFO Priority</option>
                <option value="expiry">Sort by: Earliest Expiry</option>
                <option value="quantity">Sort by: Quantity</option>
                <option value="status">Sort by: Status</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Ingredient</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Unit</th>
                  <th className="px-4 py-3">Expiry</th>
                  <th className="px-4 py-3">Days Left</th>
                  <th className="px-4 py-3">Stock Status</th>
                  <th className="px-4 py-3">FEFO Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInventory.map(item => (
                  <tr 
                    key={item.id} 
                    onClick={() => setSelectedItem(item)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 font-bold text-slate-900">{item.name}</td>
                    <td className="px-4 py-3 text-slate-600">{item.category}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">{item.quantity}</td>
                    <td className="px-4 py-3 text-slate-500">{item.unit}</td>
                    <td className="px-4 py-3 text-slate-700">{item.expiryDate}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{item.daysRemaining} days</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.stockStatus === 'Healthy' ? 'bg-emerald-100 text-emerald-800' :
                        item.stockStatus === 'Low Stock' ? 'bg-amber-100 text-amber-800' :
                        item.stockStatus === 'Expiring Soon' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.stockStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.fefoPriority === 'High' ? 'bg-red-600 text-white' :
                        item.fefoPriority === 'Medium' ? 'bg-amber-500 text-white' :
                        'bg-slate-200 text-slate-700'
                      }`}>
                        {item.fefoPriority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Inventory Item Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Add Inventory Item</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddItem} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Ingredient Name</label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g. Basmati Rice"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                    >
                      <option value="Grains">Grains</option>
                      <option value="Pulses">Pulses</option>
                      <option value="Vegetables">Vegetables</option>
                      <option value="Fruits">Fruits</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Bakery">Bakery</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Quantity</label>
                    <input
                      type="number"
                      required
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Unit</label>
                    <input
                      type="text"
                      required
                      value={newUnit}
                      onChange={(e) => setNewUnit(e.target.value)}
                      placeholder="kg, L, pcs"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Expiry Date</label>
                    <input
                      type="date"
                      required
                      value={newExpiry}
                      onChange={(e) => setNewExpiry(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Minimum Stock Level</label>
                    <input
                      type="number"
                      required
                      value={newMinStock}
                      onChange={(e) => setNewMinStock(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Storage Type</label>
                    <select
                      value={newStorage}
                      onChange={(e) => setNewStorage(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                    >
                      <option value="Ambient">Ambient</option>
                      <option value="Refrigerated">Refrigerated</option>
                      <option value="Frozen">Frozen</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-xs font-semibold text-white shadow-sm"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Inventory Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {selectedItem.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedItem.name}</h3>
                </div>
                <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-slate-500">Current Quantity:</span>
                    <p className="font-bold text-slate-900 text-sm mt-0.5">{selectedItem.quantity} {selectedItem.unit}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Minimum Stock:</span>
                    <p className="font-bold text-slate-900 text-sm mt-0.5">{selectedItem.minimumStock} {selectedItem.unit}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500">Expiry Date:</span>
                    <p className="font-semibold text-slate-800">{selectedItem.expiryDate}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Days Remaining:</span>
                    <p className="font-semibold text-slate-800">{selectedItem.daysRemaining} days</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500">FEFO Priority:</span>
                    <p className="font-semibold text-slate-800">{selectedItem.fefoPriority}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Storage Type:</span>
                    <p className="font-semibold text-slate-800">{selectedItem.storageType}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400">Demo / Simulated History Active</span>
                  <div className="mt-2 h-16 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 font-medium">
                    [ Simulated Stock Consumption Chart ]
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-100">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
