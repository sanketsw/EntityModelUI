import { Injectable } from '@angular/core';
import { PRODUCTS } from './mock-products';

// Don't forget the parentheses! Neglecting them leads to an error that's difficult to diagnose.
@Injectable()
export class ProductService {
    getProducts() {
        return Promise.resolve(PRODUCTS);
    }
}
