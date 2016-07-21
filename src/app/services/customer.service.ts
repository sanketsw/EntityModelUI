import { Injectable } from '@angular/core';
import { CUSTOMERS } from './mock-customers';

// Don't forget the parentheses! Neglecting them leads to an error that's difficult to diagnose.
@Injectable()
export class CustomerService {
    getCustomers() {
        return Promise.resolve(CUSTOMERS);
    }
}
