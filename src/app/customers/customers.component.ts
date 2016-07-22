import {Component, OnInit} from '@angular/core';
import {Button, InputText, Password, Panel, DataList} from 'primeng/primeng';
import {Router} from '@angular/router';

import { CustomerService } from '../services/customer.service';
import { Customer } from '../model/customer';


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
    this.customerService.getCustomers().then(customers => this.customers = customers);
  }

  viewCustomer(customer: Customer) {
      this.selectedCustomer = customer;
      localStorage.setItem('customer', JSON.stringify(this.selectedCustomer));
      this.router.navigate(['/customerDetail']);
  }


}
