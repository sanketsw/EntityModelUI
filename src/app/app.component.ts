import {CONSTANTS} from './shared';
import {Component, AfterViewInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Router} from '@angular/router';
// import {NavbarComponent} from './navbar/navbar.component';

declare var Modena: any;

@Component({
  selector: 'as-main-app',
  templateUrl: 'app/app.html',
  directives: [/* NavbarComponent, */ ROUTER_DIRECTIVES]
})
export class AppComponent implements AfterViewInit {

  public appBrand: string;

  constructor(private router: Router) {
    this.appBrand = CONSTANTS.MAIN.APP.BRAND;

  }

  userLoggedIn(): boolean {
    return sessionStorage.getItem('loggedIn') === 'true';
  }

  ngAfterViewInit() {
    Modena.init();
  }

  cleanup() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  logout() {
    sessionStorage.setItem('loggedIn', 'false');
    console.log('user logged out ');
    this.router.navigate(['/']);
  }
}
