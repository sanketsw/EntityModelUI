import {Component, OnInit} from '@angular/core';
import {Button, InputText, Password, Panel, OverlayPanel} from 'primeng/primeng';
import {Router} from '@angular/router';

import { Customer } from '../model/customer';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product';
import { MessageService } from '../services/message.service';
import { Message } from '../model/message';
import { User } from '../model/user';
declare var amplify: any;



@Component({
  selector: 'as-customerdetail',
  templateUrl: 'app/customerDetail/customerDetail.html',
  styleUrls: [
    'app/customerDetail/customerDetail.css'
  ],
  directives: [Button, InputText, Password, Panel, OverlayPanel],
  providers: [ProductService, MessageService]
})

export class CustomerDetailComponent implements OnInit {

  customer: Customer;

  products: Product[];

  messages: Message[];

  user: User;

  constructor(private router: Router, private productService: ProductService, private messageService: MessageService) {
    // amplify.store('loggedIn', 'false');
  }

  getMessageColorClass(m: Message) {
    if (m.event.includes('Return')) {
      return 'Orange';
    } else if (m.event.includes('Accept')) {
      return 'Green';
    }
    return 'BoldGray';
  }

  displayUpdates() {
    return this.messages !== null && this.messages.length > 0;
  }

  nonCustomer() {
    return this.user.role !== 'Customer';
  }

  needsAction() {
    if (this.customer.actionOwner === this.user.role) {
      return true;
    }
  }

  getPlanButtonLabel() {
    let ret = 'Workout new solution';
    if (this.user.role === 'Customer') {
      if (this.user.role === this.customer.actionOwner) {
        ret = 'Explore and Take Action';
      } else {
        ret = 'Explore ' + this.customer.status + ' Solution';
      }
    } else if (this.customer.status) {
      ret = 'Edit ' + this.customer.status + ' Solution';
    }
    return ret;
  }

  displayPlanButton() {
    if (this.user.role === 'Customer' && this.customer.status === null) {
      return false;
    }
    return true;
  }



  ngOnInit() {
    window.scrollTo(0, 0);
    this.user = JSON.parse(amplify.store('loggedUser'));
    this.customer = JSON.parse(amplify.store('customer'));
    if (!this.customer.status) {
      this.customer.actionOwner = 'Exec';
    }
    this.productService.getProductsInCurrentPlan(this.customer.name).then(productsMap => {
      this.productService.getSubscriptionSummary(productsMap).then(summary => {
        this.customer.revenue = summary.initialPrice;
        this.customer.difference = summary.difference;
        this.productService.getProductsInNewPlan(this.customer.name).then(newProductsMap => {
          this.productService.getSubscriptionSummary(newProductsMap).then(newsummary =>
            this.customer.newPlanDifference = newsummary.currentPrice - this.customer.revenue);
        });
      });
      this.products = productsMap.products;
    });
    this.messages = [];
    this.messageService.getMessagesForCustomer(this.customer.name).then(messages => {
      this.messages = messages.reverse();
    });
  }

  back() {
    this.router.navigate(['/customers']);
  }

  newPlan() {
    if (this.customer.status) {
      this.router.navigate(['/planDetail']);
    } else {
      this.router.navigate(['/product-planner']);
    }
  }

}
