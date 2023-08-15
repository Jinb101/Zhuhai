<template>
  <div class="w-full h-full px-4 py-4">
    <!-- 监测设备档案报表 -->
    <!--  搜索区域  -->
    <div class="min-h-[10%] w-full bg-white flex justify-between items-center px-4 py-4">
      <a-form layout="inline" :model="formState">
        <a-form-item>
          <a-select v-model:value="formState.deviceType" placeholder="气体类型" style="width: 8rem">
            <a-select-option :value="item" v-for="item in deviceTypeList" :key="item">{{
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
      <div class="flex justify-end items-center">
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
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, UnwrapRef } from 'vue';
  import { Moment } from 'moment';
  import { aoaToSheetXlsx } from '/@/components/Excel';
  import moment from 'moment';
  export default defineComponent({
    setup() {
      const showResetButton = ref<boolean>(true);
      const formState: UnwrapRef<FormState> = reactive({
        deviceType: undefined,
        createTime: undefined,
        endTime: undefined,
        crux: '',
      });
      function getRandomDateTimeThisYear(): string {
        const currentYear: number = new Date().getFullYear();
        const startDate: Date = new Date(currentYear, 0, 1); // January 1st of current year
        const endDate: Date = new Date(currentYear, 11, 31, 23, 59, 59); // December 31st of current year

        const randomTimestamp: number =
          Math.random() * (endDate.getTime() - startDate.getTime()) + startDate.getTime();
        const randomDate: Date = new Date(randomTimestamp);
        const formattedTime = moment(randomDate).format('YYYY-MM-DD HH:mm:ss').toString(); // 格式化时间
        return formattedTime;
      }
      const deviceTypeList: string[] = ['气站', '一级表', '二级表'];
      const workshopList: string[] = ['生产车间', '涂料车间', '橡胶车间'];
      interface FormState {
        deviceType: string | undefined;
        createTime: Moment | undefined;
        endTime: Moment | undefined;
        crux: string;
      }
      interface DataItem {
        key: string;
        deviceNo: string;
        deviceName: string;
        deviceType: string;
        workshop: string;
        firstLevelTable: string;
        installationPosition: string;
        addUser: string;
        addTime: string;
      }
      const data: DataItem[] = [];

      for (let i = 0; i < 100; i++) {
        data.push({
          key: (i + 1).toString(),
          deviceNo: 'NO2022' + Math.random().toString(10).substr(2, 5) + `${i}`,
          deviceName: `天然气监测 ` + (i + 1),
          deviceType: deviceTypeList[i % deviceTypeList.length],
          workshop: workshopList[i % workshopList.length],
          firstLevelTable: '一级表1',
          installationPosition: '启动阀右侧',
          addUser: `张三 `,
          addTime: getRandomDateTimeThisYear(),
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
          title: '设备编号',
          dataIndex: 'deviceNo',
          align: 'center',
        },
        {
          title: '设备名称',
          dataIndex: 'deviceName',
          align: 'center',
        },
        {
          title: '设备类型',
          dataIndex: 'deviceType',
          align: 'center',
        },
        {
          title: '所属车间',
          dataIndex: 'workshop',
          align: 'center',
        },
        {
          title: '所属一级表',
          dataIndex: 'firstLevelTable',
          align: 'center',
        },
        {
          title: '安装位置',
          dataIndex: 'installationPosition',
          align: 'center',
        },
        {
          title: '添加人',
          dataIndex: 'addUser',
          align: 'center',
        },
        {
          title: '添加时间',
          dataIndex: 'addTime',
          align: 'center',
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
        if (keyword === '' && !formState.deviceType) {
          // 如果关键字为空，则重置数据源
          resetForm();
          return;
        }
        dataSource.value = [];
        for (let i = 0; i < data.length; i++) {
          // 气体
          if (formState.deviceType && data[i].deviceType !== formState.deviceType) {
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
        formState.deviceType = undefined;
        formState.createTime = undefined;
        formState.endTime = undefined;
        formState.crux = '';

        dataSource.value = [];
        for (let i = 0; i < data.length; i++) {
          dataSource.value.push(data[i]);
        }
        showResetButton.value = true;
        dealNo();
      }

      /**
       * 查看
       */
      function check(record) {
        console.log(record);
      }
      /**
       * 处理编号
       */
      function dealNo() {
        for (let i = 0; i < dataSource.value.length; i++) {
          dataSource.value[i].key = (i + 1).toString();
        }
      }

      return {
        formState,
        search,
        resetForm,
        columns,
        dataSource,
        deviceTypeList,
        check,
        aoaToExcel,
        showResetButton,
      };
    },
  });
</script>

<style scoped></style>
