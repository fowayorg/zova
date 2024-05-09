import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleAComponent extends BeanScopeBase {}

export interface ScopeModuleAComponent
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

declare module '@cabloy/front-core' {
  export interface IBeanScopeRecord {
    'a-component': ScopeModuleAComponent;
  }

  export interface IBeanScopeConfig {
    'a-component': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-component': (typeof locales)[TypeLocaleBase];
  }
}
