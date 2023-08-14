import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dataStatisticalAnalysis: AppRouteModule = {
  path: '/dataStatisticalAnalysis',
  name: 'dataStatisticalAnalysis',
  component: LAYOUT,
  redirect: '/dataStatisticalAnalysis/acceptance',
  meta: {
    orderNo: 13,
    icon: 'ant-design:database-outlined',
    title: t('routes.demo.dataStatisticalAnalysis.manage'),
  },
  children: [
    {
      path: 'primaryTableStatistics',
      name: 'primaryTableStatistics',
      component: () => import('/@/views/dataStatisticalAnalysis/primaryTableStatistics/index.vue'),
      meta: {
        title: t('routes.demo.dataStatisticalAnalysis.four'),
      },
    },
    {
      path: 'unitEnergyAnalysis',
      name: 'unitEnergyAnalysis',
      component: () => import('/@/views/dataStatisticalAnalysis/unitEnergyAnalysis/index.vue'),
      meta: {
        title: t('routes.demo.dataStatisticalAnalysis.six'),
      },
    },
  ],
};

export default dataStatisticalAnalysis;
