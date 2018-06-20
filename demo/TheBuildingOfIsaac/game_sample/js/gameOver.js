var GameOver = Framework.Class(Framework.Level , {
    initializeProgressResource: function() {
        this.loading = new Framework.Sprite(define.imagePath + 'loading.png');
        this.loading.position = {x: Framework.Game.getCanvasWidth() / 2 , y: 200};
        GameLevel.state={hpLimit:3,hp:3,money:0,gameLevel:0,dmg:1,atks:1,weapon:0,weaponList:[],weaponUsing:1};
        GameLevel.state.weaponList.push(0);
        GameLevel.state.weaponList.push(1);
        GameLevel.state.weaponList.push(2);
    },

    loadingProgress: function(ctx, requestInfo) {
    },

    load: function() {
        this.audio = new Framework.Audio({
            died: {
                mp3: define.musicPath + "youdied.mp3"
            }
        });
        this.menu = new Framework.Sprite(define.imagePath + 'loading.png');
    },

    initialize: function() {
      this.audio.play({
          name: "died",
          loop: true
      });

        this.counter = 0;
        this.gameOverCount = 50;
        this.menu.position = {
            x: Framework.Game.getCanvasWidth() / 2,
            y: Framework.Game.getCanvasHeight() / 2-50
        };
        this.menu.scale = 2;
        this.rootScene.attach(this.menu);

        this.rectPosition = {
            x: Framework.Game.getCanvasWidth() / 2 - 130,
            y: Framework.Game.getCanvasHeight() / 2
        };
    },

    update:function(){
        this.rootScene.update();
        if(this.counter > this.gameOverCount){
        }
        this.counter++;
    },

    draw: function(parentCtx) {
        this.rootScene.draw(parentCtx);
        this.menu.draw(parentCtx);
        parentCtx.font = '65pt bold';
        parentCtx.fillStyle = 'White';
        parentCtx.textBaseline = 'top';
        parentCtx.textAlign = 'center';
        parentCtx.fillText('Game Over', this.rectPosition.x + 130, this.rectPosition.y, 260);
    },

    mouseup: function(e) {
    },

    mousedown: function(e) {
        this.audio.pause("died");
        Framework.Game.goToLevel("menu");
    },

    click:function(e){
        this.audio.pause("died");
        Framework.Game.goToLevel("menu");
    },

    mousemove: function(e) {

    },

    mouseup: function(e) {
        this.isTouchArrow = false;
    },

    touchstart: function (e) {
        this.mousedown(e[0]);
    },

    touchend: function (e) {
        this.mouseup();
    },

    touchmove: function (e) {
        this.mousemove(e[0]);
    }
});
