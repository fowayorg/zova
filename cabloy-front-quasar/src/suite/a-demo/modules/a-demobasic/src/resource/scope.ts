import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleADemobasic extends BeanScopeBase {}

export interface ScopeModuleADemobasic
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

declare module '@cabloy/front-core' {
  export interface IBeanScopeRecord {
    'a-demobasic': ScopeModuleADemobasic;
  }

  export interface IBeanScopeConfig {
    'a-demobasic': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-demobasic': (typeof locales)[TypeLocaleBase];
  }
}
