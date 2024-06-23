import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'zova';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';
import { services } from '../api/service/index.js';

@Scope()
export class ScopeModuleHomeTheme extends BeanScopeBase {}

export interface ScopeModuleHomeTheme
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
    'home-theme': ScopeModuleHomeTheme;
  }

  export interface IBeanScopeConfig {
    'home-theme': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'home-theme': (typeof locales)[TypeLocaleBase];
  }
}
