<template>
  <!-- 监测设备档案报表 -->
  <div class="w-full h-full px-4 py-4">
    <div class="h-auto w-full bg-white flex justify-between items-center px-4 py-4">
      <div class="w-full h-full">
        <a-form layout="inline" :model="formState">
          <a-form-item>
            <a-select v-model:value="formState.region" placeholder="区域" style="width: 8rem">
              <a-select-option value="1">气站</a-select-option>
              <a-select-option value="2">一级表</a-select-option>
              <a-select-option value="3">二级表</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-date-picker
              v-model:value="formState.createTime"
              type="date"
              placeholder="开始日期"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item>
            <a-date-picker
              v-model:value="formState.endTime"
              type="date"
              placeholder="结束日期"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item>
            <a-input v-model:value="formState.crux" placeholder="关键字" />
          </a-form-item>
          <a-form-item>
            <a-button v-show="showResetButton" @click="inquire">查询</a-button>
            <a-button @click="resetForm" v-show="!showResetButton">重置</a-button>
          </a-form-item>
        </a-form>
      </div>
      <div class="w-auto flex justify-end items-center">
        <a-button type="primary" @click="exportFile">导出EXCEL</a-button>
      </div>
    </div>
    <div class="w-full mt-4">
      <a-table
        :scroll="{ x: 1100 }"
        :rowKey="(record, _index) => record.key"
        class="h-full w-full"
        :columns="columns"
        :data-source="dataSource"
        bordered
      />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { aoaToSheetXlsx } from '/@/components/Excel';
  import { getCurrentDateTime } from '/@/utils/dateUtil';
  import { Moment } from 'moment';
  import { reactive, ref, UnwrapRef } from 'vue';

  interface DataItem {
    key: string;
    idr: string | number;
    name: string;
    species: string;
    workshop: string;
    first: string;
    installPath: string;
    addpeople: string;
    addTime: string;
  }
  interface FormState {
    region: string | undefined;
    createTime: Moment | undefined;
    endTime: Moment | undefined;
    crux: string;
  }

  const columns = [
    {
      title: '编号',
      dataIndex: 'key',
      align: 'center',
      slots: { customRender: 'key' },
    },
    {
      title: '设备编号',
      dataIndex: 'idr',
      align: 'center',
      width: '10%',
      slots: { customRender: 'idr' },
    },
    {
      title: '设备名称',
      dataIndex: 'name',
      align: 'center',
      width: '10%',
      slots: { customRender: 'name' },
    },
    {
      title: '设备类型',
      dataIndex: 'species',
      width: '10%',
      slots: { customRender: 'species' },
      align: 'center',
    },
    {
      title: '所属车间',
      dataIndex: 'workshop',
      slots: { customRender: 'workshop' },
      align: 'center',
    },
    {
      title: '生产厂家',
      dataIndex: 'first',
      align: 'center',
      width: '10%',
      slots: { customRender: 'first' },
    },
    {
      title: '安装位置',
      dataIndex: 'installPath',
      align: 'center',
      width: '10%',
      slots: { customRender: 'installPath' },
    },
    {
      title: '添加人',
      dataIndex: 'addpeople',
      align: 'center',
      width: '10%',
      slots: { customRender: 'addpeople' },
    },
    {
      title: '添加时间',
      dataIndex: 'addTime',
      align: 'center',
      width: '10%',
      slots: { customRender: 'addTime' },
    },
  ];

  const data: DataItem[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: (i + 1).toString(),
      idr: Math.random().toString(36).substr(2, 7) + `${i}`,
      name: `天然气监测点 ${i}`,
      species: `一级表 `,
      workshop: `涂料车间 `,
      first: `一级表2 `,
      installPath: `启动阀左侧`,
      addpeople: `张三`,
      addTime: getCurrentDateTime(),
    });
  }

  const dataSource = ref(data);
  const showResetButton = ref<boolean>(true);

  // form
  const formState: UnwrapRef<FormState> = reactive({
    region: undefined,
    createTime: undefined,
    endTime: undefined,
    crux: '',
  });

  const inquire = () => {
    const keyword = formState.crux.trim(); // 获取关键字并去除两端的空格

    if (keyword === '') {
      // 如果关键字为空，则重置数据源
      resetForm();
      return;
    }
    showResetButton.value = false;
    // 根据关键字进行筛选
    dataSource.value = data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(keyword.toLowerCase()),
      ),
    );
  };

  const resetForm = () => {
    showResetButton.value = true;
    formState.region = undefined;
    formState.createTime = undefined;
    formState.endTime = undefined;
    formState.crux = '';
    dataSource.value = data;
  };

  const exportFile = () => {
    const arrData = dataSource.value.map((item) => {
      return Object.values(item);
    });

    const arrHeader = columns.map((column) => column.title);

    aoaToSheetXlsx({
      data: arrData,
      header: arrHeader,
      filename: '一级表统计.xlsx',
    });
  };
</script>
<style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
  .ant-table-tbody > tr > td {
    height: auto !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
  }
</style>
