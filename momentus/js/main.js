/* global Phaser */
/* global Player */
/* global KeyboardButtons */

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});

function preload() {
    game.load.baseURL = "../";
    game.load.image("blueFont", "assets/fonts/bluepink_font.png");
}

function create() {
    var kbButtons = new KeyboardButtons(game.input.keyboard);
    
    var player = new Player(game, 400, 300, kbButtons);
    game.stage.addChild(player);
}

function update() {
    
}

function render() {
    
}
