import { provideRouter, RouterConfig } from '@angular/router';

import {HomeRoutes} from './home/index';
import {LoginRoutes} from './login/index';
import {CustomersRoutes} from './customers/index';
import {CustomerDetailRoutes} from './customerDetail/index';
import {TodolistRoutes} from './todolist/index';
import {SimplebindRoutes} from './simplebind/index';

const routes: RouterConfig = [
  ...LoginRoutes,
  ...CustomersRoutes,
  ...CustomerDetailRoutes,
  ...HomeRoutes,
  ...TodolistRoutes,
  ...SimplebindRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
