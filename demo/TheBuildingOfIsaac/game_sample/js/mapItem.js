var MapItem = function(itemNum){
    this.itemType = itemNum;
    this.item;
    var path;
    //1.add total Life  2.half Life  3.Life  4.Coins
    if(this.itemType == 0) this.itemType = Math.floor(Math.random() * 4)+1;
    if(this.itemType == 1) path = 'addLife.png';
    if(this.itemType == 2) path = 'halflife.png';
    if(this.itemType == 3) path = 'life.png';
    if(this.itemType == 4) path = 'coins.png';
    this.ate = false;
    this.sprite = new Framework.Sprite(define.imagePath + path);
    this.sprite.scale = 2;
    this.sprite.index = 1;
    var PIXEL_CONST = 64;
    this.mapPosition = {
        x: 1,
        y: 1
    };
    this.draw = function(ctx) {
        if(this.ate) return;
        this.sprite.position = {
            x: this.mapPosition.x * PIXEL_CONST,
            y: this.mapPosition.y * PIXEL_CONST
        };
        this.sprite.draw(ctx);
    }
}
Object.defineProperty(MapItem.prototype, 'position', {
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
    }
});