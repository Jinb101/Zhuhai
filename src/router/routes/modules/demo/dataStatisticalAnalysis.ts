import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dataStatisticalAnalysis: AppRouteModule = {
  path: '/dataStatisticalAnalysis',
  name: 'dataStatisticalAnalysis',
  component: LAYOUT,
  redirect: '/dataStatisticalAnalysis/acceptance',
  meta: {
    orderNo: 10,
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
      path: 'secondaryTableStatistics',
      name: 'secondaryTableStatistics',
      component: () =>
        import('/@/views/dataStatisticalAnalysis/secondaryTableStatistics/index.vue'),
      meta: {
        title: t('routes.demo.dataStatisticalAnalysis.secondaryTableStatistics'),
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
    {
      path: 'consumption',
      name: 'consumption',
      component: () => import('/@/views/dataStatisticalAnalysis/consumption/index.vue'),
      meta: {
        title: t('routes.demo.dataStatisticalAnalysis.consumption'),
      },
    },
    {
      path: 'energyAnalysis',
      name: 'energyAnalysis',
      component: () => import('/@/views/dataStatisticalAnalysis/energyAnalysis/index.vue'),
      meta: {
        title: t('routes.demo.dataStatisticalAnalysis.energyAnalysis'),
      },
    },
  ],
};

export default dataStatisticalAnalysis;
