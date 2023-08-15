<template>
  <div class="technology relative">
    <!-- 二氧化碳 -->
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <div class="absolute w-full flex justify-center items-center top-[-1rem] text-lg font-semibold">
      <div class="w-1/3 h-full flex justify-center items-center bg-[#1a5dd18a] rounded-md">
        二氧化碳
      </div>
    </div>
    <div class="absolute flex justify-center items-center right-4 top-6 z-10 cursor-pointer">
      <button
        v-for="(option, index) in options"
        :key="option.key"
        class="button"
        :class="{
          selected: selected === option.key,
          'rounded-l-lg': index === 0,
          'rounded-r-lg': index === 2,
        }"
        @click="select(option.key)"
      >
        {{ option.text }}
      </button>
    </div>
    <div ref="bereathrs" class="" :style="{ width: '100%', height: '100%' }"></div>
  </div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';
  import { ref, nextTick, onMounted } from 'vue';

  const bereathrs = ref(null);
  const breathOption = ref({
    option: {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        top: '40%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      color: ['#FF4949'],
      xAxis: [
        {
          type: 'category',
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.2)',
            },
          },
          axisLabel: {
            inside: false,
            color: '#bac0c0',
            fontSize: '12',
          },
          data: [] as string[],
        },
        {
          type: 'category',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitArea: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          data: [],
        },
      ],
      yAxis: {
        name: '',
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
        min: 0,
        max: 40,
      },
      series: [
        {
          name: '二氧化碳 ',
          type: 'line',
          smooth: true,
          data: [30, 23, 29, 21, 20],
          symbol: 'none',
        },
      ],
    },
  });

  const options = ref([
    {
      text: '日',
      key: 'day',
    },
    {
      text: '月',
      key: 'month',
    },
    {
      text: '年',
      key: 'year',
    },
  ]);
  let selected = ref('day');

  function select(option: string) {
    selected.value = option;
    breathOption.value.option.xAxis[0].data = getXAxisData(option);

    const gasChart = echarts.init(bereathrs.value);
    gasChart.setOption(breathOption.value.option);
  }
  function getXAxisData(selected: string) {
    const now = new Date();
    const xAxisData: string[] = [];
    if (selected === 'day') {
      for (let i = 1; i <= 5; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        xAxisData.unshift(`${month}-${day}`);
      }
    } else if (selected === 'month') {
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const startDay = Math.max(1, daysInMonth - 29);
      const interval = 3;
      for (let i = startDay; i <= daysInMonth; i += interval) {
        xAxisData.push(`${currentMonth + 1}-${i}`);
      }
    } else if (selected === 'year') {
      const currentYear = now.getFullYear();
      for (let i = currentYear - 1; i >= currentYear - 5; i--) {
        xAxisData.unshift(i.toString());
      }
    }
    return xAxisData;
  }

  onMounted(() => {
    nextTick(() => {
      const gasChart = echarts.init(bereathrs.value);
      breathOption.value.option.xAxis[0].data = getXAxisData(selected.value);
      gasChart.setOption(breathOption.value.option);
    });
  });
</script>

<style scoped>
  .technology {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #00297b49;
    border: 1px solid #1a5cd1;
  }

  .technology span:nth-child(1) {
    position: absolute;
    left: -5px;
    top: -5px;
    padding: 15px;
    border-style: solid;
    border-color: #2c8dff;
    border-width: 5px 0 0 5px;
  }

  .technology span:nth-child(2) {
    position: absolute;
    right: -5px;
    top: -5px;
    padding: 15px;
    border-style: solid;
    border-color: #2c8dff;
    border-width: 5px 5px 0 0;
  }

  .technology span:nth-child(3) {
    position: absolute;
    right: -5px;
    bottom: -5px;
    padding: 15px;
    border-style: solid;
    border-color: #2c8dff;
    border-width: 0 5px 5px 0;
  }

  .technology span:nth-child(4) {
    position: absolute;
    left: -5px;
    bottom: -5px;
    padding: 15px;
    border-style: solid;
    border-color: #2c8dff;
    border-width: 0 0 5px 5px;
  }
  .button {
    background-color: transparent;
    border: none;
    padding: 0.2rem 0.5rem;
    color: #fff;
    transition: background-color 0.3s ease;
    border: 1px solid #0642b5;
  }
  .button.selected {
    background-color: #0642b5;
  }
</style>
