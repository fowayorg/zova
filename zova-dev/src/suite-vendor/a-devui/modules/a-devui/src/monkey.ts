import { BeanBase, BeanContainerLike, BeanSimple, IMonkeySystem } from 'zova';
import { themeToken } from './token.js';

export class Monkey extends BeanSimple implements IMonkeySystem {
  async appInitialize() {}
  async appInitialized() {}
  async beanInit(bean: BeanContainerLike, beanInstance: BeanBase) {
    bean.defineProperty(beanInstance, '$token', {
      enumerable: false,
      configurable: true,
      get() {
        return themeToken;
      },
    });
  }
  async beanInited(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
}