
var MapItem = function() {
    this.toturial = new Framework.Sprite(define.imagePath + 'toturial.png');
    this.toturial.scale = 0.7;
    this.toturial.position = {x: 7*64, y: 4* 64};
    this.mapPosition = {x:0, y:0};
    this.spritePosition = {}
    
    this.update = function(){

    }

    this.draw = function(ctx){
        this.toturial.draw(ctx);
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

