var Horseman = function(file, map, hp, options) {
    var tempBoss = new Boss(map, hp, 1.5);
    Horseman.prototype = new Boss(map, hp, 1.5);
    var wallBreak = 0;
    this.url = file;
    this.sprite = new Framework.AnimationSprite({
        url: this.url,
        col: 3,
        row: 2,
        loop: true,
        speed: 2
    });
    this.sprite.scale = 2;
    this.sprite.index = 1;
    this.spritePosition = { x: 0, y: 0 };
    this.constants = new Constants();
    this.sprite.start({ from: 3, to: 5, loop: true });
    this.update = function() {
        if (this.isdead) {
            return;
        }
        if (this.isRushing == false) this.shoot();
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
        this.drawHpBar(ctx);
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
        }
    };
    var walkSpeed = 4;
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

    var walkDir = 0;
    var walkStep = { x: 0, y: 0 };

    this.randomWalk = function() {
        if (this.isRushing) {
            if(wallBreak == 3 && this.mapPosition.x == 7){
                this.isRushing = false;
                this.isRushingCount = 0;
                walkSpeed = 4;
            }
            else{
                console.log(this.mapPosition);
                if (this.mapPosition.x > 15) {
                    wallBreak+=1;
                    this.mapPosition = {
                        x: -1,
                        y: this.map.player1.mapPosition.y
                    };
                    this.spritePosition = {
                        x: this.mapPosition.x * 64,
                        y: this.mapPosition.y * 64
                    };
                }
                if (this.mapPosition.x <-1) {
                    wallBreak+=1;
                    this.mapPosition = {
                        x: 15,
                        y: this.map.player1.mapPosition.y
                    };
                    this.spritePosition = {
                        x: this.mapPosition.x * 64,
                        y: this.mapPosition.y * 64
                    };
                }
                this.walk(walkStep);
            }
        } else if (this.isRushingCount == 200) {
            console.log("start");
            walkStep = { x: 0, y: 0 };
            if (this.mapPosition.x < this.map.player1.position.x) {
                walkStep.x = 1;
                this.sprite.start({ from: 0, to: 2, loop: true });
            } else {
                walkStep.x = -1;
                this.sprite.start({ from: 3, to: 5, loop: true });
            }
            this.walk(walkStep);
            this.isRushing = true;
            walkSpeed = 32;
            wallBreak = 0;
        } else {
            var randNum = Math.floor(Math.random() * 1000) % 553;
            walkDir++;
            walkStep = { x: 0, y: 0 };
            if (randNum % 117 == 0) {
                walkStep.x = 1;
                this.sprite.start({ from: 0, to: 2, loop: true });
            } else if (randNum % 79 == 0) {
                this.sprite.start({ from: 3, to: 5, loop: true });
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
                this.map.checkIsWalkAble(
                    this.mapPosition.x + walkStep.x,
                    this.mapPosition.y + walkStep.y
                )
            ) {
                this.walk(walkStep);
            }
        }
    };
};

Object.defineProperty(Horseman.prototype, "position", {
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

Object.defineProperty(Horseman.prototype, "isDead", {
    get: function() {
        return this.isdead;
    }
});
