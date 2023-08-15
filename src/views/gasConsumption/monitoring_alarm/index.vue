<template>
  <div class="h-full w-full flex justify-start items-center px-4 py-2">
    <div class="w-1/5 h-full bg-white px-4 py-4">
      <div class="font-extrabold text-base text-gray-500">车间列表</div>
      <div class="mt-4">
        <a-tree
          :blockNode="true"
          :tree-data="treeData"
          show-icon
          default-expand-all
          v-model:selectedKeys="selectedKeys"
        >
          <template #switcherIcon>
            <down-outlined />
          </template>
          <template #smile>
            <CodeSandboxOutlined style="color: #52c2ff" />
          </template>
        </a-tree>
      </div>
    </div>
    <div class="w-4/5 h-full ml-4">
      <!-- seach -->
      <div class="h-[10%] w-full bg-white px-4 py-4 flex justify-between items-center flex-wrap">
        <div class="w-auto">
          <a-form layout="inline" :model="formState">
            <a-form-item>
              <a-select v-model:value="formState.alarm" placeholder="全部" style="width: 8rem">
                <a-select-option value="1">全部</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-select v-model:value="formState.flow" placeholder="状态" style="width: 8rem">
                <a-select-option value="1">未处理</a-select-option>
                <a-select-option value="2">处理中</a-select-option>
                <a-select-option value="3">已处理</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-input v-model:value="formState.crux" placeholder="关键字" />
            </a-form-item>
            <a-form-item>
              <a-button v-if="showResetButton" @click="inquire">查询</a-button>
              <a-button @click="resetForm" v-show="!showResetButton">重置</a-button>
            </a-form-item>
          </a-form>
        </div>
        <div class="w-auto flex justify-end items-center flex-wrap">
          <a-button :disabled="!hasSelected" type="primary" danger>关闭警报</a-button>
          <a-button :disabled="!hasSelected" type="primary" class="ml-1" danger>确认警告</a-button>
          <a-button :disabled="!hasSelected" type="primary" class="ml-1" danger>发起流程</a-button>
          <a-button :disabled="!hasSelected" type="primary" class="ml-1" danger>查看流程</a-button>
        </div>
      </div>
      <div class="w-full h-auto mt-4 bg-white px-4 py-4">
        <div class="h-6 w-full">
          <!-- <a-button type="primary" :disabled="!hasSelected" :loading="loading" @click="start">
            Reload
          </a-button> -->
          <span style="margin-left: 8px">
            <template v-if="hasSelected">
              {{ `选中 ${seleState.selectedRowKeys.length} 条` }}
            </template>
          </span>
        </div>
        <div class="w-full h-auto">
          <a-table
            :rowKey="(__record, _index) => __record.key"
            :row-selection="{
              selectedRowKeys: seleState.selectedRowKeys,
              onChange: onSelectChange,
            }"
            :columns="columns"
            :data-source="dataSource"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { CodeSandboxOutlined, DownOutlined } from '@ant-design/icons-vue';
  import { TreeDataItem } from 'ant-design-vue/es/tree/Tree';
  import { computed, onMounted, reactive, ref } from 'vue';

  interface DataItem {
    key: number | string;
    position: string;
    posName: string;
    moniValue: number;
    first: number;
    secondLevel: number;
    firstLimit: number | string;
    secondLimit: number | string;
    unit: string;
  }

  const treeData: TreeDataItem[] = [
    {
      title: '全部',
      key: '0-0',
      slots: {
        icon: 'smile',
      },
      children: [
        { title: '催化车间', key: '0-0-0', slots: { icon: 'smile' } },
        { title: '动力车间', key: '0-0-1', slots: { icon: 'smile' } },
      ],
    },
  ];

  const formState = reactive({
    alarm: undefined,
    flow: undefined,
    crux: '',
  });

  const columns = [
    {
      title: '序号',
      dataIndex: 'key',
      align: 'center',
      slots: { customRender: 'key' },
    },
    {
      title: '点位属性',
      dataIndex: 'position',
      align: 'center',
      slots: { customRender: 'position' },
    },
    {
      title: '点位名称',
      dataIndex: 'posName',
      align: 'center',
      slots: { customRender: 'posName' },
    },
    {
      title: '监测值',
      dataIndex: 'moniValue',
      align: 'center',
      slots: { customRender: 'moniValue' },
    },
    {
      title: '一级阀上限',
      dataIndex: 'first',
      align: 'center',
      slots: { customRender: 'first' },
    },
    {
      title: '二级阀上限',
      dataIndex: 'secondLevel',
      align: 'center',
      slots: { customRender: 'secondLevel' },
    },
    {
      title: '一级阀下限',
      dataIndex: 'firstLimit',
      align: 'center',
      slots: { customRender: 'firstLimit' },
    },
    {
      title: '二级阀下限',
      dataIndex: 'secondLimit',
      align: 'center',
      slots: { customRender: 'secondLimit' },
    },
    {
      title: '单位',
      dataIndex: 'unit',
      align: 'center',
      slots: { customRender: 'unit' },
    },
  ];
  const fromData: DataItem[] = [];
  for (let i = 0; i < 46; i++) {
    fromData.push({
      key: i + 1,
      position: '可燃有毒气体',
      posName: 'ZAI_001_' + i,
      moniValue: 112.2,
      first: 25,
      secondLevel: 32,
      firstLimit: '/',
      secondLimit: '/',
      unit: 'ppm',
    });
  }

  const dataSource = ref(fromData);
  const selectedKeys = ref(['0-0-0']);
  const showResetButton = ref(true);
  const seleState = reactive<{
    selectedRowKeys: string[];
  }>({
    selectedRowKeys: [],
  });

  const hasSelected = computed(() => seleState.selectedRowKeys.length > 0);

  // 查询
  const inquire = () => {
    dataSource.value = filteredData.value;
    console.log(filteredData.value);
  };
  const filteredData = computed(() => {
    const keyword = formState.crux.trim();

    if (keyword === '') {
      return dataSource.value;
    }
    console.log(keyword);
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    showResetButton.value = false;
    return fromData.filter((item) =>
      Object.values(item).some((item) =>
        item.toString().toLowerCase().includes(keyword.toLowerCase()),
      ),
    );
  });
  // 重置
  const resetForm = () => {
    showResetButton.value = true;
    formState.crux = '';
    formState.alarm = undefined;
    formState.flow = undefined;
    dataSource.value = fromData;
  };
  //表单操作
  const onSelectChange = (selectedRowKeys: string[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    seleState.selectedRowKeys = selectedRowKeys;
  };
  onMounted(() => {
    console.log(1);
  });
</script>
