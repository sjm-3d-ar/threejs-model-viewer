import * as THREE from "three";

const getBoxSizeCenter = object => {
  // compute the box that contains the object (and objects in the graph below)
  const box = new THREE.Box3().setFromObject(object);

  const size = box.getSize(new THREE.Vector3()).length();
  const center = box.getCenter(new THREE.Vector3());

  return { size, center };
};
const meshPhongInstance = (geometry, color, x, y, z, scene) => {
  const material = new THREE.MeshPhongMaterial({ color });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);

  if (scene) scene.add(mesh);

  return mesh;
};

const moveCamera = (sizeToFitOnScreen, boxSize, boxCenter, camera) => {
  const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
  const halfFovY = THREE.MathUtils.degToRad(camera.fov * 0.5);
  const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);

  // compute a unit vector that points in the direction the camera is now
  // in hte xz plane from the center of the box
  const direction = new THREE.Vector3()
    .subVectors(camera.position, boxCenter)
    .multiply(new THREE.Vector3(1, 0, 1))
    .normalize();

  // move the camera to a position distance units way from the center
  // in whatever direction the camera was from the center already
  camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

  // pick some near and far values for the frustum that
  // will contain the box.
  camera.near = boxSize / 100; // eslint-disable-line no-param-reassign
  camera.far = boxSize * 100; // eslint-disable-line no-param-reassign

  camera.updateProjectionMatrix();

  // point the camera to look at the center of the box
  camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
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
  getBoxSizeCenter,
  meshPhongInstance,
  moveCamera,
  resizeRendererToDisplaySize,
};
