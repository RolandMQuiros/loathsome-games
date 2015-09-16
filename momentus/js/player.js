/* global Phaser */
function Player(game, x, y, input) {
    Phaser.Sprite.call(this, game, x, y, "mtus_player", 0);
    
    // Set anchor to bottom of bounding box
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    
    // Set up physics bounding box
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(12, 8, -6, -4);
    //this.body.allowGravity = true;
    //this.body.gravity = 1.0;
    //this.body.collideWorldBounds = true;
    
    // Shortcut to keyboard input
    this.input = input;
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    Phaser.Sprite.prototype.update.call(this);
    
    if (this.input.left.isDown) {
        this.body.velocity.x = -100;
    } else if (this.input.right.isDown) {
        this.body.velocity.x = 100;
    } else {
        this.body.velocity.x = 0;
    }
}

