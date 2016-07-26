import { Customer } from '../model/customer';

export const CUSTOMERS: Customer[] = [
  {
    id: '14', name: 'Herald Sun', revenue: 175960, expiry: 32, difference: -15769, newPlanDifference: 8700,
    status: null, actionOwner: 'Exec'
  },
  {
    id: '12', name: 'Narco Stores', revenue: 199751, expiry: 45, difference: -16020, newPlanDifference: 21777,
    status: 'Accepted', actionOwner: null
  },
  {
    id: '13', name: 'Bombasto Traders', revenue: 164923, expiry: 62, difference: -20689, newPlanDifference: 25000,
    status: 'Proposed', actionOwner: 'Pricer'
  },
  {
    id: '11', name: 'Rhumbas', revenue: 145829, expiry: 115, difference: -14670, newPlanDifference: 4000,
    status: null, actionOwner: 'Exec'
  },

];
