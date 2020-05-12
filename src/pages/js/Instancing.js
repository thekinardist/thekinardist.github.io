function init() {
	var stats = initStats(); 
	// create a scene, that will hold all our elements such as objects, cameras and lights.
	var scene = new THREE.Scene();
  
	// create a camera, which defines where we're looking at.
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  
	// create a render and configure it with shadows
	var renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color(0x000000));
	renderer.setSize(window.innerWidth, window.innerHeight);
	const myGroup = new THREE.Group();
	// create a cube
	var cubeMaterial = new THREE.MeshLambertMaterial({
		color: 0xFF0000
	  });
	for(let i = 0; i < 5; i++){
		for(let j = 0; j < 5; j++){
			for(let k = 0; k < 5; k++){
				const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(0,0,0, 4, 4, 4 ), cubeMaterial );
				cube.position.set(i * 5,j * 5, k* 5); 
				myGroup.add(cube);
				cube.castShadow = true;

			}
		}
	}
	scene.add(myGroup);
	


	// add the cube to the scene

  
	// position and point the camera to the center of the scene
	camera.position.x = -30;
	camera.position.y = 40;
	camera.position.z = 30;
	camera.lookAt(scene.position);
  
	// add spotlight for the shadows
	var spotLight = new THREE.SpotLight(0xFFFFFF);
	spotLight.position.set(-40, 40, -15);
	spotLight.castShadow = true;
	spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
	spotLight.shadow.camera.far = 130;
	spotLight.shadow.camera.near = 40;
  
	scene.add(spotLight);
  
	var ambienLight = new THREE.AmbientLight(0x353535);
	scene.add(ambienLight);
  
	// add the output of the renderer to the html element
	document.getElementById("webgl-output").appendChild(renderer.domElement);

	var step = 0;
	var controls = new function(){
		this.rotationSpeed = 0.02; 
		this.bouncingSpeed = 0.03; 
	
	};
	var gui = new dat.GUI(); 
	gui.add(controls,'rotationSpeed',0,0.5); 
	gui.add(controls,'bouncingSpeed',0,0.5); 
	var trackballControls = initTrackballControls(camera, renderer);
	var clock = new THREE.Clock();

    render();

    function render() {
		trackballControls.update(clock.getDelta());
		stats.update();
		step += controls.bouncingSpeed;
		myGroup.rotation.x += controls.rotationSpeed;
		scene.traverse(function(e){
			if(e instanceof THREE.Mesh){
				e.rotation.x += controls.rotationSpeed;
				e.rotation.y += controls.rotationSpeed;
				e.rotation.z += controls.rotationSpeed;

				// e.position.x + 20 +(10*(Math.cos(step)));
				// e.position.y + 20 +(10*(Math.cos(step)));
				// e.position.z + 20 +(10*(Math.cos(step)));


			}
		});

       requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
}
  
 