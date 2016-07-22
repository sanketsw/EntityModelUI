import {Component, OnInit} from '@angular/core';
import {Button, InputText, Password, Panel, DataList} from 'primeng/primeng';
import {Router} from '@angular/router';
import {Accordion} from 'primeng/primeng';
import {AccordionTab} from 'primeng/primeng';

import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/product';
import { Plan } from '../model/plan';


@Component({
  selector: 'as-product-planner',
  templateUrl: 'app/product-planner/product-planner.html',
  styleUrls: [
    'app/product-planner/product-planner.css'
  ],
  directives: [Button, InputText, Password, Panel, DataList, Accordion, AccordionTab],
  providers: [ProductService, CategoryService]
})

export class ProductPlannerComponent implements OnInit {

  products: Product[];

  categories: Category[];

  selectedProduct: Product;

  selectedCategory: Category;

  constructor(private router: Router, private productService: ProductService, private categoryService: CategoryService) {
    // sessionStorage.setItem('loggedIn', 'false');
  }


  ngOnInit() {
    this.productService.getProductsInCurrentPlan().then(products => this.products = products);
    this.categoryService.getCategories().then(categories => this.categories = categories);
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
  }

  select(product: Product) {
    product.count ++;
  }

  deSelect(product: Product) {
    product.count --;
  }

}
