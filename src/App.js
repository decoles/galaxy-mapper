
import { useEffect } from 'react';

import * as THREE from 'three';

import SceneInit from './library/SceneInitialization';

function App() {
  useEffect(() => {
    const scene = new SceneInit('myThreeJsCanvas');
    scene.initialize();
    scene.animate();

    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

    test.scene.add(boxMesh);
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;