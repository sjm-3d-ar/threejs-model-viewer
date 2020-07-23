/* eslint-disable no-param-reassign */
import React, { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import * as THREE from "three";

import { getRouteQuery, tj } from "_utils";

const useStyles = makeStyles({
  root: {
    // NOTE: % may be necessary if displaying this on an iPhone
    //  vw, vh fills the window on desktop, but may distort the window on iPhone
    //  100% w, h did not always fill the window (it seemed to fill the window only
    //  when the aspect ratio was met or exceeded, else left white space)
    // This could be due to a later version of three.js, as it behaves differently
    // as described in the tutorial.
    width: "100vw",
    height: "100vh",

    display: "block",
  },
});

const ModelViewer = () => {
  const classes = useStyles();
  const router = useRouter();
  const canvas = useRef();

  useEffect(() => {
    const { OrbitControls } = require("three/examples/jsm/controls/OrbitControls"); // eslint-disable-line global-require
    const { GLTFLoader } = require("three/examples/jsm/loaders/GLTFLoader"); // eslint-disable-line global-require

    console.log("router.query.modelUrl:", router.query.modelUrl);
    console.log("window.location.search:", window.location.search);

    const query = getRouteQuery(router);

    const modelUrl =
      query.modelUrl ||
      "https://avo-content-dev.s3.amazonaws.com/campaign-manager/models/Speeder_for_dev.glb";

    const renderer = new THREE.WebGLRenderer({ canvas: canvas.current });

    const fov = 45;
    const aspect = 2; // w / h
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 20);

    const controls = new OrbitControls(camera, canvas.current);
    controls.target.set(0, 5, 0);
    controls.update();

    const scene = new THREE.Scene();

    // add a HemisphereLight
    {
      const skyColor = 0xb1e1ff;
      const groundColor = 0xb97a20;
      const intensity = 1;
      const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
      scene.add(light);
    }

    // also add a DirectionalLight
    {
      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.HemisphereLight(color, intensity);
      light.position.set(5, 10, 2);
      scene.add(light);
    }

    {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(modelUrl, gltf => {
        const root = gltf.scene;
        scene.add(root);

        const box = tj.getBoxSizeCenter(root);

        tj.moveCamera(box.size * 0.5, box.size, box.center, camera);

        // move the controls based on model size
        controls.maxDistance = box.size * 10;
        controls.target.copy(box.center);
        controls.update();
      });
    }

    const render = () => {
      // this resizing logic may not be necessary. it seemed to behave as needed without it.
      // this is possibly due to a later version of three.js? as the tutorial described
      // different behavior.
      if (tj.resizeRendererToDisplaySize(renderer)) {
        // adjust camera aspect, to account for screen being resized
        camera.aspect = canvas.current.clientWidth / canvas.current.clientHeight;
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  }, []);

  return <canvas className={classes.root} ref={canvas} />;
};

export default ModelViewer;
