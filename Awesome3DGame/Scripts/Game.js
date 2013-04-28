$(function () {

    //if there's no webgl, just bail
    if (!Modernizr.webgl)
        return;

    var UPDATE_TOLERANCE = 0.01;

    var container;

    var camera, scene, renderer;

    var clock = new THREE.Clock();

    var composer;

    var $console = $('#console');

    // world

    //var s = 250;

    //var cube = new THREE.CubeGeometry(s, s, s);
    //var material = new THREE.MeshPhongMaterial({ ambient: 0x333333, color: 0xffffff, specular: 0xffffff, shininess: 50 });

    var playerList = {};

    var playerHub = $.connection.playerHub;

    var currentPosition = null;
    var currentRotation = null;

    var ship = null;

    gameConsoleLog("Loading 3D Models...");

    var loader = new THREE.ColladaLoader();
    loader.load('/Images/3d/ship2.xml', function (result) {

        gameConsoleLog("3D Models Loaded.");

        ship = result.scene;

        connectToServer();
    });

    playerHub.client.updatePlayerPosition = function (name, posx, posy, posz, rotx, roty, rotz) {

        //if it's me, bail
        if (name == playerId) {
            return;
        }

        //find item in list with specified name
        var player = playerList[name];

        //if the item isn't found, create one
        if (!player) {

            //var mesh = new THREE.Mesh(cube, material);

            mesh = ship.clone();

            mesh.matrixAutoUpdate = false;
            mesh.updateMatrix();

            scene.add(mesh);

            player = playerList[name] = mesh;

            gameConsoleLog("New player joined!");
        }

        //set x, y, z position
        player.position.x = posx;
        player.position.y = posy;
        player.position.z = posz;

        //set x, y, z, rotation
        player.rotation.x = rotx;
        player.rotation.y = roty;
        player.rotation.z = rotz;

        player.updateMatrix();
    };

    function connectToServer() {

        gameConsoleLog('Connecting to server...');

        //connect to hub
        $.connection.hub.start().done(function () {

            gameConsoleLog('Connection to server established.');

            gameConsoleLog('Initialising...');

            init();
            animate();

            gameConsoleLog('Welcome to Demo!');
        });

    }

    function gameConsoleLog(message) {

        $console.prepend($('<p>').text(message));

        while ($console.children().length > 10) {
            $console.children().last().remove();
        }
    }

    function init() {

        container = document.createElement('div');
        document.body.appendChild(container);

        // camera

        camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 15000);

        camera.position.x = 4000 * (2.0 * Math.random() - 1.0);
        camera.position.y = 4000 * (2.0 * Math.random() - 1.0);
        camera.position.z = 4000 * (2.0 * Math.random() - 1.0);

        camera.rotation.x = Math.random() * Math.PI;
        camera.rotation.y = Math.random() * Math.PI;
        camera.rotation.z = Math.random() * Math.PI;

        controls = new THREE.FlyControls(camera);

        controls.movementSpeed = 2500;
        controls.domElement = container;
        controls.rollSpeed = Math.PI / 6;
        controls.autoForward = false;
        controls.dragToLook = false

        // scene

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 3500, 15000);
        scene.fog.color.setHSL(0.51, 0.4, 0.01);

        // Starfield    
        var stars = new THREE.Geometry();
        for (var i = 0; i < 10000; i++) {
            stars.vertices.push(new THREE.Vector3(
              10000 * (2.0 * Math.random() - 1.0),
              10000 * (2.0 * Math.random() - 1.0),
              10000 * (2.0 * Math.random() - 1.0)
            ));
        }
        var star_stuff = new THREE.ParticleBasicMaterial();
        var star_system = new THREE.ParticleSystem(stars, star_stuff);
        scene.add(star_system);


        // lights

        var ambient = new THREE.AmbientLight(0xffffff);
        ambient.color.setHSL(0.1, 0.3, 0.2);
        scene.add(ambient);


        var dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
        dirLight.position.set(0, -1, 0).normalize();
        scene.add(dirLight);

        dirLight.color.setHSL(0.1, 0.7, 0.5);

        // lens flares

        var textureFlare0 = THREE.ImageUtils.loadTexture("/Images/lensflare0.png");
        var textureFlare2 = THREE.ImageUtils.loadTexture("/Images/lensflare2.png");
        var textureFlare3 = THREE.ImageUtils.loadTexture("/Images/lensflare3.png");

        addLight(0.55, 0.9, 0.5, 5000, 0, -1000);
        addLight(0.08, 0.8, 0.5, 0, 0, -1000);
        addLight(0.995, 0.5, 0.9, 5000, 5000, -1000);

        function addLight(h, s, l, x, y, z) {

            var light = new THREE.PointLight(0xffffff, 1.5, 4500);
            light.color.setHSL(h, s, l);
            light.position.set(x, y, z);
            scene.add(light);

            var flareColor = new THREE.Color(0xffffff);
            flareColor.setHSL(h, s, l + 0.5);

            var lensFlare = new THREE.LensFlare(textureFlare0, 700, 0.0, THREE.AdditiveBlending, flareColor);

            lensFlare.add(textureFlare2, 512, 0.0, THREE.AdditiveBlending);
            lensFlare.add(textureFlare2, 512, 0.0, THREE.AdditiveBlending);
            lensFlare.add(textureFlare2, 512, 0.0, THREE.AdditiveBlending);

            lensFlare.add(textureFlare3, 60, 0.6, THREE.AdditiveBlending);
            lensFlare.add(textureFlare3, 70, 0.7, THREE.AdditiveBlending);
            lensFlare.add(textureFlare3, 120, 0.9, THREE.AdditiveBlending);
            lensFlare.add(textureFlare3, 70, 1.0, THREE.AdditiveBlending);

            lensFlare.customUpdateCallback = lensFlareUpdateCallback;
            lensFlare.position = light.position;

            scene.add(lensFlare);

        }

        // renderer

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(scene.fog.color, 1);

        container.appendChild(renderer.domElement);

        //

        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.physicallyBasedShading = true;

        // events

        window.addEventListener('resize', onWindowResize, false);

    }

    //

    function lensFlareUpdateCallback(object) {

        var f, fl = object.lensFlares.length;
        var flare;
        var vecX = -object.positionScreen.x * 2;
        var vecY = -object.positionScreen.y * 2;


        for (f = 0; f < fl; f++) {

            flare = object.lensFlares[f];

            flare.x = object.positionScreen.x + vecX * flare.distance;
            flare.y = object.positionScreen.y + vecY * flare.distance;

            flare.rotation = 0;

        }

        object.lensFlares[2].y += 0.025;
        object.lensFlares[3].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad(45);

    }

    //

    function onWindowResize(event) {

        renderer.setSize(window.innerWidth, window.innerHeight);

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

    }

    //

    function animate() {

        requestAnimationFrame(animate);

        render();
    }

    function render() {

        var delta = clock.getDelta();

        controls.update(delta);

        if (vector3Changed(currentPosition, camera.position) ||
            vector3Changed(currentRotation, camera.rotation))
        {
            currentPosition = {x: camera.position.x, y: camera.position.y, z: camera.position.z};
            currentRotation = { x: camera.rotation.x, y: camera.rotation.y, z: camera.rotation.z };

            //send the player camera position
            playerHub.server.updatePlayerPosition(playerId,
                currentPosition.x, currentPosition.y, currentPosition.z,
                currentRotation.x, currentRotation.y, currentRotation.z);
        }

        renderer.render(scene, camera);
    }

    function vector3Changed(oldV3, newV3) {

        if (!oldV3 || !newV3) { return true; }

        return ((Math.abs(oldV3.x - newV3.x) > UPDATE_TOLERANCE) ||
                (Math.abs(oldV3.y - newV3.y) > UPDATE_TOLERANCE) ||
                (Math.abs(oldV3.z - newV3.z) > UPDATE_TOLERANCE));
    }


});