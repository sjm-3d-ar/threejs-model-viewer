import * as THREE from "three";

const meshPhongInstance = (geometry, color, x, y, z, scene) => {
  const material = new THREE.MeshPhongMaterial({ color });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);

  if (scene) scene.add(mesh);

  return mesh;
};

// this resizing logic may not be necessary. it seemed to behave as needed without it.
// this is possibly due to a later version of three.js? as the tutorial described
// different behavior.
const resizeRendererToDisplaySize = renderer => {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }

  return needResize;
};

export default {
  meshPhongInstance,
  resizeRendererToDisplaySize,
};
