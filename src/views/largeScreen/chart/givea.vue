<template>
  <!-- 报警 -->
  <div class="technology">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <div class="absolute w-full flex justify-center items-center top-[-1rem] text-lg font-semibold"
      ><div class="w-1/3 h-full flex justify-center items-center bg-[#1a5dd18a] rounded-md"
        >报警</div
      ></div
    >
    <div class="h-full w-full relative">
      <div class="w-1/2 h-full absolute top-0 left-0 px-2 py-2 overflow-y-auto">
        <div v-for="item in csbj" :key="item.key" class="flex flex-col justify-center items-start">
          <div class="flex justify-start items-center">
            <a-checkbox @change="removeSelected(item.key)" />
            <div class="ml-3">发现警告</div>
          </div>
          <div
            class="flex flex-col justify-center items-start text-red-500 bg-[#002f8669] w-full pl-2 rounded"
          >
            <div class="ml-4">{{ item.text }}</div>
            <div class="ml-4">{{ item.timeout }}</div>
          </div>
        </div>
      </div>
      <div class="h-full w-full flex justify-center items-center">
        <div class="w-full h-full flex flex-col justify-center items-center"> </div>
        <div ref="meyeathrs" class="reademo" :style="{ width: '100%', height: '100%' }"></div>
      </div>
    </div>
  </div>
  <!-- 报警 -->
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';
  import { ref, nextTick, onMounted } from 'vue';
  import { givealarmData } from '../echartsData';
  //报警
  const meyeathrs = ref(null);

  let csbj = ref([
    {
      key: '1',
      text: '发现***报警',
      timeout: '2023-1-23  00:00:00',
      initbe: false,
    },
    {
      key: '2',
      text: '发现***报警',
      timeout: '2023-1-23  00:00:00',
      initbe: false,
    },
  ]);

  const removeSelected = (key) => {
    const index = csbj.value.findIndex((item) => item.key === key);
    if (index !== -1) {
      csbj.value.splice(index, 1);
      csbj.value = [...csbj.value]; // 触发 Vue 的响应式更新
    }
  };

  onMounted(() => {
    nextTick(() => {
      const alarmChart = echarts.init(meyeathrs.value);
      alarmChart.setOption(givealarmData.option);
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
</style>
