import {Component, OnInit} from '@angular/core';
import {Button, InputText, Password, Panel, DataList} from 'primeng/primeng';
import {Router} from '@angular/router';

import { ProductService } from '../services/product.service';
import { PlanService } from '../services/plan.service';
import { Product } from '../model/product';
import { Plan } from '../model/plan';


@Component({
  selector: 'as-product-planner',
  templateUrl: 'app/product-planner/product-planner.html',
  styleUrls: [
    'app/product-planner/product-planner.css'
  ],
  directives: [Button, InputText, Password, Panel, DataList],
  providers: [ProductService, PlanService]
})

export class ProductPlannerComponent implements OnInit {

  products: Product[];

  plans: Plan[];

  selectedProduct: Product;

  selectedPlan: Plan;

  constructor(private router: Router, private productService: ProductService, private planService: PlanService) {
    // sessionStorage.setItem('loggedIn', 'false');
  }


  ngOnInit() {
    this.productService.getProducts().then(products => this.products = products);
    this.planService.getPlans().then(plans => this.plans = plans);
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  selectPlan(plan: Plan) {
    this.selectedPlan = plan;
  }

}
