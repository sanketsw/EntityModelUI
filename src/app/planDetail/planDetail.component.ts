import {Component, OnInit} from '@angular/core';
import {Button, InputTextarea, Password, Panel, Dropdown, SelectItem} from 'primeng/primeng';
import {Router} from '@angular/router';

import { Customer } from '../model/customer';
import { ProductService } from '../services/product.service';
import { CustomerService } from '../services/customer.service';
import { ActionService } from '../services/action.service';
import { Product } from '../model/product';
import { Comment } from '../model/comment';


@Component({
  selector: 'as-plandetail',
  templateUrl: 'app/planDetail/planDetail.html',
  styleUrls: [
    'app/planDetail/planDetail.css'
  ],
  directives: [Button, InputTextarea, Password, Panel, Dropdown],
  providers: [ProductService, ActionService, CustomerService]
})

export class PlanDetailComponent implements OnInit {

  customer: Customer;

  products: Product[];

  newProducts: Product[];

  actions: SelectItem[];

  selectedAction: string;

  comment: string;

  constructor(private router: Router,
    private productService: ProductService,
    private actionService: ActionService,
    private customerService: CustomerService) {
    // sessionStorage.setItem('loggedIn', 'false');
  }


  ngOnInit() {
    this.customer = JSON.parse(localStorage.getItem('customer'));
    this.customer.difference = -1467;
    this.productService.getProductsInCurrentPlan().then(products => this.products = products);
    this.productService.getProductsInNewPlan().then(newProducts => this.newProducts = newProducts);
    this.actionService.getActions('Exec').then(actions => {
      this.actions = actions;
      this.selectedAction = actions[0].value;
    });
    sessionStorage.setItem('loggedIn', 'false');

  }

  back() {
    this.router.navigate(['/customerDetail']);
  }

  submitPlan() {
    let comment: Comment = {
      description: this.comment,
      event: this.selectedAction,
      user: 'Brad'
    };
    let comments: Comment[] = JSON.parse(localStorage.getItem('comments'));
    if (comments == null) {
      comments = [];
    }
    comments.push(comment);

    localStorage.setItem('comments', JSON.stringify(comments));

    // Send SMS to customer / pricer

    // Set customer status as proposed
    this.customer.status = 'Proposed';
    localStorage.setItem('customer', JSON.stringify(this.customer));

    this.customerService.updateCustomer(this.customer);

    this.router.navigate(['/customerDetail']);
  }


}
