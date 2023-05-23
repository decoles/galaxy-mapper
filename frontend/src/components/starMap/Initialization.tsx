import React from "react";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

//Initlize the stars
var vertices = []; 
var numPoints = 10000;
for (var i = 0; i < numPoints; i++) {
    var x = THREE.MathUtils.randFloatSpread(1000);
    var y = THREE.MathUtils.randFloatSpread(1000);
    var z = THREE.MathUtils.randFloatSpread(1000);
    vertices.push(x, y, z);
} 
const geom = new THREE.BufferGeometry();
geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const mat = new THREE.PointsMaterial({
    color: 0xb4b4b4,
    sizeAttenuation: false,
    size: 1,
});
const points = new THREE.Points(geom, mat);
scene.add(points);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)
    controls.update()

    render()
}

function render() {
    renderer.render(scene, camera)
}
animate()

function Initialization()
{
    return(
        <div>

        </div>
    );
}

export default Initialization;