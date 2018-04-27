
var MapTile = function() {
    this.mapFloor = new Framework.Sprite(define.imagePath + 'floor1.png');
    this.mapFloor.scale = 2.1;

    this.mapWall = new Framework.Sprite(define.imagePath + 'wall2.png');
    this.mapWall.scale = 2.1;

    this.mapPosition = {x:0, y:0};
    this.spritePosition = {}
    this._tileType = 0;

    this.update = function(){

    }

    this.draw = function(ctx){
        this.mapFloor.draw(ctx);
        if(this._tileType === 1){
            this.mapWall.draw(ctx);
        }
    }

};

Object.defineProperty(MapTile.prototype, 'position', {
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
        this.mapFloor.position = {x: this.mapPosition.x * 64, y: this.mapPosition.y * 64};
        this.mapWall.position = {x: this.mapPosition.x * 64, y: this.mapPosition.y * 64};
    }
});

Object.defineProperty(MapTile.prototype, 'tileType', {
    get: function() {
        return this._tileType;
    },
    set: function(newValue) {
        this._tileType = newValue;
    }
});
