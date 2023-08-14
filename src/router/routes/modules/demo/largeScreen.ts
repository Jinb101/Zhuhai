//  三维大屏
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const largeScreen: AppRouteModule = {
  path: '/largeScreen',
  name: 'largeScreen',
  component: LAYOUT,
  redirect: '/largeScreen',
  meta: {
    orderNo: 11,
    icon: 'ion:layers-outline',
    title: t('routes.demo.largeScreen.visualizationLargeScreen'),
  },
  children: [
    {
      path: 'larg_screen',
      name: 'larg_screen',
      component: () => import('/@/views/demo/largeScreen/index.vue'),
      meta: {
        title: t('routes.demo.largeScreen.visualizationLargeScreen'),
      },
    },
  ],
};

export default largeScreen;
