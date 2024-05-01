import { useApp } from '@cabloy/front-core';
import { ref, watchEffect } from 'vue';

export interface CabloyIconData {
  icon?: string;
}
export function useCabloyIcon(iconGetter: () => string | undefined) {
  const iconData = ref<CabloyIconData>();
  const app = useApp();

  watchEffect(() => {
    iconData.value = _getCabloyIcon();
  });

  function _getCabloyIcon() {
    // iconName
    const iconName = iconGetter();
    if (!iconName) return undefined;
    // empty
    const iconEmpty: CabloyIconData = { icon: '' };
    // icon store
    const beanIcon = app.bean._getBeanSync('a-icon.store.icon');
    if (!beanIcon) return iconEmpty;
    // icon info
    const iconInfo = beanIcon.parseIconInfoSync(iconName);
    if (iconInfo === undefined) return undefined; // system handle
    // symbolId
    const symbolId = iconInfo.symbolId;
    if (symbolId === '') return iconEmpty;
    return { icon: symbolId };
  }

  return { iconData };
}
