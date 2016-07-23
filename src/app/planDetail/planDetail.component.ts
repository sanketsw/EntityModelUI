import {Component, OnInit} from '@angular/core';
import {Button, InputTextarea, Password, Panel, Dropdown, SelectItem} from 'primeng/primeng';
import {Router} from '@angular/router';

import { Customer } from '../model/customer';
import { ProductService } from '../services/product.service';
import { MessageService } from '../services/message.service';
import { CustomerService } from '../services/customer.service';
import { ActionService } from '../services/action.service';
import { Product } from '../model/product';
import { Message } from '../model/message';


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
    private customerService: CustomerService,
    private messageService: MessageService) {
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
  }

  back() {
    this.router.navigate(['/customerDetail']);
  }

  submitPlan() {
    let myMessage: Message = {
      description: this.comment,
      event: this.selectedAction,
      user: 'Sanket',
      role: 'Exec',
      customer: this.customer.name
    };
    this.messageService.updateMessage(myMessage);

    // TODO Send SMS to customer / pricer

    // Set customer status as proposed
    this.customer.status = 'Proposed';
    this.customerService.updateCustomer(this.customer);

    localStorage.setItem('customer', JSON.stringify(this.customer));
    this.router.navigate(['/customerDetail']);
  }


}
