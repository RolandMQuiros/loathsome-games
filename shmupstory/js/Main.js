/* global Phaser */
/* global Player */
/* global KeyboardButtons */
/* global IntroState */

var game = new Phaser.Game(
    800,
    500,
    Phaser.AUTO,
    "",
    new IntroState(),
    false, // transparent
    false // antialias
);