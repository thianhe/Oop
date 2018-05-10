var BulletExplore = function(file, option) {
    this.url = file;
    this.sprite = new Framework.AnimationSprite({
        url: this.url,
        col: 14,
        row: 1,
        loop: false,
        speed: 14
    });
    this.isFinish =false;
    this.sprite.start({
        from: 0,
        to: 13,
        loop: false,
    });
    this.sprite.scale = 1.5;
    this.sprite.index = 1;
    var PIXEL_CONST = 64;
    this.mapPosition = {
        x: 1,
        y: 1
    };
    this.update = function() {
        if(this.isFinish) return;
        this.sprite.update();
        if(this.sprite.index == 13) this.isFinish = true;
    }
    
    this.draw = function(ctx) {
        if(this.isFinish == true) return;
        this.sprite.position = {
            x: this.mapPosition.x * PIXEL_CONST,
            y: this.mapPosition.y * PIXEL_CONST
        };
        this.sprite.draw(ctx);
    }
    
};

Object.defineProperty(BulletExplore.prototype, 'position', {
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
    }
});
