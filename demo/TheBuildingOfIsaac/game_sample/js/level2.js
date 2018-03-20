var Level2 = Framework.Class(Framework.Level , {

    load: function() {

        this.mapArray = [];
        this.mapArray.push([1,2,3]); //1
        this.mapArray.push([4,0,5]); //1
        this.mapArray.push([6,7,8]); //1
        this.mapState = [];
        for(var i=0 ; i< this.mapArray.length;i++){
            this.mapState[i] = []
            var mapState = [];
            for(var j=0; j< this.mapArray.length;j++){
                var leftGate=0;
                var upGate=0;
                var rightGate=0;
                var bottomGate=0;
                this.mapState[i][j] = [];
                if(i===0) upGate = 1;
                if(i===this.mapArray.length-1) bottomGate = 1;
                if(j===0) leftGate = 1;
                if(j===this.mapArray.length-1) rightGate =1;
                this.mapState[i][j].push(0);
                this.mapState[i][j].push(leftGate);
                this.mapState[i][j].push(upGate);
                this.mapState[i][j].push(rightGate);
                this.mapState[i][j].push(bottomGate);
            }
        }
        console.log(this.mapArray.length-1);
        this.map = new Map(this.mapArray,this.mapState);
        this.map.load();
    },

    initialize: function() {
        this.map.init();
        this.map.setPlayerPosition({x:2,y:2});
        /*this.map.addMonster({x:3, y:4});
        this.map.addMonster({x:3, y:9});
        this.map.addMonster({x:9, y:4});
        this.map.addMonster({x:13, y:7});
        this.map.addMonster({x:17, y:9});
        this.map.addMonster({x:15, y:1});*/

    },

    update: function() {
        this.map.update();
        this.map.outOfMap();
    },

    draw:function(parentCtx){
        //this.rootScene.draw();
        //可支援畫各種單純的圖形和字
        this.map.draw(parentCtx)

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