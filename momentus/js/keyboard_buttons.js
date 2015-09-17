/* global Phaser */
/* global Buttons */

function KeyboardButtons(keyboard) {
    this.keyboard = keyboard;

    this.left = this.keyboard.addKey(Phaser.Keyboard.A);
    this.right = this.keyboard.addKey(Phaser.Keyboard.D);
    this.jump = this.keyboard.addKey(Phaser.Keyboard.W);
    this.duck = this.keyboard.addKey(Phaser.Keyboard.S);
    this.grab = this.keyboard.addKey(Phaser.Keyboard.G);
}

KeyboardButtons.prototype = Object.create(Buttons);
KeyboardButtons.prototype.constructor = KeyboardButtons;

KeyboardButtons.prototype.releaseKeys = function() {
    this.keyboard.removeKey(Phaser.Keyboard.A);
    this.keyboard.removeKey(Phaser.Keyboard.D);
    this.keyboard.removeKey(Phaser.Keyboard.W);
    this.keyboard.removeKey(Phaser.Keyboard.S);
    this.keyboard.removeKey(Phaser.Keyboard.G);
}
