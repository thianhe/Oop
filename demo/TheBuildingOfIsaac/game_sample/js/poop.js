var Poop = function(file, option) {
    this.url = file; 
    this.sprite = new Framework.AnimationSprite({url:this.url, col:5 , row:1 , loop:false , speed:1}); 
    this.sprite.scale = 2;
    this.sprite.index = 1;
    var PIXEL_CONST = 64;
    this.HP = 4;
    this.isdead = false;
    this.sprite.start({ from: 0, to: 0, loop: false});
    this.mapPosition = {
        x: 1,
        y: 1
    };
    
    this.getHit = function(){
        this.HP-=1;
        this.sprite.start({ from: 4-this.HP, to: 4-this.HP+1, loop: false});
        if(this.HP == 0) this.isdead = true;
    }

    this.update = function() {
        this.sprite.update();
    }


    this.draw = function(ctx) {
        this.sprite.position = {
            x: this.mapPosition.x * PIXEL_CONST,
            y: this.mapPosition.y * PIXEL_CONST
        };
        this.sprite.draw(ctx);
    }

};

Object.defineProperty(Poop.prototype, 'position', {
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
    }
});