<template>
  <div class="lare px-4 relative">
    <div class="flex pt-2 h-[7%] justify-between items-center">
      <div class="w-[9%]"></div>
      <div class="w-[80%] h-full flex justify-center items-center">
        <div class="grow w-[60%] h-full flex justify-center items-center">
          <div class="w-1/4 flex justify-between items-center">
            <img src="../../assets/images/large/logo.png" class="w-10" alt="" srcset="" />
            <div class="text-2xl tracking-wider font-semibold">福陆监测系统</div>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-center rounded-md items-center bg-[#006cdf2c] w-[9%]">
        <div class="text-2xl">{{ currentTime }}</div>
        <div>{{ getCurrentDate() }}</div>
      </div>
    </div>

    <div
      class="echarts_box pt-2 h-[85%] w-full mt-6 flex flex-col justify-start items-center relative"
    >
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
        <div class="w-[48%] h-full map_modol relative">
          <div
            v-if="!isFullScreen"
            class="absolute top-0 right-0 h-full w-full z-0"
            v-loading="lod"
          >
            <div class="technology">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <!-- 3D模型地图 -->
          <div
            class="relative h-full w-full"
            :class="{ full_screen: isFullScreen, active: isFullScreen }"
          >
            <div class="absolute top-0 left-0 w-full h-14 px-4 flex justify-end items-center z-10">
              <img
                v-if="!isFullScreen"
                @click="openModol"
                src="../../assets/images/large/big.png "
                alt=""
                srcset=""
                class="h-8 cursor-pointer"
              />
            </div>
            <div class="h-full w-full z-10" v-if="showMap">
              <div v-if="isFullScreen" class="absolute right-8 top-6 z-10">
                <FullscreenExitOutlined
                  style="color: #0054db; font-size: 1.5rem"
                  @click="isFullScreen = false"
                />
              </div>
              <MapModolNode :lod="lod" @update-lod="updateLod" />
            </div>
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
  </div>
</template>

<script setup lang="ts">
  import { ref, nextTick, onMounted, defineAsyncComponent } from 'vue';
  import RealTimeNode from './chart/realtime.vue';
  import NaturalNode from './chart/natural.vue';
  import BreathNode from './chart/breath.vue';
  import HeliumNode from './chart/helium.vue';
  import GiveNode from './chart/givea.vue';
  import CarbonDioxideNode from './chart/carbon.vue';
  import CompressBreathNode from './chart/compress.vue';
  import OnsumptionNode from './chart/onsumption.vue';
  import { FullscreenExitOutlined } from '@ant-design/icons-vue';
  const MapModolNode = defineAsyncComponent(() => import('./chart/modol.vue'));

  const currentTime = ref('');
  const isFullScreen = ref(false);
  const showMap = ref(false);
  const lod = ref(true);

  const updateLod = (value: boolean) => {
    lod.value = value;
  };

  const getCurrentDate = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    return `${year}年${month}月${day}日`;
  };

  const getCurrentTime = (): string => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
  };

  const openModol = () => {
    isFullScreen.value = !isFullScreen.value;
  };

  onMounted(() => {
    currentTime.value = getCurrentTime();
    nextTick(() => {
      setTimeout(() => {
        showMap.value = true;
      }, 700);
      setInterval(() => {
        currentTime.value = getCurrentTime();
      }, 1000);
    });
  });
</script>

<style scoped>
  .lare {
    position: absolute;
    height: 100% !important;
    width: 100% !important;
    background-image: url('../../assets/images/large/map_bg.png') !important;
    background-size: 100% 100% !important;
    color: white !important;
  }
  .grow {
    background-image: url('../../assets/images/large/logo_bg.png') !important;
    background-size: 100% 100% !important;
  }

  .text_gradient {
    background: linear-gradient(to right, #001a60c0, transparent);
  }
  .map_modol {
    transition: all 0.7s ease-in-out;
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
  .full_screen {
    position: fixed;
    left: 0;
    top: 0;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    z-index: 9999;
    transform-origin: center center; /* 设置变换的原点为中心 */
    transform: scale(0); /* 默认缩小为0 */
    transition: transform 0.7s ease-in-out; /* 添加过渡效果 */
  }
  .full_screen.active {
    transform: scale(1); /* 放大为原始大小 */
  }
</style>
