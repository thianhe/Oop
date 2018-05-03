var IsaacHead = function(file, options) {
    this.url = file;
    //Animationsprite1當圖片是一整張圖片(連續圖), 而非Array時一定要給col, row三個(url是一定要的)
    this.sprite1 = new Framework.AnimationSprite({url:this.url, col:12 , row:4 , loop:true , speed:12});
    this.sprite1.scale = 1.7;
    this.sprite1.index = 1;
    var PIXEL_CONST = 64;
    //this.sprite1.start({ from: 0, to: 2, loop: true});
    this.mapPosition = {x:0, y:0};
    this.sprite1Position = {x:0, y:0};
    this.constants = new Constants();

    this.isWalking = false;
    this.StepMovedCallBack = [];

    this.playerDirection = this.constants.ShootingEnum.DOWN;
    this.shootingDirection = this.constants.ShootingEnum.DOWN;
    //以下這句話的意思是當options.position為undefined時this.sprite1.position = x: 0, y: 0}
    //若options.position有值, 則this.sprite1.position = options.position
    //原因是在JS中, undefined會被cast成false
    //this.sprite1.position = options.position || {x: 0, y: 0};
    //this.sprite1.scale = options.scale || 1;

    //由於0會被cast成false, 故不能用上面的方法來簡化
    //this.sprite1.rotation = (Framework.Util.isUndefined(options.rotation))?0:options.rotation;

    this.sprite1.start({ from: this.shootingDirection * 12, to: this.shootingDirection * 12 + 11, loop: true, speed:12});

    this.update = function(tempPosition){
        this.sprite1.update();
        this.sprite1Position = tempPosition;
    }
    this.shootingAnimation = function(shootDirection){
        this.shootingDirection = shootDirection;
        this.sprite1.start({ from: this.shootingDirection * 12, to: this.shootingDirection * 12 + 11, loop: true, speed:12});
    }
    this.draw = function(ctx){
        this.sprite1.position = {x: this.sprite1Position.x, y: this.sprite1Position.y-20};
        this.sprite1.draw(ctx);
    }

};

Object.defineProperty(IsaacHead.prototype, 'position', {
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
        this.sprite1Position = {x:this.mapPosition.x * 64, y: this.mapPosition.y * 64};
    }
});
