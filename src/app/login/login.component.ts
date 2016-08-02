import {Component, OnInit} from '@angular/core';
import {Button, InputText, Password, Messages, Message} from 'primeng/primeng';
import {Router} from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { CustomerService } from '../services/customer.service';
declare var amplify: any;



@Component({
  selector: 'as-login',
  templateUrl: 'app/login/login.html',
  styleUrls: [
    'app/login/login.css'
  ],
  directives: [Button, InputText, Password, Messages],
  providers: [UserService, CustomerService]
})

export class LoginComponent implements OnInit {

  name: string;
  password: string;

  msgs: Message[] = [];

  constructor(private router: Router, private userService: UserService, private customerService: CustomerService) {
  }

  ngOnInit() {
    if (this.userService.getLoggedUser() != null) {
      this.navigateToLandingPage(this.userService.getLoggedUser());
    }
  }

  navigateToLandingPage(user: User) {
    if (user.role === 'Customer') {
      this.customerService.getCustomer(user.customer).then(customer => {
        amplify.store('customer', JSON.stringify(customer));
        this.router.navigate(['/customerDetail']);
      });
    } else {
      this.router.navigate(['/customers']);
    }
  }

  showError(summary: string, detail: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: summary, detail: detail });
  }

  login() {
    this.userService.autheticateUser(this.name, this.password).then(
      user => {
        console.log('user logged in ' + this.name);
        this.navigateToLandingPage(user);
      },
      error => {
        console.log(error);
        this.showError('Authetication failed', error);
      });
  }


}
