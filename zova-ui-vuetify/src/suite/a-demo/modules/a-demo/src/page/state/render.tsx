import { BeanRenderBase, Local } from '@cabloy/front';
import type { ControllerPageState } from './controller.js';
import { VBtn } from 'vuetify/components';

export interface RenderPageState extends ControllerPageState {}

@Local()
export class RenderPageState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>count(ref): {this.count}</div>
        <div>count(computed): {this.count2}</div>
        <VBtn color="secondary" onClick={() => this.inrement()}>
          Inrement
        </VBtn>
        <VBtn color="secondary" onClick={() => this.decrement()}>
          Decrement
        </VBtn>
      </div>
    );
  }
}