export interface InventoryItem {
  id: string;
  name: string;
  category: 'Grains' | 'Pulses' | 'Vegetables' | 'Fruits' | 'Dairy' | 'Bakery' | 'Other';
  quantity: number;
  unit: string;
  expiryDate: string;
  daysRemaining: number;
  minimumStock: number;
  stockStatus: 'Healthy' | 'Low Stock' | 'Expiring Soon' | 'Critical';
  fefoPriority: 'High' | 'Medium' | 'Low';
  storageType: 'Ambient' | 'Refrigerated' | 'Frozen';
  lastUpdated: string;
  isDemo: boolean;
}

export interface ProductionPlanItem {
  id: string;
  foodItem: string;
  plannedQuantity: number;
  expectedDemand: number;
  recommendedQuantity: number;
  difference: number;
  status: 'On Track' | 'Review' | 'Reduce' | 'Increase';
  mealPeriod: 'Breakfast' | 'Lunch' | 'Dinner';
  isDemo: boolean;
}

export interface DemandData {
  breakfast: number;
  lunch: number;
  dinner: number;
  total: number;
  isDemo: boolean;
}

export const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-001',
    name: 'Basmati Rice',
    category: 'Grains',
    quantity: 120,
    unit: 'kg',
    expiryDate: '2026-09-28',
    daysRemaining: 8,
    minimumStock: 50,
    stockStatus: 'Healthy',
    fefoPriority: 'Low',
    storageType: 'Ambient',
    lastUpdated: '2026-09-19',
    isDemo: true
  },
  {
    id: 'inv-002',
    name: 'Fresh Tomatoes',
    category: 'Vegetables',
    quantity: 35,
    unit: 'kg',
    expiryDate: '2026-09-22',
    daysRemaining: 2,
    minimumStock: 15,
    stockStatus: 'Expiring Soon',
    fefoPriority: 'High',
    storageType: 'Refrigerated',
    lastUpdated: '2026-09-20',
    isDemo: true
  },
  {
    id: 'inv-003',
    name: 'Toor Dal',
    category: 'Pulses',
    quantity: 65,
    unit: 'kg',
    expiryDate: '2026-09-30',
    daysRemaining: 10,
    minimumStock: 30,
    stockStatus: 'Healthy',
    fefoPriority: 'Medium',
    storageType: 'Ambient',
    lastUpdated: '2026-09-18',
    isDemo: true
  },
  {
    id: 'inv-004',
    name: 'Full Cream Milk',
    category: 'Dairy',
    quantity: 18,
    unit: 'L',
    expiryDate: '2026-09-21',
    daysRemaining: 1,
    minimumStock: 25,
    stockStatus: 'Critical',
    fefoPriority: 'High',
    storageType: 'Refrigerated',
    lastUpdated: '2026-09-20',
    isDemo: true
  },
  {
    id: 'inv-005',
    name: 'Wheat Flour',
    category: 'Grains',
    quantity: 85,
    unit: 'kg',
    expiryDate: '2026-10-15',
    daysRemaining: 25,
    minimumStock: 40,
    stockStatus: 'Healthy',
    fefoPriority: 'Low',
    storageType: 'Ambient',
    lastUpdated: '2026-09-15',
    isDemo: true
  },
  {
    id: 'inv-006',
    name: 'Onions',
    category: 'Vegetables',
    quantity: 12,
    unit: 'kg',
    expiryDate: '2026-09-25',
    daysRemaining: 5,
    minimumStock: 20,
    stockStatus: 'Low Stock',
    fefoPriority: 'Medium',
    storageType: 'Ambient',
    lastUpdated: '2026-09-20',
    isDemo: true
  }
];

export const MOCK_PRODUCTION_PLAN: ProductionPlanItem[] = [
  {
    id: 'plan-001',
    foodItem: 'Steamed Rice',
    plannedQuantity: 400,
    expectedDemand: 360,
    recommendedQuantity: 370,
    difference: 40,
    status: 'Review',
    mealPeriod: 'Lunch',
    isDemo: true
  },
  {
    id: 'plan-002',
    foodItem: 'Dal Tadka',
    plannedQuantity: 300,
    expectedDemand: 290,
    recommendedQuantity: 300,
    difference: 10,
    status: 'On Track',
    mealPeriod: 'Lunch',
    isDemo: true
  },
  {
    id: 'plan-003',
    foodItem: 'Vegetable Curry',
    plannedQuantity: 250,
    expectedDemand: 240,
    recommendedQuantity: 245,
    difference: 10,
    status: 'On Track',
    mealPeriod: 'Lunch',
    isDemo: true
  },
  {
    id: 'plan-004',
    foodItem: 'Whole Wheat Chapati',
    plannedQuantity: 500,
    expectedDemand: 480,
    recommendedQuantity: 490,
    difference: 20,
    status: 'Review',
    mealPeriod: 'Lunch',
    isDemo: true
  }
];

export const MOCK_DEMAND: DemandData = {
  breakfast: 320,
  lunch: 520,
  dinner: 280,
  total: 1120,
  isDemo: true
};
