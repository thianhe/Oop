var Map = function(map)
{
    this.thisMapState = [];
    this.mapTerrain = map;
    var mapNumber = 1;
    var bossMapPsoitionX = (this.mapTerrain.length-1)/2;
    var bossMapPsoitionY = (this.mapTerrain.length-1)/2;
    var startingMapXY= (this.mapTerrain.length-1)/2;
    var mapPositionX=(this.mapTerrain.length-1)/2;
    var mapPositionY=(this.mapTerrain.length-1)/2;
    this.mapList = new Terrain();
    this.mapArray = this.mapList.terrainList[this.mapTerrain[mapPositionX][mapPositionY]];
    this.load = function(){
        this.score = new Score();
        this.score.position = {x:0,y:0};
        this.mapFloor = new Framework.Sprite(define.imagePath + 'floor1.png');
        this.mapFloor.scale = 2;
        this.mapWall = new Framework.Sprite(define.imagePath + 'wall.png');
        this.mapWall.scale = 2;
        
        var newMonster = new Monster(define.imagePath + 'monster.png',this, {down: {from: 0, to: 2}, left: {from:3, to: 5}, right: {from: 6, to: 8}, up: {from: 9, to: 11}});
        var mapBoxPic = new Framework.Sprite(define.imagePath + 'box.png');
        /*this.increaseBombNum  = new Framework.Sprite(define.imagePath + 'increaseBombNum.png');
        this.increaseBombNum.scale = 1.5;
        this.increaseBombPower  = new Framework.Sprite(define.imagePath + 'increaseBombPower.png');
        this.increaseBombPower.scale = 1.5;
        this.stopMonster  = new Framework.Sprite(define.imagePath + 'stopMonster.png');
        this.stopMonster.scale = 1.5;*/
        this.player1 = new Isaac(define.imagePath + 'player1.png', {down: {from: 0, to: 2}, left: {from:3, to: 5}, right: {from: 6, to: 8}, up: {from: 9, to: 11}});
        this.player1.position = {x:1, y:1};
        var newBullet = new Bullet(define.imagePath + 'bullet.png',2,this.player1.position);
        this.monster = [];
        /*this.stopMonster = false;
        this.stopMonsterCounter =0;*/
        this.randomMapState();
        console.log(this.thisMapState);
        console.log(this.mapTerrain);
        console.log("final map :" +bossMapPsoitionX,bossMapPsoitionY);
    }

    this.init = function()
    {
        this.player1.StepMovedCallBack.push(this.playerMovedHandler);
        this.constants = new Constants();
        this.boxArray = [];
        //this.itemArray = [];
        this.tileArray = [];
        //this.exploreArray = [];
        this.bulletArray = [];

        for(var i=0; i<this.mapArray.length; i++){
            var line = this.mapArray[i];
            for(var j=0; j<line.length; j++){
                var tile = new MapTile();
                tile.tileType = 0;
                tile.position = {x:j,y:i}
                if(line[j] === 2){
                    var box = new Box(this.constants.ItemEnum.NONE);
                    box.position = {x:j, y:i};
                    this.boxArray.push(box);
                }/*else if(line[j] === 3){
                    var box = new Box(this.constants.ItemEnum.INCREASE_BOMB);
                    box.position = {x:j, y:i};
                    this.boxArray.push(box);
                }else if(line[j] === 4){
                    var box = new Box(this.constants.ItemEnum.INCREASE_POWER);
                    box.position = {x:j, y:i};
                    this.boxArray.push(box);
                }else if(line[j] === 5){
                    var box = new Box(this.constants.ItemEnum.STOP_MONSTER);
                    box.position = {x:j, y:i};
                    this.boxArray.push(box);
                }*/else
                {
                    tile.tileType = line[j];
                }
                this.tileArray.push(tile);
            }
        }
	};

    this.setPlayerPosition = function(playerPosition){
        this.player1.position = playerPosition;
        this.player1.isaacHead.position = {x:playerPosition.x,y:playerPosition.y-0.45}
    }
    this.addMonster = function(monsterPosition)
    {
        var newMonster = new Monster(define.imagePath + 'monster.png',this, {down: {from: 0, to: 2}, left: {from:3, to: 5}, right: {from: 6, to: 8}, up: {from: 9, to: 11}});
        newMonster.position = monsterPosition;
        this.monster.push(newMonster);
    }

    this.playerMovedHandler = function(player){
        /*var constants = new Constants();
        var item = m_map.mapArray[player.position.y][player.position.x];
        if(item === constants.ItemEnum.INCREASE_BOMB){
            player.increaseBombNum();
            m_map.mapArray[player.position.y][player.position.x] = 0;
            m_map.tileArray[player.position.y*22+player.position.x].tileType = 0;
            m_map.score.addScore(200);
        }else if(item === constants.ItemEnum.INCREASE_POWER){
            player.increaseBombPower();
            m_map.mapArray[player.position.y][player.position.x] = 0;
            m_map.tileArray[player.position.y*22+player.position.x].tileType = 0;
            m_map.score.addScore(200);
        }else if(item === constants.ItemEnum.STOP_MONSTER){
            m_map.stopMonster = true;
            m_map.mapArray[player.position.y][player.position.x] = 0;
            m_map.tileArray[player.position.y*22+player.position.x].tileType = 0;
            m_map.score.addScore(200);
        }*/
    }

    /*this.exploreEndHandler = function(explore){
        var index = m_map.exploreArray.indexOf(explore);
        m_map.exploreArray.splice(index,1);
        m_map.draw(Framework.Game._context);
    }*/

	this.update = function()
	{
        for(var i=0; i<this.boxArray.length; i++)
        {
            this.boxArray[i].update();
        }
        /*for(var i=0; i<this.exploreArray.length; i++)
        {
            this.exploreArray[i].update();
        }*/
        for(var i=0; i<this.bulletArray.length; i++)
        {
            this.bulletArray[i].update();
        }
        if(this.pressWalk === true && this.player1.isWalking === false)
        {
            if(this.checkIsWalkAble(this.player1.position.x+this.playerWalkDirection.x,this.player1.position.y+this.playerWalkDirection.y))
            {
                this.player1.walk(this.playerWalkDirection);
                //this.player1Head.walk(this.playerWalkDirection);
            }
        }
        this.player1.update();
        //this.player1Head.update();
        if(this.stopMonster === true)
        {
            this.stopMonsterCounter++;
            if(this.stopMonsterCounter > 1000)
            {
                this.stopMonster = false;
            }
        }else
        {
            for(var i=0;i<this.monster.length;i++)
            {
                this.monster[i].update();
                if(this.monster[i].isDead == false && this.monster[i].position.x == this.player1.position.x && this.monster[i].position.y == this.player1.position.y)
                {
                    this.player1.die();
                    break;
                }
            }
        }
        this.outOfMap();
	}
	this.draw = function(ctx) {
        for(var i=0; i<this.tileArray.length; i++)
        {
            this.tileArray[i].draw(ctx);
        }

        for(var i=0; i<this.boxArray.length; i++)
        {
            this.boxArray[i].draw(ctx);
        }
        /*for(var i=0; i<this.exploreArray.length; i++)
        {
            this.exploreArray[i].draw(ctx);
        }*/
        for(var i=0;i<this.monster.length;i++)
        {
            this.monster[i].draw(ctx);
        }
        for(var i=0;i<this.bulletArray.length;i++)
        {
            this.bulletArray[i].draw(ctx);
        }
        this.player1.draw(ctx);
        this.score.draw(ctx);
	}

    var m_map = this;

    /*this.checkBoxExplore = function(explorePos)
    {
        for(var j=0; j<m_map.boxArray.length; j++){
            if(m_map.boxArray[j] != undefined){
                var boxPosition = m_map.boxArray[j].position;
                if(boxPosition.x === explorePos.x && boxPosition.y === explorePos.y){
                    m_map.boxArray[j].explored();
                    m_map.mapArray[explorePos.y][explorePos.x] = m_map.boxArray[j].item;
                    //m_map.tileArray[explorePos.y*22+explorePos.x].tileType = m_map.boxArray[j].item;
                    m_map.boxArray.splice(j,1);
                    m_map.score.addScore(100);
                }
            }
        }
    }*/

    this.getLeftMonsterNum = function()
    {
        var count =0;
        for(var i=0;i<this.monster.length;i++)
        {
            if(this.monster[i].isDead === false)
            {
                count++;
            }
        }
        return count;
    }

    this.playerWalkDirection = {x:0,y:0};
    this.pressWalk = false;
    this.keyPress = "";
    var walkDirection = [false,false,false,false];
    this.keydown = function(e, list){
        var playerPosition = this.player1.position;
        if(e.key === 'S') {
            walkDirection[2] = true;
            this.keyPress = "S";
        }

        if(e.key === 'A') {
            walkDirection[1] = true;
            this.keyPress = "A";
        }

        if(e.key === 'D') {
            walkDirection[3] = true;
            this.keyPress = "D";
        }
        if(e.key === 'W') {
            walkDirection[0] = true;
            this.keyPress = "W";
        }

        /*if(e.key === 'Space'){
            var bomb = this.player1.placeBomb();
            if(!Framework.Util.isNull(bomb))
            {
                bomb.ExploredCallBack.push(Framework.Game._currentLevel.map.bombExploredHandler);
                this.bombArray.push(bomb);
                var bombPosition = bomb.position;
                this.mapArray[bombPosition.y][bombPosition.x] = 3;
            }
        }*/
        if(e.key === 'Up'){
            var newBullet = new Bullet(define.imagePath + 'bullet.png',0,this.player1.position);
            this.bulletArray.push(newBullet);
        }
        if(e.key === 'Down'){
            var newBullet = new Bullet(define.imagePath + 'bullet.png',1,this.player1.position);
            this.bulletArray.push(newBullet);
        }
        if(e.key === 'Left'){
            var newBullet = new Bullet(define.imagePath + 'bullet.png',2,this.player1.position);
            this.bulletArray.push(newBullet);
        }
        if(e.key === 'Right'){
            var newBullet = new Bullet(define.imagePath + 'bullet.png',3,this.player1.position);
            this.bulletArray.push(newBullet);
        }

        this.playerWalkFunction();
    }
    this.playerWalkFunction = function()
    {
        var playerPosition = this.player1.position;
        if((walkDirection[0]) && (walkDirection[1]) && !(walkDirection[2]) && !(walkDirection[3])){
            if(this.checkIsWalkAble(playerPosition.x-1,playerPosition.y-1)){
                this.playerWalkDirection = {x:-1,y:-1};
                this.pressWalk = true;
            }
        }
        else if(!(walkDirection[0]) && (walkDirection[1]) && (walkDirection[2]) && !(walkDirection[3])){
            if(this.checkIsWalkAble(playerPosition.x-1,playerPosition.y+1)){
                this.playerWalkDirection = {x:-1,y:1};
                this.pressWalk = true;
            }
        }
        else if(!(walkDirection[0]) && !(walkDirection[1]) && (walkDirection[2]) && (walkDirection[3])){
            if(this.checkIsWalkAble(playerPosition.x+1,playerPosition.y+1)){
                this.playerWalkDirection = {x:1,y:1};
                this.pressWalk = true;
            }
        }
        else if((walkDirection[0]) && !(walkDirection[1]) && !(walkDirection[2]) && (walkDirection[3])){
            if(this.checkIsWalkAble(playerPosition.x+1,playerPosition.y-1)){
                this.playerWalkDirection = {x:1,y:-1};
                this.pressWalk = true;
            }
        }
        else if(walkDirection[0]&& !(walkDirection[1]) && !(walkDirection[2]) && !(walkDirection[3]))
        {
            if(this.checkIsWalkAble(playerPosition.x,playerPosition.y-1)){
                this.playerWalkDirection = {x:0,y:-1};
                this.pressWalk = true;
            }
        }
        else if(!(walkDirection[0]) && (walkDirection[1]) && !(walkDirection[2]) && !(walkDirection[3]))
        {
            if(this.checkIsWalkAble(playerPosition.x-1,playerPosition.y)){
                this.playerWalkDirection = {x:-1,y:0};
                this.pressWalk = true;
            }
        }
        else if(!(walkDirection[0]) && !(walkDirection[1]) && (walkDirection[2]) && !(walkDirection[3]))
        {
            if(this.checkIsWalkAble(playerPosition.x,playerPosition.y+1)){
                this.playerWalkDirection = {x:0,y:1};
                this.pressWalk = true;
            }
        }
        else if(!(walkDirection[0]) && !(walkDirection[1]) && !(walkDirection[2]) && (walkDirection[3]))
        {
            if(this.checkIsWalkAble(playerPosition.x+1,playerPosition.y)){
                this.playerWalkDirection = {x:1,y:0};
                this.pressWalk = true;
            }
        }
    }

    this.stopAllMonsterWalk = function()
    {
        for(var i=0;i<this.monster.length;i++)
        {
            this.monster[i].stopWalk();
        }
    }

    this.checkIsWalkAble = function(x,y){
        if(x < 0 || x > this.mapArray[0].length){ return false; }
        if(y < 0 || y > this.mapArray.length){ return false; }
        if(this.mapArray[y][x] > 0){ return false; }
        else{ return true;}
    }

    this.keyup = function(e, list){
        if(e.key === 'W' || e.key === 'A' || e.key === 'S' || e.key === 'D') {
            if(e.key === 'W')walkDirection[0]=false;
            if(e.key === 'A')walkDirection[1]=false;
            if(e.key === 'S')walkDirection[2]=false;
            if(e.key === 'D')walkDirection[3]=false;
            this.playerWalkFunction();
            if(!(walkDirection)[0]&&!(walkDirection)[1]&&!(walkDirection[2])&&!(walkDirection[3]))
            {
                this.player1.walkEnd();
                this.playerWalkDirection = {x:0,y:0};
                this.pressWalk = false;
            }
        }
    }

    this.randomMapState = function(){
        for(var i=0 ; i< this.mapTerrain.length;i++){
            this.thisMapState[i] = []
            for(var j=0; j< this.mapTerrain.length;j++){
                this.thisMapState[i][j] = [];
                //state leftGate UpGate RightGate BottomGate
                this.thisMapState[i][j].push(-1);
                this.thisMapState[i][j].push(1);
                this.thisMapState[i][j].push(1);
                this.thisMapState[i][j].push(1);
                this.thisMapState[i][j].push(1);
            }
        }
        var mapSize =this.mapTerrain.length;
        this.thisMapState[startingMapXY][startingMapXY][0] = 0;
        while (mapNumber<9) {
            this.randomOpenMap(bossMapPsoitionX,bossMapPsoitionY,mapSize-1);
        }
        this.connectOpenRoom();
        this.changeMap()
        this.init()
    }

    this.randomOpenMap = function(tempX,tempY,size){
        if(this.isLongerPath(tempX,tempY)){
            bossMapPsoitionX=tempX;
            bossMapPsoitionY=tempY;
        }
        if(mapNumber === 9) return;
        if(tempX>0 && this.randomBool()){
            if( this.thisMapState[tempX-1][tempY][0] == -1){
                mapNumber = mapNumber+1;
                this.thisMapState[tempX-1][tempY][0] = 0;
                this.mapUpToBottomConnect(tempX-1,tempY,0);
                this.randomOpenMap(tempX-1,tempY,size);
            }
        }
        if(mapNumber === 9) return;
        if(tempX<size && this.randomBool()){
            if(this.thisMapState[tempX+1][tempY][0] == -1){
                mapNumber = mapNumber+1;
                this.thisMapState[tempX+1][tempY][0] = 0;
                this.mapUpToBottomConnect(tempX,tempY,0);
                this.randomOpenMap(tempX+1,tempY,size);
            }
        }
        if(mapNumber === 9) return;
        if(tempY>0 && this.randomBool()){
            if(this.thisMapState[tempX][tempY-1][0] == -1){
                mapNumber = mapNumber+1;
                this.thisMapState[tempX][tempY-1][0] = 0;
                this.mapLeftToRightConnect(tempX,tempY-1,0);
                this.randomOpenMap(tempX,tempY-1,size);
            }
        }
        if(mapNumber === 9) return;
        if(tempY<size && this.randomBool()){
            if(this.thisMapState[tempX][tempY+1][0] == -1){
                mapNumber = mapNumber+1;
                this.thisMapState[tempX][tempY+1][0] = 0;
                this.mapLeftToRightConnect(tempX,tempY,0);
                this.randomOpenMap(tempX,tempY+1,size);
            }
        }
    }
    this.isLongerPath = function(tempX,tempY){
        return this.PathLength(tempX,tempY)>this.PathLength(bossMapPsoitionX,bossMapPsoitionY);
    }

    this.PathLength = function(tempX,tempY){
        return Math.pow(tempX-startingMapXY,2)+Math.pow(tempY-startingMapXY,2);
    }
    this.randomBool = function(){
        return (Math.random()>=0.7);
    }

    this.connectOpenRoom = function(){
        for(var i=0;i< this.mapTerrain.length;i++){
            for(var j=0;j<this.mapTerrain.length;j++){
                if(this.thisMapState[i][j][0] > -1){
                    if(i<this.mapTerrain.length-1){
                        if(this.thisMapState[i+1][j][0] >-1 ){
                            this.mapUpToBottomConnect(i,j,0);
                        }
                    }
                    if(j<this.mapTerrain.length-1){
                        if(this.thisMapState[i][j+1][0]>-1){
                            this.mapLeftToRightConnect(i,j,0);
                        }
                    }
                }else{
                    this.mapTerrain[i][j]=9;
                }
            }
        }
        var gateCount = 0;
        for(var i=1;i<5;i++){
            if(this.thisMapState[bossMapPsoitionX][bossMapPsoitionY][i]==0)
                gateCount = gateCount+1;
        }
        while(gateCount > 1){
            var randomClose = Math.floor((Math.random()*4)+1);
            if(this.thisMapState[bossMapPsoitionX][bossMapPsoitionY][randomClose] == 0){
                if(randomClose == 1)
                    this.mapLeftToRightConnect(bossMapPsoitionX,bossMapPsoitionY-1,1)
                if(randomClose == 2)
                    this.mapUpToBottomConnect(bossMapPsoitionX-1,bossMapPsoitionY,1)
                if(randomClose == 3)
                    this.mapLeftToRightConnect(bossMapPsoitionX,bossMapPsoitionY,1)
                if(randomClose == 4)
                    this.mapUpToBottomConnect(bossMapPsoitionX,bossMapPsoitionY,1)
                gateCount = gateCount -1;
                console.log("closed: "+ randomClose);
            }
        }
    }

    this.mapUpToBottomConnect = function(i,j,gateType){
        this.thisMapState[i][j][4] = gateType;
        this.thisMapState[i+1][j][2] = gateType;
    }
    this.mapLeftToRightConnect = function(i,j,gateType){
        this.thisMapState[i][j][3] = gateType;
        this.thisMapState[i][j+1][1] = gateType;
    }

    this.outOfMap = function(){
        var mapXSize =14;
        var mapYSize = 8;
        if(this.player1.position.x==0){
            mapPositionY--;
            this.changeMap();
            this.init();
            this.setPlayerPosition({x:13,y:4});
        }
        if(this.player1.position.x==mapXSize){
            mapPositionY++;
            this.changeMap();
            this.init();
            this.setPlayerPosition({x:1,y:4});
        }
        if(this.player1.position.y==0){
            mapPositionX--;
            this.changeMap();
            this.init();
            this.setPlayerPosition({x:7,y:7});
        }
        if(this.player1.position.y==mapYSize){
            mapPositionX++;
            this.changeMap();
            this.init();
            this.setPlayerPosition({x:7,y:1});
        }
    }

    this.changeMap = function(){
        console.log(mapPositionX,mapPositionY);
        this.mapArray = this.mapList.terrainList[this.mapTerrain[mapPositionX][mapPositionY]];
        this.mapArray[4][0] = this.thisMapState[mapPositionX][mapPositionY][1];
        this.mapArray[0][7] = this.thisMapState[mapPositionX][mapPositionY][2];
        this.mapArray[4][14] = this.thisMapState[mapPositionX][mapPositionY][3];
        this.mapArray[8][7] = this.thisMapState[mapPositionX][mapPositionY][4];
    }
}