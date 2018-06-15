//由於JS尚未支援Class(ECMAScript 6以後, 宣稱會支援)
//目前Class寫法都是以function的方式
//只要是this.XXX皆會是Public的property
var Isaac = function(file,option) {
    this.url = file;
    //this.url2 = file2;
    //AnimationSprite當圖片是一整張圖片(連續圖), 而非Array時一定要給col, row三個(url是一定要的)
    this.sprite = new Framework.AnimationSprite({url:this.url, col:3 , row:8 , loop:true , speed:3});
    this.sprite.scale = 1.3;
    this.sprite.index = 1;
    var PIXEL_CONST = 64;
    this.mapPosition = {x:0, y:0};
    this.spritePosition = {x:0, y:0};
    this.constants = new Constants();
    this.weapon = 0;
    this.StepMovedCallBack = [];
    this.maxBombNum = 1;
    this.bombNum = 0;
    this.bombPower = 1;

    this.isWalking = false;

    var m_bombMan = this;

    this.playerDirection = this.constants.DirectionEnum.DOWN;
    this.isaacHead = new IsaacHead(define.imagePath + 'isaacHead.png', {up: {from: 0, to: 11}, down: {from:12, to: 23}, left: {from: 24, to: 35}, right: {from: 36, to: 47}});
    this.isaacHead.position = {x:1, y:1};
    this.isaacHead_laser = new IsaacHead(define.imagePath + 'isaacHead_laser.png', {up: {from: 0, to: 11}, down: {from:12, to: 23}, left: {from: 24, to: 35}, right: {from: 36, to: 47}});
    this.isaacHead_laser.position = {x:1, y:1};
    this.isaacHead_mega = new IsaacHead(define.imagePath + 'isaacHead_mega.png', {up: {from: 0, to: 11}, down: {from:12, to: 23}, left: {from: 24, to: 35}, right: {from: 36, to: 47}});
    this.isaacHead_mega.position = {x:1, y:1};
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
            this.sprite.start({ from: this.playerDirection * 3, to: this.playerDirection * 3 + 2, loop: true});
        }
        //this.isaacHead.walk(moveStep)
    }

    this.die = function(){
        console.log('player die');
        Framework.Game.goToNextLevel();
    }
    this.walkEnd = function(){
    }

    var walkSpeed =4;
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
                this.sprite.stop();
                this.playerDirection = this.constants.DirectionEnum.DOWN;
                this.sprite.index = this.playerDirection * 3 + 1;
                //callback
                /*for(var i=0; i<this.StepMovedCallBack.length; i++){
                    this.StepMovedCallBack[i](this);
                }*/
            }else{
                this.walkAlittle();
            }
        }
        this.isaacHead.update(this.sprite.position);
        this.isaacHead_laser.update(this.sprite.position);
        this.isaacHead_mega.update(this.sprite.position);
    }

    this.draw = function(ctx){
        this.sprite.position = {x: this.spritePosition.x, y: this.spritePosition.y+10};
        this.sprite.draw(ctx);
        if(this.weapon == 0)this.isaacHead.draw(ctx);
        if(this.weapon == 1)this.isaacHead_mega.draw(ctx);
        if(this.weapon == 2)this.isaacHead_laser.draw(ctx);
    }
    this.placeBomb = function(){
        if(this.bombNum < this.maxBombNum){
            var bomb = new Bomb(this.bombPower);
            bomb.position = this.mapPosition;
            bomb.ExploredCallBack.push(this.bombExploredHandler);
            this.bombNum += 1;
            return bomb;
        }
        return null;
    }
    this.turnFace = function(shootDirection){
        this.isaacHead.shootingAnimation(shootDirection);
        this.isaacHead_laser.shootingAnimation(shootDirection);
        this.isaacHead_mega.shootingAnimation(shootDirection);
    }
};

Object.defineProperty(Isaac.prototype, 'position', {
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
        this.spritePosition = {x:this.mapPosition.x * 64, y: this.mapPosition.y * 64};
    }
});
