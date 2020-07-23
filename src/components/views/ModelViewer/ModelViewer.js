/* eslint-disable no-param-reassign */
import React, { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as THREE from "three";

import { tj } from "_utils";

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

  const canvas = useRef();

  useEffect(() => {
    const { OrbitControls } = require("three/examples/jsm/controls/OrbitControls"); // eslint-disable-line global-require

    const renderer = new THREE.WebGLRenderer({ canvas: canvas.current });

    const fov = 45;
    const aspect = 2; // w / h
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 20);

    const controls = new OrbitControls(camera, canvas.current);
    controls.target.set(0, 5, 0);
    controls.update();

    const scene = new THREE.Scene();

    const boxWidth = 4;
    const boxHeight = 4;
    const boxDepth = 4;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const cubes = [tj.meshPhongInstance(geometry, 0x44aa88, 0, 0, 0, scene)];

    {
      // const color = 0xffffff;
      const skyColor = 0xb1e1ff;
      const groundColor = 0xb97a20;
      const intensity = 1;
      const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
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
