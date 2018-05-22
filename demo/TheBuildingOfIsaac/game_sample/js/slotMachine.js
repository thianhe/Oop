var SlotMachine = function(file,position){
    this.slotMachine = new Framework.AnimationSprite({
        url: file,
        col: 4,
        row: 1,
        loop: false,
        speed: 2
    });
    this.slotMachine.scale = 2;
    this.mapPosition = {
        x: position.x,
        y: position.y
    };
    this.slotMachine.position = {
        x: this.mapPosition.x * 64,
        y: this.mapPosition.y * 64
    };
    this.slotHp = 3;
    this.destoryed =false;


    this.update = function(){
        this.slotMachine.update();
        if(this.slotHp == 0) {this.destoryed = true;this.slotMachine.start({from:3, to: 3, loop: false, speed: 2});}
        if(this.slotMachine.index == 3 && this.destoryed == false) this.slotMachine.start({from:0, to: 0, loop: false, speed: 2});
    }

    this.playAnimation = function(){
        this.slotMachine.start({from:0, to: 3, loop: false, speed: 1});
    }

    this.draw = function(ctx){
        this.slotMachine.draw(ctx);
    }

}