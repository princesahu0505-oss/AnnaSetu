export type RescueStatus =
  | 'Detected'
  | 'Under Review'
  | 'Eligible'
  | 'Not Eligible'
  | 'Matched'
  | 'Picked Up'
  | 'Delivered';

export interface VerificationChecklist {
  prepTimeRecorded: boolean;
  storageConfirmed: boolean;
  temperatureChecked: boolean;
  appearanceChecked: boolean;
  packagingChecked: boolean;
  pickupWindowAcceptable: boolean;
}

export interface FoodAssessment {
  status: 'REVIEW REQUIRED' | 'ELIGIBILITY INDICATED' | 'NOT ELIGIBLE';
  confidence: number;
  reasoning: string[];
  safetyDisclaimer: string;
}

export interface RescueBatch {
  id: string;
  batchId: string;
  foodItem: string;
  category: 'Grains' | 'Pulses' | 'Vegetables' | 'Dairy' | 'Prepared Meals' | 'Bakery' | 'Other';
  quantity: number;
  unit: string;
  mealPeriod: 'Breakfast' | 'Lunch' | 'Dinner';
  preparedAt: string;
  preparationDate: string;
  storageCondition: string;
  temperature?: string;
  pickupDeadline: string;
  foodSourceId: string;
  foodSourceName: string;
  notes?: string;
  status: RescueStatus;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  assessment: FoodAssessment;
  verification: VerificationChecklist;
  verificationNotes?: string;
  verifiedBy?: string;
  isDemo: boolean;
}

export const INITIAL_RESCUE_BATCHES: RescueBatch[] = [
  {
    id: 'res-001',
    batchId: 'RES-2026-001',
    foodItem: 'Jeera Rice & Yellow Dal Tadka',
    category: 'Prepared Meals',
    quantity: 85,
    unit: 'portions',
    mealPeriod: 'Lunch',
    preparedAt: '12:45 PM',
    preparationDate: '2026-09-20',
    storageCondition: 'Hot Holding (>65°C)',
    temperature: '68°C',
    pickupDeadline: 'Today, 4:30 PM',
    foodSourceId: 'src-001',
    foodSourceName: 'Green Leaf Fine Dining & Banquets',
    notes: 'Prepared fresh for lunch service; surplus due to lower attendee turnout.',
    status: 'Under Review',
    riskLevel: 'LOW',
    assessment: {
      status: 'ELIGIBILITY INDICATED',
      confidence: 94,
      reasoning: [
        '✓ Preparation timestamp recorded',
        '✓ Storage condition confirmed (Hot Holding >65°C)',
        '✓ Temperature verified within safe threshold (68°C)',
        '✓ Pickup deadline provides adequate safety margin'
      ],
      safetyDisclaimer: 'AI provides decision support only. Final food safety verification must be performed by an authorized human according to applicable food-safety procedures.'
    },
    verification: {
      prepTimeRecorded: true,
      storageConfirmed: true,
      temperatureChecked: true,
      appearanceChecked: false,
      packagingChecked: false,
      pickupWindowAcceptable: true
    },
    verificationNotes: 'Pending visual inspection of container seals and aroma check by kitchen supervisor.',
    isDemo: true
  },
  {
    id: 'res-002',
    batchId: 'RES-2026-002',
    foodItem: 'Buffet Assorted Veg Curry & Naan',
    category: 'Prepared Meals',
    quantity: 140,
    unit: 'portions',
    mealPeriod: 'Lunch',
    preparedAt: '1:15 PM',
    preparationDate: '2026-09-20',
    storageCondition: 'Refrigerated Cold Chain (4°C)',
    temperature: '4°C',
    pickupDeadline: 'Today, 6:00 PM',
    foodSourceId: 'src-002',
    foodSourceName: 'City Central Grand Hotel',
    notes: 'Banquet leftover, chilled immediately post-service.',
    status: 'Eligible',
    riskLevel: 'LOW',
    assessment: {
      status: 'ELIGIBILITY INDICATED',
      confidence: 96,
      reasoning: [
        '✓ Rapid chilling timestamp verified',
        '✓ Cold chain storage maintained at 4°C',
        '✓ Wholesome unserved batch from conference banquet',
        '✓ Human verification successfully completed'
      ],
      safetyDisclaimer: 'AI provides decision support only. Final food safety verification must be performed by an authorized human according to applicable food-safety procedures.'
    },
    verification: {
      prepTimeRecorded: true,
      storageConfirmed: true,
      temperatureChecked: true,
      appearanceChecked: true,
      packagingChecked: true,
      pickupWindowAcceptable: true
    },
    verificationNotes: 'Inspected by Chef Alok Varma. Packaging intact, temperature verified at 4°C.',
    verifiedBy: 'Chef Alok Varma',
    isDemo: true
  },
  {
    id: 'res-003',
    batchId: 'RES-2026-003',
    foodItem: 'Whole Wheat Chapati',
    category: 'Grains',
    quantity: 200,
    unit: 'pcs',
    mealPeriod: 'Lunch',
    preparedAt: '1:30 PM',
    preparationDate: '2026-09-20',
    storageCondition: 'Ambient Insulated Box',
    temperature: '32°C',
    pickupDeadline: 'Today, 5:00 PM',
    foodSourceId: 'src-003',
    foodSourceName: 'MANIT Campus Central Mess',
    notes: 'Extra chapatis prepared for mess service.',
    status: 'Detected',
    riskLevel: 'MEDIUM',
    assessment: {
      status: 'REVIEW REQUIRED',
      confidence: 88,
      reasoning: [
        '✓ Preparation timestamp recorded',
        '⚠ Ambient storage requires timely pickup before 5:00 PM',
        '✓ Quantity suitable for immediate NGO redistribution'
      ],
      safetyDisclaimer: 'AI provides decision support only. Final food safety verification must be performed by an authorized human according to applicable food-safety procedures.'
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
  }
];
