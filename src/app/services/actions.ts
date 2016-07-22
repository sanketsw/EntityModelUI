import {SelectItem} from 'primeng/primeng';

export const ACTIONS_EXEC: SelectItem[] = [
  { label: 'Submit to Customer', value: 'Submit to Customer' },
  { label: 'Submit to Pricer', value: 'Submit to Pricer' }
];

export const ACTIONS_CUSTOMER: SelectItem[] = [
  { label: 'Accept', value: 'Accept' },
  { label: 'Return with comment', value: 'Return with comment' }
];

export const ACTIONS_PRICER: SelectItem[] = [
  { label: 'Submit to Customer', value: 'Submit to Customer' },
  { label: 'Return to Exec', value: 'Return to Exec' }
];
