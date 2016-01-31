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
    //add legs to the scene
    legMat = new LambertMaterial({ color: 0x00ff00 });
    legGeo = new CubeGeometry(0.5, 2, 0.5);
    legOne = new Mesh(legGeo, legMat);
    legOne.castShadow = true;
    legOne.receiveShadow = true;
    legOne.position.y = 1;
    scene.add(legOne);
    legTwo = new Mesh(legGeo, legMat);
    legTwo.castShadow = true;
    legTwo.receiveShadow = true;
    legTwo.position.y = 1;
    legTwo.position.x = -0.75;
    scene.add(legTwo);
    console.log("Added legs");
    //add feets
    feetMat = new LambertMaterial({ color: 0x00ff00 });
    feetGeo = new CubeGeometry(0.25, 0.25, 0.25);
    feetOne = new Mesh(feetGeo, feetMat);
    feetOne.castShadow = true;
    feetOne.receiveShadow = true;
    feetOne.position.x = 0.35;
    feetOne.position.y = 0.15;
    feetOne.position.z = -0.15;
    scene.add(feetOne);
    feetTwo = new Mesh(feetGeo, feetMat);
    feetTwo.castShadow = true;
    feetTwo.receiveShadow = true;
    feetTwo.position.x = -1;
    feetTwo.position.y = 0.15;
    feetTwo.position.z = -0.15;
    scene.add(feetTwo);
    console.log("Added feets");
    //add body
    bodyMat = new LambertMaterial({ color: 0x00ff00 });
    bodyGeo = new CubeGeometry(1.2, 3, 1.8);
    body = new Mesh(bodyGeo, bodyMat);
    //body.castShadow=true;
    //body.receiveShadow=true;
    body.position.x = -0.25;
    body.position.y = 3.3;
    body.position.z = -0.58;
    scene.add(body);
    //add neck
    neckMat = new LambertMaterial({ color: 0x00ff00 });
    neckGeo = new CubeGeometry(0.5, 0.7, 0.5);
    neck = new Mesh(neckGeo, neckMat);
    //neck.castShadow=true;
    //neck.receiveShadow=true;
    neck.position.x = -0.3;
    neck.position.y = 5;
    neck.position.z = -0.58;
    scene.add(neck);
    //add head
    headMat = new LambertMaterial({ color: 0x00ff00 });
    headGeo = new CubeGeometry(1, 1, 1);
    head = new Mesh(headGeo, headMat);
    //head.castShadow=true;
    //head.receiveShadow=true;
    head.position.x = -0.3;
    head.position.y = 5.7;
    head.position.z = -0.58;
    scene.add(head);
    //add arms
    handMat = new LambertMaterial({ color: 0x00ff00 });
    handGeo = new CubeGeometry(2.5, 0.5, 0.5);
    handOne = new Mesh(handGeo, handMat);
    handOne.castShadow = true;
    handOne.receiveShadow = true;
    handOne.position.x = 1.3;
    handOne.position.y = 3.4;
    handOne.position.z = 2;
    scene.add(handOne);
    handTwo = new Mesh(handGeo, handMat);
    handTwo.castShadow = true;
    handTwo.receiveShadow = true;
    handTwo.position.x = -2;
    handTwo.position.y = 3.4;
    handTwo.position.z = 2;
    scene.add(handTwo);
    console.log("Added arems");
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 60, 10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    // add controls
    gui = new GUI();
    control = new Control();
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
function addControl(controlObject) {
    // gui.add(controlObject, 'clone');
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
    camera.position.y = 8;
    camera.position.z = -10.5;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera..!");
}
//# sourceMappingURL=game.js.map