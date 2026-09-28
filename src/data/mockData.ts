export interface SurplusBatch {
  id: string;
  batchId: string;
  foodType: string;
  quantity: string;
  preparedAt: string;
  eligibleUntil: string;
  status: 'Detected' | 'Under Review' | 'Eligible' | 'Matched' | 'Picked Up' | 'Delivered' | 'Recovered';
  destination?: string;
  sourceKitchen: string;
  storageCondition: string;
  aiAssessment: 'Eligible' | 'Needs Review' | 'Not Eligible';
  confidence: number;
}

export interface NGOMatch {
  id: string;
  ngoName: string;
  foodType: string;
  quantity: string;
  pickupLocation: string;
  pickupWindow: string;
  distance: string;
  urgency: 'High' | 'Medium' | 'Low';
  capacityMatch: string;
  status: 'Available' | 'Requested' | 'Assigned' | 'Completed';
}

export interface RouteItem {
  id: string;
  batchId: string;
  pickup: string;
  destination: string;
  distance: string;
  eta: string;
  pickupWindow: string;
  driver: string;
  vehicle: string;
  status: 'Assigned' | 'En Route' | 'Arrived' | 'Picked Up' | 'Delivered';
}

export const MOCK_SURPLUS_BATCHES: SurplusBatch[] = [
  {
    id: '1',
    batchId: 'BAT-2026-8910',
    foodType: 'Steam Basmati Rice & Dal Makhani',
    quantity: '120 kg (approx 240 meals)',
    preparedAt: 'Today, 11:30 AM',
    eligibleUntil: 'Today, 06:00 PM',
    status: 'Eligible',
    destination: 'Seva Food Network',
    sourceKitchen: 'Central Institutional Kitchen Alpha',
    storageCondition: 'Hot Holding (Above 65°C)',
    aiAssessment: 'Eligible',
    confidence: 94
  },
  {
    id: '2',
    batchId: 'BAT-2026-8911',
    foodType: 'Assorted Whole Wheat Chapatis',
    quantity: '80 kg (approx 320 pcs)',
    preparedAt: 'Today, 12:00 PM',
    eligibleUntil: 'Today, 07:00 PM',
    status: 'Matched',
    destination: 'Aashirwad Community Shelter',
    sourceKitchen: 'TechPark Cafeteria Dining Hall',
    storageCondition: 'Ambient Insulated Box',
    aiAssessment: 'Eligible',
    confidence: 96
  },
  {
    id: '3',
    batchId: 'BAT-2026-8912',
    foodType: 'Mixed Vegetable Korma & Gravy',
    quantity: '95 kg (approx 190 meals)',
    preparedAt: 'Today, 10:45 AM',
    eligibleUntil: 'Today, 05:00 PM',
    status: 'Under Review',
    destination: 'Pending Assignment',
    sourceKitchen: 'Hospitality Mess Block B',
    storageCondition: 'Refrigerated Cold Chain',
    aiAssessment: 'Needs Review',
    confidence: 81
  },
  {
    id: '4',
    batchId: 'BAT-2026-8913',
    foodType: 'Suji Halwa & Sweet Curd',
    quantity: '50 kg (approx 150 portions)',
    preparedAt: 'Today, 01:00 PM',
    eligibleUntil: 'Today, 08:00 PM',
    status: 'Detected',
    destination: 'Unassigned',
    sourceKitchen: 'University Dining Centre',
    storageCondition: 'Chilled Storage (4°C)',
    aiAssessment: 'Eligible',
    confidence: 91
  }
];

export const MOCK_NGO_MATCHES: NGOMatch[] = [
  {
    id: 'ngo-1',
    ngoName: 'Seva Food Network',
    foodType: 'Steam Basmati Rice & Dal Makhani',
    quantity: '120 kg',
    pickupLocation: 'Central Kitchen Alpha, Sector 4',
    pickupWindow: '02:00 PM - 04:00 PM',
    distance: '3.4 km',
    urgency: 'High',
    capacityMatch: '98% (Serves 250 daily)',
    status: 'Available'
  },
  {
    id: 'ngo-2',
    ngoName: 'Aashirwad Community Shelter',
    foodType: 'Assorted Whole Wheat Chapatis',
    quantity: '80 kg',
    pickupLocation: 'TechPark Cafeteria, Phase 2',
    pickupWindow: '02:30 PM - 05:00 PM',
    distance: '5.1 km',
    urgency: 'Medium',
    capacityMatch: '92% (Serves 300 daily)',
    status: 'Available'
  },
  {
    id: 'ngo-3',
    ngoName: 'Hope Youth Foundation',
    foodType: 'Mixed Vegetable Korma',
    quantity: '95 kg',
    pickupLocation: 'Hospitality Mess Block B',
    pickupWindow: '03:00 PM - 05:30 PM',
    distance: '6.8 km',
    urgency: 'High',
    capacityMatch: '88% (Serves 180 daily)',
    status: 'Available'
  }
];

export const MOCK_ROUTES: RouteItem[] = [
  {
    id: 'rt-101',
    batchId: 'BAT-2026-8911',
    pickup: 'TechPark Cafeteria, Phase 2',
    destination: 'Aashirwad Community Shelter, North Zone',
    distance: '5.1 km',
    eta: '18 mins',
    pickupWindow: '02:30 PM - 03:00 PM',
    driver: 'Rajesh Kumar (EV-Van #04)',
    vehicle: 'Electric Cargo Trike',
    status: 'En Route'
  },
  {
    id: 'rt-102',
    batchId: 'BAT-2026-8910',
    pickup: 'Central Kitchen Alpha, Sector 4',
    destination: 'Seva Food Network Hub',
    distance: '3.4 km',
    eta: '12 mins',
    pickupWindow: '02:00 PM - 02:30 PM',
    driver: 'Amit Sharma (EV-Truck #02)',
    vehicle: 'Refrigerated EV Utility',
    status: 'Assigned'
  }
];

export const MOCK_IMPACT_METRICS = {
  foodPrepared: '1,425,890 kg',
  potentialSurplus: '184,200 kg',
  foodRecovered: '142,500 kg',
  avoidedWaste: '97.4%',
  activeKitchens: '48 Institutional Units',
  activeNGOs: '32 Verified Partners',
  co2SavedTonnes: '356.8 tCO2e',
  mealsEquivalent: '3.82 Million Meals'
};
