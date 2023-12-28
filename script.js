import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, cube, controls;
let raycaster, mouse;


function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // const geometry = new THREE.BoxGeometry();
    const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ffff});
    const material = new THREE.PointsMaterial({
      size: 0.01
    })
    cube = new THREE.Points(geometry, material);
    scene.add(cube);
    
    camera.position.z = 5;

    controls = new OrbitControls(camera, renderer.domElement);
    const size = 10;
    const divisions = 10;
    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);
    window.addEventListener('mousemove', onMouseMove, false);
    
}

function animate() {
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    cube.rotation.y += 0.005;

    controls.update();

    renderer.render(scene, camera);
}

function onMouseMove(event) {
  // Convert to normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}


init();
animate();
