<template>
  <div>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '详情',
              onClick: handleDetail.bind(null, record),
            },
            // {
            //   label: '编辑',
            //   onClick: handleEdit.bind(null, record),
            // },
            // {
            //   color: 'error',
            //   label: '删除',
            //   popConfirm: {
            //     title: '是否确认删除',
            //     confirm: handleDelete.bind(null, record),
            //   },
            // },
          ]"
        />
      </template>
    </BasicTable>
    <!-- <weighbridgeModal @register="registerModal" @success="handleSuccess" /> -->
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { listGasStationApi } from '/@/api/demo/gasStationArrival';

  import { useModal } from '/@/components/Modal';
  // import weighbridgeModal from './weighbridgeModal.vue';
  import { columns, searchFormSchema } from './weighbridge.data';

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      // const checkedKeys = ref<Array<string | number>>([]);
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

      // function handleCreate() {
      //   openModal(true, {
      //     isUpdate: false,
      //   });
      // }

      function handleDetail(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      // function handleEdit(record: Recordable) {
      //   openModal(true, {
      //     record,
      //     isUpdate: true,
      //   });
      // }

      // function handleDelete() {
      //   console.log(checkedKeys.value, 'checkedKeys.value');
      // }

      function handleSuccess() {
        reload();
      }
      // function onSelectChange(selectedRowKeys: (string | number)[]) {
      //   console.log(selectedRowKeys);
      //   checkedKeys.value = selectedRowKeys;
      // }
      return {
        registerTable,
        registerModal,
        // handleCreate,
        handleDetail,
        // handleEdit,
        // handleDelete,
        handleSuccess,
        // checkedKeys,
        // onSelectChange,
      };
    },
  });
</script>
