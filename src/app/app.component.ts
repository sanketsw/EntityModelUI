import {CONSTANTS} from './shared';
import {Component, AfterViewInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Router} from '@angular/router';
import { CustomerService } from './services/customer.service';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { MessageService } from './services/message.service';
// import {NavbarComponent} from './navbar/navbar.component';


declare var Modena: any;


@Component({
  selector: 'as-main-app',
  templateUrl: 'app/app.html',
  directives: [/* NavbarComponent, */ ROUTER_DIRECTIVES],
  providers: [CustomerService, ProductService, MessageService, UserService]
})
export class AppComponent implements AfterViewInit {

  public appBrand: string;

  constructor(private router: Router,
    private productService: ProductService,
    private customerService: CustomerService,
    private messageService: MessageService,
    private userService: UserService) {
    this.appBrand = CONSTANTS.MAIN.APP.BRAND;

  }

  userLoggedIn(): boolean {
    return this.userService.getLoggedUser() != null;
  }

  ngAfterViewInit() {
    Modena.init();
  }

  cleanup() {
    this.productService.clear();
    this.messageService.clear();
    this.customerService.clear();
    this.router.navigate(['/']);
  }

  logout() {
    this.userService.logout();
    console.log('user logged out ');
    this.router.navigate(['/']);
  }
}
