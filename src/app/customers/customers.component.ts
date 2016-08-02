import {Component, OnInit} from '@angular/core';
import {Button, InputText, Password, Panel, DataList} from 'primeng/primeng';
import {Router} from '@angular/router';

import { CustomerService } from '../services/customer.service';
import { Customer } from '../model/customer';
import { User } from '../model/user';
import { ProductService } from '../services/product.service';
declare var amplify: any;



@Component({
  selector: 'as-customers',
  templateUrl: 'app/customers/customers.html',
  styleUrls: [
    'app/customers/customers.css'
  ],
  directives: [Button, InputText, Password, Panel, DataList],
  providers: [CustomerService, ProductService]
})

export class CustomersComponent implements OnInit {

  customers: Customer[];

  selectedCustomer: Customer;

  user: User;

  needsAction(customer: Customer) {
    if (customer.actionOwner === this.user.role || !customer.status) {
      return true;
    }
  }

  constructor(private router: Router, private customerService: CustomerService, private productService: ProductService) {
    // amplify.store('loggedIn', 'false');
  }


  ngOnInit() {
    this.user = JSON.parse(amplify.store('loggedUser'));
    this.customerService.getCustomers().then(customers => {
      if (this.user.role === 'Pricer') {
        let filterList: Customer[] = [];
        for (let c of customers) {
          if (c.actionOwner === 'Pricer') {
            filterList.push(c);
          }
        }
        customers = filterList;
      }
      this.customers = customers;
      if (this.customers) {
        for (let c of this.customers) {
          this.productService.getProductsInCurrentPlan(c.name).then(productsMap => {
            this.productService.getSubscriptionSummary(productsMap).then(summary => {
              c.revenue = summary.initialPrice;
              c.difference = summary.difference;
              this.productService.getProductsInNewPlan(c.name).then(newProductsMap => {
                this.productService.getSubscriptionSummary(newProductsMap).then(newsummary =>
                  c.newPlanDifference = newsummary.currentPrice - c.revenue);
              });
            });
          });
        }
      }
      console.log('Loading customers');
    });
  }

  viewCustomer(customer: Customer) {
    this.selectedCustomer = customer;
    amplify.store('customer', JSON.stringify(this.selectedCustomer));
    this.router.navigate(['/customerDetail']);
  }


}
