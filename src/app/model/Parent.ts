import { Address } from './Address';

export interface Parent {
  crn?: string;
  name?: string;
  dob?: string;
  email?: string;
  phone?: string;

  addresss?: Address[];
}
