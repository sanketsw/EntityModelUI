import {Component, OnInit} from '@angular/core';
import {Button, InputText, Password, Panel, DataList} from 'primeng/primeng';
import {Router} from '@angular/router';

import { CustomerService } from '../services/customer.service';
import { Customer } from '../model/customer';


@Component({
  selector: 'as-product-planner',
  templateUrl: 'app/product-planner/product-planner.html',
  styleUrls: [
    'app/product-planner/product-planner.css'
  ],
  directives: [Button, InputText, Password, Panel, DataList],
  providers: [CustomerService]
})

export class ProductPlannerComponent implements OnInit {

  customers: Customer[];

  selectedCustomer: Customer;

  constructor(private router: Router, private customerService: CustomerService) {
    // sessionStorage.setItem('loggedIn', 'false');
  }


  ngOnInit() {
    this.customerService.getCustomers().then(customers => this.customers = customers);
  }

  selectCustomer(customer: Customer) {
    this.selectedCustomer = customer;
  }


}
