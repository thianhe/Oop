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


    this.slotMachine_dmg = new Framework.AnimationSprite({
        url: define.imagePath + "slotMachine_dmg.png",
        col: 4,
        row: 1,
        loop: false,
        speed: 2
    });
    this.slotMachine_dmg.scale = 2;
    this.slotMachine_dmg_Position = {
        x: 2,
        y: 6
    };
    this.slotMachine_dmg.position = {
        x: this.slotMachine_dmg_Position.x * 64,
        y: this.slotMachine_dmg_Position.y * 64
    };


    this.slotMachine_atks = new Framework.AnimationSprite({
        url: define.imagePath + "slotMachine_atkspeed.png",
        col: 4,
        row: 1,
        loop: false,
        speed: 2
    });
    this.slotMachine_atks.scale = 2;
    this.slotMachine_atks_Position = {
        x: 12,
        y: 6
    };
    this.slotMachine_atks.position = {
        x: this.slotMachine_atks_Position.x * 64,
        y: this.slotMachine_atks_Position.y * 64
    };


    this.moneySoltHP = 3;
    this.hpSoltHP = 3;
    this.dmgSoltHP = 3;
    this.atksSoltHP = 3;
    this.moneyDestoryed = false;
    this.hpDestoryed = false;
    this.dmgDestoryed = false;
    this.atksDestoryed = false;


    this.update = function() {
        this.slotMachine_money.update();
        this.slotMachine_hp.update();

        if (this.moneySoltHP == 0) {
            this.moneyDestoryed = true;
            this.slotMachine_money.start({
                from: 3,
                to: 3,
                loop: false,
                speed: 2
            });
        }
        if (this.slotMachine_money.index == 3 && this.moneyDestoryed == false) this.slotMachine_money.start({
            from: 0,
            to: 0,
            loop: false,
            speed: 2
        });

        if (this.hpSoltHP == 0) {
            this.hpDestoryed = true;
            this.slotMachine_hp.start({
                from: 3,
                to: 3,
                loop: false,
                speed: 2
            });
        }
        if (this.slotMachine_hp.index == 3 && this.hpDestoryed == false) this.slotMachine_hp.start({
            from: 0,
            to: 0,
            loop: false,
            speed: 2
        });

        if (this.dmgSoltHP == 0) {
            this.dmgDestoryed = true;
            this.slotMachine_dmg.start({
                from: 3,
                to: 3,
                loop: false,
                speed: 2
            });
        }
        if (this.slotMachine_dmg.index == 3 && this.dmgDestoryed == false) this.slotMachine_dmg.start({
            from: 0,
            to: 0,
            loop: false,
            speed: 2
        });

        if (this.atksSoltHP == 0) {
            this.atksDestoryed = true;
            this.slotMachine_atks.start({
                from: 3,
                to: 3,
                loop: false,
                speed: 2
            });
        }
        if (this.slotMachine_atks.index == 3 && this.atksDestoryed == false) this.slotMachine_atks.start({
            from: 0,
            to: 0,
            loop: false,
            speed: 2
        });
    };

    this.moneyAnimation = function() {
        this.slotMachine_money.start({
            from: 0,
            to: 3,
            loop: false,
            speed: 1
        });
    };

    this.hpAnimation = function() {
        this.slotMachine_hp.start({
            from: 0,
            to: 3,
            loop: false,
            speed: 1
        });
    };

    this.dmgAnimation = function() {
        this.slotMachine_dmg.start({
            from: 0,
            to: 3,
            loop: false,
            speed: 1
        });
    };

    this.atksAnimation = function() {
        this.slotMachine_atks.start({
            from: 0,
            to: 3,
            loop: false,
            speed: 1
        });
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