import * as THREE from 'three';

export function makeInstance(geometry, color) {
  const material = new THREE.MeshPhongMaterial({color});
  return new THREE.Mesh(geometry, material);
}