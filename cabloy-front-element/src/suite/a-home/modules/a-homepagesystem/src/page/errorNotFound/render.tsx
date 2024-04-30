import { BeanRenderBase, Local } from '@cabloy/front-core';
import type { MotherPageErrorNotFound } from './mother.js';
import { ElButton } from 'element-plus';

export interface RenderPageErrorNotFound extends MotherPageErrorNotFound { }

@Local()
export class RenderPageErrorNotFound extends BeanRenderBase {
  render() {
    return (
      <div class="fill-height bg-blue text-white text-center">
        <div>
          <div style="font-size: 30vh">404</div>

          <div class="text-h2" style="opacity:.4">
            Oops. Nothing here...
          </div>

          <ElButton type="primary" link>Go Home</ElButton>
        </div>
      </div>
    );
  }
}
