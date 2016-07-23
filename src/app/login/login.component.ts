import {Component, OnInit} from '@angular/core';
import {Button, InputText, Password, Messages, Message} from 'primeng/primeng';
import {Router} from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'as-login',
  templateUrl: 'app/login/login.html',
  styleUrls: [
    'app/login/login.css'
  ],
  directives: [Button, InputText, Password, Messages],
  providers: [UserService]
})

export class LoginComponent implements OnInit {

  name: string;
  password: string;

  msgs: Message[] = [];

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    if (sessionStorage.getItem('loggedIn') === 'true') {
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
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
        sessionStorage.setItem('loggedIn', 'true');
        console.log('user logged in ' + this.name);
        this.router.navigate(['/customers']);
      },
      error => {
        console.log(error);
        this.showError('Authetication failed', error);
      });
  }


}
