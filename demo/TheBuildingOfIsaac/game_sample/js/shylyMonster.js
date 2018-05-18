var ShylyMonster = function(file, map, hp, options) {
    ShylyMonster.prototype = new Monster(map, hp);
    this.url = file;

    this.sprite = new Framework.AnimationSprite({
        url: this.url,
        col: 3,
        row: 1,
        loop: true,
        speed: 12
    });
    this.sprite.scale = 2;
    this.sprite.index = 0;
    this.getHited = false;
    this.spritePosition = { x: 0, y: 0 };

    this.getHit = function() {
        if (this.sprite.index == 1) this.HP-=this.map.gameState.dmg;
        else {
            this.sprite.index = 2;
            this.getHited = true;
        }
        if (this.HP <= 0) {
            this.die();
        }
    };

    this.update = function() {
        if (this.isdead) {
            return;
        }
        if (
            Math.abs(this.mapPosition.x - this.map.player1.mapPosition.x) < 3 &&
            Math.abs(this.mapPosition.y - this.map.player1.mapPosition.y) < 3
        ) {
            if (this.getHited == false) this.sprite.index = 0;
        } else if (
            Math.abs(this.mapPosition.x - this.map.player1.mapPosition.x) <
                10 &&
            Math.abs(this.mapPosition.y - this.map.player1.mapPosition.y) < 10
        ) {
            this.shoot();
            this.sprite.index = 1;
            this.getHited = false;
        }
        this.sprite.update();
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
};

Object.defineProperty(ShylyMonster.prototype, "position", {
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
