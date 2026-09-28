export interface AiDemandForecastItem {
  id: string;
  category: string;
  currentPlan: number;
  expectedDemand: number;
  aiSignal: string;
  recommendation: string;
  mealPeriod: 'Breakfast' | 'Lunch' | 'Dinner';
  isDemo: true;
}

export interface ProductionRecommendationItem {
  id: string;
  foodItem: string;
  plannedQuantity: number;
  expectedDemand: number;
  recommendedQuantity: number;
  difference: number;
  aiRecommendation: string;
  actionType: 'Reduce' | 'Increase' | 'On Track' | 'Review';
  isDemo: true;
}

export interface SurplusRiskItem {
  id: string;
  foodItem: string;
  expectedDemand: number;
  plannedProduction: number;
  potentialSurplus: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  reason: string;
  recommendedAction: string;
  isDemo: true;
}

export interface AiRecommendationCard {
  id: string;
  title: string;
  category: 'DEMAND' | 'PRODUCTION' | 'INVENTORY' | 'SURPLUS' | 'RESCUE';
  priority: 'High' | 'Medium' | 'Low';
  explanation: string;
  actionText: string;
  actionTarget: string;
  explainableFactors: string[];
  isDemo: true;
}

export const MOCK_AI_OVERVIEW = {
  demandConfidence: '94.8% Demo Signal',
  productionOptimization: '12% Potential Reduction',
  surplusRiskIndex: 'Moderate (130 portions)',
  wastePreventionRate: '91.5% Target Efficiency'
};

export const MOCK_AI_DEMAND_FORECASTS: AiDemandForecastItem[] = [
  {
    id: 'df-01',
    category: 'Rice Meals (Steamed & Pulao)',
    currentPlan: 400,
    expectedDemand: 360,
    aiSignal: 'Downward trend (-10%)',
    recommendation: 'Expected lunch demand is lower than planned production. Consider reducing next batch.',
    mealPeriod: 'Lunch',
    isDemo: true
  },
  {
    id: 'df-02',
    category: 'Whole Wheat Chapati',
    currentPlan: 500,
    expectedDemand: 480,
    aiSignal: 'Stable pattern',
    recommendation: 'Demand matches historical weekday attendance closely. Maintain current batch rate.',
    mealPeriod: 'Lunch',
    isDemo: true
  },
  {
    id: 'df-03',
    category: 'Dal Tadka & Lentils',
    currentPlan: 300,
    expectedDemand: 290,
    aiSignal: 'Optimal alignment',
    recommendation: 'Minor surplus anticipated (+10 portions). Suitable for immediate rescue eligibility.',
    mealPeriod: 'Lunch',
    isDemo: true
  },
  {
    id: 'df-04',
    category: 'Vegetable Curry',
    currentPlan: 250,
    expectedDemand: 240,
    aiSignal: 'Slight surplus risk',
    recommendation: 'Current production is slightly above expected demand. Review batch quantity.',
    mealPeriod: 'Lunch',
    isDemo: true
  },
  {
    id: 'df-05',
    category: 'Breakfast Poha & Upma',
    currentPlan: 320,
    expectedDemand: 315,
    aiSignal: 'High accuracy match',
    recommendation: 'Production is optimally calibrated to morning attendance.',
    mealPeriod: 'Breakfast',
    isDemo: true
  }
];

export const MOCK_PRODUCTION_RECOMMENDATIONS: ProductionRecommendationItem[] = [
  {
    id: 'pr-01',
    foodItem: 'Steamed Rice',
    plannedQuantity: 400,
    expectedDemand: 360,
    recommendedQuantity: 370,
    difference: -30,
    aiRecommendation: 'Reduce planned production by 30 portions to prevent avoidable surplus.',
    actionType: 'Reduce',
    isDemo: true
  },
  {
    id: 'pr-02',
    foodItem: 'Dal Tadka',
    plannedQuantity: 300,
    expectedDemand: 290,
    recommendedQuantity: 295,
    difference: -5,
    aiRecommendation: 'Slight reduction recommended based on weather and historical consumption.',
    actionType: 'Review',
    isDemo: true
  },
  {
    id: 'pr-03',
    foodItem: 'Vegetable Curry',
    plannedQuantity: 250,
    expectedDemand: 240,
    recommendedQuantity: 245,
    difference: -5,
    aiRecommendation: 'Maintain close monitoring; minor adjustment sufficient.',
    actionType: 'On Track',
    isDemo: true
  },
  {
    id: 'pr-04',
    foodItem: 'Whole Wheat Chapati',
    plannedQuantity: 500,
    expectedDemand: 480,
    recommendedQuantity: 490,
    difference: -10,
    aiRecommendation: 'Reduce by 10 portions to align with dining hall headcounts.',
    actionType: 'Reduce',
    isDemo: true
  }
];

export const MOCK_SURPLUS_RISKS: SurplusRiskItem[] = [
  {
    id: 'sr-01',
    foodItem: 'Steamed Rice',
    expectedDemand: 360,
    plannedProduction: 400,
    potentialSurplus: 40,
    riskLevel: 'HIGH',
    reason: 'Production exceeds expected demand by 11%. Historical attendance suggests lower weekend pickup.',
    recommendedAction: 'Apply AI production reduction before cooking phase begins.',
    isDemo: true
  },
  {
    id: 'sr-02',
    foodItem: 'Whole Wheat Chapati',
    expectedDemand: 480,
    plannedProduction: 500,
    potentialSurplus: 20,
    riskLevel: 'MEDIUM',
    reason: 'Demand variability detected in recent demo pattern for Thursday service.',
    recommendedAction: 'Review batch size or queue for afternoon NGO match.',
    isDemo: true
  },
  {
    id: 'sr-03',
    foodItem: 'Fresh Tomatoes & Dairy (FEFO)',
    expectedDemand: 0,
    plannedProduction: 0,
    potentialSurplus: 15,
    riskLevel: 'HIGH',
    reason: 'Inventory items expiring within 24-48 hours require immediate prioritization in cooking.',
    recommendedAction: 'Route expiring stock to current meal preparation cycle.',
    isDemo: true
  }
];

export const MOCK_AI_RECOMMENDATIONS: AiRecommendationCard[] = [
  {
    id: 'rec-01',
    title: 'Review lunch production for potential surplus',
    category: 'PRODUCTION',
    priority: 'High',
    explanation: 'Projected demand is lower than planned production by ~12%. Adjusting batch size prevents avoidable surplus.',
    actionText: 'Adjust Production',
    actionTarget: 'overview',
    explainableFactors: [
      'Expected demand is lower than planned production',
      'Current inventory is sufficient for adjusted batch',
      'Similar demo demand pattern shows lower requirement',
      'Reducing production lowers potential surplus risk'
    ],
    isDemo: true
  },
  {
    id: 'rec-02',
    title: 'Use ingredients with earlier expiry first (FEFO)',
    category: 'INVENTORY',
    priority: 'High',
    explanation: 'Tomatoes and Full Cream Milk have <2 days remaining. Prioritize them in the upcoming cooking cycle.',
    actionText: 'View Inventory',
    actionTarget: 'inventory',
    explainableFactors: [
      'Expiry date proximity (Under 48 hours)',
      'Storage type verification (Refrigerated)',
      'FEFO priority ranking set to HIGH',
      'Minimizes raw ingredient spoilage'
    ],
    isDemo: true
  },
  {
    id: 'rec-03',
    title: 'Potential surplus detected in afternoon batch',
    category: 'SURPLUS',
    priority: 'Medium',
    explanation: 'Estimated 130 meals of wholesome surplus expected at 2:30 PM. Prepare for seamless NGO matching.',
    actionText: 'Review Surplus',
    actionTarget: 'surplus',
    explainableFactors: [
      'Difference between planned and expected demand',
      'Historical afternoon surplus pattern',
      'Available redistribution window'
    ],
    isDemo: true
  },
  {
    id: 'rec-04',
    title: 'Optimize donor-recipient matching timing',
    category: 'RESCUE',
    priority: 'Medium',
    explanation: 'Pre-matching surplus with nearby NGO partners 60 minutes before batch closure improves rescue success.',
    actionText: 'Open NGO Matching',
    actionTarget: 'ngo-matching',
    explainableFactors: [
      'Transit distance & EV route efficiency',
      'NGO daily capacity and meal preference',
      'Safe shelf-life eligibility window'
    ],
    isDemo: true
  }
];

export const MOCK_PIPELINE_STAGES = [
  {
    step: '01',
    title: 'FOOD SOURCE',
    desc: 'Origin establishment registering capacity, menu profile, and daily meal output.',
    target: 'food-sources'
  },
  {
    step: '02',
    title: 'INVENTORY',
    desc: 'Tracking raw stock, expiry dates, and FEFO priority to prevent spoilage.',
    target: 'inventory'
  },
  {
    step: '03',
    title: 'DEMAND SIGNALS',
    desc: 'Aggregating institutional attendance, historical patterns, and meal trends.',
    target: 'ai-foodloop'
  },
  {
    step: '04',
    title: 'AI ANALYSIS',
    desc: 'Evaluating demand vs. production variance using explainable demo logic.',
    target: 'ai-foodloop'
  },
  {
    step: '05',
    title: 'PRODUCTION RECOMMENDATION',
    desc: 'Suggesting optimized batch quantities to eliminate avoidable waste.',
    target: 'overview'
  },
  {
    step: '06',
    title: 'SURPLUS RISK',
    desc: 'Detecting potential surplus early for proactive rescue planning.',
    target: 'surplus'
  },
  {
    step: '07',
    title: 'RESCUE ACTION',
    desc: 'Matching wholesome surplus with verified NGOs and dispatching zero-emission transit.',
    target: 'ngo-matching'
  }
];
