import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '气体类型',
    dataIndex: 'roleName',
  },
  {
    title: '供货原因',
    dataIndex: 'roleNam2e',
  },
  {
    title: '供货厂家',
    dataIndex: 'roleValue',
    width: 180,
  },
  {
    title: '供货数量（吨）',
    dataIndex: 'roleValueNo',
    width: 100,
  },
  {
    title: '联系人',
    dataIndex: 'roleValueaNo',
    width: 100,
  },
  {
    title: '联系方式',
    dataIndex: 'createTimes',
    width: 180,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '创建人',
    dataIndex: 'createName',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'status1',
    label: '气体类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: '天然气', value: '0' },
        { label: '氧气', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
  {
    field: 'roleNme',
    label: '关键字',
    component: 'Input',
    colProps: { span: 8 },
  },
];
// 表单
export const formSchema: FormSchema[] = [
  {
    field: 'status1',
    label: '储罐类型',
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: '天然气', value: '0' },
        { label: '氧气', value: '1' },
      ],
    },
  },
  {
    field: 'sstatuss1',
    label: '供货厂家',
    required: true,
    component: 'Select',
    componentProps: {
      options: [],
    },
  },
  {
    field: 'sstatus1w',
    label: '联系人',
    required: true,
    component: 'Select',
    componentProps: {
      options: [],
    },
  },
  {
    field: 'roleValue4',
    label: '联系方式',
    rules: [{ required: true, pattern: /^1[3456789]\d{9}$/, message: '手机号码格式有误' }],
    component: 'Input',
  },
  {
    field: 'roleValue2',
    label: '供货原因',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleValue77',
    label: '供货数量（吨）',
    required: true,
    component: 'Input',
  },
];
