import {Component, OnInit} from '@angular/core';
import {Button, InputText, Password, Panel, DataList} from 'primeng/primeng';
import {Router} from '@angular/router';

import { CustomerService } from '../services/customer.service';
import { Customer } from '../model/customer';
import { User } from '../model/user';


@Component({
  selector: 'as-customers',
  templateUrl: 'app/customers/customers.html',
  styleUrls: [
    'app/customers/customers.css'
  ],
  directives: [Button, InputText, Password, Panel, DataList],
  providers: [CustomerService]
})

export class CustomersComponent implements OnInit {

  customers: Customer[];

  selectedCustomer: Customer;

  constructor(private router: Router, private customerService: CustomerService) {
    // sessionStorage.setItem('loggedIn', 'false');
  }


  ngOnInit() {
    let user: User = JSON.parse(sessionStorage.getItem('loggedUser'));
    this.customerService.getCustomers().then(customers => {
      if (user.role === 'Pricer') {
        let filterList: Customer[] = [];
        for (let c of customers) {
          if (c.actionOwner === 'Pricer') {
            filterList.push(c);
          }
        }
        customers = filterList;
      }
      this.customers = customers;
    });
  }

  viewCustomer(customer: Customer) {
    this.selectedCustomer = customer;
    sessionStorage.setItem('customer', JSON.stringify(this.selectedCustomer));
    this.router.navigate(['/customerDetail']);
  }


}
