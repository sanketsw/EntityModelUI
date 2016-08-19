import { GrowthUpdate } from './GrowthUpdate';

export interface Baby {
  crn?: string;
  name?: string;
  dob?: string;
  birthLocation?: string;

  growthUpdates?: GrowthUpdate[];
}

export interface BabyParentLink {
  baby_crn: string;
  parent_crn?: string;
  role?: string;
}
