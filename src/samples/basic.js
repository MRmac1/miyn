import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const canvas = document.querySelector('#container')

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

const axesHelper = new THREE.AxesHelper( 10 );
scene.add( axesHelper );

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xAAAAAA)
renderer.shadowMap.enabled = true

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const redMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });

const cube = new THREE.Mesh(cubeGeometry, redMaterial);
cube.castShadow = true
cube.position.x = -5

scene.add(cube)

const planeGeometry = new THREE.PlaneGeometry(20, 10, 5, 5)
const plane = new THREE.Mesh(planeGeometry, redMaterial)
plane.receiveShadow = true

plane.rotateX(-0.5 * Math.PI) 

plane.position.x = 0
plane.position.y = -5
plane.position.z = 0

scene.add(plane)

const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.SpotLight(color);
light.castShadow = true
light.position.set(-5, 40, 0);

scene.add(light);

// const points = []

// points.push( new THREE.Vector3( - 10, 0, 0 ) );
// points.push( new THREE.Vector3( 0, 10, 10 ) );
// points.push( new THREE.Vector3( 10, 0, 0 ) );

// const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );

// const line = new THREE.Line(lineGeometry, redMaterial)

// scene.add( line );

camera.position.x = -10;
camera.position.y = 10;
camera.position.z = 10;
camera.lookAt( 0, 0, 0 );

function animate(time) {
  time *= 0.001;
  cube.rotation.x = time
  cube.rotation.y = time
  renderer.render( scene, camera )
  requestAnimationFrame( animate );
}

if (WEBGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  requestAnimationFrame(animate);
} else {
  const warning = WEBGL.getWebGLErrorMessage();
  console.log('warning', warning);
}

// const loader = new FBXLoader();

// loader.load( '/0928.FBX', function ( fbx ) {
//   console.log('fbx', fbx);
// 	scene.add( fbx.scene );
// }, undefined, function ( error ) {
// 	console.error( error );
// } );