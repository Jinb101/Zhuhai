<template>
  <div class="h-full w-full" ref="parent" v-loading="lod">
    <canvas style="height: 100%; width: 100%" ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, nextTick } from 'vue';
  import * as THREE from 'three';
  import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
  import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

  const lod = ref<boolean>(true);
  const parent = ref<HTMLElement | null>(null);
  const canvas = ref<HTMLCanvasElement | null>(null);

  onMounted(async () => {
    await nextTick(); // 等待 DOM 更新

    const parentValue = parent.value;
    const canvasValue = canvas.value;

    const parentWidth = parentValue?.clientWidth ?? 0;
    const parentHeight = parentValue?.clientHeight ?? 0;
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, parentWidth / parentHeight, 0.1, 1000);
    const renderer = new WebGLRenderer({ canvas: canvasValue });

    renderer.setSize(parentWidth, parentHeight);

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // 增加强度值
    scene.add(ambientLight);

    const loader = new FBXLoader();

    await new Promise<void>((resolve) => {
      loader.load(
        '/model/zhfl.fbx',
        (fbxModel) => {
          console.log('FBX 模型加载成功', fbxModel);
          // 在加载模型后，遍历模型的子元素并设置材质颜色
          // 在遍历模型的子元素时设置材质亮度
          fbxModel.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              // 通过查看模型属性或使用自定义方式获取原始颜色
              const originalColor = child.material.color;

              // 检查模型的材质，可能需要根据实际情况适配不同的材质类型
              if (child.material instanceof THREE.MeshLambertMaterial) {
                // 设置材质的颜色
                child.material.emissive = new THREE.Color(originalColor).multiplyScalar(10); // 调整亮度倍数
              }
            }
          });

          lod.value = false;
          const light = new THREE.DirectionalLight(0xffffff, 30); // 增加强度值
          light.position.set(0, 1, 0);
          light.color.setHex(0xffffff); // 设置为白色
          fbxModel.scale.set(1, 1, 1);
          fbxModel.position.set(0, 0, 0);
          scene.add(light);
          scene.add(fbxModel);
          resolve();
        },
        // (progressEvent) => {
        //   console.log('FBX 模型加载进度', progressEvent);
        //   // 可以在这里更新进度条等加载中的UI
        // },
        (error) => {
          console.error('FBX 模型加载失败', error);
          // 可以在这里处理加载失败的情况
        },
      );
    });

    camera.position.z = 5;
    const controls = new OrbitControls(camera, renderer.domElement);
    // 调整 dampingFactor 以及其他控制参数
    controls.enableDamping = true;
    controls.dampingFactor = 1; // 尝试逐步增加这个值，以获得更快的缩放效果
    controls.rotateSpeed = 0.5; // 调整旋转速度
    controls.zoomSpeed = 5; // 调整缩放速度

    const animate = () => {
      requestAnimationFrame(animate);

      controls.update(); // 在动画循环中更新控制器

      renderer.render(scene, camera);
    };

    animate();
  });
</script>

<style scoped></style>
