import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const workloadReporting: AppRouteModule = {
  path: '/workload',
  name: 'workload',
  component: LAYOUT,
  redirect: '/workload/workloadReporting',
  meta: {
    orderNo: 12,
    icon: 'ant-design:form-outlined',
    title: t('routes.demo.workload.workloadReporting'),
  },
  children: [
    {
      path: 'workloadReporting',
      name: 'workloadReportingRecord',
      component: () => import('/@/views/demo/workload/record/index.vue'),
      meta: {
        title: t('routes.demo.workload.record'),
      },
    },
    {
      path: 'manage',
      name: 'projectManage',
      component: () => import('/@/views/demo/workload/manage/index.vue'),
      meta: {
        title: t('routes.demo.workload.manage'),
      },
    },
  ],
};

export default workloadReporting;
