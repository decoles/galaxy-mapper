import * as THREE from "three";
import { useEffect } from "react";
import SceneInit from './SceneInitialization';
import Planet from "./Planet";
import Rotation from "./Rotation";

export default function GenerateGalaxy() {
  useEffect(() => {
    let galaxy = new SceneInit();
    galaxy.initScene();
    galaxy.animate();

    const solarSystem = new THREE.Group();
    galaxy.scene.add(solarSystem);

    const mercury = new Planet(2, 16, "/textures/mercury.jpg");
    const mercuryMesh = mercury.getMesh();
    let mercurySystem = new THREE.Group();
    mercurySystem.add(mercuryMesh);

    const venus = new Planet(3, 32, "/textures/venus.jpg");
    const venusMesh = venus.getMesh();
    let venusSystem = new THREE.Group();
    venusSystem.add(venusMesh);

    const earth = new Planet(4, 48, "/textures/earth.jpg");
    const earthMesh = earth.getMesh();
    let earthSystem = new THREE.Group();
    earthSystem.add(earthMesh);

    const mars = new Planet(3, 64, "/textures/mars.jpg");
    const marsMesh = mars.getMesh();
    let marsSystem = new THREE.Group();
    marsSystem.add(marsMesh);

    solarSystem.add(mercurySystem, venusSystem, earthSystem, marsSystem);

    const mercuryRotation = new Rotation(mercuryMesh);
    const mercuryRotationMesh = mercuryRotation.getMesh();
    mercurySystem.add(mercuryRotationMesh);
    const venusRotation = new Rotation(venusMesh);
    const venusRotationMesh = venusRotation.getMesh();
    venusSystem.add(venusRotationMesh);
    const earthRotation = new Rotation(earthMesh);
    const earthRotationMesh = earthRotation.getMesh();
    earthSystem.add(earthRotationMesh);
    const marsRotation = new Rotation(marsMesh);
    const marsRotationMesh = marsRotation.getMesh();
    marsSystem.add(marsRotationMesh);

    var material1 = new THREE.MeshBasicMaterial( { color: 0xaaaaaa } );
    var geometry = new THREE.SphereGeometry( 4, 32, 32 );
    var sphere = new THREE.Mesh( geometry, material1 );
    galaxy.scene.add( sphere );
    
    var geometry = new THREE.TorusGeometry( 5, 0.05, 4, 100 );
    var material2 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    var torus = new THREE.Mesh( geometry, material2 );
    torus.rotation.x = Math.PI/2;
    galaxy.scene.add( torus );

    //make solar system static
    mercurySystem.rotation.y = 3 ; 
    venusSystem.rotation.y = 9;
    earthSystem.rotation.y += 8;
    marsSystem.rotation.y += 5;



    //make any constant animations occur (like sun rotation)
    const animate = () => {
      //place animations here
      torus.lookAt(galaxy.camera.position);

      requestAnimationFrame(animate);
    };
    animate();
  }, []);





  return (
    <canvas id="myThreeJsCanvas" />
  );
}