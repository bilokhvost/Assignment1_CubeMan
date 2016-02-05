/*game.ts
Kateryna Bilokhvost
Last Modified by: Kateryna Bilokhvost
Date last Modified: Feb 04, 2016
This is a program for cube man display.
The following controls are available: change rotation speed and change man's color
Revision History:
    Commit 1-3: Created the project file
    Commit 4: Added the greem humonoid
    Commit 5: Code optimization, adding new colors, fixed the camera
    Commit 6: Rotation was added
    Commit 7: Shadow issue is fixed
    Commit 8: Possibility to change colors was added
    Commit 9: Comments were added

*/
/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
//Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var legOne;
var legTwo;
var neck;
var body;
var head;
var handOne;
var handTwo;
var feetOne;
var feetTwo;
var cubMan;
var plane;
var sphere;
var ambientLight;
var spotLight;
var control;
var gui;
var stats;
var step = 0;
var legGeo;
var legMat;
var feetGeo;
var feetMat;
var bodyGeo;
var bodyMat;
var neckGeo;
var neckMat;
var headGeo;
var headMat;
var handGeo;
var handMat;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    // add an axis helper to the scene
    axes = new AxisHelper(10);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    //Add a Plane to the Scene
    plane = new gameObject(new PlaneGeometry(16, 16, 1, 1), new LambertMaterial({ color: 0xe79b61 }), 0, 0, 0);
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    //add body
    bodyMat = new LambertMaterial({ color: 0x9999FF });
    bodyGeo = new CubeGeometry(1.2, 3, 1.5);
    body = new gameObject(bodyGeo, bodyMat, 0, 3.5, 0);
    scene.add(body);
    //add legs to the body
    legMat = new LambertMaterial({ color: 0xCCCC99 });
    legGeo = new CubeGeometry(0.5, 2, 0.5);
    legOne = new gameObject(legGeo, legMat, -0.35, -2.5, 0.2);
    body.add(legOne);
    legTwo = new gameObject(legGeo, legMat, 0.3, -2.5, 0.2);
    body.add(legTwo);
    console.log("Added legs");
    //add feets to the body
    feetMat = new LambertMaterial({ color: 0x003333 });
    feetGeo = new CubeGeometry(0.4, 0.4, 0.4);
    feetOne = new gameObject(feetGeo, feetMat, -0.7, -3.3, 0.2);
    body.add(feetOne);
    feetTwo = new gameObject(feetGeo, feetMat, 0.69, -3.3, 0.2);
    body.add(feetTwo);
    console.log("Added feets");
    //add neck to the body
    neckMat = new LambertMaterial({ color: 0xCCCCCC });
    neckGeo = new CubeGeometry(0.3, 0.7, 0.3);
    neck = new gameObject(neckGeo, neckMat, 0, 1.7, 0);
    body.add(neck);
    //add head to the body
    headMat = new LambertMaterial({ color: 0xFFFFCC });
    headGeo = new CubeGeometry(1, 1, 1);
    head = new gameObject(headGeo, headMat, 0, 2.3, 0);
    body.add(head);
    //add arms to the body
    handMat = new LambertMaterial({ color: 0x9966CC });
    handGeo = new CubeGeometry(2.5, 0.5, 0.5);
    handOne = new gameObject(handGeo, handMat, 1.5, 0.75, 0.1);
    body.add(handOne);
    handTwo = new gameObject(handGeo, handMat, -1.5, 0.75, 0.1);
    body.add(handTwo);
    console.log("Added arems");
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x292929);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -20);
    //spotLight.position.set(200, 200, 5);
    //spotLight.rotation.set(-0.8, 42.7, 19.5);
    spotLight.castShadow = true;
    spotLight.shadowDarkness = 1;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    // add controls
    gui = new GUI();
    control = new Control(0);
    addControl(control);
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
//setup rotation and change color Bcontrols
function addControl(controlObject) {
    gui.add(controlObject, 'rotationSpeedX', -0.5, 0.5);
    gui.add(controlObject, 'rotationSpeedY', -0.5, 0.5);
    gui.add(controlObject, 'rotationSpeedZ', -0.5, 0.5);
    gui.add(controlObject, 'randomColour');
}
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
// Setup main game loop
function gameLoop() {
    stats.update();
    body.rotation.x += control.rotationSpeedX;
    body.rotation.y += control.rotationSpeedY;
    body.rotation.z += control.rotationSpeedZ;
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0.6;
    camera.position.y = 16;
    camera.position.z = -20.5;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera..!");
}
//# sourceMappingURL=game.js.map