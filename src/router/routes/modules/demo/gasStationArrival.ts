import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const gasStationArrival: AppRouteModule = {
  path: '/gasStationArrival',
  name: 'gasStationArrival',
  component: LAYOUT,
  redirect: '/gasStationArrival/acceptance',
  meta: {
    orderNo: 10,
    icon: 'ant-design:database-outlined',
    title: t('routes.demo.gasStationArrival.manage'),
  },
  children: [
    {
      path: 'acceptance_gas',
      name: 'acceptance_gas',
      component: () => import('/@/views/demo/gasStationArrival/acceptance/index.vue'),
      meta: {
        title: t('routes.demo.gasStationArrival.acceptance'),
      },
    },
    {
      path: 'personnel_gas',
      name: 'personnel_gas',
      component: () => import('/@/views/demo/gasStationArrival/personnel/index.vue'),
      meta: {
        title: t('routes.demo.gasStationArrival.personnel'),
      },
    },
    {
      path: 'supplier_gas',
      name: 'supplier_gas',
      component: () => import('/@/views/demo/gasStationArrival/supplier/index.vue'),
      meta: {
        title: t('routes.demo.gasStationArrival.supplier'),
      },
    },
    {
      path: 'weighbridge',
      name: 'weighbridge',
      component: () => import('/@/views/demo/gasStationArrival/weighbridge/index.vue'),
      meta: {
        title: t('routes.demo.gasStationArrival.weighbridge'),
      },
    },
  ],
};

export default gasStationArrival;
