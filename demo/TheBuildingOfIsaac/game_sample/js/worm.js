var Worm = function(file, map, hp, options) {
    Worm.prototype = new Monster(map, hp);
    this.url = file;
    this.sprite = new Framework.AnimationSprite({
        url: this.url,
        col: 3,
        row: 4,
        loop: true,
        speed: 12
    });
    this.sprite.scale = 2;
    this.sprite.index = 1;

    this.spritePosition = { x: 0, y: 0 };
    this.constants = new Constants();

    this.playerDirection = this.constants.DirectionEnum.DOWN;

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
    this.update = function() {
        if (this.isdead) {
            return;
        }
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
    var walkStep = { x: 0, y: 0 };
    this.randomWalk = function() {
        if (this.isRushing) {
            if (
                this.map.checkIsWalkAble(
                    this.mapPosition.x + walkStep.x,
                    this.mapPosition.y + walkStep.y
                )
            ) {
                this.walk(walkStep);
            }
            else{
                this.isRushing = false;
                this.isRushingCount =0;
                walkSpeed=4;
            }
        } else if(this.mapPosition.x == this.map.player1.position.x && this.isRushingCount == 100){
            if(this.map.checkIsRushAbleY(this.mapPosition.x,this.mapPosition.y,this.map.player1.position.y)){
                walkStep = { x: 0, y: 0 };
                if(this.mapPosition.y<this.map.player1.position.y) walkStep.y = 1;
                else walkStep.y = -1;
                this.walk(walkStep);
                this.isRushing = true;
                walkSpeed=8;
            }
        }else if(this.mapPosition.y == this.map.player1.position.y && this.isRushingCount == 100){
            if(this.map.checkIsRushAbleX(this.mapPosition.x,this.mapPosition.y,this.map.player1.position.x)){
                walkStep = { x: 0, y: 0 };
                if(this.mapPosition.x<this.map.player1.position.x) walkStep.x = 1;
                else walkStep.x = -1;
                this.walk(walkStep);
                this.isRushing = true;
                walkSpeed=8;
            }
        }
        else {
            var randNum = Math.floor(Math.random() * 1000) % 553;
            walkDir++;
            walkStep = { x: 0, y: 0 };
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

Object.defineProperty(Worm.prototype, "position", {
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
