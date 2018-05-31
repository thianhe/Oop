var RandomMonster = function(map){
    this.map = map;
    this.createMonster = function(mapNumber){
        var randomCreate =Math.floor(Math.random() * 3);
        if( mapNumber == 0){
            if(randomCreate == 0){
                this.map.addMonster(1, {x: 2,y: 2});
                this.map.addMonster(1, {x: 2,y: 3});
                this.map.addMonster(1, {x: 2,y: 4});
            }
            else if(randomCreate == 1){
                this.map.addMonster(2, {x: 2,y: 2});
                this.map.addMonster(2, {x: 2,y: 3});
                this.map.addMonster(2, {x: 2,y: 4});
            }
            else if(randomCreate == 2){
                this.map.addMonster(3, {x: 2,y: 2});
                this.map.addMonster(3, {x: 2,y: 3});
                this.map.addMonster(3, {x: 2,y: 4});
            }
        }else{
            if(randomCreate == 0){
                this.map.addMonster(1, {x: 2,y: 2});
                this.map.addMonster(1, {x: 2,y: 3});
                this.map.addMonster(1, {x: 2,y: 4});
            }
            else if(randomCreate == 1){
                this.map.addMonster(2, {x: 2,y: 2});
                this.map.addMonster(2, {x: 2,y: 3});
                this.map.addMonster(2, {x: 2,y: 4});
            }
            else if(randomCreate == 2){
                this.map.addMonster(3, {x: 2,y: 2});
                this.map.addMonster(3, {x: 2,y: 3});
                this.map.addMonster(3, {x: 2,y: 4});
            }
        }
    }
}