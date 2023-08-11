import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '项目名称',
    dataIndex: 'roleName',
  },
  {
    title: '填报人',
    dataIndex: 'roleValue',
    width: 180,
  },
  {
    title: '计划工作量',
    dataIndex: 'roleValueNo',
    width: 100,
  },
  {
    title: '实际工作量',
    dataIndex: 'roleValueq',
    width: 100,
  },
  {
    title: '工作量单位',
    dataIndex: 'orderNo',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '已确认' : '已驳回';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '联系方式',
    dataIndex: 'createTimes',
    width: 180,
  },
  {
    title: '填报时间',
    dataIndex: 'createTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'status1',
    label: '项目信息',
    component: 'Select',
    componentProps: {
      options: [
        { label: '项目1', value: '0' },
        { label: '项目2', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '项目状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '已确认', value: '0' },
        { label: '已驳回', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
  {
    field: 'roleNme',
    label: '时间',
    component: 'RangePicker',
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
    field: 'roleName',
    label: '角色名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleValue',
    label: '填报人',
    required: true,
    component: 'Input',
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '已确认', value: '0' },
        { label: '已驳回', value: '1' },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
  {
    label: ' ',
    field: 'menu',
    slot: 'menu',
    component: 'Input',
  },
];
