import * as THREE from "three";
import { MapControls } from "three/addons/controls/MapControls.js";

export function base({ canvas }) {
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x202020);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2_000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0,0,0);

    // renderer
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // controls
    const controls = new MapControls(camera, canvas);
    controls.minDistance = 10;
    controls.maxDistance = 100;
    controls.enableDamping = true;
    controls.enableRotate = true;
    controls.maxPolarAngle = Math.PI / 2 - 0.25;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    })

    renderer.setAnimationLoop(() => {
        controls.update();
        renderer.render(scene, camera);
    });

    return {
        scene,
        camera,
        renderer
    }
}
