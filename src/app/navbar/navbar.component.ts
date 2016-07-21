import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Router} from '@angular/router';


@Component({
  selector: 'as-navbar',
  templateUrl: 'app/navbar/navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES]
})
export class NavbarComponent {
  @Input() brand: string;

  constructor(private router: Router) {
  }

  logout() {
    sessionStorage.setItem('loggedIn', 'false');
    console.log('user logged out ');
    this.router.navigate(['/']);
  }
}
