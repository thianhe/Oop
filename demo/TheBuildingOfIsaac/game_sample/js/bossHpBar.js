var BossHpBar = function(){

    this.load = function(totalHp,tempHp){
        this.sq = Framework.SquareComponent();
        this.sq.bodyWidth = 50;
        this.sq.bodyHeight = 50;
    }
    
    this.upDateHP = function(tempHp){

    }

    this.draw = function(ctx){
        this.sq.draw();
    }
};