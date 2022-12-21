import * as THREE from "three";
import { useEffect } from "react";
import SceneInit from './library/SceneInitialization';
import Planet from "./library/Planet";
import Rotation from "./library/Rotation";

export default function Home() {
  useEffect(async () => {
    let test = new SceneInit();
    test.initScene();
    test.animate();
    const solarSystem = new THREE.Group();
    test.scene.add(solarSystem);

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

    //make solar system static

    mercurySystem.rotation.y = 3 ; 
    venusSystem.rotation.y = 9;
    earthSystem.rotation.y += 8;
    marsSystem.rotation.y += 5;
    const animate = () => {
      //place animations here
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}