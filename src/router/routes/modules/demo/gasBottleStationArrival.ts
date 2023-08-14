import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const gasBottleStationArrival: AppRouteModule = {
  path: '/gasBottleStationArrival',
  name: 'gasBottleStationArrival',
  component: LAYOUT,
  redirect: '/gasBottleStationArrival/acceptance',
  meta: {
    orderNo: 11,
    icon: 'ant-design:database-outlined',
    title: t('routes.demo.gasBottleStationArrival.manage'),
  },
  children: [
    {
      path: 'received_gasBottle',
      name: 'received_gasBottle',
      component: () => import('/@/views/demo/gasBottleStationArrival/received/index.vue'),
      meta: {
        title: t('routes.demo.gasBottleStationArrival.received'),
      },
    },
    {
      path: 'storage_gasBottle',
      name: 'storage_gasBottle',
      component: () => import('/@/views/demo/gasBottleStationArrival/storage/index.vue'),
      meta: {
        title: t('routes.demo.gasBottleStationArrival.storage'),
      },
    },
    {
      path: 'specification_gasBottle',
      name: 'specification_gasBottle',
      component: () => import('/@/views/demo/gasBottleStationArrival/specification/index.vue'),
      meta: {
        title: t('routes.demo.gasBottleStationArrival.specification'),
      },
    },
  ],
};

export default gasBottleStationArrival;
