import * as THREE from "three";
import { useEffect } from "react";
import SceneInit from "../SceneInitialization";
import Planet from "./Planet";
import Rotation from "./Rotation";
// import { Interaction } from 'three.interaction';
import Interaction from 'three.interaction/src/interaction/Interaction.js'

export default function GenerateGalaxy() {
  useEffect(() => {
    let galaxy = new SceneInit();
    galaxy.initScene();
    galaxy.animate();

    const solarSystem = new THREE.Group();
    galaxy.scene.add(solarSystem);

    //Primary Planet
    const earth = new Planet(4, 0, "/textures/out0001.png");
    const earthMesh = earth.getMesh();
    const earthRing = earth.getRing();
    const earthInvisibleRing = earth.getInvisibleRing();
    let earthSystem = new THREE.Group();
    earthSystem.add(earthMesh);
    earthSystem.add(earthRing);
    earthSystem.add(earthInvisibleRing);
    solarSystem.add(earthSystem);
    const earthRotation = new Rotation(earthMesh);
    const earthRotationMesh = earthRotation.getMesh();
    earthSystem.add(earthRotationMesh);

    //Unkown Planet
    const unkown = new Planet(4, 64, "/textures/out0001.png");
    const unkownMesh = unkown.getMeshUnkown();
    const unkownRing = unkown.getRing();
    let unkownSystem = new THREE.Group();
    unkownSystem.add(unkownMesh);
    unkownSystem.add(unkownRing);
    solarSystem.add(unkownSystem);
    const unkownRotation = new Rotation(unkownMesh);
    const unkownRotationMesh = unkownRotation.getMesh();
    unkownSystem.add(unkownRotationMesh);

    
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();

    const interaction = new Interaction(galaxy.renderer, galaxy.scene, galaxy.camera);
    earthInvisibleRing.cursor = 'pointer';
    earthInvisibleRing.on('click', () => {
      console.log('click');
    });
    earthInvisibleRing.cursor = 'pointer';
    earthInvisibleRing.on('click', function(ev) {console.log('click');});
    earthInvisibleRing.on('mouseout', function(ev) {console.log('mouseout');});
    earthInvisibleRing.on('mouseover', function(ev) {console.log('mouseover'); raycaster.setFromCamera( mouse, galaxy.camera );});

    //make solar system static
    earthSystem.rotation.y += 0;

    //make any constant animations occur (like sun rotation)
    const animate = () => {
      //place animations here

      //Keep ring facing camera
      earthRing.lookAt(galaxy.camera.position);
      unkownRing.lookAt(galaxy.camera.position);
      earthInvisibleRing.lookAt(galaxy.camera.position);
      
      requestAnimationFrame(animate);
    };
    animate();
  }, []);





  return (
    <canvas id="myThreeJsCanvas" />
  );
}