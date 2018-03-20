var Bullet = function(power,shootPosition){
    this.sprite = new Framework.Sprite(define.imagePath + 'bullet.png');
    this.sprite.scale = 2;
    this.sprite.index = 1;
    var PIXEL_CONST = 64;

    this.mapPosition = {x:0, y:0};

    this.bulletPower = power;

    this.update = function(){
        
    }
};