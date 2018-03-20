var IsaacHead = function(file, options,file2 ,option2) {
    this.url = file;
    //AnimationSprite當圖片是一整張圖片(連續圖), 而非Array時一定要給col, row三個(url是一定要的)
    this.sprite = new Framework.AnimationSprite({url:this.url, col:3 , row:4 , loop:true , speed:12});
    
    this.sprite.scale = 2;
    this.sprite.index = 1;
    var PIXEL_CONST = 64;
    //this.sprite.start({ from: 0, to: 2, loop: true});
    this.mapPosition = {x:0, y:0};
    this.spritePosition = {x:0, y:0};
    this.constants = new Constants();

    this.isWalking = false;
    this.StepMovedCallBack = [];

    this.playerDirection = this.constants.DirectionEnum.DOWN;
    this.shootingDirection = this.constants.DirectionEnum.DOWN;
    //以下這句話的意思是當options.position為undefined時this.sprite.position = x: 0, y: 0}
    //若options.position有值, 則this.sprite.position = options.position
    //原因是在JS中, undefined會被cast成false
    //this.sprite.position = options.position || {x: 0, y: 0};
    //this.sprite.scale = options.scale || 1;

    //由於0會被cast成false, 故不能用上面的方法來簡化
    //this.sprite.rotation = (Framework.Util.isUndefined(options.rotation))?0:options.rotation;


    //moveStep為位移量  格式範例{x:1,y:0}
    this.sprite.start({ from: this.shootingDirection * 3, to: this.shootingDirection * 3 + 2, loop: true});
    this.walk = function(moveStep){
        console.log(moveStep);
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
            this.spritePosition = {x:this.spritePosition.x + walkSpeed, y:this.spritePosition.y + walkSpeed};
        }
        else if(this.playerDirection === this.constants.DirectionEnum.LEFTDOWN){
            this.spritePosition = {x:this.spritePosition.x - walkSpeed, y:this.spritePosition.y + walkSpeed};
        }
        else if(this.playerDirection === this.constants.DirectionEnum.RIGHTUP){
            this.spritePosition = {x:this.spritePosition.x + walkSpeed, y:this.spritePosition.y - walkSpeed};
        }
        else if(this.playerDirection === this.constants.DirectionEnum.LEFTUP){
            this.spritePosition = {x:this.spritePosition.x- walkSpeed, y:this.spritePosition.y - walkSpeed};
        }
        else if(this.playerDirection === this.constants.DirectionEnum.DOWN){
            this.spritePosition = {x:this.spritePosition.x, y:this.spritePosition.y + walkSpeed};
        }
        else if(this.playerDirection === this.constants.DirectionEnum.LEFT){
            this.spritePosition = {x:this.spritePosition.x - walkSpeed, y:this.spritePosition.y};
        }
        else if(this.playerDirection === this.constants.DirectionEnum.RIGHT){
            this.spritePosition = {x:this.spritePosition.x + walkSpeed, y:this.spritePosition.y};
        }
        else if(this.playerDirection === this.constants.DirectionEnum.UP){
            this.spritePosition = {x:this.spritePosition.x, y:this.spritePosition.y - walkSpeed};
        }
    }

    this.update = function(){
        this.sprite.update();
        if(this.isWalking){
            if(this.mapPosition.x * PIXEL_CONST === this.spritePosition.x && this.mapPosition.y * PIXEL_CONST === this.spritePosition.y){
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


    this.draw = function(ctx){
        this.sprite.position = {x: this.spritePosition.x, y: this.spritePosition.y};
        this.sprite.draw(ctx);
    }


    this.shootingUp = function(){

    }
};

Object.defineProperty(IsaacHead.prototype, 'position', {
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
        this.spritePosition = {x:this.mapPosition.x * 64, y: this.mapPosition.y * 64};
    }
});