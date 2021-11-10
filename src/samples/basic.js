import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { makeInstance } from './utils'

const canvas = document.querySelector('#container')

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize( window.innerWidth, window.innerHeight );

const redMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 })

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cube1 = makeInstance(cubeGeometry, 0xff0000)
const cube2 = makeInstance(cubeGeometry, 0x00ff00)
const cube3 = makeInstance(cubeGeometry, 0x0000ff)

cube1.position.x = -10
cube2.position.x = 0
cube3.position.x = 10

const cubes = [cube1, cube2, cube3]

cubes.forEach((cube) => scene.add(cube))

const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

// const points = []

// points.push( new THREE.Vector3( - 10, 0, 0 ) );
// points.push( new THREE.Vector3( 0, 10, 10 ) );
// points.push( new THREE.Vector3( 10, 0, 0 ) );

// const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );

// const line = new THREE.Line(lineGeometry, redMaterial)

// scene.add( line );

camera.position.z = 10;
// camera.lookAt( 0, 0, 0 );

function animate(time) {
  time *= 0.001;

  cubes.forEach((cube) => {
    cube.rotation.x = time
    cube.rotation.y = time
  })

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