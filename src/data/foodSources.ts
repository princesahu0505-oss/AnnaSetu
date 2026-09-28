export interface FoodSource {
  id: string;
  name: string;
  type: 'Restaurant' | 'Hotel' | 'Institutional Kitchen' | 'Hostel' | 'Canteen' | 'Caterer';
  location: string;
  city: string;
  contactPerson: string;
  contactNumber: string;
  operatingHours: string;
  mealsPerDay: number;
  kitchenCapacity: string;
  foodCategories: string[];
  typicalSurplus: string;
  surplusWindow: string;
  pickupAvailability: string;
  status: 'ACTIVE' | 'MONITORING' | 'RESCUE READY' | 'INACTIVE';
  distanceKm: number;
  currentSurplus?: {
    food: string;
    quantity: string;
    preparedAt: string;
    eligibilityWindow: string;
    status: 'Under Review' | 'Eligible' | 'Matched' | 'Picked Up' | 'Delivered';
  };
  rescueHistory: {
    batchId: string;
    food: string;
    quantity: string;
    recipientNgo: string;
    pickupTime: string;
    status: string;
  }[];
  weeklyPattern: {
    day: string;
    surplusLevel: 'Low' | 'Moderate' | 'High' | 'Peak';
    estimatedMeals: number;
  }[];
  analytics: {
    productionVolume: string;
    potentialSurplus: string;
    rescuedFood: string;
    unrecoveredSurplus: string;
  };
  isDemo: boolean;
}

export const initialFoodSources: FoodSource[] = [
  {
    id: 'src-001',
    name: 'Green Leaf Fine Dining & Banquets',
    type: 'Restaurant',
    location: 'MP Nagar, Zone-II',
    city: 'Bhopal',
    contactPerson: 'Rajesh Sharma',
    contactNumber: '+91 98260 12345',
    operatingHours: '11:00 AM – 11:30 PM',
    mealsPerDay: 850,
    kitchenCapacity: '1,200 meals / batch',
    foodCategories: ['Indian Meals', 'Rice', 'Dal', 'Vegetarian', 'Prepared Meals'],
    typicalSurplus: '60–90 meals',
    surplusWindow: '8:30 PM – 10:00 PM',
    pickupAvailability: 'Evening Shift (8:30 PM onwards)',
    status: 'RESCUE READY',
    distanceKm: 2.4,
    currentSurplus: {
      food: 'Jeera Rice + Dal Fry + Mixed Veg',
      quantity: '85 meals (~42 kg)',
      preparedAt: '12:45 PM',
      eligibilityWindow: '3.5 Hours Remaining',
      status: 'Eligible'
    },
    rescueHistory: [
      { batchId: 'AS-DEMO-101', food: 'Veg Thali Batches', quantity: '70 meals', recipientNgo: 'Aashirwad Annakshetra', pickupTime: '9:15 PM', status: 'Delivered' },
      { batchId: 'AS-DEMO-102', food: 'Rice & Sambar', quantity: '95 meals', recipientNgo: 'Seva Sahyog Foundation', pickupTime: '9:30 PM', status: 'Delivered' },
      { batchId: 'AS-DEMO-103', food: 'Pulao & Paneer Curry', quantity: '60 meals', recipientNgo: 'Umeed Child Care', pickupTime: '9:00 PM', status: 'Delivered' }
    ],
    weeklyPattern: [
      { day: 'Mon', surplusLevel: 'Moderate', estimatedMeals: 55 },
      { day: 'Tue', surplusLevel: 'Low', estimatedMeals: 40 },
      { day: 'Wed', surplusLevel: 'Moderate', estimatedMeals: 65 },
      { day: 'Thu', surplusLevel: 'High', estimatedMeals: 85 },
      { day: 'Fri', surplusLevel: 'Peak', estimatedMeals: 110 },
      { day: 'Sat', surplusLevel: 'Peak', estimatedMeals: 140 },
      { day: 'Sun', surplusLevel: 'High', estimatedMeals: 95 }
    ],
    analytics: {
      productionVolume: '5,950 meals/wk',
      potentialSurplus: '520 meals/wk',
      rescuedFood: '480 meals/wk',
      unrecoveredSurplus: '40 meals/wk'
    },
    isDemo: true
  },
  {
    id: 'src-002',
    name: 'City Central Grand Hotel',
    type: 'Hotel',
    location: 'DB Mall Road, Arera Hills',
    city: 'Bhopal',
    contactPerson: 'Alok Varma',
    contactNumber: '+91 97541 88990',
    operatingHours: '6:00 AM – 11:00 PM',
    mealsPerDay: 1400,
    kitchenCapacity: '2,000 meals / batch',
    foodCategories: ['Indian Meals', 'Rice', 'Bakery', 'Prepared Meals', 'Other'],
    typicalSurplus: '120–180 meals',
    surplusWindow: '9:00 PM – 10:30 PM',
    pickupAvailability: 'Flexible Evening & Night',
    status: 'RESCUE READY',
    distanceKm: 4.1,
    currentSurplus: {
      food: 'Buffet Surplus (Assorted Bread & Veg Curry)',
      quantity: '140 meals (~70 kg)',
      preparedAt: '1:15 PM',
      eligibilityWindow: '4 Hours Remaining',
      status: 'Eligible'
    },
    rescueHistory: [
      { batchId: 'AS-DEMO-201', food: 'Continental & Indian Buffet', quantity: '150 meals', recipientNgo: 'Matruchhaya Relief Trust', pickupTime: '10:00 PM', status: 'Delivered' },
      { batchId: 'AS-DEMO-202', food: 'Bakery & Rice Surplus', quantity: '110 meals', recipientNgo: 'Aashirwad Annakshetra', pickupTime: '9:45 PM', status: 'Delivered' }
    ],
    weeklyPattern: [
      { day: 'Mon', surplusLevel: 'Low', estimatedMeals: 70 },
      { day: 'Tue', surplusLevel: 'Moderate', estimatedMeals: 90 },
      { day: 'Wed', surplusLevel: 'Moderate', estimatedMeals: 100 },
      { day: 'Thu', surplusLevel: 'High', estimatedMeals: 130 },
      { day: 'Fri', surplusLevel: 'Peak', estimatedMeals: 190 },
      { day: 'Sat', surplusLevel: 'Peak', estimatedMeals: 220 },
      { day: 'Sun', surplusLevel: 'Peak', estimatedMeals: 200 }
    ],
    analytics: {
      productionVolume: '9,800 meals/wk',
      potentialSurplus: '1,000 meals/wk',
      rescuedFood: '920 meals/wk',
      unrecoveredSurplus: '80 meals/wk'
    },
    isDemo: true
  },
  {
    id: 'src-003',
    name: 'MANIT Campus Central Mess',
    type: 'Institutional Kitchen',
    location: 'Link Road No. 3, MANIT',
    city: 'Bhopal',
    contactPerson: 'Dr. Sunil Nair',
    contactNumber: '+91 94250 55443',
    operatingHours: '7:00 AM – 9:30 PM',
    mealsPerDay: 3500,
    kitchenCapacity: '4,500 meals / batch',
    foodCategories: ['Indian Meals', 'Rice', 'Dal', 'Vegetarian'],
    typicalSurplus: '200–300 meals',
    surplusWindow: '2:30 PM – 4:00 PM (Lunch) & 8:30 PM (Dinner)',
    pickupAvailability: 'After Lunch & Dinner Service',
    status: 'ACTIVE',
    distanceKm: 5.6,
    rescueHistory: [
      { batchId: 'AS-DEMO-301', food: 'Dal Tadka & Steamed Rice', quantity: '220 meals', recipientNgo: 'Annapurna Rural Aid', pickupTime: '3:00 PM', status: 'Delivered' },
      { batchId: 'AS-DEMO-302', food: 'Chapati & Mix Veg', quantity: '280 meals', recipientNgo: 'Seva Sahyog Foundation', pickupTime: '9:15 PM', status: 'Delivered' }
    ],
    weeklyPattern: [
      { day: 'Mon', surplusLevel: 'High', estimatedMeals: 240 },
      { day: 'Tue', surplusLevel: 'High', estimatedMeals: 250 },
      { day: 'Wed', surplusLevel: 'Moderate', estimatedMeals: 190 },
      { day: 'Thu', surplusLevel: 'High', estimatedMeals: 260 },
      { day: 'Fri', surplusLevel: 'Peak', estimatedMeals: 320 },
      { day: 'Sat', surplusLevel: 'Low', estimatedMeals: 110 },
      { day: 'Sun', surplusLevel: 'Low', estimatedMeals: 90 }
    ],
    analytics: {
      productionVolume: '24,500 meals/wk',
      potentialSurplus: '1,600 meals/wk',
      rescuedFood: '1,500 meals/wk',
      unrecoveredSurplus: '100 meals/wk'
    },
    isDemo: true
  },
  {
    id: 'src-004',
    name: 'Sagar Scholars Girls Hostel Mess',
    type: 'Hostel',
    location: 'Patel Nagar, Bhopal',
    city: 'Bhopal',
    contactPerson: 'Mrs. Pushpa Iyer',
    contactNumber: '+91 91112 33221',
    operatingHours: '6:30 AM – 10:00 PM',
    mealsPerDay: 450,
    kitchenCapacity: '600 meals / batch',
    foodCategories: ['Indian Meals', 'Rice', 'Dal', 'Vegetarian'],
    typicalSurplus: '35–50 meals',
    surplusWindow: '9:00 PM – 10:00 PM',
    pickupAvailability: 'Night Pickup Only',
    status: 'MONITORING',
    distanceKm: 6.8,
    rescueHistory: [
      { batchId: 'AS-DEMO-401', food: 'Poha & Upma Surplus', quantity: '40 meals', recipientNgo: 'Umeed Child Care', pickupTime: '9:30 PM', status: 'Delivered' }
    ],
    weeklyPattern: [
      { day: 'Mon', surplusLevel: 'Low', estimatedMeals: 30 },
      { day: 'Tue', surplusLevel: 'Low', estimatedMeals: 35 },
      { day: 'Wed', surplusLevel: 'Moderate', estimatedMeals: 45 },
      { day: 'Thu', surplusLevel: 'Low', estimatedMeals: 35 },
      { day: 'Fri', surplusLevel: 'Moderate', estimatedMeals: 50 },
      { day: 'Sat', surplusLevel: 'Moderate', estimatedMeals: 40 },
      { day: 'Sun', surplusLevel: 'Low', estimatedMeals: 25 }
    ],
    analytics: {
      productionVolume: '3,150 meals/wk',
      potentialSurplus: '260 meals/wk',
      rescuedFood: '240 meals/wk',
      unrecoveredSurplus: '20 meals/wk'
    },
    isDemo: true
  },
  {
    id: 'src-005',
    name: 'BHEL Industrial Township Canteen',
    type: 'Canteen',
    location: 'Piplani, BHEL',
    city: 'Bhopal',
    contactPerson: 'Manoj Kumar Das',
    contactNumber: '+91 98270 44112',
    operatingHours: '5:00 AM – 10:00 PM',
    mealsPerDay: 2200,
    kitchenCapacity: '3,000 meals / batch',
    foodCategories: ['Indian Meals', 'Rice', 'Dal', 'Prepared Meals'],
    typicalSurplus: '150–220 meals',
    surplusWindow: '3:00 PM – 4:30 PM & 9:30 PM',
    pickupAvailability: 'After Shift End',
    status: 'ACTIVE',
    distanceKm: 8.2,
    rescueHistory: [
      { batchId: 'AS-DEMO-501', food: 'Poori & Aloo Sabzi', quantity: '180 meals', recipientNgo: 'Aashirwad Annakshetra', pickupTime: '3:30 PM', status: 'Delivered' }
    ],
    weeklyPattern: [
      { day: 'Mon', surplusLevel: 'Moderate', estimatedMeals: 160 },
      { day: 'Tue', surplusLevel: 'High', estimatedMeals: 190 },
      { day: 'Wed', surplusLevel: 'High', estimatedMeals: 200 },
      { day: 'Thu', surplusLevel: 'Moderate', estimatedMeals: 170 },
      { day: 'Fri', surplusLevel: 'Peak', estimatedMeals: 230 },
      { day: 'Sat', surplusLevel: 'Low', estimatedMeals: 100 },
      { day: 'Sun', surplusLevel: 'Low', estimatedMeals: 80 }
    ],
    analytics: {
      productionVolume: '15,400 meals/wk',
      potentialSurplus: '1,130 meals/wk',
      rescuedFood: '1,050 meals/wk',
      unrecoveredSurplus: '80 meals/wk'
    },
    isDemo: true
  },
  {
    id: 'src-006',
    name: 'Royal Heritage Caterers & Events',
    type: 'Caterer',
    location: 'Kelarash, Shahpura',
    city: 'Bhopal',
    contactPerson: 'Vikramaditya Singh',
    contactNumber: '+91 98930 77889',
    operatingHours: '10:00 AM – 12:00 AM',
    mealsPerDay: 1800,
    kitchenCapacity: '3,500 meals / event',
    foodCategories: ['Indian Meals', 'Rice', 'Dal', 'Bakery', 'Prepared Meals', 'Other'],
    typicalSurplus: '250–400 meals',
    surplusWindow: '10:00 PM – 12:00 AM (Late Night)',
    pickupAvailability: 'Late Night Emergency Dispatch',
    status: 'RESCUE READY',
    distanceKm: 3.5,
    currentSurplus: {
      food: 'Grand Wedding Reception Buffet Leftover (Dal Makhani, Pulao, Paneer)',
      quantity: '310 meals (~155 kg)',
      preparedAt: '8:00 PM',
      eligibilityWindow: '5 Hours Remaining',
      status: 'Eligible'
    },
    rescueHistory: [
      { batchId: 'AS-DEMO-601', food: 'Shahi Paneer & Naan', quantity: '350 meals', recipientNgo: 'Annapurna Rural Aid', pickupTime: '11:30 PM', status: 'Delivered' }
    ],
    weeklyPattern: [
      { day: 'Mon', surplusLevel: 'Low', estimatedMeals: 80 },
      { day: 'Tue', surplusLevel: 'Low', estimatedMeals: 60 },
      { day: 'Wed', surplusLevel: 'Moderate', estimatedMeals: 120 },
      { day: 'Thu', surplusLevel: 'Moderate', estimatedMeals: 150 },
      { day: 'Fri', surplusLevel: 'Peak', estimatedMeals: 380 },
      { day: 'Sat', surplusLevel: 'Peak', estimatedMeals: 450 },
      { day: 'Sun', surplusLevel: 'Peak', estimatedMeals: 420 }
    ],
    analytics: {
      productionVolume: '12,600 meals/wk',
      potentialSurplus: '1,660 meals/wk',
      rescuedFood: '1,550 meals/wk',
      unrecoveredSurplus: '110 meals/wk'
    },
    isDemo: true
  }
];
