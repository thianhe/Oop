var Boss = function(map,hp,bossSize) {
    Boss.prototype = new Monster(map,hp)
    this.bossSize = bossSize;
    this.hpBarHead = new Framework.Sprite(define.imagePath + "hp_head.png");
    this.hpBarHead.scale=1.5;
    this.hpBarHead.index = 1; 
    this.hpBarHead.position={x:355,y:15};
    this.maxHP = hp;
    this.drawHpBar = function(ctx) {
        this.hpBarHead.draw(ctx);
        var hpBarWith = 200 * (this.HP / this.maxHP)
        ctx.beginPath();
        ctx.lineWidth = "6";
        ctx.strokeStyle = "black";
        ctx.rect(370, 10, 200, 15);
        ctx.stroke();
        ctx.stroke();
        ctx.fillStyle = "#333333";
        ctx.fillRect(370, 10, 200, 15);
        ctx.fillStyle = "#8B0000";
        ctx.fillRect(370, 10, hpBarWith, 15);
    }
};

Object.defineProperty(Boss.prototype, 'position', {
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

Object.defineProperty(Boss.prototype, 'isDead', {
    get: function() {
        return this.isdead;
    }
});