import type { RescueBatch } from './rescueBatches';
import { INITIAL_RESCUE_BATCHES } from './rescueBatches';
import { INITIAL_NGOS } from './ngos';

export interface TraceabilityEvent {
  id: string;
  passportId: string;
  eventType: 'BATCH_CREATED' | 'ELIGIBILITY_REVIEWED' | 'NGO_MATCHED' | 'PICKUP_ASSIGNED' | 'DRIVER_EN_ROUTE' | 'ARRIVED_AT_SOURCE' | 'PICKED_UP' | 'DELIVERED';
  timestamp: string;
  actor: string;
  locationLabel: string;
  description: string;
  status: string;
}

export interface FoodPassport {
  passportId: string;
  batchId: string;
  foodItem: string;
  foodCategory: string;
  quantity: number;
  unit: string;
  foodSourceId: string;
  foodSourceName: string;
  preparationDate: string;
  preparationTime: string;
  storageCondition: string;
  pickupDeadline: string;
  eligibilityStatus: string;
  eligibilityReviewedAt: string;
  eligibilityReviewedBy: string;
  ngoId?: string;
  ngoName?: string;
  matchedAt?: string;
  logisticsStatus: string;
  pickupAssignedAt?: string;
  pickedUpAt?: string;
  deliveredAt?: string;
  createdAt: string;
  events: TraceabilityEvent[];
  isDemo: boolean;
}

export function generatePassportsFromRescueBatches(): FoodPassport[] {
  return INITIAL_RESCUE_BATCHES.map((b: RescueBatch, index: number) => {
    const passportNum = String(index + 1).padStart(4, '0');
    const passportId = `AFP-2026-${passportNum}`;
    const matchedNgo = INITIAL_NGOS[index % INITIAL_NGOS.length];

    const isEligible = b.status === 'Eligible';
    const isUnderReview = b.status === 'Under Review';
    const isMatched = isEligible || isUnderReview;

    const events: TraceabilityEvent[] = [
      {
        id: `ev-${passportId}-1`,
        passportId,
        eventType: 'BATCH_CREATED',
        timestamp: `${b.preparationDate}, ${b.preparedAt}`,
        actor: b.foodSourceName,
        locationLabel: b.foodSourceName,
        description: `Rescue batch ${b.batchId} created for ${b.foodItem} (${b.quantity} ${b.unit}).`,
        status: 'Created'
      },
      {
        id: `ev-${passportId}-2`,
        passportId,
        eventType: 'ELIGIBILITY_REVIEWED',
        timestamp: `${b.preparationDate}, 15 mins post-prep`,
        actor: b.verifiedBy || 'Authorized Kitchen Supervisor',
        locationLabel: b.foodSourceName,
        description: `AI-assisted screening completed. Status marked as: ${b.status}.`,
        status: b.status
      }
    ];

    if (isMatched) {
      events.push({
        id: `ev-${passportId}-3`,
        passportId,
        eventType: 'NGO_MATCHED',
        timestamp: `${b.preparationDate}, 30 mins post-prep`,
        actor: 'AnnaSetu Matching Engine',
        locationLabel: matchedNgo.name,
        description: `Matched with recipient organization ${matchedNgo.name} based on capacity and distance.`,
        status: 'Matched'
      });
      events.push({
        id: `ev-${passportId}-4`,
        passportId,
        eventType: 'PICKUP_ASSIGNED',
        timestamp: `${b.preparationDate}, 45 mins post-prep`,
        actor: 'Fleet Dispatcher',
        locationLabel: 'Bhopal Transport Hub',
        description: 'Assigned to EV Cold-Chain Fleet Unit with optimal temperature monitoring.',
        status: 'Pickup Assigned'
      });
    }

    if (b.status === 'Eligible') {
      events.push({
        id: `ev-${passportId}-5`,
        passportId,
        eventType: 'PICKED_UP',
        timestamp: b.pickupDeadline,
        actor: 'EV Fleet Driver',
        locationLabel: matchedNgo.name,
        description: `Successfully collected from ${b.foodSourceName} and verified in transit.`,
        status: 'Picked Up'
      });
    }

    return {
      passportId,
      batchId: b.batchId,
      foodItem: b.foodItem,
      foodCategory: b.category,
      quantity: b.quantity,
      unit: b.unit,
      foodSourceId: b.foodSourceId,
      foodSourceName: b.foodSourceName,
      preparationDate: b.preparationDate,
      preparationTime: b.preparedAt,
      storageCondition: b.storageCondition,
      pickupDeadline: b.pickupDeadline,
      eligibilityStatus: b.status,
      eligibilityReviewedAt: `${b.preparationDate}, 15 mins post-prep`,
      eligibilityReviewedBy: b.verifiedBy || 'Kitchen Supervisor',
      ngoId: matchedNgo.id,
      ngoName: matchedNgo.name,
      matchedAt: `${b.preparationDate}, 30 mins post-prep`,
      logisticsStatus: b.status === 'Eligible' ? 'Picked Up' : 'Pickup Assigned',
      pickupAssignedAt: `${b.preparationDate}, 45 mins post-prep`,
      pickedUpAt: b.status === 'Eligible' ? b.pickupDeadline : undefined,
      createdAt: `${b.preparationDate}, ${b.preparedAt}`,
      events,
      isDemo: true
    };
  });
}
