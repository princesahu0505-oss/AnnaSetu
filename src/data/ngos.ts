export interface NGO {
  id: string;
  name: string;
  organizationType: 'Shelter' | 'Community Kitchen' | 'Orphanage' | 'Elderly Care' | 'Food Relief Network';
  serviceArea: string;
  address: string;
  contactPerson: string;
  phone: string;
  email: string;
  acceptedFoodCategories: string[];
  maxCapacity: number;
  currentCapacity: number;
  availableCapacity: number;
  preferredPickupWindows: string;
  operatingHours: string;
  status: 'ACTIVE' | 'VERIFIED' | 'STANDBY';
  distanceKm: number;
  estimatedTravelMinutes: number;
  activeRescues: number;
  completedRescues: number;
  isDemo: boolean;
}

export interface NGOMatchRecord {
  id: string;
  batchId: string;
  ngoId: string;
  ngoName: string;
  matchScore: number;
  matchedAt: string;
  logisticsStatus: 'Pending Match' | 'Matched' | 'Pickup Assigned' | 'Out for Pickup' | 'Picked Up' | 'Delivered';
  factors: {
    categoryMatch: boolean;
    capacityAvailable: boolean;
    withinDistance: boolean;
    windowCompatible: boolean;
  };
  notes?: string;
  isDemo: boolean;
}

export const INITIAL_NGOS: NGO[] = [
  {
    id: 'ngo-001',
    name: 'Aashirwad Annakshetra Relief Foundation',
    organizationType: 'Community Kitchen',
    serviceArea: 'MP Nagar & Arera Hills',
    address: 'Plot 14, Zone-I, MP Nagar, Bhopal',
    contactPerson: 'Suresh Patel',
    phone: '+91 94250 11223',
    email: 'contact@aashirwadannakshetra.org',
    acceptedFoodCategories: ['Prepared Meals', 'Grains', 'Pulses', 'Vegetables', 'Bakery', 'Other'],
    maxCapacity: 300,
    currentCapacity: 75,
    availableCapacity: 225,
    preferredPickupWindows: '12:00 PM – 9:00 PM',
    operatingHours: '8:00 AM – 10:00 PM',
    status: 'ACTIVE',
    distanceKm: 2.8,
    estimatedTravelMinutes: 9,
    activeRescues: 2,
    completedRescues: 410,
    isDemo: true
  },
  {
    id: 'ngo-002',
    name: 'Seva Sahyog Food Security Network',
    organizationType: 'Food Relief Network',
    serviceArea: 'BHEL & Piplani',
    address: 'Sector B, Industrial Area, Piplani, Bhopal',
    contactPerson: 'Meenakshi Iyer',
    phone: '+91 98270 55667',
    email: 'ops@sevasahyogbhopal.org',
    acceptedFoodCategories: ['Prepared Meals', 'Grains', 'Pulses', 'Vegetables'],
    maxCapacity: 500,
    currentCapacity: 120,
    availableCapacity: 380,
    preferredPickupWindows: '1:00 PM – 10:00 PM',
    operatingHours: '24/7 Dispatch',
    status: 'ACTIVE',
    distanceKm: 5.2,
    estimatedTravelMinutes: 14,
    activeRescues: 3,
    completedRescues: 850,
    isDemo: true
  },
  {
    id: 'ngo-003',
    name: 'Umeed Child & Shelter Care Home',
    organizationType: 'Orphanage',
    serviceArea: 'Kelarash & Shahpura',
    address: 'Street 4, Sector C, Shahpura, Bhopal',
    contactPerson: 'Father Thomas Kurien',
    phone: '+91 97541 33445',
    email: 'care@umeedchildcare.org',
    acceptedFoodCategories: ['Prepared Meals', 'Grains', 'Dairy', 'Bakery'],
    maxCapacity: 150,
    currentCapacity: 40,
    availableCapacity: 110,
    preferredPickupWindows: '12:30 PM – 8:00 PM',
    operatingHours: '7:00 AM – 9:00 PM',
    status: 'VERIFIED',
    distanceKm: 3.9,
    estimatedTravelMinutes: 11,
    activeRescues: 1,
    completedRescues: 290,
    isDemo: true
  },
  {
    id: 'ngo-004',
    name: 'Annapurna Rural Aid & Destitute Home',
    organizationType: 'Shelter',
    serviceArea: 'Kolar Road & Chunabhatti',
    address: 'Main Road, Kolar, Bhopal',
    contactPerson: 'Dr. Rameshwar Shukla',
    phone: '+91 91112 88990',
    email: 'help@annapurnaruralaid.org',
    acceptedFoodCategories: ['Prepared Meals', 'Grains', 'Pulses', 'Vegetables', 'Other'],
    maxCapacity: 400,
    currentCapacity: 150,
    availableCapacity: 250,
    preferredPickupWindows: '11:30 PM – 9:30 PM',
    operatingHours: '8:00 AM – 11:00 PM',
    status: 'ACTIVE',
    distanceKm: 6.7,
    estimatedTravelMinutes: 18,
    activeRescues: 0,
    completedRescues: 520,
    isDemo: true
  }
];

export const INITIAL_MATCH_RECORDS: NGOMatchRecord[] = [
  {
    id: 'match-001',
    batchId: 'RES-2026-002',
    ngoId: 'ngo-001',
    ngoName: 'Aashirwad Annakshetra Relief Foundation',
    matchScore: 97,
    matchedAt: 'Today, 1:45 PM',
    logisticsStatus: 'Pickup Assigned',
    factors: {
      categoryMatch: true,
      capacityAvailable: true,
      withinDistance: true,
      windowCompatible: true
    },
    notes: 'Assigned to EV Fleet Unit #04 for immediate cold-chain collection.',
    isDemo: true
  }
];
