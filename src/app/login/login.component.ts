import {Component} from '@angular/core';
import {Button, InputText, Password} from 'primeng/primeng';
import {Router} from '@angular/router';


@Component({
  selector: 'as-login',
  templateUrl: 'app/login/login.html',
  styleUrls: [
    'app/login/login.css'
  ],
  directives: [Button, InputText, Password]
})

export class LoginComponent {

  name: string;
  password: string;

  constructor(private router: Router) {
    sessionStorage.setItem('loggedIn', 'false');
  }

  login() {
    sessionStorage.setItem('loggedIn', 'true');
    console.log('user logged in ' + this.name);
    this.router.navigate(['/customers']);
  }


}
