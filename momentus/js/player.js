/* global Phaser */
function Player(game, x, y, input) {
    Phaser.Sprite.call(this, game, x, y, "sprTestHero", 0);

    // Set anchor to bottom of bounding box
    this.anchor.setTo(0.5, 1);

    // Set up animations
    this.animations.add("idle", [0], game.time.desiredFps, true);
    this.animations.add("run", [1, 2, 3, 4, 5, 6, 7, 8], 16, true);

    // Set up physics bounding box
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(24, 16);
    this.body.allowGravity = true;
    this.body.collideWorldBounds = true;
    
    this.body.gravity.y = 250;
    this.body.maxVelocity.x = 1000;
    this.body.maxVelocity.y = 1000;
    
    // Sub-bounding boxes.  Coordinate system is relative to the sprite's
    // anchor, in pixels.
    this.headBox = new Phaser.Rectangle(-8, -24, 8, 8);
    this.bodyBox = new Phaser.Rectangle(-8, -16, 8, 16);
    
    // Shortcut to keyboard input
    this._input = input;
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    Phaser.Sprite.prototype.update.call(this);
    
    // Left/right movement
    if (this._input.left.isDown) {
        this.animations.play("run");
        this.scale.x = -1;
        this.facing = Phaser.LEFT;

        //this.body.acceleration.x = -100;
        this.body.velocity.x = -100;
    } else if (this._input.right.isDown) {
        this.animations.play("run");
        this.scale.x = 1;
        this.facing = Phaser.RIGHT;

        //this.body.acceleration.x = 100;
        this.body.velocity.x = 100;
    } else {
        this.animations.play("idle");

        this.body.velocity.x = 0;
        this.body.acceleration.x = 0;
    }
    
    // Jumping
    if (this.body.onFloor() && this._input.jump.isDown) {
        this.body.acceleration.y = -4000;
    } else if (!this.body.onFloor()) {
        this.body.acceleration.y = 0;
    }
}

Player.prototype.render = function() {
    // this.game.debug.geom(rect, "#0F0", true);
    this.game.debug.body(this, "#FFF", false);
}

