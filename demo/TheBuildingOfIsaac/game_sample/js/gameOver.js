var GameOver = Framework.Class(Framework.Level , {

            //初始化loadingProgress需要用到的圖片
    initializeProgressResource: function() {
        this.loading = new Framework.Sprite(define.imagePath + 'loading.png');
        this.loading.position = {x: Framework.Game.getCanvasWidth() / 2 , y: 200};
        Level2_change.state={hpLimit:3,hp:3,money:0,gameLevel:0,dmg:1,atks:1,weapon:0,weaponList:[],weaponUsing:1};
        Level2_change.state.weaponList.push(0);
        //為了或得到this.loading這個Sprite的絕對位置, 故需要先計算一次(在Game Loop執行時, 則會自動計算, 但因為loadingProgress只支援draw故需要自行計算)
    },

    //在initialize時會觸發的事件
    loadingProgress: function(ctx, requestInfo) {
        //console.log(Framework.ResourceManager.getFinishedRequestPercent())
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
        //為了讓之後的位置較好操控, new出一個位於中心點且可以黏貼任何東西的容器
        //注意, Position都是用中心點
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
        //this.rootScene.update();一定要在第一行
        this.rootScene.update();


        if(this.counter > this.gameOverCount){
            //Framework.Game.goToLevel('menu');
        }
        this.counter++;
    },

    draw: function(parentCtx) {
        //this.rootScene.draw();一定要在第一行
        this.rootScene.draw(parentCtx);
        this.menu.draw(parentCtx);
        //this.rootScene.draw();
        //可支援畫各種單純的圖形和字
        parentCtx.font = '65pt bold';
        parentCtx.fillStyle = 'White';
        parentCtx.textBaseline = 'top';
        parentCtx.textAlign = 'center';
        parentCtx.fillText('Game Over', this.rectPosition.x + 130, this.rectPosition.y, 260);
    },

    mouseup: function(e) {
    },

    mousedown: function(e) {
        //console.log為Browser提供的function, 可以在debugger的console內看到被印出的訊息
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
        //為了要讓Mouse和Touch都有一樣的事件
        //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
        this.mousedown(e[0]);

    },

    touchend: function (e) {
        this.mouseup();
    },

    touchmove: function (e) {
        this.mousemove(e[0]);
    }
});
