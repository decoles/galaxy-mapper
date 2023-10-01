import * as THREE from "three";

export default class Planet {
  constructor(radius, positionX, textureFile) {
    this.radius = radius;
    this.positionX = positionX;
    this.textureFile = textureFile;
  }

  getMesh() {
    if (this.mesh === undefined || this.mesh === null) {
      const geometry = new THREE.SphereGeometry(this.radius);
      const texture = new THREE.TextureLoader().load(this.textureFile);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 1,
        metalness: 0,
      });
      var geometryTorus = new THREE.TorusGeometry( 5, 0.05, 4, 100 );
      var material2 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
      var torus = new THREE.Mesh( geometryTorus, material2 );
      torus.rotation.x = Math.PI/2;
      torus.position.x = 48;

      this.mesh = new THREE.Mesh(geometry, material);
      this.mesh.castShadow = true;
      this.mesh.receiveShadow = true;
      this.mesh.position.x += this.positionX;
    }
    return this.mesh;
  }

  getRing() {
    if (this.ring === undefined || this.ring === null) {
      let lod = new THREE.LOD();
      const geometry = new THREE.RingGeometry( this.radius + 1, this.radius + 1.2, 32 );
      const material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
      this.ring = new THREE.Mesh( geometry, material );
      this.ring.position.x += this.positionX;
      this.ring.rotation.x = Math.PI/2;
      lod.addLevel(this.ring, 1000)
    }
    return this.ring;
  }

  getInvisibleRing() {
    if (this.invisibleRing === undefined || this.invisibleRing === null) {
      const geometry = new THREE.RingGeometry( 0, this.radius + 1.2, 32 );
      const material = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide} );
      this.invisibleRing = new THREE.Mesh( geometry, material );
      this.invisibleRing.position.x += this.positionX;
      this.invisibleRing.rotation.x = Math.PI/2;
      this.invisibleRing.visible = false;
    }
    return this.invisibleRing;
  }

  getMeshUnkown() {
    if (this.meshUnkown === undefined || this.meshUnkown === null) {
      const geometry = new THREE.SphereGeometry(this.radius);
      const material = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
      this.meshUnkown = new THREE.Mesh(geometry, material);
      this.meshUnkown.castShadow = true;
      this.meshUnkown.receiveShadow = true;
      this.meshUnkown.position.x += this.positionX;
    }
    return this.meshUnkown;
  }
}