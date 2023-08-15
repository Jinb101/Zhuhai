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
    await nextTick(); // Wait for DOM update

    const parentValue = parent.value;
    const canvasValue = canvas.value;
    const parentWidth = parentValue?.clientWidth ?? 0;
    const parentHeight = parentValue?.clientHeight ?? 0;

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, parentWidth / parentHeight, 0.1, 1000);
    const renderer = new WebGLRenderer({ canvas: canvasValue });
    renderer.setSize(parentWidth, parentHeight);

    // Add ambient light for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const loader = new FBXLoader();
    await new Promise<void>((resolve) => {
      loader.load(
        '/model/zhfl.fbx',
        (fbxModel) => {
          console.log('FBX model loaded successfully', fbxModel);

          fbxModel.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              const originalColor = child.material.color;

              // Adjust material properties for more realism
              if (child.material instanceof THREE.MeshStandardMaterial) {
                child.material.color = originalColor;
                child.material.emissive.set(0, 0, 0);
                child.material.roughness = 0.5;
                child.material.metalness = 0.5;
              }
            }
          });

          lod.value = false;

          const light = new THREE.DirectionalLight(0xffffff, 10);
          light.position.set(0, 1, 0);
          scene.add(light);
          scene.add(fbxModel);

          resolve();
        },
        (error) => {
          console.error('Failed to load FBX model', error);
        },
      );
    });

    camera.position.z = 5;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.6;
    controls.zoomSpeed = 1;
    controls.target.set(0, 0, 0);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();
  });
</script>

<style scoped></style>
