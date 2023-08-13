<template>
  <!-- 区域管道实时汇总 -->
  <div class="w-full h-full px-4 py-4">
    <div class="h-[10%] w-full bg-white flex justify-start items-center px-4">
      <div class="w-4/5">
        <a-form layout="inline" :model="formState">
          <a-form-item>
            <a-select v-model:value="formState.region" placeholder="区域" style="width: 8rem">
              <a-select-option value="1">区域1</a-select-option>
              <a-select-option value="2">区域2</a-select-option>
              <a-select-option value="3">区域3</a-select-option>
            </a-select>
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
  </div>
</template>
<script setup lang="ts">
  import { reactive, ref, UnwrapRef } from 'vue';

  interface DataItem {
    idr?: string;
    gas?: string;
    car_bon?: string;
    breath?: string;
    pathName: string;
    gas_appearance: string;
    gas_rate: string;
    car_bon_appearance: string;
    car_bon_rate: string;
    breath_appearance: string;
    breath_rate: string;
    compress: string;
    argon: string;
  }
  interface FormState {
    region: string | undefined;
    crux: string;
  }

  const columns = [
    {
      title: '区域名称',
      dataIndex: 'pathName',
      key: 'pathName',
      align: 'center',
      width: '10%',
      slots: { customRender: 'pathName' },
    },
    {
      title: '天然气',
      dataIndex: 'gas',
      key: 'gas',
      align: 'center',
      width: '20%',
      slots: { customRender: 'gas' },
      children: [
        {
          title: '仪表数',
          dataIndex: 'gas_appearance',
          key: 'gas_appearance',
          align: 'center',
          width: '10%',
        },
        {
          title: '瞬时流量',
          dataIndex: 'gas_rate',
          key: 'gas_rate',
          align: 'center',
          width: '10%',
        },
      ],
    },
    {
      title: '二氧化碳',
      dataIndex: 'car_bon',
      key: 'car_bon',
      align: 'center',
      width: '20%',
      slots: { customRender: 'car_bon' },
      children: [
        {
          title: '仪表数',
          dataIndex: 'car_bon_appearance',
          key: 'car_bon_appearance',
          align: 'center',
          width: '10%',
        },
        {
          title: '瞬时流量',
          dataIndex: 'car_bon_rate',
          key: 'car_bon_rate',
          align: 'center',
          width: '10%',
        },
      ],
    },
    {
      title: '氧气',
      dataIndex: 'breath',
      align: 'center',
      key: 'breath',
      width: '20%',
      slots: { customRender: 'breath' },
      children: [
        {
          title: '仪表数',
          dataIndex: 'breath_appearance',
          key: 'breath_appearance',
          align: 'center',
          width: '10%',
        },
        {
          title: '瞬时流量',
          dataIndex: 'breath_rate',
          key: 'breath_rate',
          align: 'center',
          width: '10%',
        },
      ],
    },
    {
      title: '压缩空气',
      dataIndex: 'compress',
      align: 'center',
      key: 'compress',
      width: '10%',
      slots: { customRender: 'compress' },
    },
    {
      title: '氩气',
      dataIndex: 'argon',
      align: 'center',
      key: 'argon',
      width: '10%',
      slots: { customRender: 'argon' },
    },
  ];

  const data: DataItem[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      idr: Math.random().toString(36).substr(2, 7) + `${i}`,
      pathName: `切割车间`,
      gas_appearance: `2`,
      gas_rate: `93.2`,
      car_bon_appearance: `2`,
      car_bon_rate: `93.2`,
      breath_appearance: `2`,
      breath_rate: `93.2`,
      compress: `50.22`,
      argon: `50.22`,
    });
  }

  const dataSource = ref(data);
  const showResetButton = ref<boolean>(true);

  // form
  const formState: UnwrapRef<FormState> = reactive({
    region: '区域',
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
    formState.crux = '';
    dataSource.value = data;
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
