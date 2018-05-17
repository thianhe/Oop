//由於JS尚未支援Class(ECMAScript 6以後, 宣稱會支援)
//目前Class寫法都是以function的方式
//只要是this.XXX皆會是Public的property
var Fly = function(file, map, hp, options) {
    Fly.prototype = new Monster(map, hp);
    this.url = file;

    this.sprite = new Framework.AnimationSprite({
        url: this.url,
        col: 4,
        row: 4,
        loop: true,
        speed: 12
    });
    this.sprite.scale = 2;
    this.sprite.index = 1;

    this.spritePosition = { x: 0, y: 0 };
    this.constants = new Constants();

    //this.StepMovedCallBack = [];

    this.playerDirection = this.constants.DirectionEnum.DOWN;
    this.getHit = function() {
        this.HP-=this.map.gameState.dmg;
        if (this.HP <= 0) {
            this.die();
            this.map.addFlyDie(this.mapPosition);
            this.map.addMonster(3,{
                x:  this.mapPosition.x,
                y:  this.mapPosition.y
            });
            this.map.addMonster(3,{
                x:  this.mapPosition.x+1,
                y:  this.mapPosition.y+1
            });
        }
    };
    this.walk = function(moveStep) {
        if (this.isWalking === false) {
            if (moveStep.x > 0) {
                this.playerDirection = this.constants.DirectionEnum.RIGHT;
            } else if (moveStep.x < 0) {
                this.playerDirection = this.constants.DirectionEnum.LEFT;
            }

            if (moveStep.y > 0) {
                this.playerDirection = this.constants.DirectionEnum.DOWN;
            } else if (moveStep.y < 0) {
                this.playerDirection = this.constants.DirectionEnum.UP;
            }
            this.isWalking = true;
            this.walkTarget = {
                x: this.mapPosition.x + moveStep.x,
                y: this.mapPosition.y + moveStep.y
            };
            this.sprite.start({
                from: this.playerDirection * 3,
                to: this.playerDirection * 3 + 2,
                loop: true
            });
        }
    };

    this.walkEnd = function() {};

    var walkSpeed = 2;
    this.walkAlittle = function() {
        if (this.playerDirection === this.constants.DirectionEnum.DOWN) {
            this.spritePosition = {
                x: this.spritePosition.x,
                y: this.spritePosition.y + walkSpeed
            };
        } else if (this.playerDirection === this.constants.DirectionEnum.LEFT) {
            this.spritePosition = {
                x: this.spritePosition.x - walkSpeed,
                y: this.spritePosition.y
            };
        } else if (
            this.playerDirection === this.constants.DirectionEnum.RIGHT
        ) {
            this.spritePosition = {
                x: this.spritePosition.x + walkSpeed,
                y: this.spritePosition.y
            };
        } else if (this.playerDirection === this.constants.DirectionEnum.UP) {
            this.spritePosition = {
                x: this.spritePosition.x,
                y: this.spritePosition.y - walkSpeed
            };
        }
    };
    this.update = function() {
        if (this.isdead) {
            return;
        }
        if(Math.abs(
            this.mapPosition.x -
                this.map.player1.mapPosition.x
        ) < 6 &&
        Math.abs(
            this.mapPosition.y -
            this.map.player1.mapPosition.y
        ) < 6)
        this.shoot()
        this.sprite.update();
        if (this.isWalking) {
            if (
                this.walkTarget.x * this.PIXEL_CONST ===
                    this.spritePosition.x &&
                this.walkTarget.y * this.PIXEL_CONST === this.spritePosition.y
            ) {
                this.isWalking = false;
                this.sprite.stop();
                this.sprite.index = this.playerDirection * 3 + 1;
                this.mapPosition = this.walkTarget;

                /*for(var i=0; i<this.StepMovedCallBack.length; i++){
                    this.StepMovedCallBack[i](this);
                }*/
            } else {
                this.walkAlittle();
            }
        } else {
            if (this.canWalking) {
                this.randomWalk();
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
    };
    var walkDir = 0;
    this.randomWalk = function() {
        var randNum = Math.floor(Math.random() * 1000) % 553;
        walkDir++;
        var walkStep = { x: 0, y: 0 };
        if (randNum % 117 == 0) {
            walkStep.x = 1;
        } else if (randNum % 79 == 0) {
            walkStep.x = -1;
        } else if (randNum % 133 == 0) {
            walkStep.y = 1;
        } else if (randNum % 157 == 0) {
            walkStep.y = -1;
        } else {
            walkDir = 0;
            return;
        }
        if (
            this.map.checkIsFlyAble(
                this.mapPosition.x + walkStep.x,
                this.mapPosition.y + walkStep.y
            )
        ) {
            this.walk(walkStep);
        }
    };
};

Object.defineProperty(Fly.prototype, "position", {
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
