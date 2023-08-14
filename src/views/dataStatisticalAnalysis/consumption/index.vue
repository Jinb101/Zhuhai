<template>
  <div class="w-full h-full px-4 py-4">
    <div class="h-[10%] w-full bg-white flex justify-start items-center px-4">
      <div class="w-4/5">
        <a-form layout="inline" :model="formState">
          <a-form-item>
            <a-select v-model:value="formState.region" placeholder="区域" style="width: 8rem">
              <a-select-option value="1">气站</a-select-option>
              <a-select-option value="2">一级表</a-select-option>
              <a-select-option value="3">二级表</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-select v-model:value="formState.gas" placeholder="所有其他" style="width: 8rem">
              <a-select-option value="1">天然气</a-select-option>
              <a-select-option value="2">氧气</a-select-option>
              <a-select-option value="3">二氧化碳</a-select-option>
              <a-select-option value="4">压缩空气</a-select-option>
              <a-select-option value="5">氯气</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-button v-show="showResetButton" @click="inquire">查询</a-button>
            <a-button @click="resetForm" v-show="!showResetButton">重置</a-button>
          </a-form-item>
        </a-form>
      </div>
      <div class="w-1/5 flex justify-end items-center">
        <a-button @click="selectButton('daily')">日统计</a-button>
        <a-button @click="selectButton('monthly')">月统计</a-button>
        <a-button @click="selectButton('annual')">年度统计</a-button>
      </div>
    </div>
    <div class="w-full mt-4 h-[88%] py-4 px-4 bg-white">
      <!-- 可视化展示区域 -->
      <div ref="chartRef" style="height: 100%; width: 100%"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Moment } from 'moment';
  import { reactive, ref, onMounted, UnwrapRef, nextTick } from 'vue';
  import * as echarts from 'echarts';

  interface FormState {
    region: string | undefined;
    gas: Moment | undefined;
  }

  const showResetButton = ref<boolean>(true);
  const chartRef = ref<HTMLElement | null>(null);
  let selectedButton = 'daily';
  var chartOption;

  // form
  const formState: UnwrapRef<FormState> = reactive({
    region: undefined,
    gas: undefined,
  });

  const updateChartData = () => {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const dailyData = [120, 132, 101, 134, 90, 230, 210];
    const monthlyData = [220, 182, 191, 234, 290, 330, 310];
    const annualData = [320, 332, 301, 334, 390, 330, 320];

    if (selectedButton === 'daily') {
      chartOption.series[0].data = dailyData;
      chartOption.series[1].data = dailyData;
      chartOption.series[2].data = dailyData;
      chartOption.series[3].data = dailyData;
      chartOption.series[4].data = dailyData;
      chartOption.xAxis[0].data = Array.from({ length: 7 }, (_, index) => {
        const date = new Date(sevenDaysAgo.getTime() + index * 24 * 60 * 60 * 1000);
        return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
      });
    } else if (selectedButton === 'monthly') {
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      const daysInMonth = lastDayOfMonth.getDate();
      const days = Math.min(daysInMonth, 7);
      const xAxisData = Array.from({ length: days }, (_, index) => {
        const date = new Date(firstDayOfMonth.getTime() + index * 24 * 60 * 60 * 1000);
        return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
      });
      chartOption.series[0].data = monthlyData.slice(0, days);
      chartOption.series[1].data = monthlyData.slice(0, days);
      chartOption.series[2].data = monthlyData.slice(0, days);
      chartOption.series[3].data = monthlyData.slice(0, days);
      chartOption.series[4].data = monthlyData.slice(0, days);
      chartOption.xAxis[0].data = xAxisData;
    } else if (selectedButton === 'annual') {
      chartOption.series[0].data = annualData;
      chartOption.series[1].data = annualData;
      chartOption.series[2].data = annualData;
      chartOption.series[3].data = annualData;
      chartOption.series[4].data = annualData;
      const currentYear = new Date().getFullYear();
      const years = Array.from({ length: 6 }, (_, index) => currentYear - 5 + index);
      chartOption.xAxis[0].data = years;
    }

    // 更新图表
    const chart = echarts.init(chartRef.value);
    chart.setOption(chartOption);
  };

  const selectButton = (button) => {
    selectedButton = button;
    // 根据按钮选择更新图表数据
    updateChartData();
  };
  const inquire = () => {};

  const resetForm = () => {
    showResetButton.value = true;
    formState.region = undefined;
    formState.gas = undefined;
  };

  onMounted(() => {
    nextTick(() => {
      const chart = echarts.init(chartRef.value);
      chartOption = {
        // title: {
        //   text: 'Stacked Area Chart',
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: {
          data: ['天然气', '氧气', '压缩空气', '二氧化碳', '氯气'],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: [],
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: '天然气',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: '氧气',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: '压缩空气',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: '二氧化碳',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: '氯气',
            type: 'line',
            stack: 'Total',
            label: {
              show: true,
              position: 'top',
            },
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      };
      chart.setOption(chartOption);
      updateChartData();
    });
  });
</script>
