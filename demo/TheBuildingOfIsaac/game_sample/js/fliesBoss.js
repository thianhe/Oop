var FliesBoss = function(file, map, hp, options) {
    var tempBoss = new Boss(map, hp, 1.5);
    FliesBoss.prototype = new Boss(map, hp, 1.5);
    
    this.url = file;
    this.sprite = new Framework.AnimationSprite({
        url: this.url,
        col: 4,
        row: 1,
        loop: true,
        speed: 0.7
    });
    this.sprite.scale = 1.5;
    this.sprite.index = 1;
    this.spritePosition = { x: 0, y: 0 };
    this.constants = new Constants();
    var flySpawned = false;
    this.sprite.start({ from: 0, to: 3, loop: true });
    var walkSpeed = 2;
    this.die = function() {
        this.isdead = true;
        this.map.addFlyDie(this.mapPosition);
        this.map.addMonster(2,{
            x:  this.mapPosition.x+1,
            y:  this.mapPosition.y
        });
        this.map.addMonster(2,{
            x:  this.mapPosition.x,
            y:  this.mapPosition.y
        });
        this.map.addMonster(3,{
            x:  this.mapPosition.x-1,
            y:  this.mapPosition.y
        });
        this.map.addMonster(3,{
            x:  this.mapPosition.x+1,
            y:  this.mapPosition.y+1
        });
};
    this.walk = function(moveStep) {
        if (this.isWalking === false) {
            if (moveStep.x > 0 && moveStep.y > 0) {
                this.playerDirection = this.constants.DirectionEnum.RIGHTDOWN;
            } else if (moveStep.x < 0 && moveStep.y > 0) {
                this.playerDirection = this.constants.DirectionEnum.LEFTDOWN;
            } else if (moveStep.x < 0 && moveStep.y < 0) {
                this.playerDirection = this.constants.DirectionEnum.LEFTUP;
            } else if (moveStep.x > 0 && moveStep.y < 0) {
                this.playerDirection = this.constants.DirectionEnum.RIGHTUP;
            }
            this.isWalking = true;
            this.walkTarget = {
                x: this.mapPosition.x + moveStep.x,
                y: this.mapPosition.y + moveStep.y
            };
        }
    };
    this.walkAlittle = function() {
        if (this.playerDirection === this.constants.DirectionEnum.RIGHTDOWN) {
            this.spritePosition = {
                x: this.spritePosition.x + walkSpeed,
                y: this.spritePosition.y + walkSpeed
            };
        } else if (
            this.playerDirection === this.constants.DirectionEnum.LEFTDOWN
        ) {
            this.spritePosition = {
                x: this.spritePosition.x - walkSpeed,
                y: this.spritePosition.y + walkSpeed
            };
        } else if (
            this.playerDirection === this.constants.DirectionEnum.RIGHTUP
        ) {
            this.spritePosition = {
                x: this.spritePosition.x + walkSpeed,
                y: this.spritePosition.y - walkSpeed
            };
        } else if (
            this.playerDirection === this.constants.DirectionEnum.LEFTUP
        ) {
            this.spritePosition = {
                x: this.spritePosition.x - walkSpeed,
                y: this.spritePosition.y - walkSpeed
            };
        }
    };
    this.update = function() {
        if (this.isdead) {
            return;
        }
        if (this.sprite.index == 3 && !flySpawned) {
            this.spawnFly();
            flySpawned = true;
        }
        if(this.sprite.index == 2) flySpawned = false;
        this.sprite.update();
        if (this.isWalking) {
            if (
                this.walkTarget.x * this.PIXEL_CONST ===
                    this.spritePosition.x &&
                this.walkTarget.y * this.PIXEL_CONST === this.spritePosition.y
            ) {
                this.isWalking = false;
                this.mapPosition = this.walkTarget;
            } else {
                this.walkAlittle();
            }
        } else {
            if (this.canWalking) {
                //console.log(this.mapPosition,this.bossSize);
                this.floatTo();
            }
        }
    };

    this.draw = function(ctx) {
        if (this.isdead) {
            return;
        }
        this.sprite.position = {
            x: this.spritePosition.x,
            y: this.spritePosition.y
        };
        this.sprite.draw(ctx);
        this.drawHpBar(ctx);
    };
    var walkStep = { x: 1, y: 1 };
    this.spawnFly = function(){
        this.map.addMonster(3,{
            x:  this.mapPosition.x,
            y:  this.mapPosition.y
        });
        this.map.addMonster(3,{
            x:  this.mapPosition.x,
            y:  this.mapPosition.y+1
        });
        this.map.addMonster(3,{
            x:  this.mapPosition.x+1,
            y:  this.mapPosition.y
        });
    }
    this.floatTo = function() {
        if (this.mapPosition.x == 1) walkStep.x = 1;
        if (this.mapPosition.y == 1) walkStep.y = 1;
        if (this.mapPosition.y == 7) walkStep.y = -1;
        if (this.mapPosition.x == 13) walkStep.x = -1;
        this.walk(walkStep);
    };
};

Object.defineProperty(FliesBoss.prototype, "position", {
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
        this.spritePosition = {
            x: this.mapPosition.x * 64,
            y: this.mapPosition.y * 64
        };
    }
});

Object.defineProperty(FliesBoss.prototype, "isDead", {
    get: function() {
        return this.isdead;
    }
});
