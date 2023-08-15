<template>
  <div>
    <BasicTable
      @register="registerTable"
      :rowSelection="{ type: 'checkbox', selectedRowKeys: checkedKeys, onChange: onSelectChange }"
    >
      <template #toolbar>
        <a-button :disabled="checkedKeys.length == 0" @click="handleDelete">删除</a-button>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
      </template>
      <template #headerTop>
        <a-alert type="info" show-icon>
          <template #message>
            <template v-if="checkedKeys.length > 0">
              <span>已选中{{ checkedKeys.length }}条记录(可跨页)</span>
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
              label: '车辆信息',
              onClick: handleDetail.bind(null, record),
            },
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              color: 'error',
              label: '删除',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <manageModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { listGasStationApi } from '/@/api/demo/gasStationArrival';

  import { useModal } from '/@/components/Modal';
  import manageModal from './acceptanceModal.vue';
  import { Alert } from 'ant-design-vue';
  import { columns, searchFormSchema } from './acceptance.data';

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, manageModal, TableAction, AAlert: Alert },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const checkedKeys = ref<Array<string | number>>([]);
      const [registerTable, { reload }] = useTable({
        title: '',
        api: listGasStationApi,
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
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleDetail(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
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
        registerModal,
        handleCreate,
        handleDetail,
        handleEdit,
        handleDelete,
        handleSuccess,
        checkedKeys,
        onSelectChange,
      };
    },
  });
</script>
