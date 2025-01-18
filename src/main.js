import * as THREE from 'three';
import { base } from "./base";

const canvas = document.getElementById('webgl');

const { scene } = base({canvas});

scene.add(new THREE.GridHelper(20, 20, 0x808080, 0x404040));
scene.add(new THREE.AxesHelper(200));