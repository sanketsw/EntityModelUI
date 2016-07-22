import { Injectable } from '@angular/core';
import { CUSTOMERS } from './mock-customers';
import { Customer } from '../model/customer';

// Don't forget the parentheses! Neglecting them leads to an error that's difficult to diagnose.
@Injectable()
export class CustomerService {
  getCustomers() {
    let customers: Customer[] = JSON.parse(localStorage.getItem('customers'));
    console.log('customers');
    console.log(customers);
    if (customers != null && customers.length > 0) {
      return Promise.resolve(customers);
    } else {
      localStorage.setItem('customers', JSON.stringify(CUSTOMERS));
      return Promise.resolve(CUSTOMERS);
    }
  }

  updateCustomer(customer: Customer) {
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
      localStorage.setItem('customers', JSON.stringify(newList));
    });
  }
}
