/* global Phaser */
/* global Player */
/* global KeyboardButtons */

var game = new Phaser.Game(
    800, // width
    500, // height
    Phaser.AUTO, // renderer
    "", // parent
    { preload: preload, create: create, update: update, render: render}, // state
    false, // transparent
    false // antialias
);

function preload() {
    game.load.image("blueFont", "../assets/fonts/bluepink_font.png");
    game.load.image("tsTest", "../assets/tilesets/tsTest.png");

    game.load.spritesheet(
        "sprTestHero",
        "../assets/sprites/sprTestHero.png",
        16,
        32
    );

    game.load.tilemap("tmTest", "assets/tilemaps/tmTest.csv", null, Phaser.Tilemap.CSV);
}

var player;
var tileMap;
var layer;

var scaleLayer;

function create() {
    //game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    //game.scale.setUserScale(2.0, 2.0);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.time.desiredFps = 30;

    var kbButtons = new KeyboardButtons(game.input.keyboard);

    scaleLayer = game.add.group();

    // Create tilemap
    tileMap = game.make.tilemap("tmTest", 16, 16);
    tileMap.addTilesetImage("tsTest");
    tileMap.setCollision([1,2]);
    layer = tileMap.createLayer(0);
    scaleLayer.addChild(layer);

    // Create player
    player = new Player(game, 32, 32, kbButtons);
    scaleLayer.addChild(player);

    // Note: scaling the camera doesn't scale the physics bodies?
    game.camera.setSize(400, 250);
    game.camera.scale.setTo(2.0, 2.0);
}

function update() {
    game.physics.arcade.collide(player, layer);

    if (game.input.keyboard.isDown(Phaser.Keyboard.I)) {
        game.camera.scale.x += 0.01;
        game.camera.scale.y += 0.01;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.K)) {
        game.camera.scale.x -= 0.01;
        game.camera.scale.y -= 0.01;
    }
}

function render() {
    player.render();
    game.debug.cameraInfo(game.camera, 32, 32);
}
