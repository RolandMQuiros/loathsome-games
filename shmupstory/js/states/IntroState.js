/* global Phaser */
/* global KeyboardButtons */

/**
 * 
 * @class IntroState
 * @constructor
 */
function IntroState() {
    Phaser.State.call(this);
    
    /**
     * @property {KeyboardButtons}
     */
    this._input = null;
    this._titleText = null;
    this._startText = null;
    this._optionsText = null;
    this._selection = 0;
}

IntroState.prototype = Object.create(Phaser.State.prototype);
IntroState.prototype.constructor = IntroState;

IntroState.prototype.preload = function() {
    this.game.load.baseURL = "assets/";
    
    this.game.load.bitmapFont("bmfGem", "fonts/gem.png", "fonts/gem.xml");
}

IntroState.prototype.create = function() {
    this.game.stage.backgroundColor = "#00AAAA";
    this._input = new KeyboardButtons(this.game.input.keyboard);
    
    this._titleText = this.game.add.bitmapText(
        this.game.stage.width / 2,
        this.game.stage.height / 2,
        "bmfGem",
        "a shmup story"
    );
    
    this._selectionText = this.game.add.bitmapText(
        this.game.stage.width / 2,
        this.game.stage.height / 2 + 64,
        "bmfGem",
        ">start\nsettings"
    );
}

IntroState.prototype.update = function() {
    var vert = (this._input.down.downDuration(1) ? 1 : 0) - (this._input.up.downDuration(1) ? 1 : 0);
    
    this._selection += vert;
    if (this._selection > 1) { this._selection = 0; }
    else if (this._selection < 0) { this._selection = 1; }
    
    switch (this._selection) {
        case 0:
            this._selectionText.text = ">start\n settings";
            break;
        case 1:
            this._selectionText.text = " start\n>settings";
            break;
    }
    
    this._selectionText.text += " " + this._selection;
}

IntroState.prototype.render = function() {
    
}

