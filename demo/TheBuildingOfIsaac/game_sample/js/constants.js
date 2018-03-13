
var Constants = function() {
    this.DirectionEnum = {
        DOWN : 0,
        LEFT : 1,
        RIGHT : 2,
        UP : 3,
        LEFTUP : 4,
        LEFTDOWN : 5,
        RIGHTDOWN : 6,
        RIGHTUP: 7
    };

    this.ItemEnum = {
        NONE : 0,
        INCREASE_BOMB : -1,
        INCREASE_POWER : -2,
        STOP_MONSTER : -3
    };
};
