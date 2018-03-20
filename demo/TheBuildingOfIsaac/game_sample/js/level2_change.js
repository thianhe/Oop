var Level2_change = Framework.Class(Framework.Level , {

    load: function() {
        this.mapArray = [];
        for(var i=0;i<9;i++){
            this.mapArray[i] = [];
            for(var j=0;j<9;j++){
                if(i==4 && j==4)this.mapArray[i].push(0)
                else this.mapArray[i].push(Math.floor((Math.random() * 9)));
            }
        }
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
        console.log(this.mapArray);
        console.log(this.mapState);
        this.map = new Map(this.mapArray,this.mapState);
        this.map.load();
    },

    initialize: function() {
        this.map.init();
        this.map.setPlayerPosition({x:6,y:6});
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