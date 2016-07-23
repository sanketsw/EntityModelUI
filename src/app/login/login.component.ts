import {Component, OnInit} from '@angular/core';
import {Button, InputText, Password} from 'primeng/primeng';
import {Router} from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'as-login',
  templateUrl: 'app/login/login.html',
  styleUrls: [
    'app/login/login.css'
  ],
  directives: [Button, InputText, Password],
  providers: [UserService]
})

export class LoginComponent implements OnInit {

  name: string;
  password: string;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    if (sessionStorage.getItem('loggedIn') === 'true') {
      this.router.navigate(['/customers']);
    }
  }

  login() {
    this.userService.autheticateUser(this.name, this.password).then(
      user => {
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
        sessionStorage.setItem('loggedIn', 'true');
        console.log('user logged in ' + this.name);
        this.router.navigate(['/customers']);
      },
      error => {
        console.log(error);
      });
  }


}
