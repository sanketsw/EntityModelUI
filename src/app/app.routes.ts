import { provideRouter, RouterConfig } from '@angular/router';

import {LoginRoutes} from './login/index';
import {BabyRoutes} from './baby/index';
import {ParentRoutes} from './parent/index';
import {BabysRoutes} from './babys/index';
import {SimplebindRoutes} from './simplebind/index';
import {ParentsRoutes} from './parents/index';

const routes: RouterConfig = [
  ...LoginRoutes,
  ...BabyRoutes,
  ...ParentRoutes,
  ...BabysRoutes,
  ...SimplebindRoutes,
  ...ParentsRoutes,
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
