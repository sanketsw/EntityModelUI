import { provideRouter, RouterConfig } from '@angular/router';

import {HomeRoutes} from './home/index';
import {LoginRoutes} from './login/index';
import {PlanDetailRoutes} from './planDetail/index';
import {CustomersRoutes} from './customers/index';
import {AlertsRoutes} from './alerts/index';
import {CustomerDetailRoutes} from './customerDetail/index';
import {ProductPlannerRoutes} from './product-planner/index';
import {TodolistRoutes} from './todolist/index';
import {SimplebindRoutes} from './simplebind/index';

const routes: RouterConfig = [
  ...LoginRoutes,
  ...PlanDetailRoutes,
  ...CustomersRoutes,
  ...AlertsRoutes,
  ...CustomerDetailRoutes,
  ...ProductPlannerRoutes,
  ...HomeRoutes,
  ...TodolistRoutes,
  ...SimplebindRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
