import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
import type { AppRouteModule } from '/@/router/types';

const gasConsumptionRoute: AppRouteModule = {
  path: '/gasConsumptionRoute',
  name: 'gasConsumptionRoute',
  component: LAYOUT,
  redirect: '/gasConsumptionRoute/',
  meta: {
    orderNo: 10,
    icon: 'ion:layers-outline',
    title: t('routes.demo.gasConsumption.gasConsumptionMonitoring'),
  },
  children: [
    {
      path: 'monitoring_equipment',
      name: 'monitoring_equipment',
      component: () => import('/@/views/demo/gasConsumption/monitoring/index.vue'),
      meta: {
        title: t('routes.demo.gasConsumption.monitoringEquipment'),
      },
    },
    {
      path: 'pipeline_summary',
      name: 'pipeline_summary',
      component: () => import('/@/views/demo/gasConsumption/pipeline/index.vue'),
      meta: {
        title: t('routes.demo.gasConsumption.pipelineSummary'),
      },
    },
    {
      path: 'pipeline_data',
      name: 'pipeline_data',
      component: () => import('/@/views/demo/gasConsumption/pipeline_data/index.vue'),
      meta: {
        title: t('routes.demo.gasConsumption.pipelineData'),
      },
    },
    {
      path: 'tank_data',
      name: 'tank_data',
      component: () => import('/@/views/demo/gasConsumption/tank_data/index.vue'),
      meta: {
        title: t('routes.demo.gasConsumption.tankData'),
      },
    },
    {
      path: 'monitoring_alarm',
      name: 'monitoring_alarm',
      component: () => import('/@/views/demo/gasConsumption/monitoring_alarm/index.vue'),
      meta: {
        title: t('routes.demo.gasConsumption.monitoringAlarm'),
      },
    },
  ],
};

export default gasConsumptionRoute;
