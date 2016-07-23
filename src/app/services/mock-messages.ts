import { Message } from '../model/message';

export const COMMENTS: Message[] = [
  {
    description: 'Creating a new plan with added value services for the next year',
    event: 'Submit to Customer', user: 'Sanket', role: 'Exec', customer: 'Narco Stores'
  },
  {
    description: 'Too expensive. Please match my earlier cost',
    event: 'Return with message', user: 'Peter', role: 'Customer', customer: 'Narco Stores'
  },
  {
    description: 'Worked out a few discounts for you and modified the plan services at almost same cost ',
    event: 'Submit to Customer', user: 'Sanket', role: 'Exec', customer: 'Narco Stores'
  },
  {
    description: 'Looks good to me now. Thanks.',
    event: 'Accept', user: 'Peter', role: 'Customer', customer: 'Narco Stores'
  },

  {
    description: 'Proposing a new plan for the next year',
    event: 'Submit to Customer', user: 'Sanket', role: 'Exec', customer: 'Bombasto Traders'
  },
  {
    description: 'I want to opt for something at the same cost as this year',
    event: 'Return with message', user: 'Marla', role: 'Customer', customer: 'Bombasto Traders'
  },
  {
    description: 'The optimum plan i can work out does not matching customer requirement. Can we offer any additional discounts?',
    event: 'Submit to Pricer', user: 'Sanket', role: 'Exec', customer: 'Bombasto Traders'
  },
  {
    description: 'Worked out a few different products',
    event: 'Submit to Customer', user: 'Brad', role: 'Pricer', customer: 'Bombasto Traders'
  },
  {
    description: 'Looks good to me now. Thanks.',
    event: 'Accept', user: 'Marla', role: 'Customer', customer: 'Bombasto Traders'
  }
];
