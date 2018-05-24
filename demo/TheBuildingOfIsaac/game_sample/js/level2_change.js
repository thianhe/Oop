var Level2_change = Framework.Class(Framework.Level , {
    load: function() {
        if( typeof Level2_change.state == 'undefined' ) {
            Level2_change.state= {hpLimit:3,hp:3,money:0,gameLevel:0,dmg:1,atks:1};
        }
        console.log("Character State: "+Level2_change.state.hp);
        var size = 11;
        this.mapArray = [];
        var mapList = new Terrain();
        for(var i=0;i<size;i++){
            this.mapArray[i] = [];
            for(var j=0;j<size;j++){
                if(i==(size-1)/2 && j==(size-1)/2)this.mapArray[i].push(0);
                else this.mapArray[i].push(Math.floor((Math.random() * mapList.terrainList.length)));
            }
        }
        this.map = new Map(this.mapArray,Level2_change.state);
        this.map.load();
    },

    initialize: function() {
        this.map.init();
        this.map.setPlayerPosition({x:6,y:6});
    },

    update: function() {
        this.map.update();
    },

    draw:function(parentCtx){
        //this.rootScene.draw();
        //可支援畫各種單純的圖形和字
        this.map.draw(parentCtx);

    },

    keydown:function(e, list){
        Framework.DebugInfo.Log.warning(e.key);
        this.map.keydown(e, list);
        if(e.key === 'F11') {
            if(!this.isFullScreen) {
                Framework.Game.fullScreen();
                this.isFullScreen = true;
            } else {
                Framework.Game.exitFullScreen();
                this.isFullScreen = false;
            }

        }
    },
    keyup:function(e, list){

        this.map.keyup(e, list);
    },

    touchstart: function (e) {
        //為了要讓Mouse和Touch都有一樣的事件
        //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
        this.click(e[0]);
    },

    click: function (e) {

    },
});