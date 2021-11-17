import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

var scene, camera, renderer, container;
var light, controls, group, stats, mesh;

init();
animate();
loadModel();

function init() {
  // 创建容器
  container = document.createElement("div");
  document.body.appendChild(container);
  // 创建渲染函数
  renderer = new THREE.WebGLRenderer({
    antialias: true, //抗锯齿
  });
  renderer.setPixelRatio(window.devicePixelRatio); //设置渲染的比例
  renderer.setSize(window.innerWidth, window.innerHeight); //设置渲染的尺寸
  container.appendChild(renderer.domElement);

  // 创建fps监控器
  stats = new Stats();
  container.appendChild(stats.dom);
  // 创建相机
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(0, 0, 200); //设置相机位置

  // 设置鼠标操作（控制器）
  controls = new OrbitControls(
    camera,
    document.querySelector("canvas")
  );
  controls.update(); //更新控制器

  // 设置场景
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 600, 3000); //雾化场景
  scene.background = new THREE.Color(0xf65144);

  // 设置光照
  // 半球光
  const hemisphereLight = new THREE.HemisphereLight(
    0xffaea8, // 天空发出颜色
    0x7f0900, // 地面发出颜色
    1 // 光照强度
  );
  hemisphereLight.position.set(0, 50, 60);
  scene.add(hemisphereLight);

  // 聚光灯
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(100, 60, 100);
  scene.add(spotLight);
  // 聚光灯辅助线
  // const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  // scene.add(spotLightHelper);

    // 点光源
  light = new THREE.PointLight(0xffff00, 1, 100);
  light.position.set(0, 0, 0);
  scene.add(light);

  // 创建参考线
  // var axisHelper = new THREE.AxisHelper(250);
  // scene.add(axisHelper);

  // 根据窗口自适应改变
  window.addEventListener("resize", onWindowResize, false);
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  const time = Date.now() * 0.0005;
  if (light) {
    light.position.x = Math.sin(time * 0.7) * 50;
    light.position.z = Math.sin(time * 0.5) * 50;
  }
  renderer.render(scene, camera);
}

function loadModel() {
  // 模型地址
  // const url = "./beats_highpoly.fbx";
  const url = "./0928.FBX";
  const loader = new FBXLoader();
  loader.load(url, function (loadedModel) {
    const textureLoader = new THREE.TextureLoader();
    // const textureUrl = "./beats_red.png";
    // const textureNormal = textureLoader.load(textureUrl);
    mesh = loadedModel.children[0].clone();
    // mesh.material.map = textureNormal;
    mesh.material.shininess = 15;
    console.log(loadedModel.children[0]);
    scene.add(mesh);
  });
}