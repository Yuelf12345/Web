<template>
    <div class="box" ref="box"></div>
  </template>
  <script>
  // 引入three.js
  import * as THREE from "three";
  console.log(THREE, "THREE"); // 从控制台查看three.js是否导入成功；
  export default {
    name: "ThreeJs",
    methods: {
      getThreeJs() {
        // 创建场景
        const scene = new THREE.Scene();
   
        // 创建相机
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          100
        );
        camera.position.set(10, 10, 10); // 设置相机位置
        camera.lookAt(0, 0, 0); // 设置相机看向原点
   
        // 创建渲染器
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        const box = this.$refs.box; // 获取元素
        box.appendChild(renderer.domElement); // 将渲染结果添加到目标元素
   
        // 添加辅助坐标
        const axesHelper = new THREE.AxesHelper(20);
        scene.add(axesHelper);
   
        // 创建几何体
        const geometry = new THREE.BoxGeometry(5, 5, 5);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
   
        // 声明渲染函数
        function animate() {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        }
        animate();
      },
    },
    mounted() {
      this.getThreeJs(); // 执行three的相关代码
    },
  };
  </script>
  <style scoped>
  .box {
    width: 100%;
    height: 100%;
  }
  </style>