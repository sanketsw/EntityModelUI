import { Injectable } from '@angular/core';
import { PLANS } from './mock-plans';

// Don't forget the parentheses! Neglecting them leads to an error that's difficult to diagnose.
@Injectable()
export class PlanService {
    getPlans() {
        return Promise.resolve(PLANS);
    }
}
