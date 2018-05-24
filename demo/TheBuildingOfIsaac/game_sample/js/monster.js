//由於JS尚未支援Class(ECMAScript 6以後, 宣稱會支援)
//目前Class寫法都是以function的方式
//只要是this.XXX皆會是Public的property
var Monster = function(map,hp) {
    
    this.mapPosition = {x:0, y:0};
    this.map = map;
    this.canWalking = true;
    this.PIXEL_CONST = 64;
    this.isdead = false;
    this.HP = hp;
    this.isShooting = false;
    this.isShootingCounter = 0;
    this.isRushing = false;
    this.isRushingCount = 0;
    this.walkTarget = {x:0, y:0};
    this.isWalking = false;
    this.die = function(){
        this.isdead = true;
    }
    this.getHit = function(){
        this.HP-= this.map.gameState.dmg;
        if(this.HP<=0)this.die()
    }
    this.stopWalk = function()
    {
        this.canWalking = false;
    }
    this.shoot = function(){
        if(this.isShooting) return
        else this.isShooting = true;
        var enemyBullet = new EnemyBullet(define.imagePath + "enemyBullet.png",
        this.mapPosition,
        this.map.player1.position)
        this.map.enemyBulletArray.push(enemyBullet);
    }
};

Object.defineProperty(Monster.prototype, 'position', {
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
        this.spritePosition = {x:this.mapPosition.x * 64, y: this.mapPosition.y * 64};
    }
});

Object.defineProperty(Monster.prototype, 'isDead', {
    get: function() {
        return this.isdead;
    }
});
