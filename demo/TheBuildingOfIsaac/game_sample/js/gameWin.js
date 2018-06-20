var GameWin = Framework.Class(Framework.Level , {
    initializeProgressResource: function() {
        this.loading = new Framework.Sprite(define.imagePath + 'loading.png');
        this.loading.position = {x: Framework.Game.getCanvasWidth() / 2 , y: 200};
        this.loading.scale=1.5;
        GameLevel.state={hpLimit:3,hp:3,money:0,gameLevel:0,dmg:1,atks:1,weapon:0,weaponList:[],weaponUsing:1};
        GameLevel.state.weaponList.push(0);
        GameLevel.state.weaponList.push(1);
        GameLevel.state.weaponList.push(2);                 
    },

    //在initialize時會觸發的事件
    loadingProgress: function(ctx, requestInfo) {
    },

    load: function() {
        this.menu = new Framework.Sprite(define.imagePath + 'loading.png');
        
    },

    initialize: function() {


        this.counter = 0;
        this.gameOverCount = 50;
        this.menu.position = {
            x: Framework.Game.getCanvasWidth() / 2,
            y: 200
        };
        this.menu.scale = 1.5;
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
        parentCtx.fillText('You Win! Press any key to ending!', this.rectPosition.x + 130, this.rectPosition.y, 500);

    },

    mouseup: function(e) {
    },

    mousedown: function(e) {
        window.location.href = "./../../ending.html";
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