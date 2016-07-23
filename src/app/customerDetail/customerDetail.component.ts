import {Component, OnInit} from '@angular/core';
import {Button, InputText, Password, Panel, DataList} from 'primeng/primeng';
import {Router} from '@angular/router';

import { Customer } from '../model/customer';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product';


@Component({
  selector: 'as-customerdetail',
  templateUrl: 'app/customerDetail/customerDetail.html',
  styleUrls: [
    'app/customerDetail/customerDetail.css'
  ],
  directives: [Button, InputText, Password, Panel, DataList],
  providers: [ProductService]
})

export class CustomerDetailComponent implements OnInit {

  customer: Customer;

  products: Product[];

  constructor(private router: Router, private productService: ProductService) {
    // sessionStorage.setItem('loggedIn', 'false');
  }


  ngOnInit() {
    this.customer = JSON.parse(sessionStorage.getItem('customer'));
    this.customer.difference = -1467;
    this.productService.getProductsInCurrentPlan().then(products => this.products = products);
  }

  back() {
    this.router.navigate(['/customers']);
  }

  newPlan() {
    this.router.navigate(['/product-planner']);
  }


}
