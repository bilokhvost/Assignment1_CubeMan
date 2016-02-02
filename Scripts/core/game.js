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
    legMat = new LambertMaterial({ color: 0xCCCC99 });
    legGeo = new CubeGeometry(0.5, 2, 0.5);
    legOne = new gameObject(legGeo, legMat, 0, 1, 0);
    scene.add(legOne);
    legTwo = new gameObject(legGeo, legMat, -0.75, 1, 0);
    scene.add(legTwo);
    console.log("Added legs");
    //add feets
    feetMat = new LambertMaterial({ color: 0x003333 });
    feetGeo = new CubeGeometry(0.25, 0.25, 0.25);
    feetOne = new gameObject(feetGeo, feetMat, 0.35, 0.15, -0.15);
    scene.add(feetOne);
    feetTwo = new gameObject(feetGeo, feetMat, -1, 0.15, -0.15);
    scene.add(feetTwo);
    console.log("Added feets");
    //add body
    bodyMat = new LambertMaterial({ color: 0x9999FF });
    bodyGeo = new CubeGeometry(1.2, 3, 1.8);
    body = new gameObject(bodyGeo, bodyMat, -0.3, 3.7, -0.58);
    scene.add(body);
    //add neck
    neckMat = new LambertMaterial({ color: 0xCCCCCC });
    neckGeo = new CubeGeometry(0.3, 0.7, 0.3);
    neck = new gameObject(neckGeo, neckMat, -0.3, 5.3, -0.58);
    scene.add(neck);
    //add head
    headMat = new LambertMaterial({ color: 0xFFFFCC });
    headGeo = new CubeGeometry(1, 1, 1);
    head = new gameObject(headGeo, headMat, -0.3, 6, -0.58);
    scene.add(head);
    //add arms
    handMat = new LambertMaterial({ color: 0x9966CC });
    handGeo = new CubeGeometry(2.5, 0.5, 0.5);
    handOne = new gameObject(handGeo, handMat, 1.3, 4.1, 1);
    scene.add(handOne);
    handTwo = new gameObject(handGeo, handMat, -2, 4.1, 1);
    scene.add(handTwo);
    console.log("Added arems");
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(5.6, 23.1, 5.4);
    spotLight.rotation.set(-0.8, 42.7, 19.5);
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
    camera.position.y = 16;
    camera.position.z = -20.5;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera..!");
}
//# sourceMappingURL=game.js.map