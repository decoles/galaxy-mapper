import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

export default class SceneInit {
  constructor(fov = 36, camera, scene, stats, controls, renderer) {
    this.fov = fov;
    this.scene = scene;
    this.stats = stats;
    this.camera = camera;
    this.controls = controls;
    this.renderer = renderer;
  }

  initScene() {
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 128;

    this.scene = new THREE.Scene();

    //const spaceTexture = new THREE.TextureLoader().load("/textures/space2.jpg");
    //this.scene.background = spaceTexture;

    // specify a canvas which is already created in the HTML file and tagged by an id
    // aliasing enabled
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("myThreeJsCanvas"),
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; //Default THREE.PCFShadowMap
    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.stats = Stats();
    document.body.appendChild(this.stats.dom);

    const color = 0xFFFFFF;
    const intensity = 1.0;

    const ambientLight = new THREE.AmbientLight(color, 0.2);
    this.scene.add(ambientLight);


    //Initlize the stars
    var vertices = []; 
    var numPoints = 10000;
    for (var i = 0; i < numPoints; i++) {
        var x = THREE.MathUtils.randFloatSpread(1000);
        var y = THREE.MathUtils.randFloatSpread(1000);
        var z = THREE.MathUtils.randFloatSpread(1000);
        vertices.push(x, y, z);
    } 
    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    var material = new THREE.PointsMaterial({
        color: 0xb4b4b4,
        sizeAttenuation: false,
        size: 1,
    });
    var points = new THREE.Points(geometry, material);
    this.scene.add(points);

    // if window resizes
    window.addEventListener("resize", () => this.onWindowResize(), false);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.stats.update();
  
    // Update the position of the directional light here
    const time = performance.now() * 0.0001; // Use time to control the movement
    const radius = 100; // Radius of the circular path
    const centerX = 0; // X coordinate of the center
    const centerY = 0; // Y coordinate of the center
  
    const x = centerX + Math.cos(time) * radius;
    const y = centerY + Math.sin(time) * radius;
  
    // Get the existing directional light from the scene
    const directionalLight = this.scene.getObjectByName('directionalLight');
  
    // Check if the directional light already exists in the scene
    if (directionalLight) {
      // Update the position of the existing directional light
      directionalLight.position.set(x, y, 0);
    } else {
      // Create a new directional light and add it to the scene
      const color = 0xFFFFFF;
      const intensity = 1.0;
      const newDirectionalLight = new THREE.DirectionalLight(color, intensity);
      newDirectionalLight.position.set(x, y, 0);
      newDirectionalLight.name = 'directionalLight'; // Set a name to identify it
      this.scene.add(newDirectionalLight);
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    //this.renderer.shadowMap.enabled = true;
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}