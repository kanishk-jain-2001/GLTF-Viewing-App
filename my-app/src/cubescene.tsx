import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



const CubeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(8, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Set clear color to white
    renderer.setClearColor(0xffffff); // This sets the background color to white
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    camera.position.z = 1;

    // Adding Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
    scene.add(ambientLight);

     // Adding Directional Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 0); // Position the light
    scene.add(directionalLight);


    // GLTF model loading
    const loader = new GLTFLoader();
    loader.load(process.env.PUBLIC_URL + '/models/CRANK.gltf', (gltf) => {
        scene.add(gltf.scene);
      }, undefined, (error) => {
        console.error(error);
      });

    // OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', () => renderer.render(scene, camera)); // Use if there's no animation loop
    controls.minDistance = 2; // Minimum zoom distance
    controls.maxDistance = 10; // Maximum zoom distance
    controls.target.set(0, 0, 0); // Set the view direction (the point the camera looks at)

    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} />;
};

export default CubeScene;
