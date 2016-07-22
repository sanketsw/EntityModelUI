import {Component, OnInit} from '@angular/core';
import {Button, InputText, Password, Panel, DataList} from 'primeng/primeng';
import {Router} from '@angular/router';

import { Customer } from '../model/customer';


@Component({
  selector: 'as-customerdetail',
  templateUrl: 'app/customerDetail/customerDetail.html',
  styleUrls: [
    'app/customerDetail/customerDetail.css'
  ],
  directives: [Button, InputText, Password, Panel, DataList]
})

export class CustomerDetailComponent implements OnInit {

  customer: Customer;

  constructor(private router: Router) {
    // sessionStorage.setItem('loggedIn', 'false');
  }


  ngOnInit() {
    this.customer = JSON.parse(sessionStorage.getItem('customer'));
    this.customer.difference = -1467;
  }

  back() {
    this.router.navigate(['/customers']);
  }


}
