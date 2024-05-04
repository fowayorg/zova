import { BeanSimple } from '../../bean/beanSimple.js';
import { AppIcon } from '../../bean/resource/icon/icon.js';
import { IModuleLocaleText } from '../../bean/resource/locale/type.js';
import { Constructable } from '../../decorator/type/constructable.js';
import { IMonkeyApp, IMonkeySystem } from '../../types/interface/monkey.js';
import { AppError } from '../component/error.js';
import { AppEvent } from '../component/event.js';
import { AppLocale } from '../component/locale.js';
import { AppModule } from '../component/module.js';
import { AppUtil } from './util.js';

export class AppMeta extends BeanSimple {
  module: AppModule;
  util: AppUtil;
  locale: AppLocale;
  error: AppError;
  event: AppEvent;
  icon: AppIcon;
  text: IModuleLocaleText;
  /** @internal */
  public appMonkey?: IMonkeyApp & IMonkeySystem;

  protected __init__() {
    this.module = this.app.bean._newBeanSimple(AppModule, false);
    this.util = this.app.bean._newBeanSimple(AppUtil, false);
    this.locale = this.app.bean._newBeanSimple(AppLocale, false);
    this.error = this.app.bean._newBeanSimple(AppError, false);
    this.event = this.app.bean._newBeanSimple(AppEvent, false);
    this.icon = this.app.bean._newBeanSimple(AppIcon, false);
    this.text = this.locale.createLocaleText();
  }

  /** @internal */
  public async initialize(AppMonkey: Constructable<IMonkeyApp & IMonkeySystem>) {
    this.appMonkey = this.bean._newBeanSimple(AppMonkey, false);
  }
}