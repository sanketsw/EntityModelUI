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
declare var amplify: any;



@Component({
  selector: 'as-plandetail',
  templateUrl: 'app/planDetail/planDetail.html',
  styleUrls: [
    'app/planDetail/planDetail.css'
  ],
  directives: [Button, InputTextarea, Password, Panel, Dropdown],
  providers: [ProductService, ActionService, CustomerService, MessageService]

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

  nonCustomer() {
    return this.user.role !== 'Customer';
  }

  constructor(private router: Router,
    private productService: ProductService,
    private actionService: ActionService,
    private customerService: CustomerService,
    private messageService: MessageService) {
    // amplify.store('loggedIn', 'false');
  }


  ngOnInit() {

    this.user = JSON.parse(amplify.store('loggedUser'));
    this.customer = JSON.parse(amplify.store('customer'));
    this.productService.getProductsInCurrentPlan(this.customer.name).then(productsMap => {
      this.products = productsMap.products;
      this.productService.getSubscriptionSummary(productsMap).then(summary => {
        this.customer.revenue = summary.initialPrice;
        this.customer.difference = summary.difference;
        this.productService.getProductsInNewPlan(this.customer.name).then(newProductsMap => {
          this.productService.getSubscriptionSummary(newProductsMap).then(newsummary =>
            this.customer.newPlanDifference = newsummary.currentPrice - this.customer.revenue);
          this.newProducts = newProductsMap.products;
        });
      });
    });
    this.actionService.getActions(this.user.role).then(actions => {
      this.actions = actions;
      this.selectedAction = actions[0].value;
    });
  }

  back() {
    if (this.customer.status) {
      this.router.navigate(['/customerDetail']);
    } else {
      this.router.navigate(['/product-planner']);
    }
  }

  modify() {
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
    if (this.selectedAction === 'Escalate to Pricer') {
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

    amplify.store('customer', JSON.stringify(this.customer));
    this.router.navigate(['/customerDetail']);
  }

}
