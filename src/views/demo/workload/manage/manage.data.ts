import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '区域信息',
    dataIndex: 'region',
  },
  {
    title: '项目名称',
    dataIndex: 'name',
  },
  {
    title: '负责人',
    dataIndex: 'charge',
    width: 100,
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
    width: 180,
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'region',
    label: '区域信息',
    component: 'Select',
    componentProps: {
      options: [
        { label: '区域1', value: '0' },
        { label: '区域2', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
  {
    field: 'time',
    label: '时间',
    component: 'RangePicker',
    colProps: { span: 8 },
  },
];
// 表单
export const formSchema: FormSchema[] = [
  {
    field: 'region',
    label: '区域信息',
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: '区域1', value: '0' },
        { label: '区域2', value: '1' },
      ],
    },
  },
  {
    field: 'name',
    label: '项目名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'units',
    label: '工作量单位',
    required: true,
    component: 'Input',
  },
  {
    field: 'charge',
    label: '负责人',
    required: true,
    component: 'Input',
  },
  {
    field: 'phone',
    label: '联系方式',
    rules: [{ required: true, pattern: /^1[3456789]\d{9}$/, message: '手机号码格式有误' }],
    component: 'Input',
  },
];
