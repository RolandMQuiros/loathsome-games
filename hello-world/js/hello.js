/* global Phaser */

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var font1;
var image1;

function preload() {
    game.load.baseURL = "../";
    game.load.image("blueFont", "assets/fonts/bluepink_font.png");
}

function create() {
    font1 = game.add.retroFont(
        "blueFont",
        32,
        32,
        Phaser.RetroFont.TEXT_SET2,
        10
    );
    
    image1 = game.add.image(game.world.centerX, game.world.centerY, font1);
    image1.anchor.set(0.5);
    
    font1.text = "HELL WROLD";
    
    
    game.time.events.loop(Phaser.Timer.SECOND * 2, change, this);
}

function change() {
    image1.tint = Math.random() * 0xFFFFFF;
}

var t = 0.0;

function update() {
    t += game.time.physicsElapsed;
    
    image1.rotation = Math.cos(t);
    image1.scale.x = image1.scale.y = 10.0 * Math.cos(t);
}
