import { User } from '../model/user';

export const USERS: User[] = [
  {
    id: '11', name: 'Sanket', email: 'sanket@exanmple.org', phone: '057698494', role: 'Exec',
    username: 'sanket', password: 'ibm16'
  },
  {
    id: '12', name: 'Peter', email: 'peter@exanmple.org', phone: '057698494', role: 'Customer', customer: 'Narco Stores',
    username: 'peter', password: 'ibm16'
  },
  {
    id: '12', name: 'Marla', email: 'peter@exanmple.org', phone: '057698494', role: 'Customer', customer: 'Bombasto Traders',
    username: 'marla', password: 'ibm16'
  },
  {
    id: '13', name: 'Brad', email: 'brad@exanmple.org', phone: '057698494', role: 'Pricer',
    username: 'brad', password: 'ibm16'
  }
];
