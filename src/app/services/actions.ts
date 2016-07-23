import {SelectItem} from 'primeng/primeng';

export const ACTIONS_EXEC: SelectItem[] = [
  {label: 'Submitted to Customer', value: 'Submit to Customer'},
  {label: 'Submitted to Pricer', value: 'Submit to Pricer'}
];

export const ACTIONS_CUSTOMER: SelectItem[] = [
  {label: 'Accepted by Customer', value: 'Accept'},
  {label: 'Returned with comment', value: 'Return with comment'}
];

export const ACTIONS_PRICER: SelectItem[] = [
  {label: 'Submitted to Customer', value: 'Submit to Customer'},
  {label: 'Returned to Exec', value: 'Return to Exec'}
];
