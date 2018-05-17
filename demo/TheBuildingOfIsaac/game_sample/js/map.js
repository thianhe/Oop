var Map = function(map, state) {
    console.log(state);
    this.audio = new Framework.Audio({
        bgm: {
            mp3: define.musicPath + "bgm.mp3"
        },
        hurt1: {
            wav: define.musicPath + "hurt_grunt.wav"
        },
        hurt2: {
            wav: define.musicPath + "hurt_grunt_1.wav"
        },
        hurt3: {
            wav: define.musicPath + "hurt_grunt_2.wav"
        },
        isaacdie1: {
            wav: define.musicPath + "isaacdie1.wav"
        },
        isaacdie2: {
            wav: define.musicPath + "isaacdie2.wav"
        },
        isaacdie3: {
            wav: define.musicPath + "isaacdie3.wav"
        },
        bubble: {
            mp3: define.musicPath + "bubble1.mp3"
        },
        plop: {
            wav: define.musicPath + "plop.wav"
        },
        coinslot: {
            wav: define.musicPath + "coinslot.wav"
        },
        pickup: {
            wav: define.musicPath + "pickup.wav"
        }
    });
    var boughtThings = false;
    this.mapPoopStateArray = [];
    this.mapItemStateArray = [];
    this.gameState = state;
    this.thisMapState = [];
    this.mapTerrain = map;
    this.gettingDamge = false;
    this.shooting = false;
    var mapNumber = 1;
    var bossMapPsoitionX = (this.mapTerrain.length - 1) / 2;
    var bossMapPsoitionY = (this.mapTerrain.length - 1) / 2;
    var startingMapXY = (this.mapTerrain.length - 1) / 2;
    var mapPositionX = (this.mapTerrain.length - 1) / 2;
    var mapPositionY = (this.mapTerrain.length - 1) / 2;
    this.mapList = new Terrain();
    this.mapArray = this.mapList.terrainList[
        this.mapTerrain[mapPositionX][mapPositionY]
    ];
    this.playerWalkDirection = {
        x: 0,
        y: 0
    };
    this.pressWalk = false;
    this.keyPress = "";
    var walkDirection = [false, false, false, false];
    var deadTimeCount = 40;
    var shootTimeCount = 100;
    var turnFaceCount = 100;
    this.load = function() {
        this.playerHpBar = new PlayerHpBar();
        this.playerHpBar.load(
            this.gameState.hpLimit,
            this.gameState.hp,
            this.gameState.money
        );
        this.audio.play({
            name: "bgm",
            loop: true
        });
        this.audio.setVolume("bgm", 0.08);
        this.score = new Score();
        this.score.position = {
            x: 0,
            y: 0
        };
        this.mapFloor = new Framework.Sprite(define.imagePath + "floor1.png");
        this.mapFloor.scale = 2;
        this.mapWall = new Framework.Sprite(define.imagePath + "wall2.png");
        this.mapWall.scale = 2;
        var newMonster = new Worm(define.imagePath + "monster.png", this, 3, {
            down: {
                from: 0,
                to: 2
            },
            left: {
                from: 3,
                to: 5
            },
            right: {
                from: 6,
                to: 8
            },
            up: {
                from: 9,
                to: 11
            }
        });
        var newMonster1 = new Fly(define.imagePath + "fly.png", this, 3, {
            down: {
                from: 0,
                to: 3
            },
            left: {
                from: 4,
                to: 7
            },
            right: {
                from: 8,
                to: 11
            },
            up: {
                from: 12,
                to: 15
            }
        });
        var newMonster2 = new SmallFly(define.imagePath + "smallFly.png", this, 3, {
            down: {
                from: 0,
                to: 1
            }
        });
        var newBoss = new Boss(define.imagePath + "demon.png", this, {
            down: {
                from: 0,
                to: 2
            },
            left: {
                from: 3,
                to: 5
            },
            right: {
                from: 6,
                to: 8
            },
            up: {
                from: 9,
                to: 11
            }
        });
        this.isPee = false;
        this.pee = new Framework.Sprite(define.imagePath + "pee.png");
        this.pee.scale = 0.8;
        this.pee.position = {
            x: 0 * 64 - 32,
            y: 0 * 64 - 32
        };
        var mapBoxPic1 = new Framework.Sprite(define.imagePath + "stone1.png");
        var mapBoxPic2 = new Framework.Sprite(define.imagePath + "stone2.png");
        var mapBoxPic3 = new Framework.Sprite(define.imagePath + "stone3.png");
        var mapBoxPic4 = new Framework.Sprite(define.imagePath + "stone4.png");
        var mapBoxPic5 = new Framework.Sprite(define.imagePath + "stone5.png");
        var itemPic1 = new Framework.Sprite(define.imagePath + "addLife.png");
        var itemPic2 = new Framework.Sprite(define.imagePath + "life.png");
        var itemPic3 = new Framework.Sprite(define.imagePath + "halflife.png");
        var itemPic4 = new Framework.Sprite(define.imagePath + "coins.png");
        var itemPic5 = new Framework.Sprite(define.imagePath + "bullet.png");
        var itemPic6 = new Framework.Sprite(define.imagePath + "enemyBullet.png");
        var bossHpBarHead = new Framework.Sprite(
            define.imagePath + "hp_head.png"
        );
        var mapDoorPic = new Framework.Sprite(
            define.imagePath + "doorClose.png"
        );
        var slotMachine_hp = new Framework.AnimationSprite({
            url: define.imagePath + "slotMachine_hp.png",
            col: 4,
            row: 1,
            loop: true,
            speed: 1
        });
        var slotMachine_money = new Framework.AnimationSprite({
            url: define.imagePath + "slotMachine_money.png",
            col: 4,
            row: 1,
            loop: true,
            speed: 1
        });
        var fullHpPic = new Framework.Sprite(define.imagePath + "fullHp.png");
        var halfHpPic = new Framework.Sprite(define.imagePath + "halfHp.png");
        var emptyHpPic = new Framework.Sprite(define.imagePath + "emptyHP.png");
        var poopPic = new Framework.Sprite(define.imagePath + "poop.png");
        var bulletExplorPic = new Framework.Sprite(
            define.imagePath + "teareffect.png"
        );
        var flyDiewPic = new Framework.Sprite(
            define.imagePath + "dieFly.png"
        );
        var mapNextLevelGatePic = new Framework.Sprite(
            define.imagePath + "nextLevelGate.png"
        );
        this.player1 = new Isaac(define.imagePath + "player1.png", {
            down: {
                from: 0,
                to: 2
            },
            left: {
                from: 3,
                to: 5
            },
            right: {
                from: 6,
                to: 8
            },
            up: {
                from: 9,
                to: 11
            }
        });
        this.player1.position = {
            x: 1,
            y: 1
        };
        this.boss = [];
        this.StartingMapItem = new StartingMapItem();
        /*this.stopMonster = false;
            this.stopMonsterCounter =0;*/
        this.randomMapState();
        console.log(this.thisMapState);
        console.log(this.mapTerrain);
        console.log("final map :" + bossMapPsoitionX, bossMapPsoitionY);
    };
    this.monster = [];

    this.init = function() {
        this.player1.StepMovedCallBack.push(this.playerMovedHandler);
        this.constants = new Constants();
        this.boxArray = [];
        this.tileArray = [];
        this.bulletArray = [];
        this.enemyBulletArray = [];
        this.doorArray = [];
        this.nextLevelGateArray = [];
        this.poopArray = [];
        this.bulletExploreArray = [];
        this.stateMapPosition;
        if (this.thisMapState[mapPositionX][mapPositionY][0] === 1) {
            this.mapPoopState = [];
            this.mapPoopState.push(mapPositionX);
            this.mapPoopState.push(mapPositionY);
            this.poopList = [];
            this.mapPoopState.push(this.poopList);
            this.mapPoopStateArray.push(this.mapPoopState);

            this.mapItemState = [];
            this.mapItemState.push(mapPositionX);
            this.mapItemState.push(mapPositionY);
            this.itemList = [];
            this.mapItemState.push(this.itemList);
            this.mapItemStateArray.push(this.mapItemState);
        }

        var poopNumber = 0;
        for (var i = 0; i < this.mapPoopStateArray.length; i++) {
            if (
                this.mapPoopStateArray[i][0] == mapPositionX &&
                this.mapPoopStateArray[i][1] == mapPositionY
            ) {
                this.stateMapPosition = i;
            }
        }
        this.itemArray = [];
        for (
            var i = 0; i < this.mapItemStateArray[this.stateMapPosition][2].length; i++
        ) {
            this.itemArray.push(
                this.mapItemStateArray[this.stateMapPosition][2][i]
            );
        }
        for (var i = 0; i < this.mapArray.length; i++) {
            var line = this.mapArray[i];
            for (var j = 0; j < line.length; j++) {
                var tile = new MapTile();
                tile.tileType = 0;
                tile.position = {
                    x: j,
                    y: i
                };
                if (line[j] === 2) {
                    var box = new Box();
                    box.position = {
                        x: j,
                        y: i
                    };
                    this.boxArray.push(box);
                } else if (line[j] === 3) {
                    var door = new Door();
                    door.position = {
                        x: j,
                        y: i
                    };
                    this.doorArray.push(door);
                } else if (line[j] === -1) {
                    var poop = new Poop(define.imagePath + "poop.png", {
                        down: {
                            from: 0,
                            to: 4
                        }
                    });
                    if (
                        this.thisMapState[mapPositionX][mapPositionY][0] === 2
                    ) {
                        while (
                            poop.HP >
                            this.mapPoopStateArray[this.stateMapPosition][2][
                                poopNumber
                            ]
                        )
                            poop.getHit();
                    }
                    poop.position = {
                        x: j,
                        y: i
                    };
                    this.poopArray.push(poop);
                    poopNumber += 1;
                } else {
                    tile.tileType = line[j];
                }
                this.tileArray.push(tile);
            }
        }
    };

    this.setPlayerPosition = function(playerPosition) {
        this.player1.position = playerPosition;
        this.player1.isaacHead.position = {
            x: playerPosition.x,
            y: playerPosition.y - 0.45
        };
    };
    this.addMonster = function(monster, monsterPosition) {
        var newMonster
        if (monster == 1)
            newMonster = new Worm(define.imagePath + "monster.png", this, 3, {
                down: {
                    from: 0,
                    to: 2
                },
                left: {
                    from: 3,
                    to: 5
                },
                right: {
                    from: 6,
                    to: 8
                },
                up: {
                    from: 9,
                    to: 11
                }
            });
        if (monster == 2)
            newMonster = new Fly(define.imagePath + "fly.png", this, 3, {
                down: {
                    from: 0,
                    to: 3
                },
                left: {
                    from: 4,
                    to: 7
                },
                right: {
                    from: 8,
                    to: 11
                },
                up: {
                    from: 12,
                    to: 15
                }
            });
        if (monster == 3)
            newMonster = new SmallFly(define.imagePath + "smallFly.png", this, 3, {
                down: {
                    from: 0,
                    to: 1
                }
            });
        newMonster.position = monsterPosition;
        this.monster.push(newMonster);
    };
    this.addBoss = function(monsterPosition) {
        var newBoss = new Boss(define.imagePath + "demon.png", this, {
            down: {
                from: 0,
                to: 2
            },
            left: {
                from: 3,
                to: 5
            },
            right: {
                from: 6,
                to: 8
            },
            up: {
                from: 9,
                to: 11
            }
        });
        newBoss.position = monsterPosition;
        this.boss.push(newBoss);
    };
    this.addFlyDie = function(diePosition) {
        var flyDie = new FlyDie(define.imagePath + "dieFly.png", this, {
            down: {
                from: 0,
                to: 10
            }
        });
        flyDie.position = diePosition;
        this.bulletExploreArray.push(flyDie);
    };

    /*this.playerMovedHandler = function(player){
         var constants = new Constants();
          var item = m_map.mapArray[player.position.y][player.position.x];
          if(item === constants.ItemEnum.INCREASE_BOMB){
              player.increaseBombNum();
              m_map.mapArray[player.position.y][player.position.x] = 0;
              m_map.tileArray[player.position.y*22+player.position.x].tileType = 0;
              m_map.score.addScore(200);
          }else if(item === constants.ItemEnum.INCREASE_POWER){
              player.increaseBombPower();
              m_map.mapArray[player.position.y][player.position.x] = 0;
              m_map.tileArray[player.position.y*22+player.position.x].tileType = 0;
              m_map.score.addScore(200);
          }else if(item === constants.ItemEnum.STOP_MONSTER){
              m_map.stopMonster = true;
              m_map.mapArray[player.position.y][player.position.x] = 0;
              m_map.tileArray[player.position.y*22+player.position.x].tileType = 0;
              m_map.score.addScore(200);
          }
      }*/

    /*this.exploreEndHandler = function(explore){
          var index = m_map.exploreArray.indexOf(explore);
          m_map.exploreArray.splice(index,1);
          m_map.draw(Framework.Game._context);
      }*/

    this.update = function() {
        this.outOfMap();
        this.bulletHit();
        this.monsterClean();
        for (var i = 0; i < this.boxArray.length; i++) {
            this.boxArray[i].update();
        }
        for (var i = 0; i < this.doorArray.length; i++) {
            this.doorArray[i].update();
        }
        for (var i = 0; i < this.bulletArray.length; i++) {
            this.bulletArray[i].update();
            if (this.bulletArray[i].bulletEnd == false) {
                if (
                    Math.abs(
                        this.bulletArray[i].startPosition.x -
                        this.bulletArray[i].spritePosition.x
                    ) > 5 ||
                    Math.abs(
                        this.bulletArray[i].startPosition.y -
                        this.bulletArray[i].spritePosition.y
                    ) > 5
                )
                    this.bulletArray[i].bulletEnd = true;
                if (this.bulletArray[i].bulletEnd) {
                    var newBulletExplore = new BulletExplore(
                        define.imagePath + "teareffect.png", {
                            down: {
                                from: 0,
                                to: 13
                            }
                        }
                    );
                    newBulletExplore.position = {
                        x: this.bulletArray[i].spritePosition.x,
                        y: this.bulletArray[i].spritePosition.y
                    };
                    this.bulletExploreArray.push(newBulletExplore);
                }
            }
        }
        for (var i = 0; i < this.enemyBulletArray.length; i++) {
            this.enemyBulletArray[i].update();
        }
        for (var i = 0; i < this.bulletExploreArray.length; i++) {
            this.bulletExploreArray[i].update();
        }
        for (var i = 0; i < this.monster.length; i++) {
            this.monster[i].update();
            if (
                this.player1.position.x == this.monster[i].position.x &&
                this.player1.position.y == this.monster[i].position.y
            )
                if (this.monster[i].isdead == false) this.getDamge();
        }
        for (var i = 0; i < this.itemArray.length; i++) {
            if (
                this.player1.position.x == this.itemArray[i].position.x &&
                this.player1.position.y == this.itemArray[i].position.y
            )
                if (this.itemArray[i].ate == false) this.eatItem(i);
        }
        for (var i = 0; i < this.boss.length; i++) {
            this.boss[i].update();
            if (
                Math.abs(this.player1.position.x - this.boss[i].position.x) <=
                1 &&
                Math.abs(this.player1.position.y - this.boss[i].position.y) <= 1
            )
                if (this.boss[i].isdead == false) this.getDamge();
        }
        if (this.pressWalk === true && this.player1.isWalking === false) {
            if (
                this.checkIsWalkAble(
                    this.player1.position.x + this.playerWalkDirection.x,
                    this.player1.position.y + this.playerWalkDirection.y
                )
            ) {
                this.player1.walk(this.playerWalkDirection);
            }
        }
        this.startMapFunction();
        this.runTimeFunction();
        this.nextLevel();
        this.player1.update();
    };
    this.draw = function(ctx) {
        for (var i = 0; i < this.tileArray.length; i++) {
            this.tileArray[i].draw(ctx);
        }
        for (var i = 0; i < this.boxArray.length; i++) {
            this.boxArray[i].draw(ctx);
        }
        if (this.isPee) this.pee.draw(ctx);
        for (var i = 0; i < this.poopArray.length; i++) {
            this.poopArray[i].draw(ctx);
        }
        for (var i = 0; i < this.itemArray.length; i++) {
            this.itemArray[i].draw(ctx);
        }
        for (var i = 0; i < this.doorArray.length; i++) {
            this.doorArray[i].draw(ctx);
        }
        for (var i = 0; i < this.monster.length; i++) {
            this.monster[i].draw(ctx);
        }
        for (var i = 0; i < this.boss.length; i++) {
            this.boss[i].draw(ctx);
        }
        for (var i = 0; i < this.nextLevelGateArray.length; i++) {
            this.nextLevelGateArray[i].draw(ctx);
        }
        if (mapPositionX == startingMapXY && mapPositionY == startingMapXY)
            this.StartingMapItem.draw(ctx);
        for (var i = 0; i < this.bulletArray.length; i++) {
            this.bulletArray[i].draw(ctx);
        }
        for (var i = 0; i < this.enemyBulletArray.length; i++) {
            this.enemyBulletArray[i].draw(ctx);
        }
        for (var i = 0; i < this.bulletExploreArray.length; i++) {
            this.bulletExploreArray[i].draw(ctx);
        }
        this.playerHpBar.draw(ctx);
        if (this.gettingDamge) {} else {
            this.player1.draw(ctx);
        }
    };

    var m_map = this;
    this.startMapFunction = function() {
        this.StartingMapItem.update();
        if (mapPositionX == startingMapXY && mapPositionY == startingMapXY) {
            if (
                this.player1.position.x ==
                this.StartingMapItem.slotMachine_money_Position.x &&
                this.player1.position.y ==
                this.StartingMapItem.slotMachine_money_Position.y &&
                !this.StartingMapItem.moneyDestoryed &&
                !boughtThings &&
                this.gameState.hp > 1
            ) {
                this.gameState.hp -= 1;
                this.playerHpBar.upDateHP(this.gameState.hp);
                boughtThings = true;
                this.StartingMapItem.moneyAnimation();
                this.addNewItem(
                    4,
                    this.StartingMapItem.slotMachine_money_Position.x,
                    this.StartingMapItem.slotMachine_money_Position.y + 1
                );
                this.audio.play({
                    name: "coinslot",
                    loop: false
                });
            }
            if (
                this.player1.position.x ==
                this.StartingMapItem.slotMachine_hp_Position.x &&
                this.player1.position.y ==
                this.StartingMapItem.slotMachine_hp_Position.y &&
                !this.StartingMapItem.hpDestoryed &&
                !boughtThings &&
                this.gameState.money > 0
            ) {
                this.gameState.money -= 1;
                this.playerHpBar.upDateMoney(this.gameState.money);
                boughtThings = true;
                this.StartingMapItem.hpAnimation();
                this.addNewItem(
                    3,
                    this.StartingMapItem.slotMachine_hp_Position.x,
                    this.StartingMapItem.slotMachine_hp_Position.y + 1
                );
                this.audio.play({
                    name: "coinslot",
                    loop: false
                });
            }

        }
    };
    this.runTimeFunction = function() {
        var randomSound = Math.floor(Math.random() * 3) + 1;
        if (deadTimeCount < 40) {
            deadTimeCount++;
            if (deadTimeCount % 5 === 0) {
                this.gettingDamge = !this.gettingDamge;
                if (this.gameState.hp == 0) {
                    if (randomSound == 1) {
                        this.audio.play({
                            name: "isaacdie1",
                            loop: false
                        });
                    } else if (randomSound == 2) {
                        this.audio.play({
                            name: "isaacdie2",
                            loop: false
                        });
                    } else {
                        this.audio.play({
                            name: "isaacdie3",
                            loop: false
                        });
                    }
                    this.audio.pause("bgm");
                    Framework.Game.goToLevel("gameOver");
                }
            }
        }
        if (shootTimeCount < 17) {
            shootTimeCount++;
            if (shootTimeCount == 17) {
                this.shooting = false;
            }
        }
        if (turnFaceCount < 50) {
            turnFaceCount++;
            if (turnFaceCount == 50) {
                this.player1.turnFace(1);
            }
        }
        for (var i = 0; i < this.monster.length; i++) {
            if (this.monster[i].isShooting) {
                this.monster[i].isShootingCounter += 1;
                if (this.monster[i].isShootingCounter == 100) {
                    this.monster[i].isShooting = false;
                    this.monster[i].isShootingCounter = 0;
                }
            }
        }
    };
    this.getDamge = function() {
        if (deadTimeCount == 40) {
            deadTimeCount = 0;
            var randomSound = Math.floor(Math.random() * 3) + 1;
            if (randomSound == 1) {
                this.audio.play({
                    name: "hurt1",
                    loop: false
                });
            } else if (randomSound == 2) {
                this.audio.play({
                    name: "hurt2",
                    loop: false
                });
            } else {
                this.audio.play({
                    name: "hurt3",
                    loop: false
                });
            }
            this.gameState.hp = this.gameState.hp - 0.5;
            this.playerHpBar.upDateHP(this.gameState.hp);
        }
    };
    this.eatItem = function(i) {
        this.audio.play({
            name: "pickup",
            loop: false
        });
        if (boughtThings) boughtThings = false;
        if (this.itemArray[i].itemType == 1) {
            if (
                this.gameState.hp == this.gameState.hpLimit &&
                this.gameState.hpLimit == 5
            )
                return;
            this.gameState.hp += 1;
            this.gameState.hpLimit += 1;
        }
        if (
            this.itemArray[i].itemType == 2 ||
            this.itemArray[i].itemType == 3
        ) {
            if (this.gameState.hp == this.gameState.hpLimit) return;
            this.gameState.hp += (this.itemArray[i].itemType - 1) / 2;
        }
        if (this.itemArray[i].itemType == 4) this.gameState.money += 1;
        if (this.gameState.hpLimit > 5) this.gameState.hpLimit = 5;
        if (this.gameState.hp > this.gameState.hpLimit)
            this.gameState.hp = this.gameState.hpLimit;
        this.itemArray[i].ate = true;
        this.playerHpBar.addTotalHp(this.gameState.hpLimit);
        this.playerHpBar.upDateHP(this.gameState.hp);
        this.playerHpBar.upDateMoney(this.gameState.money);
    };

    this.getLeftMonsterNum = function() {
        var count = 0;
        for (var i = 0; i < this.monster.length; i++) {
            if (this.monster[i].isDead === false) {
                count++;
            }
        }
        for (var i = 0; i < this.boss.length; i++) {
            if (this.boss[i].isDead === false) {
                count++;
            }
        }
        return count;
    };
    this.keydown = function(e, list) {
        var playerPosition = this.player1.position;
        if (e.key === "S") {
            walkDirection[2] = true;
            this.keyPress = "S";
        }

        if (e.key === "A") {
            walkDirection[1] = true;
            this.keyPress = "A";
        }

        if (e.key === "D") {
            walkDirection[3] = true;
            this.keyPress = "D";
        }
        if (e.key === "W") {
            walkDirection[0] = true;
            this.keyPress = "W";
        }
        if (e.key === "N") {
            Framework.Game.goToNextLevel();
        }
        if (e.key === "G") {
            this.getDamge();
        }
        if (e.key === "R") {
            this.gameState.hp = this.gameState.hp + 0.5;
            this.playerHpBar.upDateHP(this.gameState.hp);
        }
        if (e.key === "B") {
            mapPositionX = bossMapPsoitionX;
            mapPositionY = bossMapPsoitionY;
            this.changeMap();
            this.init();
        }
        if (e.key === "Up") {
            if (this.shooting == false) {
                shootTimeCount = 0;
                turnFaceCount = 0;
                this.shooting = true;
                var newBullet = new Bullet(
                    define.imagePath + "bullet.png",
                    0,
                    this.player1.position
                );
                this.bulletArray.push(newBullet);
                this.player1.turnFace(0);
                this.audio.play({
                    name: "bubble",
                    loop: false
                });
            }
        }
        if (e.key === "Down") {
            if (this.shooting == false) {
                shootTimeCount = 0;
                turnFaceCount = 0;
                this.shooting = true;
                var newBullet = new Bullet(
                    define.imagePath + "bullet.png",
                    1,
                    this.player1.position
                );
                this.bulletArray.push(newBullet);
                this.player1.turnFace(1);
                this.audio.play({
                    name: "bubble",
                    loop: false
                });
            }
        }
        if (e.key === "Left") {
            if (this.shooting == false) {
                shootTimeCount = 0;
                turnFaceCount = 0;
                this.shooting = true;
                var newBullet = new Bullet(
                    define.imagePath + "bullet.png",
                    2,
                    this.player1.position
                );
                this.bulletArray.push(newBullet);
                this.player1.turnFace(2);
                this.audio.play({
                    name: "bubble",
                    loop: false
                });
            }
        }
        if (e.key === "Right") {
            if (this.shooting == false) {
                shootTimeCount = 0;
                turnFaceCount = 0;
                this.shooting = true;
                var newBullet = new Bullet(
                    define.imagePath + "bullet.png",
                    3,
                    this.player1.position
                );
                this.bulletArray.push(newBullet);
                this.player1.turnFace(3);
                this.audio.play({
                    name: "bubble",
                    loop: false
                });
            }
        }

        this.playerWalkFunction();
    };
    this.playerWalkFunction = function() {
        var playerPosition = this.player1.position;
        if (
            walkDirection[0] &&
            walkDirection[1] &&
            !walkDirection[2] &&
            !walkDirection[3]
        ) {
            if (
                this.checkIsWalkAble(playerPosition.x - 1, playerPosition.y - 1)
            ) {
                this.playerWalkDirection = {
                    x: -1,
                    y: -1
                };
                this.pressWalk = true;
            }
        } else if (!walkDirection[0] &&
            walkDirection[1] &&
            walkDirection[2] &&
            !walkDirection[3]
        ) {
            if (
                this.checkIsWalkAble(playerPosition.x - 1, playerPosition.y + 1)
            ) {
                this.playerWalkDirection = {
                    x: -1,
                    y: 1
                };
                this.pressWalk = true;
            }
        } else if (!walkDirection[0] &&
            !walkDirection[1] &&
            walkDirection[2] &&
            walkDirection[3]
        ) {
            if (
                this.checkIsWalkAble(playerPosition.x + 1, playerPosition.y + 1)
            ) {
                this.playerWalkDirection = {
                    x: 1,
                    y: 1
                };
                this.pressWalk = true;
            }
        } else if (
            walkDirection[0] &&
            !walkDirection[1] &&
            !walkDirection[2] &&
            walkDirection[3]
        ) {
            if (
                this.checkIsWalkAble(playerPosition.x + 1, playerPosition.y - 1)
            ) {
                this.playerWalkDirection = {
                    x: 1,
                    y: -1
                };
                this.pressWalk = true;
            }
        } else if (
            walkDirection[0] &&
            !walkDirection[1] &&
            !walkDirection[2] &&
            !walkDirection[3]
        ) {
            if (this.checkIsWalkAble(playerPosition.x, playerPosition.y - 1)) {
                this.playerWalkDirection = {
                    x: 0,
                    y: -1
                };
                this.pressWalk = true;
            }
        } else if (!walkDirection[0] &&
            walkDirection[1] &&
            !walkDirection[2] &&
            !walkDirection[3]
        ) {
            if (this.checkIsWalkAble(playerPosition.x - 1, playerPosition.y)) {
                this.playerWalkDirection = {
                    x: -1,
                    y: 0
                };
                this.pressWalk = true;
            }
        } else if (!walkDirection[0] &&
            !walkDirection[1] &&
            walkDirection[2] &&
            !walkDirection[3]
        ) {
            if (this.checkIsWalkAble(playerPosition.x, playerPosition.y + 1)) {
                this.playerWalkDirection = {
                    x: 0,
                    y: 1
                };
                this.pressWalk = true;
            }
        } else if (!walkDirection[0] &&
            !walkDirection[1] &&
            !walkDirection[2] &&
            walkDirection[3]
        ) {
            if (this.checkIsWalkAble(playerPosition.x + 1, playerPosition.y)) {
                this.playerWalkDirection = {
                    x: 1,
                    y: 0
                };
                this.pressWalk = true;
            }
        }
    };

    this.stopAllMonsterWalk = function() {
        for (var i = 0; i < this.monster.length; i++) {
            this.monster[i].stopWalk();
        }
    };

    this.checkIsWalkAble = function(x, y) {
        if (x < 0 || x > this.mapArray[0].length) {
            return false;
        }
        if (y < 0 || y > this.mapArray.length) {
            return false;
        }
        for (var i = 0; i < this.poopArray.length; i++) {
            if (this.poopArray[i].isdead == false) {
                if (
                    this.poopArray[i].mapPosition.y == y &&
                    this.poopArray[i].mapPosition.x == x
                ) {
                    return false;
                }
            }
        }
        if (this.mapArray[y][x] > 0) {
            return false;
        } else {
            return true;
        }
    };

    this.checkIsFlyAble = function(x, y) {
        if (x < 1 || x > this.mapArray[0].length - 2) {
            return false;
        }
        if (y < 1 || y > this.mapArray.length - 2) {
            return false;
        }
        return true;
    };

    this.keyup = function(e, list) {
        if (e.key === "W" || e.key === "A" || e.key === "S" || e.key === "D") {
            if (e.key === "W") walkDirection[0] = false;
            if (e.key === "A") walkDirection[1] = false;
            if (e.key === "S") walkDirection[2] = false;
            if (e.key === "D") walkDirection[3] = false;
            this.playerWalkFunction();
            if (!walkDirection[0] &&
                !walkDirection[1] &&
                !walkDirection[2] &&
                !walkDirection[3]
            ) {
                this.player1.walkEnd();
                this.playerWalkDirection = {
                    x: 0,
                    y: 0
                };
                this.pressWalk = false;
            }
        }
    };

    this.randomMapState = function() {
        for (var i = 0; i < this.mapTerrain.length; i++) {
            this.thisMapState[i] = [];
            for (var j = 0; j < this.mapTerrain.length; j++) {
                this.thisMapState[i][j] = [];
                //state leftGate UpGate RightGate BottomGate
                this.thisMapState[i][j].push(-1);
                this.thisMapState[i][j].push(1);
                this.thisMapState[i][j].push(1);
                this.thisMapState[i][j].push(1);
                this.thisMapState[i][j].push(1);
            }
        }
        var mapSize = this.mapTerrain.length;
        this.thisMapState[startingMapXY][startingMapXY][0] = 1;
        while (mapNumber < 9) {
            this.randomOpenMap(bossMapPsoitionX, bossMapPsoitionY, mapSize - 1);
        }
        this.mapTerrain[bossMapPsoitionX][bossMapPsoitionY] = 0;
        this.connectOpenRoom();
        this.changeMap();
        this.init();
    };

    this.randomOpenMap = function(tempX, tempY, size) {
        if (this.isLongerPath(tempX, tempY)) {
            bossMapPsoitionX = tempX;
            bossMapPsoitionY = tempY;
        }
        if (
            (tempX == bossMapPsoitionX &&
                Math.abs(tempY - bossMapPsoitionY) == 1) ||
            (tempY == bossMapPsoitionY &&
                Math.abs(tempX - bossMapPsoitionX) == 1)
        ) {
            var connectRoomCount = 0;
            if (tempX > 0) {
                if (this.thisMapState[tempX - 1][tempY][0] == 0)
                    connectRoomCount++;
            }
            if (tempX < this.mapTerrain.length - 1) {
                if (this.thisMapState[tempX + 1][tempY][0] == 0)
                    connectRoomCount++;
            }
            if (tempY > 0) {
                if (this.thisMapState[tempX][tempY - 1][0] == 0)
                    connectRoomCount++;
            }
            if (tempY < this.mapTerrain.length - 1) {
                if (this.thisMapState[tempX][tempY + 1][0] == 0)
                    connectRoomCount++;
            }
            if (connectRoomCount == 1) {
                bossMapPsoitionX = tempX;
                bossMapPsoitionY = tempY;
            }
        }
        if (mapNumber === 9) return;
        if (tempX > 0 && this.randomBool(0.7)) {
            if (this.thisMapState[tempX - 1][tempY][0] == -1) {
                mapNumber = mapNumber + 1;
                this.thisMapState[tempX - 1][tempY][0] = 0;
                this.mapUpToBottomConnect(tempX - 1, tempY, 0);
                this.randomOpenMap(tempX - 1, tempY, size);
            }
        }
        if (mapNumber === 9) return;
        if (tempX < size && this.randomBool(0.7)) {
            if (this.thisMapState[tempX + 1][tempY][0] == -1) {
                mapNumber = mapNumber + 1;
                this.thisMapState[tempX + 1][tempY][0] = 0;
                this.mapUpToBottomConnect(tempX, tempY, 0);
                this.randomOpenMap(tempX + 1, tempY, size);
            }
        }
        if (mapNumber === 9) return;
        if (tempY > 0 && this.randomBool(0.7)) {
            if (this.thisMapState[tempX][tempY - 1][0] == -1) {
                mapNumber = mapNumber + 1;
                this.thisMapState[tempX][tempY - 1][0] = 0;
                this.mapLeftToRightConnect(tempX, tempY - 1, 0);
                this.randomOpenMap(tempX, tempY - 1, size);
            }
        }
        if (mapNumber === 9) return;
        if (tempY < size && this.randomBool(0.7)) {
            if (this.thisMapState[tempX][tempY + 1][0] == -1) {
                mapNumber = mapNumber + 1;
                this.thisMapState[tempX][tempY + 1][0] = 0;
                this.mapLeftToRightConnect(tempX, tempY, 0);
                this.randomOpenMap(tempX, tempY + 1, size);
            }
        }
    };
    this.isLongerPath = function(tempX, tempY) {
        return (
            this.PathLength(tempX, tempY) >
            this.PathLength(bossMapPsoitionX, bossMapPsoitionY)
        );
    };

    this.PathLength = function(tempX, tempY) {
        return (
            Math.pow(tempX - startingMapXY, 2) +
            Math.pow(tempY - startingMapXY, 2)
        );
    };
    this.randomBool = function(p) {
        return Math.random() >= p;
    };

    this.connectOpenRoom = function() {
        for (var i = 0; i < this.mapTerrain.length; i++) {
            for (var j = 0; j < this.mapTerrain.length; j++) {
                if (this.thisMapState[i][j][0] > -1) {
                    if (i < this.mapTerrain.length - 1) {
                        if (this.thisMapState[i + 1][j][0] > -1) {
                            this.mapUpToBottomConnect(i, j, 0);
                        }
                    }
                    if (j < this.mapTerrain.length - 1) {
                        if (this.thisMapState[i][j + 1][0] > -1) {
                            this.mapLeftToRightConnect(i, j, 0);
                        }
                    }
                } else {
                    this.mapTerrain[i][j] = -1;
                }
            }
        }
        var gateCount = 0;
        for (var i = 1; i < 5; i++) {
            if (this.thisMapState[bossMapPsoitionX][bossMapPsoitionY][i] == 0)
                gateCount = gateCount + 1;
        }
        while (gateCount > 1) {
            var randomClose = Math.floor(Math.random() * 4 + 1);
            if (
                this.thisMapState[bossMapPsoitionX][bossMapPsoitionY][
                    randomClose
                ] == 0
            ) {
                if (randomClose == 1)
                    this.mapLeftToRightConnect(
                        bossMapPsoitionX,
                        bossMapPsoitionY - 1,
                        1
                    );
                if (randomClose == 2)
                    this.mapUpToBottomConnect(
                        bossMapPsoitionX - 1,
                        bossMapPsoitionY,
                        1
                    );
                if (randomClose == 3)
                    this.mapLeftToRightConnect(
                        bossMapPsoitionX,
                        bossMapPsoitionY,
                        1
                    );
                if (randomClose == 4)
                    this.mapUpToBottomConnect(
                        bossMapPsoitionX,
                        bossMapPsoitionY,
                        1
                    );
                gateCount = gateCount - 1;
                console.log("closed: " + randomClose);
            }
        }
    };

    this.mapUpToBottomConnect = function(i, j, gateType) {
        this.thisMapState[i][j][4] = gateType;
        this.thisMapState[i + 1][j][2] = gateType;
    };
    this.mapLeftToRightConnect = function(i, j, gateType) {
        this.thisMapState[i][j][3] = gateType;
        this.thisMapState[i][j + 1][1] = gateType;
    };

    this.outOfMap = function() {
        var mapXSize = 14;
        var mapYSize = 8;
        if (this.player1.position.x == 0) {
            mapPositionY--;
            this.outOfMapUpdate();
            this.setPlayerPosition({
                x: 13,
                y: 4
            });
            this.pee.position = {
                x: 13 * 64,
                y: 4 * 64
            };
        }
        if (this.player1.position.x == mapXSize) {
            mapPositionY++;
            this.outOfMapUpdate();
            this.setPlayerPosition({
                x: 1,
                y: 4
            });
            this.pee.position = {
                x: 1 * 64,
                y: 4 * 64
            };
        }
        if (this.player1.position.y == 0) {
            mapPositionX--;
            this.outOfMapUpdate();
            this.setPlayerPosition({
                x: 7,
                y: 7
            });
            this.pee.position = {
                x: 7 * 64,
                y: 7 * 64
            };
        }
        if (this.player1.position.y == mapYSize) {
            mapPositionX++;
            this.outOfMapUpdate();
            this.setPlayerPosition({
                x: 7,
                y: 1
            });
            this.pee.position = {
                x: 7 * 64,
                y: 1 * 64
            };
        }
    };
    this.outOfMapUpdate = function() {
        this.updatePoopState();
        this.updateItemState();
        this.changeMap();
        this.init();
        if (this.gameState.hp <= 0.5) this.isPee = true;
        else this.isPee = false;
    };
    this.bulletHit = function() {
        for (var i = 0; i < this.bulletArray.length; i++) {
            if (!this.bulletArray[i].bulletEnd) {
                if (
                    this.bulletArray[i].spritePosition.x < 0.5 ||
                    this.bulletArray[i].spritePosition.x > 13.5 ||
                    this.bulletArray[i].spritePosition.y < 0.5 ||
                    this.bulletArray[i].spritePosition.y > 7.5
                ) {
                    this.bulletArray[i].bulletEnd = true;
                }
                this.bulletHitDeadArray(i, this.boxArray);

                for (var j = 0; j < this.poopArray.length; j++) {
                    if (this.poopArray[j].isdead === false && !this.bulletArray[i].bulletEnd) {
                        if (
                            Math.abs(
                                this.bulletArray[i].spritePosition.x -
                                this.poopArray[j].mapPosition.x
                            ) < 0.5 &&
                            Math.abs(
                                this.bulletArray[i].spritePosition.y -
                                this.poopArray[j].mapPosition.y
                            ) < 0.5
                        ) {
                            this.poopArray[j].getHit();
                            if (this.poopArray[j].isdead) {
                                this.audio.play({
                                    name: "plop",
                                    loop: false
                                });
                                if (this.randomBool(0.5))
                                    this.addNewItem(
                                        0,
                                        this.poopArray[j].position.x,
                                        this.poopArray[j].position.y
                                    );
                            }
                            this.bulletArray[i].bulletEnd = true;
                        }
                    }
                }

                for (var j = 0; j < this.monster.length; j++) {
                    if (this.monster[j].isdead === false && !this.bulletArray[i].bulletEnd) {
                        if (
                            Math.abs(
                                this.bulletArray[i].spritePosition.x -
                                this.monster[j].mapPosition.x
                            ) < 0.5 &&
                            Math.abs(
                                this.bulletArray[i].spritePosition.y -
                                this.monster[j].mapPosition.y
                            ) < 0.5
                        ) {
                            this.monster[j].getHit();
                            if (this.monster[j].isdead) {
                                if (this.randomBool(0.5))
                                    this.addNewItem(
                                        0,
                                        this.monster[j].position.x,
                                        this.monster[j].position.y
                                    );
                            }
                            this.bulletArray[i].bulletEnd = true;
                            break;
                        }
                    }
                }
                for (var j = 0; j < this.boss.length; j++) {
                    if (this.boss[j].isdead === false && !this.bulletArray[i].bulletEnd) {
                        if (
                            Math.abs(
                                this.bulletArray[i].spritePosition.x -
                                this.boss[j].mapPosition.x
                            ) < 1 &&
                            Math.abs(
                                this.bulletArray[i].spritePosition.y -
                                this.boss[j].mapPosition.y
                            ) < 1
                        ) {
                            this.boss[j].getHit();
                            this.bulletArray[i].bulletEnd = true;
                        }
                    }
                }
                if (
                    this.StartingMapItem.moneyDestoryed == false &&
                    mapPositionX == startingMapXY &&
                    mapPositionY == startingMapXY && !this.bulletArray[i].bulletEnd
                ) {
                    if (
                        Math.abs(
                            this.bulletArray[i].spritePosition.x -
                            this.StartingMapItem.slotMachine_money_Position
                            .x
                        ) < 0.5 &&
                        Math.abs(
                            this.bulletArray[i].spritePosition.y -
                            this.StartingMapItem.slotMachine_money_Position
                            .y
                        ) < 0.5
                    ) {
                        this.StartingMapItem.moneySoltHP -= 1;
                        this.bulletArray[i].bulletEnd = true;
                    }
                }
                if (
                    this.StartingMapItem.hpDestoryed == false &&
                    mapPositionX == startingMapXY &&
                    mapPositionY == startingMapXY && !this.bulletArray[i].bulletEnd
                ) {
                    if (
                        Math.abs(
                            this.bulletArray[i].spritePosition.x -
                            this.StartingMapItem.slotMachine_hp_Position.x
                        ) < 0.5 &&
                        Math.abs(
                            this.bulletArray[i].spritePosition.y -
                            this.StartingMapItem.slotMachine_hp_Position.y
                        ) < 0.5
                    ) {
                        this.StartingMapItem.hpSoltHP -= 1;
                        this.bulletArray[i].bulletEnd = true;
                    }
                }
                if (this.bulletArray[i].bulletEnd) {
                    var newBulletExplore = new BulletExplore(
                        define.imagePath + "teareffect.png", {
                            down: {
                                from: 0,
                                to: 13
                            }
                        }
                    );
                    newBulletExplore.position = {
                        x: this.bulletArray[i].spritePosition.x,
                        y: this.bulletArray[i].spritePosition.y
                    };
                    this.bulletExploreArray.push(newBulletExplore);
                }
            }
        }
    };
    this.bulletHitDeadArray = function(i, tempArray) {
        for (var j = 0; j < tempArray.length; j++) {
            if (
                Math.abs(
                    this.bulletArray[i].spritePosition.x -
                    tempArray[j].mapPosition.x
                ) < 0.5 &&
                Math.abs(
                    this.bulletArray[i].spritePosition.y -
                    tempArray[j].mapPosition.y
                ) < 0.5
            ) {
                this.bulletArray[i].bulletEnd = true;
            }
        }
    };
    this.updatePoopState = function() {
        this.mapPoopStateArray[this.stateMapPosition][2] = [];
        for (var i = 0; i < this.poopArray.length; i++) {
            this.mapPoopStateArray[this.stateMapPosition][2].push(
                this.poopArray[i].HP
            );
        }
    };
    this.updateItemState = function() {
        this.mapItemStateArray[this.stateMapPosition][2] = [];
        for (var i = 0; i < this.itemArray.length; i++) {
            if (this.itemArray[i].ate == false) {
                this.mapItemStateArray[this.stateMapPosition][2].push(
                    this.itemArray[i]
                );
            }
        }
    };
    this.changeMap = function() {
        console.log(mapPositionX, mapPositionY);
        this.mapArray = this.mapList.terrainList[
            this.mapTerrain[mapPositionX][mapPositionY]
        ];
        this.mapArray[4][0] = this.thisMapState[mapPositionX][mapPositionY][1];
        this.mapArray[0][7] = this.thisMapState[mapPositionX][mapPositionY][2];
        this.mapArray[4][14] = this.thisMapState[mapPositionX][mapPositionY][3];
        this.mapArray[8][7] = this.thisMapState[mapPositionX][mapPositionY][4];
        if (this.thisMapState[mapPositionX][mapPositionY][0] === 0) {
            if (this.thisMapState[mapPositionX][mapPositionY][1] === 0)
                this.mapArray[4][0] = 3;
            if (this.thisMapState[mapPositionX][mapPositionY][2] === 0)
                this.mapArray[0][7] = 3;
            if (this.thisMapState[mapPositionX][mapPositionY][3] === 0)
                this.mapArray[4][14] = 3;
            if (this.thisMapState[mapPositionX][mapPositionY][4] === 0)
                this.mapArray[8][7] = 3;
            this.monster = [];
            this.createMonster();
            this.thisMapState[mapPositionX][mapPositionY][0] = 1;
        }
    };
    this.createMonster = function() {
        if (
            mapPositionX == bossMapPsoitionX &&
            mapPositionY == bossMapPsoitionY
        ) {
            this.addBoss({
                x: 5,
                y: 4
            });
        } else {
            this.addMonster(1, {
                x: 2,
                y: 2
            });
            this.addMonster(2, {
                x: 1,
                y: 1
            });
            this.addMonster(3, {
                x: 4,
                y: 4
            });
        }
    };
    this.monsterClean = function() {
        if (
            this.thisMapState[mapPositionX][mapPositionY][0] === 1 &&
            this.getLeftMonsterNum() === 0
        ) {
            for (var i = 0; i < this.doorArray.length; i++) {
                this.mapArray[4][0] = this.thisMapState[mapPositionX][
                    mapPositionY
                ][1];
                this.mapArray[0][7] = this.thisMapState[mapPositionX][
                    mapPositionY
                ][2];
                this.mapArray[4][14] = this.thisMapState[mapPositionX][
                    mapPositionY
                ][3];
                this.mapArray[8][7] = this.thisMapState[mapPositionX][
                    mapPositionY
                ][4];
                this.doorArray[i].mapClean();
            }
            this.thisMapState[mapPositionX][mapPositionY][0] = 2;
        }
        if (this.thisMapState[mapPositionX][mapPositionY][0] === 2) {
            if (
                mapPositionX == bossMapPsoitionX &&
                mapPositionY == bossMapPsoitionY &&
                this.nextLevelGateArray.length == 0
            ) {
                var nextLevelGate = new NextLevelGate();
                nextLevelGate.position = {
                    x: 6,
                    y: 4
                };
                this.nextLevelGateArray.push(nextLevelGate);
            }
        }
    };
    this.nextLevel = function() {
        if (
            mapPositionX == bossMapPsoitionX &&
            mapPositionY == bossMapPsoitionY
        ) {
            if (this.thisMapState[mapPositionX][mapPositionY][0] == 2) {
                if (
                    this.player1.position.x == 7 &&
                    this.player1.position.y == 4
                ) {
                    Framework.Game.goToNextLevel();
                }
            }
        }
    };
    this.addNewItem = function(item, tempX, tempY) {
        var newItem = new MapItem(item);
        newItem.position = {
            x: tempX,
            y: tempY
        };
        this.itemArray.push(newItem);
    };
};