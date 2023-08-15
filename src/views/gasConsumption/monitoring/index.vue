<template>
  <div class="w-full h-full px-4 py-4">
    <div class="h-auto w-full bg-white flex justify-start items-center px-4 py-4">
      <div class="w-4/5 h-full">
        <a-form layout="inline" :model="formState">
          <a-form-item>
            <a-select v-model:value="formState.region" placeholder="区域" style="width: 8rem">
              <a-select-option value="1">生产车间</a-select-option>
              <a-select-option value="2">涂料车间</a-select-option>
              <a-select-option value="3">橡胶车间</a-select-option>
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
      <div class="w-1/5 flex justify-end items-center">
        <a-button type="primary" @click="showModal">新增</a-button>
      </div>
    </div>
    <div class="w-full mt-4">
      <a-table
        :rowKey="(__record, _index) => __record.key"
        class="h-full w-full"
        :columns="columns"
        :data-source="dataSource"
        :scroll="{ x: 1100 }"
        bordered
      >
        <template
          v-for="col in ['name', 'calss', 'workshop', 'table', 'path', 'onobj', 'supply']"
          #[col]="{ text, record }"
          :key="col"
        >
          <div class="">
            <a-input
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][col]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template #operation="{ record }">
          <div class="editable-row-operations">
            <span v-if="editableData[record.key]">
              <a @click="save(record.key)">保存</a>
              <span class="cursor-pointer" @click="cancel(record.key)">取消</span>
            </span>
            <span v-else>
              <a @click="edit(record.key)">修改</a>
              <span class="cursor-pointer" @click="deleteKey(record.idr)">删除</span>
            </span>
          </div>
        </template>
      </a-table>
    </div>
    <div>
      <a-modal :destroyOnClose="true" v-model:visible="visible" title="新增设备" @ok="addItem">
        <div class="w-full h-full flex justify-start items-center px-4 py-4">
          <a-form
            :model="newFormState"
            ref="newFrom"
            :rules="rules"
            layout="horizontal"
            labelAlign="left"
            :label-col="{ span: 10 }"
            :wrapper-col="{ span: 20 }"
          >
            <a-form-item label="设备名称" name="name" :rules="rules.name">
              <a-input
                autocomplete="off"
                v-model:value="newFormState.name"
                placeholder="设备名称"
              />
            </a-form-item>
            <a-form-item label="监测类型" name="calss">
              <a-input
                autocomplete="off"
                v-model:value="newFormState.calss"
                placeholder="监测类型"
              />
            </a-form-item>
            <a-form-item label="所属车间" name="workshop">
              <a-input
                autocomplete="off"
                v-model:value="newFormState.workshop"
                placeholder="所属车间"
              />
            </a-form-item>
            <a-form-item label="所属一级表" name="table">
              <a-input
                autocomplete="off"
                v-model:value="newFormState.table"
                placeholder="所属一级表"
              />
            </a-form-item>
            <a-form-item label="安装位置" name="path">
              <a-input
                autocomplete="off"
                v-model:value="newFormState.path"
                placeholder="安装位置"
              />
            </a-form-item>
            <a-form-item label="监测对象" name="onobj">
              <a-input
                autocomplete="off"
                v-model:value="newFormState.onobj"
                placeholder="监测对象"
              />
            </a-form-item>
            <a-form-item label="供应商" name="supply">
              <a-input
                autocomplete="off"
                v-model:value="newFormState.supply"
                placeholder="供应商"
              />
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
  import { message } from 'ant-design-vue/lib/components';
  import { cloneDeep } from 'lodash-es';
  import { Moment } from 'moment';
  import { reactive, toRaw, ref, UnwrapRef, watch } from 'vue';

  interface DataItem {
    key: string;
    idr: string | number;
    name: string;
    calss: string;
    workshop: string;
    table: string;
    path: string;
    onobj: string;
    supply: string;
  }
  interface FormState {
    region: string | undefined;
    createTime: Moment | undefined;
    endTime: Moment | undefined;
    crux: string;
  }
  interface NewFormState {
    name: string;
    calss: string;
    workshop: string;
    table: string;
    path: string;
    onobj: string;
    supply: string;
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
      title: '监测类型',
      dataIndex: 'calss',
      width: '10%',
      slots: { customRender: 'calss' },
      align: 'center',
    },
    {
      title: '所属车间',
      dataIndex: 'workshop',
      width: '10%',
      slots: { customRender: 'workshop' },
      align: 'center',
    },
    {
      title: '所属一级表',
      dataIndex: 'table',
      align: 'center',
      width: '10%',
      slots: { customRender: 'table' },
    },
    {
      title: '安装位置',
      dataIndex: 'path',
      align: 'center',
      width: '10%',
      slots: { customRender: 'path' },
    },
    {
      title: '监测对象',
      dataIndex: 'onobj',
      align: 'center',
      width: '10%',
      slots: { customRender: 'onobj' },
    },
    {
      title: '供应商',
      align: 'center',
      dataIndex: 'supply',
      width: '10%',
      slots: { customRender: 'supply' },
    },
    {
      title: '操作',
      align: 'center',
      width: '15%',
      dataIndex: 'operation',
      slots: { customRender: 'operation' },
    },
  ];

  const data: DataItem[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: (i + 1).toString(),
      idr: Math.random().toString(36).substr(2, 7) + `${i}`,
      name: `Edrward ${i}`,
      calss: `一级表 `,
      workshop: `涂料车间 `,
      table: `一级表1 `,
      path: `启动阀左侧 `,
      onobj: `氧气1#罐  `,
      supply: `  `,
    });
  }

  const dataSource = ref(data);
  const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});
  const visible = ref<boolean>(false);
  const showResetButton = ref<boolean>(true);
  const newFrom = ref();
  const edit = (key: string) => {
    editableData[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
  };
  const deleteKey = (idr: string) => {
    const index = dataSource.value.findIndex((item) => item.idr === idr);
    if (index !== -1) {
      dataSource.value.splice(index, 1);
    }
  };
  const save = (key: string) => {
    Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData[key]);
    delete editableData[key];
  };
  const cancel = (key: string) => {
    delete editableData[key];
  };
  // form
  const formState: UnwrapRef<FormState> = reactive({
    region: undefined,
    createTime: undefined,
    endTime: undefined,
    crux: '',
  });
  const newFormState: UnwrapRef<NewFormState> = reactive({
    name: '',
    calss: '',
    workshop: '',
    table: '',
    path: '',
    onobj: '',
    supply: '',
  });
  const rules = {
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    calss: [{ required: true, message: '请输入监测类型', trigger: 'blur' }],
    workshop: [{ required: true, message: '请输入所属车间', trigger: 'blur' }],
    table: [{ required: true, message: '请输入所属一级表', trigger: 'blur' }],
    path: [{ required: true, message: '请输入安装位置', trigger: 'blur' }],
    onobj: [{ required: true, message: '请输入检测对象', trigger: 'blur' }],
    supply: [{ required: true, message: '请输入供应商', trigger: 'blur' }],
  };
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

  const addItem = () => {
    newFrom.value
      ?.validate()
      .then(() => {
        const newIdr = Math.random().toString(36).substr(2, 7); // 生成随机的 idr 值
        const newData = {
          key: (dataSource.value.length + 1).toString(), // 生成唯一的 key
          idr: newIdr,
          name: newFormState.name,
          calss: newFormState.calss,
          workshop: newFormState.workshop,
          table: newFormState.table,
          path: newFormState.path,
          onobj: newFormState.onobj,
          supply: newFormState.supply,
        };
        // 请求成功后 通知
        message.success('新增成功');
        dataSource.value.push(newData); // 将新数据添加到表格数据源中
        visible.value = false;
        console.log('New data:', newData);
        console.log('values', formState, toRaw(formState));
      })
      .catch((error: ValidateErrorEntity<FormState>) => {
        console.log('error', error);
      });
  };
  const resetForm = () => {
    showResetButton.value = true;
    formState.region = undefined;
    formState.createTime = undefined;
    formState.endTime = undefined;
    formState.crux = '';
    dataSource.value = data;
  };

  const showModal = () => {
    visible.value = true;
  };

  watch(
    visible,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    (newData, _oldData) => {
      if (!newData) {
        newFrom.value?.resetFields();
      }
    },
    { immediate: true, deep: true },
  );
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
