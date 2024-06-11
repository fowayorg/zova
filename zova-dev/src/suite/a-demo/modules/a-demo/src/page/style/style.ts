import { BeanStyleBase, Local, useComputed } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import { ControllerPageStyle } from './controller.js';

export interface StyleStyle extends ControllerPageStyle {}

@Local()
export class StyleStyle extends BeanStyleBase<ScopeModule> {
  textColor: string;
  pageColor: string;

  protected async __init__() {
    this.textColor = useComputed(() => {
      return this.$style({ color: this.active ? 'orange' : '' });
    });
    this.pageColor = useComputed(() => {
      return this.$style({
        color: this.$token.component.page.color,
        background: this.$token.component.page.background,
        padding: '8px',
      });
    });
  }
}
