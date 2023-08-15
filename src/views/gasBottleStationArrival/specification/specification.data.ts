import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '物料码',
    dataIndex: 'region',
  },
  {
    title: '气体名称',
    dataIndex: 'name',
  },
  {
    title: '气体纯度含量',
    dataIndex: 'charge',
    width: 100,
  },
  {
    title: '规格单位',
    dataIndex: 'phone4',
    width: 180,
  },
  {
    title: '盛装方式',
    dataIndex: 'phone1',
    width: 180,
  },
  {
    title: '含杂质量',
    dataIndex: 'phones',
    width: 180,
  },
  {
    title: '交验计量标准',
    dataIndex: 'phonsses',
    width: 180,
  },
  {
    title: '执行标准',
    dataIndex: 'phons1ses',
    width: 240,
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleNme',
    label: '气体名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];
// 表单
export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '气体名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'nameEn',
    label: '气体英文',
    required: true,
    component: 'Input',
  },
  {
    field: 'nameEn',
    label: '气体纯度含量',
    required: true,
    component: 'Input',
  },
  {
    field: 'units',
    label: '规格单位',
    required: true,
    component: 'Input',
  },
  {
    field: 'types',
    label: '盛装方式',
    required: true,
    component: 'Input',
  },
  {
    field: 'typesEn',
    label: '盛装方式英文',
    required: true,
    component: 'Input',
  },
  {
    field: 'typesEn',
    label: '盛装方式英文',
    required: true,
    component: 'Input',
  },
  {
    field: 'chaasrge',
    label: '含杂质量',
    required: true,
    component: 'Input',
  },
  {
    field: 'chaasssrge',
    label: '交验计量标准',
    required: true,
    component: 'Input',
  },
  {
    field: 'chaasssswwrge',
    label: '执行标准',
    required: true,
    component: 'InputTextArea',
  },
];
