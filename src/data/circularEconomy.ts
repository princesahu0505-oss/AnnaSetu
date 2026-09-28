export interface CircularPathway {
  id: string;
  name: string;
  description: string;
  eligibilityCriteria: string;
  status: 'ACTIVE' | 'POTENTIAL' | 'FUTURE';
  isDemo: boolean;
  futureCapability: boolean;
}

export const CIRCULAR_PATHWAYS: CircularPathway[] = [
  {
    id: 'path-01',
    name: 'Human Consumption',
    description: 'Surplus food meeting stringent safety standards redistributed to registered NGOs.',
    eligibilityCriteria: 'Meets AnnaSetu safety/quality verification.',
    status: 'ACTIVE',
    isDemo: true,
    futureCapability: false
  },
  {
    id: 'path-02',
    name: 'Animal Feed',
    description: 'Appropriate food surplus diverted to authorized animal husbandry or feed facilities.',
    eligibilityCriteria: 'Legally/operationally permitted per local regulations.',
    status: 'POTENTIAL',
    isDemo: true,
    futureCapability: true
  },
  {
    id: 'path-03',
    name: 'Compost / Organic Recovery',
    description: 'Food unsuitable for consumption but appropriate for nutrient recovery via composting.',
    eligibilityCriteria: 'Non-contaminated organic matter.',
    status: 'POTENTIAL',
    isDemo: true,
    futureCapability: true
  },
  {
    id: 'path-04',
    name: 'Biogas / Energy Recovery',
    description: 'Organic waste processed for anaerobic digestion to generate renewable energy.',
    eligibilityCriteria: 'Infrastructure availability.',
    status: 'FUTURE',
    isDemo: true,
    futureCapability: true
  }
];
