import * as THREE from "three";
import { MapControls } from "three/addons/controls/MapControls.js";

export function base({ canvas }) {
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x202020);

    // Camera
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 2_000);
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
    controls.autoRotate = true;
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

function createStars() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const sizes = [];
    const colors = [];

    const colorChoices = [
        new THREE.Color(0xffffff), // Oq
        new THREE.Color(0xaaaaff), // Ko'kish
        new THREE.Color(0xffffaa), // Sarg'ish
        new THREE.Color(0xffffaa) 
    ];

    // count of stars
    for (let i = 0; i < 25000; i++) {
        const x = Math.random() * 2000 - 1000;
        const y = Math.random() * 2000 - 1000;
        const z = Math.random() * 2000 - 1000;
        vertices.push(x, y, z);

        sizes.push(Math.random() * 0.4 + 0.5);

        const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];
        colors.push(color.r, color.g, color.b);
    };

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 1,
        sizeAttenuation: true,
        vertexColors: true,    // Har bir yulduz uchun alohida rang
        transparent: true,     // Shaffoflikni yoqish
        opacity: 0.8,         // Shaffoflik darajasi
        blending: THREE.AdditiveBlending // Yorqinroq ko'rinish uchun
    });

    return new THREE.Points(geometry, material);
}

export const stars = createStars();

