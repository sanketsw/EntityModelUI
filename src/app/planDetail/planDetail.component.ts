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
import { User } from '../model/user';


@Component({
  selector: 'as-plandetail',
  templateUrl: 'app/planDetail/planDetail.html',
  styleUrls: [
    'app/planDetail/planDetail.css'
  ],
  directives: [Button, InputTextarea, Password, Panel, Dropdown],
<<<<<<< HEAD
  providers: [ProductService, ActionService, CustomerService, MessageService]
=======
  providers: [MessageService, ProductService, ActionService, CustomerService]
>>>>>>> branch 'master' of https://github.com/sanketsw/cheetah.git
})

export class PlanDetailComponent implements OnInit {

  customer: Customer;

  products: Product[];

  newProducts: Product[];

  actions: SelectItem[];

  selectedAction: string;

  comment: string;

  user: User;

  acceptedAndCustomer() {
    return this.user.role === 'Customer' && this.customer.status === 'Accepted';
  }

  constructor(private router: Router,
    private productService: ProductService,
    private actionService: ActionService,
    private customerService: CustomerService,
    private messageService: MessageService) {
    // sessionStorage.setItem('loggedIn', 'false');
  }


  ngOnInit() {
<<<<<<< HEAD
    this.user = JSON.parse(sessionStorage.getItem('loggedUser'));
    this.customer = JSON.parse(sessionStorage.getItem('customer'));
=======
    this.customer = JSON.parse(sessionStorage.getItem('customer'));
    this.customer.difference = -1467;
>>>>>>> branch 'master' of https://github.com/sanketsw/cheetah.git
    this.productService.getProductsInCurrentPlan().then(products => this.products = products);
    this.productService.getProductsInNewPlan().then(newProducts => this.newProducts = newProducts);
    this.actionService.getActions(this.user.role).then(actions => {
      this.actions = actions;
      this.selectedAction = actions[0].value;
    });
  }

  back() {
    this.router.navigate(['/product-planner']);
  }

  submitPlan() {
    let myMessage: Message = {
      description: this.comment,
      event: this.selectedAction,
      user: this.user.name,
      role: this.user.role,
      customer: this.customer.name
    };
    this.messageService.updateMessage(myMessage);

    // TODO Time
    // TODO Send SMS to customer / pricer

    // Set customer status as proposed
    this.customer.status = 'Proposed';
    if (this.selectedAction === 'Submit to Pricer') {
      this.customer.actionOwner = 'Pricer';
    } else if (this.selectedAction === 'Submit to Customer') {
      this.customer.actionOwner = 'Customer';
    } else if (this.selectedAction === 'Accept') {
      this.customer.actionOwner = null;
      this.customer.status = 'Accepted';
    } else {
      this.customer.actionOwner = 'Exec';
    }
    this.customerService.updateCustomer(this.customer);

    sessionStorage.setItem('customer', JSON.stringify(this.customer));
    this.router.navigate(['/customerDetail']);
  }

}
