import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const canvas = document.querySelector('#container')

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize( window.innerWidth, window.innerHeight );

const redMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh( cubeGeometry, redMaterial )

scene.add( cube )

const points = []

points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 10 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );

const line = new THREE.Line(lineGeometry, redMaterial)

// scene.add( line );

camera.position.z = 1.5;
// camera.lookAt( 0, 0, 0 );

function animate() {
  requestAnimationFrame( animate );
  // line.rotation.x += 0.01;
  // line.rotation.y += 0.01;
  renderer.render( scene, camera )
}

if (WEBGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  animate();
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