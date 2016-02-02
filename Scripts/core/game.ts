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
var legOne: Mesh;
var legTwo: Mesh;
var neck: Mesh;
var body: Mesh;
var head: Mesh;
var handOne: Mesh;
var handTwo: Mesh;
var feetOne: Mesh;
var feetTwo: Mesh;
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
    
    //add legs to the scene
    legMat = new LambertMaterial ({color:0xCCCC99});
    legGeo=new CubeGeometry(0.5,2,0.5);
    legOne = new gameObject (legGeo, legMat, 0, 1, 0);
    scene.add(legOne);
    legTwo=new gameObject(legGeo, legMat, -0.75, 1, 0);
    scene.add(legTwo);
    console.log("Added legs");
    
    //add feets
    feetMat = new LambertMaterial ({color:0x003333});
    feetGeo=new CubeGeometry(0.25, 0.25, 0.25);
    feetOne=new gameObject (feetGeo, feetMat, 0.35, 0.15, -0.15);
    scene.add(feetOne);
    feetTwo=new gameObject(feetGeo, feetMat, -1, 0.15, -0.15);
    scene.add(feetTwo);
    console.log("Added feets");
    
    //add body
     bodyMat = new LambertMaterial ({color:0x9999FF});
    bodyGeo=new CubeGeometry(1.2,3,1.8);
    body=new gameObject(bodyGeo, bodyMat, -0.3, 3.7, -0.58);
    scene.add(body);
    
    //add neck
    neckMat = new LambertMaterial ({color:0xCCCCCC});
    neckGeo=new CubeGeometry(0.3,0.7,0.3);
    neck=new gameObject(neckGeo, neckMat, -0.3, 5.3, -0.58);
    scene.add(neck);
    
    //add head
    headMat = new LambertMaterial ({color:0xFFFFCC});
    headGeo=new CubeGeometry(1,1, 1);
    head=new gameObject(headGeo, headMat, -0.3, 6, -0.58);
      scene.add(head);
      
    //add arms
    handMat = new LambertMaterial ({color:0x9966CC});
    handGeo=new CubeGeometry(2.5, 0.5, 0.5);
    handOne=new gameObject( handGeo,  handMat, 1.3, 4.1, 1);
    scene.add(handOne);
    
    handTwo=new gameObject(handGeo,  handMat, -2, 4.1, 1);
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

function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function addControl(controlObject: Control): void {
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
function gameLoop(): void {
    stats.update();

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
