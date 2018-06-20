var Door = function() {
    this.sprite = new Framework.Sprite(define.imagePath + 'doorClose.png');
    this.sprite.scale = 2;
    this.sprite.index = 1;
    var PIXEL_CONST = 64;
    var doorOpen = false;
    this.mapPosition = {
        x: 1,
        y: 1
    };
    this.mapClean = function() {
        doorOpen = true;
    }

    this.update = function() {

    }


    this.draw = function(ctx) {
        if (doorOpen) return;
        this.sprite.position = {
            x: this.mapPosition.x * PIXEL_CONST,
            y: this.mapPosition.y * PIXEL_CONST
        };
        this.sprite.draw(ctx);
    }

};

Object.defineProperty(Door.prototype, 'position', {
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
    }
});