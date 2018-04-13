var NextLevelGate = function() {
    this.sprite = new Framework.Sprite(define.imagePath + 'nextLevelGate.png');
    this.sprite.scale = 1;
    this.sprite.index = 1;
    var PIXEL_CONST = 64;

    this.mapPosition = {x:1, y:1};

    //被炸彈炸到的function
    this.explored = function(){

    }

    this.update = function(){

    }


    this.draw = function(ctx){
        this.sprite.position = {x: (this.mapPosition.x * PIXEL_CONST)+32, y: (this.mapPosition.y * PIXEL_CONST)-32};
        this.sprite.draw(ctx);
    }

};

Object.defineProperty(NextLevelGate.prototype, 'position', {
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
    }
});
