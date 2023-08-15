<template>
  <div class="h-full w-full flex justify-center items-center" ref="parent">
    <canvas style="height: 100%; width: 100%" ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
  import { nextTick, onMounted, ref } from 'vue';
  import * as THREE from 'three';
  import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
  import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

  export default {
    name: 'MapModolNode',
    setup(_props, { emit }) {
      const parent = ref(null);
      const canvas = ref(null);

      onMounted(async () => {
        await nextTick(); // Wait for DOM update

        const parentValue = parent.value as any;
        const canvasValue = canvas.value;
        const parentWidth = parentValue?.clientWidth ?? 0;
        const parentHeight = parentValue?.clientHeight ?? 0;

        const scene = new Scene();
        const camera = new PerspectiveCamera(45, parentWidth / parentHeight, 0.1, 1000);
        const renderer = new WebGLRenderer({ canvas: canvasValue, antialias: true });
        renderer.setSize(parentWidth, parentHeight, false);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Add ambient light for better visibility
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const loader = new FBXLoader();
        await new Promise<void>((resolve) => {
          loader.load(
            '/model/zhfl.fbx',
            (fbxModel) => {
              // 使用LOD技术加载不同细节级别的模型
              const lod1 = fbxModel.clone();
              const lod2 = fbxModel.clone();
              scene.add(lod1);
              scene.add(lod2);

              // 加载完成后隐藏加载动画
              emit('update-lod', false);
              const light = new THREE.DirectionalLight(0xffffff, 20);
              light.position.set(0, 1, 0);
              scene.add(light);

              resolve();
            },
            (_error) => {
              // console.error('Failed to load FBX model', error);
            },
          );
        });

        camera.position.set(500, 50, 450);
        camera.lookAt(0, 0, 0);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.rotateSpeed = 0.6;
        controls.zoomSpeed = 1;

        const animate = () => {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };

        animate();
      });

      return {
        parent,
        canvas,
      };
    },
  };
</script>

<style scoped></style>
