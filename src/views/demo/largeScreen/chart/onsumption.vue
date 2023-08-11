<template>
  <!-- 累计消耗 -->
  <div class="technology">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <div class="absolute w-full flex justify-center items-center top-[-1rem] text-lg font-semibold"
      ><div class="w-1/3 h-full flex justify-center items-center bg-[#1a5dd18a] rounded-md"
        >累计消耗</div
      ></div
    >
    <div class="h-full w-full flex flex-col justify-end items-center py-3 px-2">
      <div class="w-full flex justify-between items-center">
        <div class="w-1/3 text-center">气站</div>
        <div class="w-1/3 text-center">日消耗量</div>
        <div class="w-1/3 text-center">累积消耗量</div>
      </div>
      <div class="w-full h-[80%] flex flex-col justify-start items-center">
        <div
          v-for="item in cs"
          :key="item.name"
          class="flex justify-between items-center w-full mt-2 bor_b"
        >
          <div class="w-1/3 text-center">{{ item.name }}</div>
          <div class="w-1/3 text-center">{{ item.day }}</div>
          <div class="w-1/3 text-center">{{ item.supervisor }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const cs = [
    {
      name: '天然气',
      day: '****吨',
      supervisor: '****吨',
    },
    {
      name: '氧气',
      day: '****吨',
      supervisor: '****吨',
    },
    {
      name: '二氧化碳',
      day: '****吨',
      supervisor: '****吨',
    },
    {
      name: '压缩空气',
      day: '****吨',
      supervisor: '****吨',
    },
    {
      name: '氦气',
      day: '****吨',
      supervisor: '****吨',
    },
  ];
</script>

<style scoped>
  .bor_b {
    border-bottom: 1px solid #1a5cd1;
  }

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
