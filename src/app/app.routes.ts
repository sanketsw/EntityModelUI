import { provideRouter, RouterConfig } from '@angular/router';

import {LoginRoutes} from './login/index';
import {BabyRoutes} from './baby/index';
import {BabysRoutes} from './babys/index';

const routes: RouterConfig = [
  ...LoginRoutes,
  ...BabyRoutes,
  ...BabysRoutes,
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
