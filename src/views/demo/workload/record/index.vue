<template>
  <div>
    <BasicTable
      @register="registerTable"
      :rowSelection="{ type: 'checkbox', selectedRowKeys: checkedKeys, onChange: onSelectChange }"
    >
      <template #toolbar>
        <a-button :disabled="checkedKeys.length == 0" @click="handleDelete">删除</a-button>
        <!-- <a-button type="primary" @click="handleCreate"> 新增角色 </a-button> -->
      </template>
      <template #headerTop>
        <a-alert type="info" show-icon>
          <template #message>
            <template v-if="checkedKeys.length > 0">
              <span>已选中{{ checkedKeys.length }}条数据(可跨页)</span>
              <a-button type="link" @click="checkedKeys = []" size="small">清空</a-button>
            </template>
            <template v-else>
              <span>未选中任何数据</span>
            </template>
          </template>
        </a-alert>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '详情',
              onClick: handleDetail.bind(null, record),
            },
            // {
            //   label: '确认',
            //   onClick: handleConfirm.bind(null, record),
            // },
            // {
            //   color: 'error',
            //   label: '驳回',
            //   popConfirm: {
            //     title: '是否确认驳回',
            //     confirm: handleReject.bind(null, record),
            //   },
            // },
          ]"
        />
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getRoleListByPage } from '/@/api/demo/system';
  // import { listWorkloadApi } from '/@/api/demo/workload';

  import { useDrawer } from '/@/components/Drawer';
  import RoleDrawer from './recordDrawer.vue';
  import { Alert } from 'ant-design-vue';
  import { columns, searchFormSchema } from './record.data';

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, RoleDrawer, TableAction, AAlert: Alert },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const checkedKeys = ref<Array<string | number>>([]);
      const [registerTable, { reload }] = useTable({
        title: '',
        api: getRoleListByPage,
        // api: async ({ page, pageSize }) => {
        //   const res = await listWorkloadApi({
        //     pageNumber: page,
        //     pageSize,
        //   });
        //   /** 一定要返回改格式的数据 */
        //   return {
        //     total: res?.total,
        //     items: res?.list,
        //   };
        // },
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        rowKey: 'id',
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 100,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleDetail(record: Recordable) {
        console.log(record, '详情');
      }
      function handleReject(record: Recordable) {
        console.log(record, '驳回');
      }

      function handleConfirm(record: Recordable) {
        console.log(record, '确认');
      }
      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete() {
        console.log(checkedKeys.value, 'checkedKeys.value');
      }

      function handleSuccess() {
        reload();
      }
      function onSelectChange(selectedRowKeys: (string | number)[]) {
        console.log(selectedRowKeys);
        checkedKeys.value = selectedRowKeys;
      }
      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleDetail,
        handleReject,
        handleConfirm,
        handleEdit,
        handleDelete,
        handleSuccess,
        checkedKeys,
        onSelectChange,
      };
    },
  });
</script>
