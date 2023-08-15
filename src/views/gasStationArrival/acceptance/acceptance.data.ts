import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '气体类型',
    dataIndex: 'typeName',
  },

  {
    title: '供货厂家',
    dataIndex: 'supplierId',
    width: 180,
  },
  {
    title: '供货数量（kg）',
    // title: '供货数量（吨）',
    dataIndex: 'ghCount',
    width: 130,
  },
  {
    title: '状态',
    dataIndex: 'status',
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
    title: '供货原因',
    dataIndex: 'reason',
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 180,
  },
  {
    title: '创建人',
    dataIndex: 'creatorId',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'type',
    label: '气体类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: '天然气', value: '0' },
        { label: '氧气', value: '1' },
        { label: '二氧化碳', value: '2' },
        { label: '氩气', value: '3' },
      ],
    },
    colProps: { span: 8 },
  },
];
// 表单
export const formSchema: FormSchema[] = [
  {
    field: 'type',
    label: '储罐类型',
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: '天然气', value: '0' },
        { label: '氧气', value: '1' },
        { label: '二氧化碳', value: '2' },
        { label: '氩气', value: '3' },
      ],
    },
  },
  {
    field: 'supplierId',
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
    field: 'reason',
    label: '供货原因',
    required: true,
    component: 'Input',
  },
  {
    field: 'ghCount',
    label: '供货数量（kg）',
    required: true,
    component: 'Input',
  },
];
