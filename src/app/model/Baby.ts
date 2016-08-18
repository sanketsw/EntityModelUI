import { GrowthUpdate } from './GrowthUpdate';

export interface Baby {
  crn?: string;
  name?: string;
  dob?: string;
  birthLocation?: string;

  growthUpdates?: GrowthUpdate[];
  selectedGrowthUpdate?: GrowthUpdate;

  babyParentMaps?: BabyParentMap[];
  selectedBabyParentMap?: BabyParentMap;
}

export interface BabyParentMap {
  baby_crn: string;
  parent_crn?: string;
  role?: string;
}
