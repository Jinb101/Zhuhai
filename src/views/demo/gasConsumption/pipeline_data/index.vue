<template>
  <div class="w-full h-full px-4 py-4">
    <div class="min-h-[6rem] w-full bg-white flex justify-start items-center px-4">
      <div class="w-full">
        <a-form layout="inline" :model="formState">
          <a-form-item>
            <a-select v-model:value="formState.region" placeholder="区域" style="width: 8rem">
              <a-select-option value="1">区域1</a-select-option>
              <a-select-option value="2">区域2</a-select-option>
              <a-select-option value="3">区域3</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-select v-model:value="formState.gas_type" placeholder="气体类型" style="width: 8rem">
              <a-select-option value="natural_gas">天然气</a-select-option>
              <a-select-option value="breath">氧气</a-select-option>
              <a-select-option value="carbon_dioxide">二氧化碳</a-select-option>
              <a-select-option value="compressed_air">压缩空气</a-select-option>
              <a-select-option value="argon">氩气</a-select-option>
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
            <a-button v-if="showResetButton" @click="inquire">查询</a-button>
          </a-form-item>
          <!-- 重置按钮 -->
          <a-form-item>
            <a-button @click="resetForm" v-show="!showResetButton">重置</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="w-full mt-4">
      <a-table
        :rowKey="(__record, index) => index"
        class="h-full w-full"
        :columns="columns"
        :data-source="dataSource"
        bordered
      />
    </div>
    <div> </div>
  </div>
</template>
<script setup lang="ts">
  import { Moment } from 'moment';
  import { reactive, ref, UnwrapRef } from 'vue';

  interface DataItem {
    positionPath: string;
    InstallationPosition: string;
    localArea: string;
    gasType: string;
    InstantaneousFlow: number;
    monitoringTime: string;
    alarmState: string;
    upperLimit: number;
    floor: number;
    pointNumber: string | number;
  }
  interface FormState {
    region: string | undefined;
    gas_type: string | undefined;
    createTime: Moment | undefined;
    endTime: Moment | undefined;
    crux: string;
  }

  const columns = [
    {
      title: '点位名称',
      dataIndex: 'positionPath',
      align: 'center',
      slots: { customRender: 'positionPath' },
    },
    {
      title: '安装位置',
      dataIndex: 'installationPosition',
      align: 'center',
      slots: { customRender: 'InstallationPosition' },
    },
    {
      title: '所在区域',
      dataIndex: 'localArea',
      slots: { customRender: 'localArea' },
      align: 'center',
    },
    {
      title: '气体类型',
      dataIndex: 'gasType',
      slots: { customRender: 'gasType' },
      align: 'center',
    },
    {
      title: '瞬时流量值',
      dataIndex: 'InstantaneousFlow ',
      align: 'center',
      slots: { customRender: 'InstantaneousFlow' },
    },
    {
      title: '监测时间',
      dataIndex: 'monitoringTime',
      align: 'center',
      width: '10%',
      slots: { customRender: 'monitoringTime' },
    },
    {
      title: '报警状态',
      dataIndex: 'alarmState',
      align: 'center',
      slots: { customRender: 'alarmState' },
    },
    {
      title: '上限',
      align: 'center',
      dataIndex: 'upperLimit',
      slots: { customRender: 'upperLimit' },
    },
    {
      title: '下限',
      align: 'center',
      dataIndex: 'floor',
      slots: { customRender: 'floor' },
    },
    {
      title: '点位编号',
      align: 'center',
      width: '20%',
      dataIndex: 'pointNumber',
      slots: { customRender: 'pointNumber' },
    },
  ];

  const data: DataItem[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      positionPath: `点1`,
      InstallationPosition: `空化站北`,
      localArea: `区域3`,
      gasType: '天然气',
      InstantaneousFlow: 50.02,
      monitoringTime: '2023-03-08 20:33',
      alarmState: `正常`,
      upperLimit: 30,
      floor: 44,
      pointNumber: Math.random().toString(36).substr(2, 7) + ` ${i}`,
    });
  }

  const dataSource = ref(data);
  const showResetButton = ref<boolean>(true);

  // form
  const formState: UnwrapRef<FormState> = reactive({
    region: '区域',
    gas_type: '',
    createTime: undefined,
    endTime: undefined,
    crux: '',
  });

  const inquire = () => {
    const keyword = formState.crux.trim(); // 获取关键字并去除两端的空格

    if (keyword === '') {
      // 如果关键字为空，则重置数据源
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
</script>
<style scoped>
  .ant-table-tbody > tr > td {
    height: auto !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
  }
</style>
