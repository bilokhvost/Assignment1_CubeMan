/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var legOne: gameObject;
var legTwo: gameObject;
var neck: gameObject;
var body: gameObject;
var head: gameObject;
var handOne: gameObject;
var handTwo: gameObject;
var feetOne: gameObject;
var feetTwo: gameObject;
var cubMan:gameObject;
var plane: Mesh;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
var legGeo: CubeGeometry;
var legMat:LambertMaterial;

var feetGeo: CubeGeometry;
var feetMat:LambertMaterial;

var bodyGeo: CubeGeometry;
var bodyMat:LambertMaterial;

var neckGeo: CubeGeometry;
var neckMat:LambertMaterial;

var headGeo: CubeGeometry;
var headMat:LambertMaterial;

var handGeo: CubeGeometry;
var handMat:LambertMaterial;

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
    plane = new gameObject(
        new PlaneGeometry(16, 16, 1, 1),
        new LambertMaterial({ color: 0xe79b61 }),
        0, 0, 0);
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    
    //add body
    bodyMat = new LambertMaterial ({color:0x9999FF});
    bodyGeo=new CubeGeometry(1.2,3,1.8);
    body=new gameObject(bodyGeo, bodyMat, 0, 5, 0);
    scene.add(body);
    
    //add legs to the scene
    legMat = new LambertMaterial ({color:0xCCCC99});
    legGeo=new CubeGeometry(0.5,2,0.5);
    legOne = new gameObject (legGeo, legMat, -0.35, -2.5, 0.2);
    body.add(legOne);
    legTwo=new gameObject(legGeo, legMat, 0.3, -2.5, 0.2);
    body.add(legTwo);
    console.log("Added legs");
    
    //add feets
    feetMat = new LambertMaterial ({color:0x003333});
    feetGeo=new CubeGeometry(0.25, 0.25, 0.25);
    feetOne=new gameObject (feetGeo, feetMat, -0.7, -3.3, 0.25);
    body.add(feetOne);
    feetTwo=new gameObject(feetGeo, feetMat, 0.69, -3.3, 0.25);
    body.add(feetTwo);
    console.log("Added feets");
    
    //add neck
    neckMat = new LambertMaterial ({color:0xCCCCCC});
    neckGeo=new CubeGeometry(0.3,0.7,0.3);
    neck=new gameObject(neckGeo, neckMat, 0, 1.7, 0);
    body.add(neck);
    
    //add head
    headMat = new LambertMaterial ({color:0xFFFFCC});
    headGeo=new CubeGeometry(1,1, 1);
    head=new gameObject(headGeo, headMat, 0, 2.3, 0);
      body.add(head);
      
    //add arms
    handMat = new LambertMaterial ({color:0x9966CC});
    handGeo=new CubeGeometry(2.5, 0.5, 0.5);
    handOne=new gameObject( handGeo,  handMat, 1.5, 0.75, 0.1);
    body.add(handOne);
    
    handTwo=new gameObject(handGeo,  handMat, -1.5, 0.75, 0.1);
   body.add(handTwo);
    console.log("Added arems");
     
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x292929);
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
    control = new Control(0, 0, 0);
  
    addControl(control);

    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function addControl(controlObject: Control): void {
  gui.add(controlObject, 'rotationSpeedX',-0.5,0.5);
 gui.add(controlObject, 'rotationSpeedY',-0.5,0.5);
  gui.add(controlObject, 'rotationSpeedZ',-0.5,0.5);
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
function gameLoop(): void {
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
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
 camera.position.x = 0.6;
    camera.position.y = 16;
    camera.position.z = -20.5;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera..!");
}
