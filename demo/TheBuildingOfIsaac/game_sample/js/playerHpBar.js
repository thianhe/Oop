var PlayerHpBar = function(){
    this.fullHpArray = [];
    this.halfHpArray = [];
    this.emptyHpArray = [];

    this.load = function(totalHp,tempHp){
        this.addTotalHp(totalHp)
        this.upDateHP(tempHp)
    }

    this.addTotalHp = function(totalHp){
        var i=1;
        console.log(this.emptyHpArray.length,totalHp)
        while(this.emptyHpArray.length < totalHp){
            console.log("aa")
            var emptyHp = new Framework.Sprite(define.imagePath + 'emptyHP.png');
            emptyHp.scale = 2.1;
            emptyHp.position = {x: i*64, y: 16};
            this.emptyHpArray.push(emptyHp);
            i+=1;
        }
    }

    this.upDateHP = function(tempHp){
        var i=1;
        this.fullHpArray = [];
        this.halfHpArray = [];
        console.log(this.fullHpArray.length,tempHp)
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
    }
};