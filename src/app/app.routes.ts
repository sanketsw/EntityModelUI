import { provideRouter, RouterConfig } from '@angular/router';

import {LoginRoutes} from './login/index';
import {BabysRoutes} from './babys/index';

const routes: RouterConfig = [
  ...LoginRoutes,
  ...BabysRoutes,
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
