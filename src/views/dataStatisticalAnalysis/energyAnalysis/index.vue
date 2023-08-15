<template>
  <div class="w-full h-full px-4 py-4">
    <!--  table区域  -->
    <div class="w-full mt-4">
      <a-table
        class="h-full w-full"
        :columns="columns"
        :data-source="dataSource"
        ref="tableElRef"
        bordered
        :pagination="false"
        :expandedRowKeys="[expandNum]"
        @expand="expand"
      >
        <template #expandedRowRender="{ record }">
          <a-row :gutter="16">
            <a-col :span="8">
              <a-table
                class="h-full w-full"
                :columns="columns1"
                :data-source="dataList1"
                ref="tableElRef"
                bordered
                :pagination="false"
                :show-header="false"
              />
            </a-col>
            <a-col :span="8">
              <div style="width: 90%; padding-left: 10%">
                <a-table
                  class="h-full w-full"
                  :columns="columns2"
                  :data-source="dataList2"
                  ref="tableElRef"
                  bordered
                  :pagination="false"
                  :show-header="false"
                />
              </div>
            </a-col>
            <a-col :span="8">
              <a-table
                class="h-full w-full"
                :columns="columns3"
                :data-source="dataList3"
                ref="tableElRef"
                bordered
                :pagination="false"
                :show-header="false"
              />
            </a-col>
          </a-row>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    setup() {
      const gasTypeList: string[] = ['天然气', '氧气', '二氧化碳', '压缩空气', '氩气'];
      const workshopList: string[] = ['生产车间', '涂料车间', '橡胶车间'];
      interface DataItem {
        gasType: string;
        primaryTable: string;
        secondaryTable: string;
      }
      const data: DataItem[] = [];
      // 母表
      for (let i = 0; i < gasTypeList.length; i++) {
        data.push({
          gasType: gasTypeList[i],
          primaryTable: gasTypeList[i] + '一级表',
          secondaryTable: gasTypeList[i] + '二级表',
        });
      }
      // 子表1
      let dataList1 = [
        {
          gasType: '天然气',
          position: '储罐#1',
          num: 4,
        },
        {
          gasType: '天然气',
          position: '储罐#2',
          num: 3,
        },
        {
          gasType: '',
          position: '总计',
          num: 7,
        },
      ];
      // 子表2
      let dataList2 = [
        {
          position: '一级表1',
          num: '日损耗2吨',
        },
        {
          position: '一级表2',
          num: '日损耗3吨',
        },
        {
          position: '一级表3',
          num: '日损耗7.8吨',
        },
        {
          position: '日损耗',
          num: '12.8吨',
        },
      ];
      // 子表3
      let dataList3 = [
        {
          position1: '一级表1',
          position2: '二级表a1',
          num: '0.2吨',
        },
        {
          position1: '一级表2',
          position2: '二级表a2',
          num: '0.3',
        },
        {
          position1: '一级表3',
          position2: '二级表a3',
          num: '0.8',
        },
        {
          position1: '一级表4',
          position2: '二级表a4',
          num: '0.26',
        },
        {
          position1: '',
          position2: '日损耗',
          num: '1.56吨',
        },
      ];
      const dataSource = ref(data);

      const columns = [
        {
          title: '气站类型',
          dataIndex: 'gasType',
          width: '35%',
          align: 'center',
        },
        {
          title: '一级表',
          dataIndex: 'primaryTable',
          width: '30%',
          align: 'center',
        },
        {
          title: '二级表',
          dataIndex: 'secondaryTable',
          width: '35%',
          align: 'center',
        },
      ];
      const columns1 = [
        {
          title: '气站类型',
          dataIndex: 'gasType',
          width: '35%',
          align: 'center',
        },
        {
          title: '一级表',
          dataIndex: 'position',
          width: '30%',
          align: 'center',
        },
        {
          title: '二级表',
          dataIndex: 'num',
          width: '35%',
          align: 'center',
        },
      ];
      const columns2 = [
        {
          title: '一级表',
          dataIndex: 'position',
          width: '30%',
          align: 'center',
        },
        {
          title: '日消耗',
          dataIndex: 'num',
          width: '35%',
          align: 'center',
        },
      ];
      const columns3 = [
        {
          title: '一级表',
          dataIndex: 'position1',
          width: '35%',
          align: 'center',
        },
        {
          title: '二级表',
          dataIndex: 'position2',
          width: '30%',
          align: 'center',
        },
        {
          title: '损耗',
          dataIndex: 'num',
          width: '35%',
          align: 'center',
        },
      ];

      let expandNum = ref(0);

      /**
       * 点击展开行
       * @param expanded
       * @param record
       */
      function expand(expanded, record) {
        let num = 0;
        // 获取行号
        for (let i = 0; i < dataSource.value.length; i++) {
          let gasType = dataSource.value[i].gasType;
          if (gasType == record.gasType) {
            num = i;
            break;
          }
        }
        for (let i = 0; i < dataList1.length; i++) {
          dataList1[i].gasType = record.gasType;
        }

        expandNum.value = num;
        console.log(num, expanded);
      }

      return {
        columns,
        columns1,
        dataList1,
        columns2,
        dataList2,
        columns3,
        dataList3,
        dataSource,
        gasTypeList,
        workshopList,
        expandNum,
        expand,
      };
    },
  });
</script>

<style scoped></style>
