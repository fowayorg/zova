import {
  BeanBase,
  BeanContainerLike,
  BeanControllerPageBase,
  BeanSimple,
  IModule,
  IMonkeyModule,
  IMonkeyController,
  IMonkeySystem,
  IControllerData,
  TypePageSchema,
  useComputed,
} from '@cabloy/front';
import * as ModuleInfo from '@cabloy/module-info';
import { useRoute } from 'vue-router';
import { StoreRouterLike } from './bean/store.router.js';

export class Monkey extends BeanSimple implements IMonkeySystem, IMonkeyModule, IMonkeyController {
  private _storeRouter: StoreRouterLike;
  private _moduleSelf: IModule;

  constructor(moduleSelf: IModule) {
    super();
    this._moduleSelf = moduleSelf;
  }

  async getStoreRouter() {
    if (!this._storeRouter) {
      this._storeRouter = (await this.bean._getBean('a-router.store.router', false)) as StoreRouterLike;
    }
    return this._storeRouter;
  }

  async appInitialize() {}
  async appInitialized() {
    // emit event
    const router = this.bean.inject('a-router:router');
    await this.app.meta.event.emit('a-router:routerGuards', router);
  }
  async beanInit(bean: BeanContainerLike, beanInstance: BeanBase) {
    bean.defineProperty(beanInstance, '$router', {
      enumerable: false,
      configurable: true,
      get() {
        return bean.inject('a-router:router');
      },
    });
  }
  async beanInited(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  async moduleLoading(module: IModule) {
    if (this._moduleSelf === module) return;
    const storeRouter = await this.getStoreRouter();
    storeRouter._registerRoutes(module);
  }
  async moduleLoaded(_module: IModule) {}
  async configLoaded(_module: IModule, _config) {}
  controllerDataPrepare(controllerData: IControllerData) {
    controllerData.context.route = useRoute();
  }
  controllerDataInit(controllerData: IControllerData, controller: BeanBase) {
    // only for controller page
    if (controller instanceof BeanControllerPageBase) {
      const route = controllerData.context.route;
      const schemaKey = String(route.name || route.path);
      let schemas: TypePageSchema | undefined;
      const moduleName = ModuleInfo.parseName(schemaKey)!;
      const module = this.app.meta.module.get(moduleName)!;
      if (route.name) {
        schemas = module.resource.pageNameSchemas?.[schemaKey];
      } else {
        schemas = module.resource.pagePathSchemas?.[schemaKey];
      }
      controller.$params = useComputed(() => {
        if (!schemas?.params) throw new Error(`page params schema not found: ${schemaKey}`);
        return schemas.params.parse(route.params);
      });
      controller.$query = useComputed(() => {
        if (!schemas?.query) throw new Error(`page query schema not found: ${schemaKey}`);
        return schemas.query.parse(route.query);
      });
    }
  }
}
