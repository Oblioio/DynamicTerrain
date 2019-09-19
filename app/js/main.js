import main from '../scss/main.scss';

import { 
    Scene,
    PerspectiveCamera, 
    WebGLRenderer, 
    BufferGeometry, 
    BufferAttribute,
    Float32BufferAttribute,
    MeshBasicMaterial,
    Mesh
} from 'three';

'use strict';

function Main () {
    console.log("what up ")
    console.log(DynamicTerrain)
    this.renderer = new WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    this.canvas = this.renderer.domElement;
    document.body.appendChild(this.canvas);
    console.log(document.body)

    this.scene = new Scene();
    this.camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.z = 25;
    this.camera.position.y = -25;
    this.camera.rotation.x = Math.PI/4;
    window.addEventListener( 'resize', onWindowResize, false );

    this.terrain = new DynamicTerrain(10, 20);
    console.log(this.terrain.returnPtArray());
    console.log(this.terrain.returnIndiceArray());

    this.geometry = new BufferGeometry();
    this.geometry.addAttribute( 'position', new Float32BufferAttribute( this.terrain.returnPtArray(), 3 ) );
    this.geoPositions = this.geometry.attributes.position;
    this.geometry.setIndex( this.terrain.returnIndiceArray() );

    this.material = new MeshBasicMaterial( {
        color: 0xe0e0ff,
        wireframe: true
    } );

    this.mesh = new Mesh(this.geometry, this.material);

    this.scene.add(this.mesh);

    this.animate();
}

function animate() {

    requestAnimationFrame( animate.bind(this) );

    this.terrain.setPosition(this.terrain.currentPosition[0]+0.01, this.terrain.currentPosition[1]+0.015)

    this.geoPositions.set(this.terrain.returnPtArray(), 0);
    this.geoPositions.needsUpdate = true;

    this.render();
}

function render() {
    this.renderer.render( this.scene, this.camera );
}

function onWindowResize() {

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );

}

Main.prototype.render = render;
Main.prototype.animate = animate;
Main.prototype.render = render;
Main.prototype.onWindowResize = onWindowResize;

window.main = new Main();

