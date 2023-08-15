<template>
  <div class="w-full h-full px-4 py-4">
    <!--  搜索区域  -->
    <div class="h-[10%] w-full bg-white flex justify-start items-center px-4">
      <div class="w-4/5">
        <a-form layout="inline" :model="formState">
          <a-form-item>
            <a-select v-model:value="formState.gasType" placeholder="气体类型" style="width: 8rem">
              <a-select-option :value="item" v-for="item in gasTypeList" :key="item">{{
                item
              }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-select v-model:value="formState.region" placeholder="区域" style="width: 8rem">
              <a-select-option :value="item" v-for="item in workshopList" :key="item">{{
                item
              }}</a-select-option>
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
            <a-button @click="search" v-show="showResetButton">查询</a-button>
          </a-form-item>
          <!-- 重置按钮 -->
          <a-form-item>
            <a-button @click="resetForm" v-show="!showResetButton">重置</a-button>
          </a-form-item>
        </a-form>
      </div>
      <div class="w-1/5 flex justify-end items-center">
        <a-button type="primary" @click="aoaToExcel">导出EXCEL</a-button>
      </div>
    </div>
    <!--  table区域  -->
    <div class="w-full mt-4">
      <a-table
        :scroll="{ x: 1100 }"
        class="h-full w-full"
        :columns="columns"
        :data-source="dataSource"
        bordered
      >
        <template #operation="{ record }">
          <a-button type="link" size="small" @click="check(record)">查看</a-button>
        </template>
        <template #path="{ record }">
          <a-button type="link" size="small" @click="showSecondaryTableModal(record)">{{
            record.path
          }}</a-button>
        </template>
      </a-table>
    </div>
    <!--  实时流量查看弹窗  -->
    <div class="!my-4 enter-y">
      <a-modal
        v-model:visible="visibleFlow"
        title="实时流量图表"
        :footer="null"
        width="1000px"
        @cancel="closeFlowModal"
      >
        <div
          class="h-[10%] w-full bg-white flex justify-start items-center px-4"
          style="margin-top: 10px"
        >
          <div class="w-4/5">
            <a-form layout="inline" :model="formState2">
              <a-form-item>
                <a-date-picker
                  v-model:value="formState2.createTime"
                  type="date"
                  placeholder="开始日期"
                  style="width: 100%"
                />
              </a-form-item>
              <a-form-item>
                <a-date-picker
                  v-model:value="formState2.endTime"
                  type="date"
                  placeholder="结束日期"
                  style="width: 100%"
                />
              </a-form-item>
              <a-form-item>
                <a-input v-model:value="formState2.crux" placeholder="点位名称" />
              </a-form-item>
              <a-form-item>
                <a-button @click="search2">查询</a-button>
              </a-form-item>
              <!-- 重置按钮 -->
              <a-form-item>
                <a-button @click="resetForm2">重置</a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>
        <div
          style="padding-left: 20px; padding-top: 20px; padding-bottom: 20px; padding-right: 10px"
          v-if="showChart"
        >
          <h3>生产监测-重大危险源</h3>
          <VisitAnalysis />
        </div>
      </a-modal>
    </div>
    <!--  二级表统计弹窗  -->
    <div class="!my-4 enter-y">
      <a-modal
        :centered="true"
        v-model:visible="visibleSecondaryTable"
        title="二级表统计"
        :footer="null"
        width="90%"
        @cancel="closeSecondaryTableModal"
      >
        <div style="margin-top: 10px">
          <SecondaryTableStatistics />
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, UnwrapRef, nextTick } from 'vue';
  import { Moment } from 'moment';
  import { aoaToSheetXlsx } from '/@/components/Excel';
  import { defineAsyncComponent } from 'vue';
  const VisitAnalysis = defineAsyncComponent(() => import('./VisitAnalysis.vue'));
  const SecondaryTableStatistics = defineAsyncComponent(
    () => import('../secondaryTableStatistics/index.vue'),
  );
  export default defineComponent({
    components: {
      VisitAnalysis,
      SecondaryTableStatistics,
    },
    setup() {
      const showResetButton = ref<boolean>(true);
      const formState: UnwrapRef<FormState> = reactive({
        region: undefined,
        gasType: undefined,
        createTime: undefined,
        endTime: undefined,
        crux: '',
      });
      const formState2: UnwrapRef<FormState> = reactive({
        createTime: undefined,
        endTime: undefined,
        crux: '',
      });
      const gasTypeList: string[] = ['天然气', '氧气', '二氧化碳', '压缩空气', '氩气'];
      const workshopList: string[] = ['生产车间', '涂料车间', '橡胶车间'];
      interface FormState {
        region?: string | undefined;
        gasType?: string | undefined;
        createTime: Moment | undefined;
        endTime: Moment | undefined;
        crux: string;
      }
      interface DataItem {
        key: string;
        workshop: string;
        path: string;
        name: string;
        gasType: string;
        table: string;
        consumption: string;
      }
      const data: DataItem[] = [];

      for (let i = 0; i < 100; i++) {
        data.push({
          key: (i + 1).toString(),
          workshop: workshopList[i % workshopList.length],
          path: `启动阀左侧 `,
          name: 'FL2023' + Math.random().toString(10).substr(2, 5) + `${i}`,
          gasType: gasTypeList[i % gasTypeList.length],
          table: `一级表 `,
          consumption: (Math.random() * 100000).toString(9).substr(0, 3),
        });
      }
      const dataSource = ref(data);

      const columns = [
        {
          title: '编号',
          dataIndex: 'key',
          align: 'center',
        },
        {
          title: '所属车间',
          dataIndex: 'workshop',
          align: 'center',
        },
        {
          title: '监测点',
          dataIndex: 'path',
          align: 'center',
          slots: { customRender: 'path' },
        },
        {
          title: '点位编号',
          dataIndex: 'name',
          align: 'center',
        },
        {
          title: '气体类型',
          dataIndex: 'gasType',
          align: 'center',
        },
        {
          title: '监测点类型',
          dataIndex: 'table',
          align: 'center',
        },
        {
          title: '消耗量',
          dataIndex: 'consumption',
          align: 'center',
        },
        {
          title: '实时流量图表',
          align: 'center',
          dataIndex: 'operation',
          slots: { customRender: 'operation' },
        },
      ];
      const arrHeader = columns.map((column) => {
        if (column.dataIndex != 'operation') {
          return column.title;
        }
      });

      function aoaToExcel() {
        const arrData = dataSource.value.map((item) => {
          return Object.keys(item).map((key) => item[key]);
        });
        // 保证data顺序与header一致
        aoaToSheetXlsx({
          data: arrData,
          header: arrHeader,
          filename: '一级表统计.xlsx',
        });
      }
      /**
       * 搜索
       */
      function search() {
        const keyword = formState.crux.trim(); // 获取关键字并去除两端的空格
        if (keyword === '' && !formState.region && !formState.gasType) {
          // 如果关键字为空，则重置数据源
          resetForm();
          return;
        }
        dataSource.value = [];
        for (let i = 0; i < data.length; i++) {
          // 区域
          if (formState.region && data[i].workshop !== formState.region) {
            continue;
          }
          // 气体
          if (formState.gasType && data[i].gasType !== formState.gasType) {
            continue;
          }
          if (keyword !== '') {
            // 包含关键字
            const itemString = JSON.stringify(data[i]);
            if (itemString.toLowerCase().includes(keyword.toLowerCase())) {
              dataSource.value.push(data[i]);
            }
          } else {
            dataSource.value.push(data[i]);
          }
        }
        showResetButton.value = false;
        dealNo();
      }
      /**
       * 重置
       */
      function resetForm() {
        formState.region = undefined;
        formState.gasType = undefined;
        formState.createTime = undefined;
        formState.endTime = undefined;
        formState.crux = '';

        dataSource.value = [];
        for (let i = 0; i < data.length; i++) {
          dataSource.value.push(data[i]);
        }
        dealNo();
        showResetButton.value = true;
      }
      /**
       * 搜索2
       */
      async function search2() {
        showChart.value = false;
        await nextTick(); // 等待组件渲染完成
        showChart.value = true;
        // setInterval(function () {
        //   showChart.value = true
        // }, 500);
      }
      /**
       * 重置2
       */
      async function resetForm2() {
        formState2.createTime = undefined;
        formState2.endTime = undefined;
        formState2.crux = '';
        showChart.value = false;
        await nextTick(); // 等待组件渲染完成
        showChart.value = true;
        // setInterval(function () {
        //   showChart.value = true
        // }, 1000);
      }

      /**
       * 查看
       */
      function check(record) {
        console.log(record);
        showFlowModal();
      }
      /**
       * 处理编号
       */
      function dealNo() {
        for (let i = 0; i < dataSource.value.length; i++) {
          dataSource.value[i].key = (i + 1).toString();
        }
      }
      const visibleFlow = ref<boolean>(false);
      const visibleSecondaryTable = ref<boolean>(false);
      const showChart = ref<boolean>(false);
      const showFlowModal = () => {
        visibleFlow.value = true;
        showChart.value = true;
      };

      const showSecondaryTableModal = (record) => {
        console.log(record);
        visibleSecondaryTable.value = true;
      };
      /**
       * 关闭实时流量弹窗
       */
      function closeFlowModal() {
        showChart.value = false;
      }
      /**
       * 关闭二级表弹窗
       */
      function closeSecondaryTableModal() {}
      return {
        formState,
        formState2,
        search,
        resetForm,
        search2,
        resetForm2,
        columns,
        dataSource,
        gasTypeList,
        workshopList,
        check,
        aoaToExcel,
        visibleFlow,
        visibleSecondaryTable,
        showFlowModal,
        showSecondaryTableModal,
        showChart,
        closeFlowModal,
        closeSecondaryTableModal,
        showResetButton,
      };
    },
  });
</script>

<style scoped></style>
