var MapItem = function() {
    this.instruction = new Framework.Sprite(define.imagePath + 'instruction.png');
    this.instruction.scale = 0.7;
    this.instruction.position = {
        x: 7 * 60,
        y: 4 * 50
    };
    this.mapPosition = {
        x: 0,
        y: 0
    };
    this.spritePosition = {}

    this.update = function() {

    }

    this.draw = function(ctx) {
        this.instruction.draw(ctx);
    }

};

Object.defineProperty(MapItem.prototype, 'position', {
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;

    }
});