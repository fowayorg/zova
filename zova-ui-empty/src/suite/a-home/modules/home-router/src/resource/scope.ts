import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'zova';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';
import { services } from '../api/service/index.js';

@Scope()
export class ScopeModuleHomeRouter extends BeanScopeBase {}

export interface ScopeModuleHomeRouter
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants,
    typeof services
  > {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-router': ScopeModuleHomeRouter;
  }

  export interface IBeanScopeConfig {
    'home-router': ReturnType<typeof config>;
  }
}
