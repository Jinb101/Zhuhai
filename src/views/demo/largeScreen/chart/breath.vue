<template>
  <!-- 氧气 -->
  <div class="technology">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <div class="absolute w-full flex justify-center items-center top-[-1rem] text-lg font-semibold"
      ><div class="w-1/3 h-full flex justify-center items-center bg-[#1a5dd18a] rounded-md"
        >氧气</div
      ></div
    >
    <div ref="bereathrs" class="" :style="{ width: '100%', height: '100%' }"></div>
  </div>
  <!-- 氧气 -->
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';
  import { ref, nextTick, onMounted } from 'vue';
  import { breathData } from '../echartsData';
  //天然气
  const bereathrs = ref(null);

  onMounted(() => {
    nextTick(() => {
      const gasChart = echarts.init(bereathrs.value);
      gasChart.setOption(breathData.option);
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
