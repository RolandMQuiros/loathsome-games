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
var enemy;
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
    
    // Create enemy
    enemy = new Enemy(game, 120, 32);
    scaleLayer.addChild(enemy);

    // Note: scaling the camera doesn't scale the physics bodies?
    game.camera.setSize(400, 250);
    //game.camera.scale.setTo(2.0, 2.0);
    
    //scaleLayer.scale.setTo(2.0, 2.0);
}

var enemyBodyBoxOffset;
function playerEnemyOverlapHandler(player, enemy) {
    enemyBodyBoxOffset = new Phaser.Rectangle(
        enemy.x + enemy.bodyBox.x,
        enemy.y + enemy.bodyBox.y,
        enemy.bodyBox.width,
        enemy.bodyBox.height
    );
    
    if (enemyBodyBoxOffset.intersects(player.body)) {
        player.tint = 0xFF0000;
    } else {
        player.tint = 0xFFFFFF;
    }
}

function update() {
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(enemy, layer);
    game.physics.arcade.overlap(player, enemy, playerEnemyOverlapHandler);

    if (game.input.keyboard.isDown(Phaser.Keyboard.I)) {
        // game.camera.scale.x += 0.01;
        // game.camera.scale.y += 0.01;
        scaleLayer.rotation += 0.01;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.K)) {
        // game.camera.scale.x -= 0.01;
        // game.camera.scale.y -= 0.01;
        scaleLayer.rotation -= 0.01;
    }
}

function render() {
    player.render();
    //game.debug.text(player.body.scale.toString(), 32, 32, "#FFF");
    game.debug.body(layer, "#FFF", false);
    game.debug.body(enemy, "#FFF", false);
    game.debug.geom(enemyBodyBoxOffset, "#F00", false);
    //this.game.debug.text(player.body.position.x + ", " + player.body.position.y, 32, 32, "#FFF");
    if (enemyBodyBoxOffset) {
        this.game.debug.text(enemyBodyBoxOffset.width + ", " + enemyBodyBoxOffset.height, 32, 32, "#FFF");
    }
}
