import {CONSTANTS} from './shared';
import {Component, AfterViewInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Router} from '@angular/router';
import { BabyService } from './services/baby.service';
import { UserService } from './services/user.service';
import { ParentService } from './services/parent.service';
import { PractitionerService } from './services/practitioner.service';
// import {NavbarComponent} from './navbar/navbar.component';


declare var Modena: any;


@Component({
  selector: 'as-main-app',
  templateUrl: 'app/app.html',
  directives: [/* NavbarComponent, */ ROUTER_DIRECTIVES],
  providers: [BabyService, ParentService, PractitionerService, UserService]
})
export class AppComponent implements AfterViewInit {

  public appBrand: string;

  constructor(private router: Router,
    private parentService: ParentService,
    private babyService: BabyService,
    private practitionerService: PractitionerService,
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
    this.parentService.clear();
    this.practitionerService.clear();
    this.babyService.clear();
    this.router.navigate(['/']);
  }

  logout() {
    this.userService.logout();
    console.log('user logged out ');
    this.router.navigate(['/']);
  }
}
