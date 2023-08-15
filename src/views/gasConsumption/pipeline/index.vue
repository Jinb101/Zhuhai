<template>
  <div class="w-full h-full px-4 py-4">
    <div class="h-[10%] w-full flex bg-white justify-start items-center px-4">
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
          <a-button v-show="showResetButton" @click="inquire">查询</a-button>
          <a-button @click="resetForm" v-show="!showResetButton">重置</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="table-container w-full mt-4">
      <a-table
        :rowKey="(__record, index) => index"
        class="h-full w-full"
        :columns="columns"
        :data-source="filteredData"
        bordered
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, computed, UnwrapRef } from 'vue';

  interface DataItem {
    pathName: string;
    gas_appearance: number;
    gas_rate: number;
    car_bon_appearance: number;
    car_bon_rate: number;
    breath_appearance: number;
    breath_rate: number;
    compress: number;
    argon: number;
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
      pathName: '切割车间',
      gas_appearance: 2,
      gas_rate: 36.5,
      car_bon_appearance: 3,
      car_bon_rate: 36.5,
      breath_appearance: 3,
      breath_rate: 36.5,
      compress: 40,
      argon: 70,
    });
  }

  const dataSource = ref(data);
  const showResetButton = ref<boolean>(true);

  const formState: UnwrapRef<FormState> = reactive({
    region: '区域',
    crux: '',
  });

  const filteredData = computed(() => {
    const keyword = formState.crux.trim();

    if (keyword === '') {
      return dataSource.value;
    }

    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    showResetButton.value = false;

    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(keyword.toLowerCase()),
      ),
    );
  });

  const inquire = () => {
    dataSource.value = filteredData.value;
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
