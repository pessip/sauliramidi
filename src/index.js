import './css/index.css'
import * as THREE from 'three'
import obama from './textures/obama.jpg'
import crate from './textures/crate.gif'
import sale from './textures/Sale-pieni.jpg'

let camera, scene, renderer, cube;

function init() {
	// Init scene
	scene = new THREE.Scene();

	// Init camera (PerspectiveCamera)
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		1,
		1000
	);

	// Init renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });

	// Set size (whole window)
	renderer.setSize(window.innerWidth, window.innerHeight);

	// Render to canvas element
	document.body.appendChild(renderer.domElement);

	// Init BoxGeometry object (rectangular cuboid)
  const geometry = new THREE.CylinderGeometry(0, 250, 250, 4)
  
  const texture = new THREE.TextureLoader().load(sale, function ( texture ) {

    texture.wrapS = THREE.RepeatWrapping;
    texture.offset.set( -1.2, -1.2 );
    texture.repeat.set( 4, 4 );

  });


	// Create material with color
	const material = new THREE.MeshBasicMaterial({ map: texture });

	// Add texture - 
	// const texture = new THREE.TextureLoader().load('textures/crate.gif');

	// Create material with texture
	// const material = new THREE.MeshBasicMaterial({ map: texture });

	// Create mesh with geo and material
	cube = new THREE.Mesh(geometry, material);
	// Add to scene
	scene.add(cube);

	// Position camera
	camera.position.z = 400;
}

// Draw the scene every time the screen is refreshed
function animate() {
	requestAnimationFrame(animate);

	// Rotate cube (Change values to change speed)
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render(scene, camera);
}

function onWindowResize() {
	// Camera frustum aspect ratio
	camera.aspect = window.innerWidth / window.innerHeight;
	// After making changes to aspect
	camera.updateProjectionMatrix();
	// Reset size
	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
