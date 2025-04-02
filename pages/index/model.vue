<template>
  <view>
    <view id="container" style="width: calc(100% - 10px); height: calc(400rpx - 10px);">
    </view>
  </view>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let container, renderer, camera, scene, controls, mixer, clock, mouse, actions;
export default {
  data() {
    return {
      //openDoor: null,
      right2: false,
      right1: false,
      left1: false,
      left2: false,
      // container:null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //获取 dom 节点
      container = document.getElementById("container");
      //创建渲染器 WebGLRenderer
      renderer = new THREE.WebGLRenderer();

      //创建摄像机
      camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 100);
      //设置摄像机在舞台的位置（3D 世界）
      camera.position.set(1, 5.5, 12.5); // 稍微调整摄像机位置
      camera.fov = 50; // 调整摄像机视场角

      //创建控制器
      controls = new OrbitControls(camera, container);
      // 启用阻尼效果，让摄像机的移动更加平滑自然
      controls.enableDamping = true;
      // 设置摄像机的最大距离，限制用户能够远离场景的最大距离
      controls.maxDistance = 5;
      // 设置摄像机的最小缩放值，防止用户将场景放大得太小
      controls.minZoom = 1.5;
      controls.update();

      //创建舞台（3D 世界）
      scene = new THREE.Scene();
      // 创建网格辅助工具
      // const gridHelper = new THREE.GridHelper(100, 100);
      // scene.add(gridHelper);
      // // 创建坐标轴辅助工具
      // const axesHelper = new THREE.AxesHelper(5);
      // scene.add(axesHelper);
      //创建时钟 用于控制画面渲染帧数
      clock = new THREE.Clock();

      //监听鼠标移动事件
      container.addEventListener('mousemove', this.onMouseMove);
      //创建照明
      const rgbeLoader = new RGBELoader();
      rgbeLoader.load("./static/zwartkops_curve_sunset_1k.hdr", function(r) {
        r.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = new THREE.Color(0xFFFFFF);
        scene.environment = r;
      });

      let vm = this;
      //加载模型
      const loader = new GLTFLoader();
      loader.load("./static/car2.glb", function(gltf) {
        let position = new THREE.Vector2();
        const models = gltf.scene;
        models.position.set(-2, 0, 0);
        scene.add(models);
        //动画片段
        //vm.open(gltf) //这里不能使用 this
        vm.createGUI(gltf.scene, gltf.animations);
      });

      // 设置渲染器的像素比，以适应设备的像素密度
      renderer.setPixelRatio(window.devicePixelRatio);
      // 根据容器的大小设置渲染器的大小，确保渲染区域填充整个容器
      renderer.setSize(container.clientWidth, container.clientHeight);
      console.log(renderer);
      //渲染
      container.appendChild(renderer.domElement);
      this.myrender();
    },
    /*open(gltf) {
      mixer = new THREE.AnimationMixer(gltf.scene);
      //其中的一个动画片段
      const clip = gltf.animations[1];
      const action = mixer.clipAction(clip);
      //是否停留在最后一帧
      action.clampWhenFinished = true;
      //只需要播放一次
      action.loop = THREE.LoopOnce;
      this.openDoor = action
    },*/
    onMouseMove() {
      //初始化鼠标向量 加法、减法、标量乘法、点积、叉积等
      mouse = new THREE.Vector2(1, 1);
      event.preventDefault();
      // WEBGL 转 openGL 坐标
      /**
       * OpenGL 坐标系的范围是[-1, 1]，因此需要对相对坐标进行归一化和翻转操作。x 坐标乘以 2 并减去 1，
       * 使得范围从[0, 1]变为[-1, 1]；y 坐标需要进行翻转，
       * 乘以-1 并加上 1，使得范围从[0, 1]变为[-1, 1]。
       */
      // 获取渲染器视口的左上角 x 坐标
      let px = renderer.domElement.getBoundingClientRect().left;
      // 获取渲染器视口的左上角 y 坐标
      let py = renderer.domElement.getBoundingClientRect().top;

      let x = ((event.clientX - px) / container.clientWidth) * 2 - 1;
      let y = -((event.clientY - py) / container.clientHeight) * 2 + 1;
      //初始化一个 openGL 的三维向量
      let vector = new THREE.Vector3(x, y);

      //通过 unproject(camera)方法将 vector 反投影 初始化世界坐标
      let wordVector = vector.unproject(camera);

      let ray = wordVector.sub(camera.position).normalize();

      // camera.position 相机地址 ray 射线
      const raycaster = new THREE.Raycaster(camera.position, ray);
      raycaster.camera = camera;
      const intersection = raycaster.intersectObjects(scene.children, true);
      console.log("===" + intersection.length);
      if (intersection.length > 0) {
        console.log(intersection[0].object.parent.name);
        /*if (intersection[0].object.parent.name === 'right2') {
          this.openDoor.play()
        }*/

        if (intersection[0].object.parent.name === 'right2') {
          console.log("你操作 right2");
          if (this.right2) {
            this.openOrCloseDoor("openRight2", -1);
            this.right2 = false;
          } else {
            this.openOrCloseDoor("openRight2", 1);
            this.right2 = true;
          }
        }

        if (intersection[0].object.parent.name === 'right1') {
          console.log("你操作 right1");
          if (this.right1) {
            this.openOrCloseDoor("openRight1", -1);
            this.right1 = false;
          } else {
            this.openOrCloseDoor("openRight1", 1);
            this.right1 = true;
          }
        }

        if (intersection[0].object.parent.name === 'left1') {
          if (this.left1) {
            this.openOrCloseDoor("openLeft1", -1);
            this.left1 = false;
          } else {
            this.openOrCloseDoor("openLeft1", 1);
            this.left1 = true;
          }
        }

        if (intersection[0].object.parent.name === 'left2') {
          if (this.left2) {
            this.openOrCloseDoor("openLeft2", -1);
            this.left2 = false;
          } else {
            this.openOrCloseDoor("openLeft2", 1);
            this.left2 = true;
          }
        }
      }
    },
    //开关门
    openOrCloseDoor(data, timeScale) {
      let activeAction = "";
      let previousAction = activeAction;
      activeAction = actions[data];
      if (previousAction) {
        if (previousAction!== activeAction) {
          previousAction.setEffectiveWeight(0);
          previousAction.setEffectiveWeight(1);
        }
      }
      actions[data].timeScale = timeScale;
      actions[data].reset().play();
    },
    //动画
    createGUI(model, animations) {
      mixer = new THREE.AnimationMixer(model);
      actions = {};
      for (let i = 0; i < animations.length; i++) {
        const clip = animations[i];
        const action = mixer.clipAction(clip);
        action.clampWhenFinished = true;
        action.loop = THREE.LoopOnce;
        actions[clip.name] = action;
      }
    },
    myrender() {
      renderer.render(scene, camera);
      const dt = clock.getDelta();
      if (mixer) mixer.update(dt);
      requestAnimationFrame(this.myrender);
    }
  }
};
</script>

<style>
</style>