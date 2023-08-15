<template>
  <div class="lare px-4 relative">
    <div class="flex pt-2 h-[7%] justify-between items-center">
      <div class="w-[8%]"></div>
      <div class="grow w-auto h-full">
        <img
          src="../../assets/images/large/logo.png"
          alt=""
          srcset=""
          style="height: 100%; width: 100%"
        />
      </div>
      <div class="flex flex-col justify-center rounded-md items-center bg-[#006cdf2c] w-[9%]">
        <div class="text-2xl">{{ currentTime }}</div>
        <div>{{ getCurrentDate() }}</div>
      </div>
    </div>

    <div class="echarts_box pt-2 h-[85%] w-full mt-6 flex flex-col justify-start items-center">
      <div class="w-full h-2/3 flex justify-between items-center">
        <!-- h-l -->
        <div class="w-1/4 h-full flex flex-col justify-between items-center px-2">
          <div class="h-[45%] w-full">
            <!-- 实时数据 -->
            <RealTimeNode />
          </div>
          <div class="h-[45%] w-full">
            <!-- 天然气 -->
            <NaturalNode />
          </div>
        </div>
        <!-- h-c -->
        <div class="w-1/2 h-full px-2">
          <!-- 3D模型地图 -->
          <div class="h-full w-full relative">
            <div class="absolute top-0 left-0 w-full h-14 px-4 flex justify-end items-center">
              <!-- <div class="w-[20%] pl-2 text_gradient">三维模型</div> -->
              <img
                @click="openModol"
                src="../../assets/images/large/big.png "
                alt=""
                srcset=""
                class="h-8 cursor-pointer"
              />
            </div>
            <img src="../../assets/images/large/map.png" alt="" srcset="" class="h-full w-full" />
          </div>
        </div>
        <!-- h-r -->
        <div class="w-1/4 h-full flex flex-col justify-between items-center px-2">
          <div class="h-[45%] w-full">
            <!-- 二氧化碳 -->
            <CarbonDioxideNode />
          </div>
          <div class="h-[45%] w-full">
            <!-- 压缩空气 -->
            <CompressBreathNode />
          </div>
        </div>
      </div>
      <!-- bottom -->
      <div class="w-full h-1/3 flex justify-between items-center pt-8 px-2">
        <div class="h-full w-[24.3%]">
          <!-- 氧气 -->
          <BreathNode />
        </div>
        <div class="h-full w-1/4">
          <!-- 警告 -->
          <GiveNode />
        </div>
        <div class="h-full w-[22%]">
          <!-- 消耗 -->
          <OnsumptionNode />
        </div>
        <div class="h-full w-[24.3%]">
          <!-- 氦气 -->
          <HeliumNode />
        </div>
      </div>
    </div>

    <a-modal
      v-model:visible="open"
      width="80%"
      wrapClassName="full-modal"
      :destroyOnClose="true"
      :closable="false"
      :footer="null"
    >
      <MapModolNode />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { ref, nextTick, onMounted } from 'vue';
  import RealTimeNode from './chart/realtime.vue';
  import NaturalNode from './chart/natural.vue';
  import BreathNode from './chart/breath.vue';
  import HeliumNode from './chart/helium.vue';
  import GiveNode from './chart/givea.vue';
  import CarbonDioxideNode from './chart/carbon.vue';
  import CompressBreathNode from './chart/compress.vue';
  import OnsumptionNode from './chart/onsumption.vue';
  //modol map
  import MapModolNode from './chart/modol.vue';
  // time-value is
  const currentTime = ref('');
  // open modol
  const open = ref<boolean>(false);
  // yyyy-mm-mm
  const getCurrentDate = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    return `${year}年${month}月${day}日`;
  };
  // time
  const getCurrentTime = (): string => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
  };

  const openModol = () => {
    open.value = true;
  };

  onMounted(() => {
    currentTime.value = getCurrentTime();
    nextTick(() => {
      setInterval(() => {
        currentTime.value = getCurrentTime();
      }, 1000);
    });
  });
</script>

<style scoped>
  .lare {
    height: 100vh !important;
    width: 100% !important;
    background-image: url('../../assets/images/large/bg.png') !important;
    background-size: 100% 100% !important;
    color: white !important;
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

  .text_gradient {
    background: linear-gradient(to right, #001a60c0, transparent);
  }
</style>
