import { Injectable } from '@angular/core';
import { ACTIONS_EXEC, ACTIONS_CUSTOMER, ACTIONS_PRICER } from './actions';

// Don't forget the parentheses! Neglecting them leads to an error that's difficult to diagnose.
@Injectable()
export class ActionService {
  getActions(role: string) {
    if (role === 'Exec') {
      return Promise.resolve(ACTIONS_EXEC);
    } else if (role === 'Customer') {
      return Promise.resolve(ACTIONS_CUSTOMER);
    } else {
      return Promise.resolve(ACTIONS_PRICER);
    }
  }
}
