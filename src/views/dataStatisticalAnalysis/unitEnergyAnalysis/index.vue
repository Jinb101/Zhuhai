<template>
  <div class="w-full h-full px-4 py-4">
    <!--  搜索区域  -->
    <div class="h-[10%] w-full bg-white flex justify-start items-center px-4">
      <div class="w-4/5">
        <a-form layout="inline" :model="formState">
          <a-form-item>
            <a-select v-model:value="formState.region" placeholder="区域信息" style="width: 8rem">
              <a-select-option :value="item" v-for="item in workshopList">{{item}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-select v-model:value="formState.gasType" placeholder="气体类型" style="width: 8rem">
              <a-select-option :value="item" v-for="item in gasTypeList">{{item}}</a-select-option>
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
      <a-table class="h-full w-full" :columns="columns" :data-source="dataSource" bordered>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, UnwrapRef} from 'vue';
import {Moment} from "moment";
import {aoaToSheetXlsx} from "/@/components/Excel";
export default defineComponent({

  setup() {
    const showResetButton = ref<boolean>(true);
    const formState: UnwrapRef<FormState> = reactive({
      region: undefined,
      gasType: undefined,
      createTime: undefined,
      endTime: undefined,
      crux: '',
    });
    const gasTypeList:string[] = ['天然气','氧气','二氧化碳','压缩空气','氩气'];
    const workshopList:string[] = ['生产车间','涂料车间','橡胶车间'];
    interface FormState {
      region: string | undefined;
      gasType: string | undefined;
      createTime: Moment | undefined;
      endTime: Moment | undefined;
      crux: string;
    }
    interface DataItem {
      key: string;
      workshop: string;
      workload: string;
      gasType: string;
      consumption: string;
      lossAnalysis: number;
    }
    const data: DataItem[] = [];

    for (let i = 0; i < 100; i++) {
      let workload = Math.round((Math.random() * 30 + 20) * 100) / 100
      let consumption = Math.round((Math.random() * 19 + 1) * 100) / 100
      data.push({
        key: (i + 1).toString(),
        workshop: workshopList[i%workshopList.length],
        workload: workload+"吨",
        gasType: gasTypeList[i%gasTypeList.length],
        consumption: consumption+"吨",
        lossAnalysis: Math.round((workload-consumption) * 100) / 100,
      });
    }
    const dataSource= ref(data);

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
        title: '工作量',
        dataIndex: 'workload',
        align: 'center',
      },
      {
        title: '气体类型',
        dataIndex: 'gasType',
        align: 'center',
      },
      {
        title: '消耗量(天然气立方转碳吨)',
        dataIndex: 'consumption',
        align: 'center'
      },
      {
        title: '损耗分析',
        dataIndex: 'lossAnalysis',
        align: 'center',
      },
    ];
    const arrHeader = columns.map((column) => {
      if(column.dataIndex != 'operation'){
        return column.title
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
    function search(){
      const keyword = formState.crux.trim(); // 获取关键字并去除两端的空格
      if (keyword === '' && !formState.region && !formState.gasType) {
        // 如果关键字为空，则重置数据源
        resetForm()
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
        if(keyword !== ''){
          // 包含关键字
          const itemString = JSON.stringify(data[i]);
          if (itemString.toLowerCase().includes(keyword.toLowerCase())) {
            dataSource.value.push(data[i])
          }
        } else {
          dataSource.value.push(data[i])
        }
      }
      showResetButton.value = false
      dealNo()
    }
    /**
     * 重置
     */
    function resetForm(){
      formState.region = undefined
      formState.gasType = undefined
      formState.createTime = undefined
      formState.endTime = undefined
      formState.crux = ''

      dataSource.value = [];
      for (let i = 0; i < data.length; i++) {
        dataSource.value.push(data[i])
      }
      showResetButton.value = true
      dealNo()
    }

    /**
     * 查看
     */
    function check(record){
      console.log(record)
    }
    /**
     * 处理编号
     */
    function dealNo(){
      for (let i = 0; i < dataSource.value.length; i++) {
        dataSource.value[i].key = (i+1).toString();
      }
    }

    return {
      formState,
      search,
      resetForm,
      columns,
      dataSource,
      gasTypeList,
      workshopList,
      check,
      aoaToExcel,
      showResetButton
    }
  }
})
</script>

<style scoped></style>
