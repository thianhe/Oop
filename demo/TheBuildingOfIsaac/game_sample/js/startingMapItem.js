var StartingMapItem = function() {
    this.instruction = new Framework.Sprite(
        define.imagePath + "instruction.png"
    );
    this.instruction.scale = 0.7;
    this.instruction.position = {
        x: 450,
        y: 250
    };

    this.slotMachine_hp = new Framework.AnimationSprite({
        url: define.imagePath + "slotMachine_hp.png",
        col: 4,
        row: 1,
        loop: false,
        speed: 2
    });
    this.slotMachine_hp.scale = 2;
    this.slotMachine_hp_Position = {
        x: 2,
        y: 2
    };
    this.slotMachine_hp.position = {
        x: this.slotMachine_hp_Position.x * 64,
        y: this.slotMachine_hp_Position.y * 64
    };

    this.slotMachine_money = new Framework.AnimationSprite({
        url: define.imagePath + "slotMachine_money.png",
        col: 4,
        row: 1,
        loop: false,
        speed: 2
    });
    this.slotMachine_money.scale = 2;
    this.slotMachine_money_Position = {
        x: 12,
        y: 2
    };
    this.slotMachine_money.position = {
        x: this.slotMachine_money_Position.x * 64,
        y: this.slotMachine_money_Position.y * 64
    };
    this.moneySoltHP = 3;
    this.hpSoltHP = 3;
    this.moneyDestoryed = false;
    this.hpDestoryed = false;


    this.update = function() {
        this.slotMachine_money.update();
        this.slotMachine_hp.update();

        if(this.moneySoltHP == 0) {this.moneyDestoryed = true;this.slotMachine_money.start({from:3, to: 3, loop: false, speed: 2});}
        if(this.slotMachine_money.index == 3 && this.moneyDestoryed == false) this.slotMachine_money.start({from:0, to: 0, loop: false, speed: 2});

        if(this.hpSoltHP == 0) {this.hpDestoryed = true;this.slotMachine_hp.start({from:3, to: 3, loop: false, speed: 2});}
        if(this.slotMachine_hp.index == 3 && this.hpDestoryed == false) this.slotMachine_hp.start({from:0, to: 0, loop: false, speed: 2});
    };

    this.moneyAnimation = function() {
        this.slotMachine_money.start({from:0, to: 3, loop: false, speed: 1});
    };

    this.hpAnimation = function() {
        this.slotMachine_hp.start({from:0, to: 3, loop: false, speed: 1});
    };

    this.draw = function(ctx) {
        this.instruction.draw(ctx);
        this.slotMachine_hp.draw(ctx);
        this.slotMachine_money.draw(ctx);
    };
};

Object.defineProperty(StartingMapItem.prototype, "position", {
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
    }
});
