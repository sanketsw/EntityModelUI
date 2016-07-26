import { Component, OnInit } from '@angular/core';
import { SelectItem, MultiSelect, Button, InputText, Password, Panel, Slider, Growl, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { Accordion } from 'primeng/primeng';
import { AccordionTab } from 'primeng/primeng';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/category';
import { Product } from '../model/product';
import { Customer } from '../model/customer';

@Component({
  selector: 'as-product-planner',
  templateUrl: 'app/product-planner/product-planner.html',
  styleUrls: [
    'app/product-planner/product-planner.css'
  ],
  directives: [MultiSelect, Button, InputText, Password, Panel, Slider, Accordion, AccordionTab, Growl],
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
  promotions: SelectItem[];
  selectedPromotions: number[];
  msgs: Message[] = [];


  constructor(private router: Router, private productService: ProductService, private categoryService: CategoryService) {
    // sessionStorage.setItem('loggedIn', 'false');
    this.promotions = [];
    this.promotions.push({ label: 'Growth Fund', value: 5 });
    this.promotions.push({ label: 'Quarter 2 cloud incentive', value: 3 });
    this.promotions.push({ label: 'Loyalty Fund Rebate', value: 2 });
  }

  show() {
    this.msgs = [];
    this.msgs.push({
      severity: 'info',
      summary: 'Impact: ' + Math.floor(this.plannedPrice - this.initialPrice),
      detail: 'Revenue: $ ' + Math.round(this.plannedPrice)
    });
  }

  recalculate() {
    this.calculate(this.products);
    this.show();
  }

  calculate(products) {
    let percentageSum = 0;
    if (this.selectedPromotions != null) {
      for (let currentPromotion of this.selectedPromotions) {
        percentageSum += currentPromotion;
      }
    }

    this.plannedPrice = 0;
    for (let currentProduct of products) {
      this.plannedPrice += (currentProduct.price * currentProduct.count);
    }
    this.plannedPrice = this.plannedPrice - ((this.plannedPrice / 100) * percentageSum);
    this.customer.newPlanDifference = this.plannedPrice - this.initialPrice;
  }

  calculateInitialPrice(products) {
    this.initialPrice = 0;
    for (let currentProduct of products) {
      this.initialPrice += (currentProduct.originalPrice * currentProduct.count);
    }
  }

  getMinValue(product: Product) {
    return product.defaultPrice - (product.defaultPrice * 5 / 100);
  }

  getMaxValue(product: Product) {
    return product.defaultPrice + (product.defaultPrice * 5 / 100);
  }

  getBackground(product: Product) {
    if (product.count > 0) {
      return 'LeadenGreenBack White';
    }
  }

  ngOnInit() {
    this.customer = JSON.parse(sessionStorage.getItem('customer'));
    this.categoryService.getCategories().then(categories => this.categories = categories);
    this.productService.getProductsInNewPlan(this.customer.name).then(newProducts => {
      this.productService.getSubscriptionSummary(newProducts).then(newsummary => this.customer.newPlanDifference = newsummary.difference);
      this.products = newProducts;

      this.productService.getProductsInCurrentPlan(this.customer.name).then(products => {
        this.productService.getSubscriptionSummary(products).then(summary => {
          this.customer.revenue = summary.initialPrice;
          this.customer.difference = summary.difference;
          this.initialPrice = this.customer.revenue;
          this.calculate(this.products);
        });
      });
      // this.calculateInitialPrice(products);
    });
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
  }

  select(product: Product) {
    product.count++;
    this.recalculate();
  }

  deSelect(product: Product) {
    if (product.count > 0) {
      product.count--;
    }
    this.recalculate();
  }

  reviewPlan() {
    this.productService.updateProducts(this.customer.name, this.products);
    this.router.navigate(['/planDetail']);
  }

  back() {
    if (this.customer.status) {
      this.router.navigate(['/planDetail']);
    } else {
      this.router.navigate(['/customerDetail']);
    }
  }
}
