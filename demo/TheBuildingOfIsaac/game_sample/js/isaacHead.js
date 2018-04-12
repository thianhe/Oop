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
    //moveStep為位移量  格式範例{x:1,y:0}
    this.walk = function(moveStep){
        if(this.isWalking === false){
            if(moveStep.x > 0 && moveStep.y > 0){
                this.playerDirection = this.constants.DirectionEnum.RIGHTDOWN;
            }
            else if(moveStep.x <0 && moveStep.y >0){
                this.playerDirection = this.constants.DirectionEnum.LEFTDOWN;
            }
            else if(moveStep.x <0 && moveStep.y < 0){
                this.playerDirection = this.constants.DirectionEnum.LEFTUP;
            }
            else if(moveStep.x > 0 && moveStep.y < 0){
                this.playerDirection = this.constants.DirectionEnum.RIGHTUP;
            }
            else if(moveStep.x > 0){
                this.playerDirection = this.constants.DirectionEnum.RIGHT;
            }
            else if(moveStep.x <0){
                this.playerDirection = this.constants.DirectionEnum.LEFT;
            }
            else if(moveStep.y > 0){
                this.playerDirection = this.constants.DirectionEnum.DOWN;
            }
            else if(moveStep.y < 0){
                this.playerDirection = this.constants.DirectionEnum.UP;
            }
            this.isWalking = true;
            this.mapPosition = {x:this.mapPosition.x + moveStep.x, y:this.mapPosition.y + moveStep.y};
        }
    }

    this.walkEnd = function(){    }

    var walkSpeed =8;
    this.walkAlittle = function(){
        //console.log("player walk a little " + walkSpeed);
        if(this.playerDirection === this.constants.DirectionEnum.RIGHTDOWN){
            this.sprite1Position = {x:this.sprite1Position.x + walkSpeed, y:this.sprite1Position.y + walkSpeed};
        }
        else if(this.playerDirection === this.constants.DirectionEnum.LEFTDOWN){
            this.sprite1Position = {x:this.sprite1Position.x - walkSpeed, y:this.sprite1Position.y + walkSpeed};
        }
        else if(this.playerDirection === this.constants.DirectionEnum.RIGHTUP){
            this.sprite1Position = {x:this.sprite1Position.x + walkSpeed, y:this.sprite1Position.y - walkSpeed};
        }
        else if(this.playerDirection === this.constants.DirectionEnum.LEFTUP){
            this.sprite1Position = {x:this.sprite1Position.x- walkSpeed, y:this.sprite1Position.y - walkSpeed};
        }
        else if(this.playerDirection === this.constants.DirectionEnum.DOWN){
            this.sprite1Position = {x:this.sprite1Position.x, y:this.sprite1Position.y + walkSpeed};
        }
        else if(this.playerDirection === this.constants.DirectionEnum.LEFT){
            this.sprite1Position = {x:this.sprite1Position.x - walkSpeed, y:this.sprite1Position.y};
        }
        else if(this.playerDirection === this.constants.DirectionEnum.RIGHT){
            this.sprite1Position = {x:this.sprite1Position.x + walkSpeed, y:this.sprite1Position.y};
        }
        else if(this.playerDirection === this.constants.DirectionEnum.UP){
            this.sprite1Position = {x:this.sprite1Position.x, y:this.sprite1Position.y - walkSpeed};
        }
    }

    this.update = function(){
        this.sprite1.update();
        if(this.isWalking){
            if(this.mapPosition.x * PIXEL_CONST === this.sprite1Position.x && this.mapPosition.y * PIXEL_CONST === this.sprite1Position.y){
                this.isWalking = false;
                //callback
                for(var i=0; i<this.StepMovedCallBack.length; i++){
                    this.StepMovedCallBack[i](this);
                }
            }else{
                this.walkAlittle();
            }
        }
    }
    this.shootingAnimation = function(shootDirection){
        this.shootingDirection = shootDirection;
        this.sprite1.start({ from: this.shootingDirection * 12, to: this.shootingDirection * 12 + 11, loop: true, speed:12});
    }
    this.draw = function(ctx){
        this.sprite1.position = {x: this.sprite1Position.x, y: this.sprite1Position.y+22};
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