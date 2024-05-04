import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/front-core';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAHomerouter extends BeanScopeBase {}

export interface ScopeModuleAHomerouter
  extends TypeModuleResource<typeof config, typeof Errors, typeof locales, typeof constants> {}

declare module '@cabloy/front-core' {
  export interface IBeanScopeRecord {
    'a-homerouter': ScopeModuleAHomerouter;
  }

  export interface IBeanScopeConfig {
    'a-homerouter': ReturnType<typeof config>;
  }
}