var Bullet = function(file,shootDirection,startingPosition){
    this.url = file;
    this.sprite = new Framework.Sprite(this.url);
    this.sprite.scale = 0.2;
    this.sprite.index = 1;
    var PIXEL_CONST = 64;
    this.constants = new Constants();
    this.spritePosition = startingPosition;
    this.mapPosition = startingPosition;
    this.time = 0;
    this.bulletEnd = false;
    this.shootingDirection = shootDirection;
    this.update = function(){
        if(Math.abs(startingPosition.x-this.spritePosition.x)>5 ||
            Math.abs(startingPosition.y-this.spritePosition.y)>5) this.bulletEnd=true;
        if(!(this.bulletEnd))this.walkAlittle()
        if(this.bulletEnd){return;}
    }

    var walkSpeed = 0.2;
    this.walkAlittle = function(){
        if(this.shootingDirection === this.constants.DirectionEnum.DOWN){
            this.spritePosition = {x:this.spritePosition.x, y:this.spritePosition.y + walkSpeed};
        }
        else if(this.shootingDirection === this.constants.DirectionEnum.LEFT){
            this.spritePosition = {x:this.spritePosition.x - walkSpeed, y:this.spritePosition.y};
        }
        else if(this.shootingDirection === this.constants.DirectionEnum.RIGHT){
            this.spritePosition = {x:this.spritePosition.x + walkSpeed, y:this.spritePosition.y};
        }
        else if(this.shootingDirection === this.constants.DirectionEnum.UP){
            this.spritePosition = {x:this.spritePosition.x, y:this.spritePosition.y - walkSpeed};
        }
    }
    this.bulletCrash = function(){
        this.bulletEnd = true;
    }
    this.draw = function(ctx){
        if(this.bulletEnd){return;}
        this.sprite.position = {x: this.spritePosition.x * PIXEL_CONST, y: this.spritePosition.y * PIXEL_CONST};
        this.sprite.draw(ctx);
    }
};

Object.defineProperty(Bullet.prototype, 'position', {
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
        this.spritePosition = {x:this.mapPosition.x * 64, y: this.mapPosition.y * 64};
    }
}); 