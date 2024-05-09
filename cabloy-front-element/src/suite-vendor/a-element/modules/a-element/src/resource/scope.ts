import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleAElement extends BeanScopeBase {}

export interface ScopeModuleAElement
  extends TypeModuleResource<
    typeof components,typeof config, typeof Errors, (typeof locales)[TypeLocaleBase], typeof constants> {}

declare module '@cabloy/front-core' {
  export interface IBeanScopeRecord {
    'a-element': ScopeModuleAElement;
  }

  export interface IBeanScopeConfig {
    'a-element': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-element': (typeof locales)[TypeLocaleBase];
  }
}
