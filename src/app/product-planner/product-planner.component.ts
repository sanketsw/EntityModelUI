import { Component, OnInit } from '@angular/core';
import { Button, InputText, Password, Panel, DataList } from 'primeng/primeng';
import { Router } from '@angular/router';
import { Accordion } from 'primeng/primeng';
import { AccordionTab } from 'primeng/primeng';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/category';
import { Product } from '../model/product';

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

  customer: Customer;
  products: Product[];
  categories: Category[];
  selectedProduct: Product;
  selectedCategory: Category;
  plannedPrice: number;
  initialPrice: number;

  constructor(private router: Router, private productService: ProductService, private categoryService: CategoryService) {
    // sessionStorage.setItem('loggedIn', 'false');
  }

  recalculate() {
    this.calculate(this.products);
  }

  calculate(products) {
    this.plannedPrice = 0;
    for (let currentProduct of products) {
      this.plannedPrice += (currentProduct.price * currentProduct.count);
    }
  }

  calculateInitialPrice(products) {
    this.initialPrice = 0;
    for (let currentProduct of products) {
      this.initialPrice += (currentProduct.price * currentProduct.count);
    }
  }

  ngOnInit() {
    this.customer = JSON.parse(localStorage.getItem('customer'));
    this.productService.getProductsInCurrentPlan().then(products => this.products = products);
    this.categoryService.getCategories().then(categories => this.categories = categories);
    this.productService.getProductsInCurrentPlan().then(products => this.calculate(products));
    this.productService.getProductsInCurrentPlan().then(products => this.calculateInitialPrice(products));
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
  }

  select(product: Product) {
    product.count ++;
    this.recalculate();
  }

  deSelect(product: Product) {
    if (product.count > 0) {
      product.count --;
    }
    this.recalculate();
  }

  reviewPlan() {
    this.router.navigate(['/planDetail']);
  }
}
