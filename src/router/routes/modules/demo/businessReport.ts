import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const businessReport: AppRouteModule = {
  path: '/businessReport',
  name: 'businessReport',
  component: LAYOUT,
  redirect: '/businessReport/acceptance',
  meta: {
    orderNo: 9,
    icon: 'ant-design:database-outlined',
    title: t('routes.demo.businessReport.manage'),
  },
  children: [
    {
      path: 'information',
      name: 'information',
      component: () => import('/@/views/businessReport/information/index.vue'),
      meta: {
        title: t('routes.demo.businessReport.information'),
      },
    },
    {
      path: 'equipment',
      name: 'equipment',
      component: () => import('/@/views/businessReport/equipment/index.vue'),
      meta: {
        title: t('routes.demo.businessReport.equipment'),
      },
    },
    {
      path: 'gasMonitoringReport',
      name: 'gasMonitoringReport',
      component: () => import('/@/views/businessReport/gasMonitoringReport/index.vue'),
      meta: {
        title: t('routes.demo.businessReport.two'),
      },
    },
    {
      path: 'alarmHistoryReport',
      name: 'alarmHistoryReport',
      component: () => import('/@/views/businessReport/alarmHistoryReport/index.vue'),
      meta: {
        title: t('routes.demo.businessReport.three'),
      },
    },
    {
      path: 'monitoringEquipmentArchiveReport',
      name: 'monitoringEquipmentArchiveReport',
      component: () => import('/@/views/businessReport/monitoringEquipmentArchiveReport/index.vue'),
      meta: {
        title: t('routes.demo.businessReport.four'),
      },
    },
  ],
};

export default businessReport;
