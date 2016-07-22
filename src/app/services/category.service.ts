import { Injectable } from '@angular/core';
import { CATEGORIES } from './mock-categories';

// Don't forget the parentheses! Neglecting them leads to an error that's difficult to diagnose.
@Injectable()
export class CategoryService {
    getCategories() {
        return Promise.resolve(CATEGORIES);
    }
}
