<template>
  <div class="w-full h-full px-4 py-4">
    <div class="min-h-[6rem] w-full bg-white flex justify-start items-center px-4 py-4">
      <div class="w-full">
        <a-form layout="inline" :model="formState">
          <!-- 储罐类型选择 -->
          <a-form-item>
            <a-select
              v-model:value="formState.tank_type"
              placeholder="储罐类型"
              style="width: 8rem"
            >
              <a-select-option value="1">天然气储罐</a-select-option>
              <!-- ... 其他选项 ... -->
            </a-select>
          </a-form-item>
          <!-- 信息类型选择 -->
          <a-form-item>
            <a-select
              v-model:value="formState.message_type"
              placeholder="信息类型"
              style="width: 8rem"
            >
              <a-select-option value="stress">压力</a-select-option>
              <!-- ... 其他选项 ... -->
            </a-select>
          </a-form-item>
          <!-- 开始日期选择 -->
          <a-form-item>
            <a-date-picker
              v-model:value="formState.createTime"
              type="date"
              placeholder="开始日期"
              style="width: 100%"
            />
          </a-form-item>
          <!-- 结束日期选择 -->
          <a-form-item>
            <a-date-picker
              v-model:value="formState.endTime"
              type="date"
              placeholder="结束日期"
              style="width: 100%"
            />
          </a-form-item>
          <!-- 关键字输入 -->
          <a-form-item>
            <a-input v-model:value="formState.crux" placeholder="关键字" />
          </a-form-item>
          <!-- 查询按钮 -->
          <a-form-item>
            <a-button v-show="showResetButton" @click="inquire">查询</a-button>
            <a-button @click="resetForm" v-show="!showResetButton">重置</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <!-- 表格显示 -->
    <div class="w-full mt-4">
      <a-table
        :rowKey="(__record, index) => index"
        class="h-full w-full"
        :columns="columns"
        :data-source="dataSource"
        bordered
        :scroll="{ x: 1100 }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  // 导入所需的模块和类型
  import { Moment } from 'moment';
  import { reactive, ref, UnwrapRef } from 'vue';

  interface DataItem {
    positionPath: string;
    inPath: string;
    tankType: string;
    mesType: string;
    instantaneousFlow: number;
    tankTime: string;
    alarmState: string;
    upperLimit: number;
    floor: number;
    pointNumber: string | number;
  }
  interface FormState {
    tank_type: string | undefined;
    message_type: string | undefined;
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
      dataIndex: 'inPath',
      align: 'center',
      slots: { customRender: 'inPath' },
    },
    {
      title: '储罐类型',
      dataIndex: 'tankType',
      slots: { customRender: 'tankType' },
      align: 'center',
    },
    {
      title: '信息类型',
      dataIndex: 'mesType',
      slots: { customRender: 'mesType' },
      align: 'center',
    },
    {
      title: '采集值',
      dataIndex: 'instantaneousFlow',
      align: 'center',
      slots: { customRender: 'instantaneousFlow' },
    },
    {
      title: '时间',
      dataIndex: 'tankTime',
      align: 'center',
      width: '10%',
      slots: { customRender: 'tankTime' },
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
      inPath: `空化站北`,
      tankType: '天然气',
      mesType: '液位',
      instantaneousFlow: 51.3,
      tankTime: '2023-03-08 20:33',
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
    tank_type: undefined,
    message_type: undefined,
    createTime: undefined,
    endTime: undefined,
    crux: '',
  });

  // 定义查询事件处理函数
  const inquire = () => {
    const keyword = formState.crux.trim();

    if (keyword === '') {
      return;
    }

    showResetButton.value = false;
    dataSource.value = data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(keyword.toLowerCase()),
      ),
    );
  };

  // 定义重置表单事件处理函数
  const resetForm = () => {
    showResetButton.value = true;
    formState.tank_type = undefined;
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
