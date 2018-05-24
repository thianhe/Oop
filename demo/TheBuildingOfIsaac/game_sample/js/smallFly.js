//由於JS尚未支援Class(ECMAScript 6以後, 宣稱會支援)
//目前Class寫法都是以function的方式
//只要是this.XXX皆會是Public的property
var SmallFly = function(file, map, hp, options) {
    SmallFly.prototype = new Monster(map, hp/2);
    this.url = file;

    this.sprite = new Framework.AnimationSprite({url:this.url, col:2 , row:1 , loop:true , speed:12}); 
    this.sprite.scale = 2;
    this.sprite.index = 1;
    this.itemDrop = false;
    this.spritePosition = {x:0, y:0};
    this.constants = new Constants();

    //this.StepMovedCallBack = [];

    
    this.playerDirection = this.constants.DirectionEnum.DOWN;

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
            this.walkTarget = {x:this.mapPosition.x + moveStep.x, y:this.mapPosition.y + moveStep.y};
            this.sprite.start({ from: 0, to: 1, loop: true});
        }
    }
    
    var walkSpeed = 2;
    this.walkAlittle = function(){
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
        if(this.isdead ){ return; }
        this.sprite.update();
        if(this.isWalking){
            if(this.walkTarget.x * this.PIXEL_CONST === this.spritePosition.x && this.walkTarget.y * this.PIXEL_CONST === this.spritePosition.y){
                this.isWalking = false;
                //this.sprite.stop();
                this.sprite.index = 0;
                this.mapPosition = this.walkTarget;

                /*for(var i=0; i<this.StepMovedCallBack.length; i++){
                    this.StepMovedCallBack[i](this);
                }*/
            }else{
                this.walkAlittle();
            }
        }else
        {
            if(this.canWalking)
            {
                this.toPlayer();
            }
        }
    }

    this.draw = function(ctx){
        if(this.isdead){ return; }
        this.sprite.position = {x: this.spritePosition.x, y: this.spritePosition.y};
        this.sprite.draw(ctx);
    }
    var walkDir = 0;
    this.toPlayer = function()
    {
        walkDir++;
        var walkStep = {x:0,y:0}
        if(this.map.player1.position.x > this.mapPosition.x)
        {
            walkStep.x = 1
        }
        else if(this.map.player1.position.x < this.mapPosition.x){
            walkStep.x = -1
        }
        else{
            walkStep.x=0
        }
        if(this.map.player1.position.y > this.mapPosition.y)
        {
            walkStep.y = 1
        }
        else if(this.map.player1.position.y < this.mapPosition.y){
            walkStep.y = -1
        }
        else{
            walkStep.y=0
        }
        if(this.map.checkIsFlyAble(this.mapPosition.x + walkStep.x,this.mapPosition.y + walkStep.y))
        {
            this.walk(walkStep);
        }
    }
};


Object.defineProperty(SmallFly.prototype, 'position', {
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
        this.spritePosition = {x:this.mapPosition.x * 64, y: this.mapPosition.y * 64};
    }
});