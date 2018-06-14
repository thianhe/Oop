var Laser = function(file, option) {
    this.url = file;
    this.sprite = new Framework.AnimationSprite({
        url: this.url,
        col: 3,
        row: 1,
        loop: false,
        speed: 3
    });
    this.sprite.scale = 0.99;
    this.sprite.index = 1;
    var PIXEL_CONST = 64;
    this.laserHit = false;
    this.sprite.start({ from: 0, to:3, loop: true});
    this.update = function(){
        if(this.sprite.index == 3) return;
        this.sprite.update();
    }
    this.draw = function(ctx){
        if(this.sprite.index == 3) return;
        this.sprite.position = {x: (this.spritePosition.x * PIXEL_CONST), y: (this.spritePosition.y * PIXEL_CONST)};
        this.sprite.draw(ctx);
    }
};
