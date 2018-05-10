var PlayerHpBar = function(){
    this.fullHpArray = [];
    this.halfHpArray = [];
    this.emptyHpArray = [];
    this.coinIcon =  new Framework.Sprite(define.imagePath + 'coins.png');
    this.coinIcon.scale = 2;
    this.coinIcon.index = 1;
    this.money = 10;
    this.coinIcon.position = {x:10*64,y:16}
    this.coinTextPosition = {x:10*64+24,y:4};
    this.load = function(totalHp,tempHp,money){
        this.addTotalHp(totalHp)
        this.upDateHP(tempHp)
        this.upDateMoney(money)
    }
    this.addTotalHp = function(totalHp){
        var i=1;
        this.emptyHpArray=[];
        while(this.emptyHpArray.length < totalHp){
            var emptyHp = new Framework.Sprite(define.imagePath + 'emptyHP.png');
            emptyHp.scale = 2.1;
            emptyHp.position = {x: i*64, y: 16};
            this.emptyHpArray.push(emptyHp);
            i+=1;
        }
    }
    this.upDateMoney = function(tempMoney){
        this.money = tempMoney;
    }
    this.upDateHP = function(tempHp){
        var i=1;
        this.fullHpArray = [];
        this.halfHpArray = [];
        while(this.fullHpArray.length < Math.floor(tempHp)){
            var fullHp = new Framework.Sprite(define.imagePath + 'fullHp.png');
            fullHp.scale = 2.1;
            fullHp.position = {x: i*64, y: 16};
            this.fullHpArray.push(fullHp);
            i+=1;
        }
        if(Math.floor(tempHp)-tempHp != 0){
            var halfHp = new Framework.Sprite(define.imagePath + 'halfHp.png');
            halfHp.scale = 2.1;
            halfHp.position = {x: i*64, y: 16};
            this.halfHpArray.push(halfHp);
            i+=1;
        }
    }
    
    this.draw = function(ctx){
        for(var i=0;i<this.emptyHpArray.length;i++){
            this.emptyHpArray[i].draw(ctx);
        }
        for(var i=0;i<this.fullHpArray.length;i++){
            this.fullHpArray[i].draw(ctx);
        }
        for(var i=0;i<this.halfHpArray.length;i++){
            this.halfHpArray[i].draw(ctx);
        }
        this.coinIcon.draw(ctx);
        ctx.globalAlpha=0.8;
        ctx.font = '18pt Algerian';
        ctx.globalAlpha=1;
        ctx.fillStyle = 'yellow';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText(":" + this.money, this.coinTextPosition.x, this.coinTextPosition.y);
    }
};