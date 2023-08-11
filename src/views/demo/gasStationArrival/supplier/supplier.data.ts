import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '供货商名称',
    dataIndex: 'name',
  },
  {
    title: '供货商地址',
    dataIndex: 'roleNam2e',
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
    field: 'name',
    label: '供货商名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];
// 表单
export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '供货商名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleValue2',
    label: '供货商地址',
    required: true,
    component: 'Input',
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
];
