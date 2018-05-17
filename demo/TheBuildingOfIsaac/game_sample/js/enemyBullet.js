var EnemyBullet = function(file,startingPosition,aimPosition){
    this.url = file;
    this.sprite = new Framework.Sprite(this.url);
    this.sprite.scale = 0.2;
    this.sprite.index = 1;
    var PIXEL_CONST = 64;
    this.constants = new Constants();
    this.spritePosition = {x:startingPosition.x*PIXEL_CONST,y:startingPosition.y*PIXEL_CONST};
    this.bulletEnd = false;
    var diffX = aimPosition.x*PIXEL_CONST - startingPosition.x*PIXEL_CONST;
	var diffY = aimPosition.y*PIXEL_CONST - startingPosition.y*PIXEL_CONST;
    var aimAngle = Math.atan2(diffY,diffX) / Math.PI * 180;
    var spdX = Math.cos(aimAngle/180*Math.PI)*5;
    var spdY = Math.sin(aimAngle/180*Math.PI)*5;
    this.update = function(){
        if(!(this.bulletEnd))this.walkAlittle()
        if(this.bulletEnd){return;}
    }

    var walkSpeed = 0.1;
    this.walkAlittle = function(){
        this.spritePosition = {x:this.spritePosition.x+spdX, y:this.spritePosition.y + spdY};
    }
    this.bulletCrash = function(){
        this.bulletEnd = true;
    }
    this.draw = function(ctx){
        if(this.bulletEnd){return;}
        this.sprite.position = {x: this.spritePosition.x, y: this.spritePosition.y};
        this.sprite.draw(ctx);
    }
};

Object.defineProperty(EnemyBullet.prototype, 'position', {
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
        this.spritePosition = {x:this.mapPosition.x * 64, y: this.mapPosition.y * 64};
    }
}); 