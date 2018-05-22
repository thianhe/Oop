var StartingMapItem = function() {
    this.instruction = new Framework.Sprite(
        define.imagePath + "instruction.png"
    );
    this.instruction.scale = 0.7;
    this.instruction.position = {
        x: 450,
        y: 250
    };

    this.slotMachine_hp = new SlotMachine(
        define.imagePath + "slotMachine_hp.png", {
            x: 2,
            y: 2
        }
    );
    this.slotMachine_money = new SlotMachine(
        define.imagePath + "slotMachine_money.png", {
            x: 12,
            y: 2
        }
    );
    this.slotMachine_dmg = new SlotMachine(
        define.imagePath + "slotMachine_dmg.png", {
            x: 2,
            y: 6
        }
    );
    this.slotMachine_atks = new SlotMachine(
        define.imagePath + "slotMachine_atkspeed.png", {
            x: 12,
            y: 6
        }
    );

    this.update = function() {
        this.slotMachine_money.update();
        this.slotMachine_hp.update();
        this.slotMachine_dmg.update();
        this.slotMachine_atks.update();
    };

    this.draw = function(ctx) {
        this.instruction.draw(ctx);
        this.slotMachine_hp.draw(ctx);
        this.slotMachine_money.draw(ctx);
        this.slotMachine_dmg.draw(ctx);
        this.slotMachine_atks.draw(ctx);
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