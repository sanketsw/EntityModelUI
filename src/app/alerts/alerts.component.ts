import {Component, OnInit} from '@angular/core';
import {Button, InputText, Password, Panel, DataList} from 'primeng/primeng';
import {Router} from '@angular/router';

import { Customer } from '../model/customer';
import { MessageService } from '../services/message.service';
import { CustomerService } from '../services/customer.service';
import { Message } from '../model/message';
import { User } from '../model/user';
declare var amplify: any;



@Component({
  selector: 'as-alerts',
  templateUrl: 'app/alerts/alerts.html',
  styleUrls: [
    'app/alerts/alerts.css'
  ],
  directives: [Button, InputText, Password, Panel, DataList],
  providers: [MessageService, CustomerService]
})

export class AlertsComponent implements OnInit {

  customer: Customer;

  messages: Message[];



  constructor(private router: Router, private messageService: MessageService, private customerService: CustomerService) {
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


  ngOnInit() {
    let user: User = JSON.parse(amplify.store('loggedUser'));
    this.customer = JSON.parse(amplify.store('customer'));
    if (user.role === 'Customer') {
        this.messageService.getMessagesForCustomer(this.customer.name).then(messages => {
          this.messages = messages.reverse();
        });
    } else {
      this.messageService.getMessages().then(messages => {
        this.messages = messages.reverse();
      });
    }
  }

  back() {
    this.router.navigate(['/customers']);
  }

  toCustomer(message: Message) {
    console.log(message);
    this.customerService.getCustomer(message.customer).then(customer => {
      console.log(customer);
      amplify.store('customer', JSON.stringify(customer));
      this.router.navigate(['/customerDetail']);
    });
  }
}
