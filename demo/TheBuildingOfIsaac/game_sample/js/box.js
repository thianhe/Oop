var Box = function() {
    var path;
    var randomstone = Math.floor(Math.random() * 5);
    if (randomstone == 0) {
        path = 'stone1.png';
    } else if (randomstone == 1) {
        path = 'stone2.png';
    } else if (randomstone == 2) {
        path = 'stone3.png';
    } else if (randomstone == 3) {
        path = 'stone4.png';
    } else if (randomstone == 4) {
        path = 'stone5.png';
    }

    this.sprite = new Framework.Sprite(define.imagePath + path);
    this.sprite.scale = 2;
    this.sprite.index = 1;
    var PIXEL_CONST = 64;


    this.mapPosition = {
        x: 1,
        y: 1
    };

    //被炸彈炸到的function
    this.explored = function() {

    }

    this.update = function() {

    }


    this.draw = function(ctx) {
        this.sprite.position = {
            x: this.mapPosition.x * PIXEL_CONST,
            y: this.mapPosition.y * PIXEL_CONST
        };
        this.sprite.draw(ctx);
    }

};

Object.defineProperty(Box.prototype, 'position', {
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
    }
});