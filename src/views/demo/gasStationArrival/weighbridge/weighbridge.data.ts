import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '到货id',
    dataIndex: 'acceptanceId',
  },

  {
    title: '货品名称',
    dataIndex: 'product',
    width: 180,
  },
  {
    title: '过磅日期',
    dataIndex: 'weigh',
    width: 130,
  },
  {
    title: '一次过磅',
    dataIndex: 'weighFirst',
    width: 100,
  },
  {
    title: '二次过磅',
    dataIndex: 'weighTwo',
    width: 100,
  },
  {
    title: '车号',
    dataIndex: 'car',
    width: 180,
  },
  {
    title: '物料',
    dataIndex: 'materiel',
  },
  {
    title: '总重',
    dataIndex: 'weightAll',
    width: 100,
  },
  {
    title: '人工确认总重',
    dataIndex: 'labourWeightAll',
    width: 100,
  },
  {
    title: '空重',
    dataIndex: 'weightEmpty',
    width: 100,
  },
  {
    title: '人工确认空重',
    dataIndex: 'labourWeightEmpty',
    width: 100,
  },
  {
    title: '净重',
    dataIndex: 'weightNet',
    width: 100,
  },
  {
    title: '人工确认净重',
    dataIndex: 'labourWeightNet',
    width: 100,
  },
  {
    title: '总重',
    dataIndex: 'weightAll',
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'type',
    label: '货品名称',
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
