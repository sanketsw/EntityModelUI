import { Injectable } from '@angular/core';
import { CUSTOMERS } from './mock-customers';
import { Customer } from '../model/customer';
declare var amplify: any;

// let amplify = require('amplify-1.1.2');
// let amplify = require('/assets/amplify-1.1.2/individual/amplify.core.js');
// require('/assets/amplify-1.1.2/individual/amplify.store.js');

// Don't forget the parentheses! Neglecting them leads to an error that's difficult to diagnose.
@Injectable()
export class CustomerService {
  getCustomers() {
    console.log('customers' + amplify.store('customers'));
    let customers: Customer[] = JSON.parse(amplify.store('customers') === undefined ? null : amplify.store('customers'));
    console.log('customers');
    console.log(customers);
    if (customers === null || customers.length < 1) {
      console.log('Get from mock customers array');
      customers = CUSTOMERS;
      amplify.store('customers', JSON.stringify(CUSTOMERS));
    }
    return Promise.resolve(customers);
  }

  getCustomer(name: string) {
    return this.getCustomers().then(customers => {
      for (let c of customers) {
        if (c.name === name) {
          return Promise.resolve(c);
        }
      }
    });

  }

  updateCustomer(customer: Customer) {
    console.log('updateCustomer');
    this.getCustomers().then(customers => {
      console.log('customers');
      console.log(customers);
      let current: Customer[] = customers;
      let newList: Customer[] = [];
      for (let c of current) {
        if (c.name === customer.name) {
          newList.push(customer);
        } else {
          newList.push(c);
        }
      }
      console.log('newList');
      console.log(newList);
      amplify.store('customers', JSON.stringify(newList));
    });
  }

  clear() {
    amplify.store('customers', null);
  }
}
