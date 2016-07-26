import { Injectable } from '@angular/core';
import { PRODUCTS, CUST_PROD_MAP, NEW_CUST_PROD_MAP, CustomerProductMap } from './mock-products';
import { Product } from '../model/product';

// Don't forget the parentheses! Neglecting them leads to an error that's difficult to diagnose.
@Injectable()
export class ProductService {
  getCUST_PROD_MAP() {
    let map: CustomerProductMap[] = JSON.parse(localStorage.getItem('CUST_PROD_MAP'));
    if (map == null || map.length < 1) {
      map = CUST_PROD_MAP;
      map = this.mergeProducts(map);
    }
    localStorage.setItem('CUST_PROD_MAP', JSON.stringify(map));
    return Promise.resolve(map);
  }

  getNEW_CUST_PROD_MAP() {
    let map: CustomerProductMap[] = JSON.parse(localStorage.getItem('NEW_CUST_PROD_MAP'));
    if (map == null || map.length < 1) {
      map = NEW_CUST_PROD_MAP;
      map = this.mergeProducts(map);
    }
    localStorage.setItem('NEW_CUST_PROD_MAP', JSON.stringify(map));
    return Promise.resolve(map);
  }

  mergeProducts(map: CustomerProductMap[]) {
    // Merge the product data
    for (let e of map) {
      for (let p of e.products) {
        for (let orig of PRODUCTS) {
          if (p.id === orig.id) {
            p.name = orig.name;
            p.categoryId = orig.categoryId;
            p.description = orig.description;
            if (!p.price) {
              p.price = orig.price;
            }
            p.defaultPrice = orig.price;
            if (!p.originalPrice) {
              p.originalPrice = orig.price + (orig.price * 6 / 100);
            }
          }
        }
      }
    }
    return map;
  }

  getProductsInCurrentPlan(customerName: string) {
    return this.getCUST_PROD_MAP().then(map => {
      for (let e of map) {
        if (e.customer === customerName) {
          return Promise.resolve(e.products);
        }
      }
    });
  }

  getProductsInNewPlan(customerName: string) {
    return this.getNEW_CUST_PROD_MAP().then(map => {
      for (let e of map) {
        if (e.customer === customerName) {
          return Promise.resolve(e.products);
        }
      }
      return this.getProductsInCurrentPlan(customerName);
    });
  }

  getSubscriptionSummary(products: Product[]) {
    let initialPrice = 0, currentPrice = 0;
    for (let p of products) {
      initialPrice += p.originalPrice * p.count;
      currentPrice += p.price * p.count;
    }
    let ret: SubscriptionSummary = { initialPrice: initialPrice, currentPrice: currentPrice, difference: (currentPrice - initialPrice) };
    return Promise.resolve(ret);
  }


  updateProducts(customerName: string, products: Product[]) {
    return this.getNEW_CUST_PROD_MAP().then(map => {
      let newEntry: CustomerProductMap = { customer: customerName, products: products };
      let finalMap: CustomerProductMap[] = [];
      let found = false;
      for (let e of map) {
        if (e.customer === customerName) {
          finalMap.push(newEntry);
          found = true;
        } else {
          finalMap.push(e);
        }
      }
      if (found === false) {
        finalMap.push(newEntry);
      }
      localStorage.setItem('NEW_CUST_PROD_MAP', JSON.stringify(finalMap));
    });
  }
}


export class SubscriptionSummary {
  initialPrice: number;
  currentPrice: number;
  difference: number;
}
