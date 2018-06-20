var loadGameEnd;
(function() {
    var importJS = function(jsConf, src, lookFor) {
        var headID = document.getElementsByTagName("head")[0];
        var newJs = document.createElement('script');
        newJs.type = 'text/javascript';
        newJs.src = jsConf[0].src;
        headID.appendChild(newJs);
        wait_for_script_load(jsConf, function() {
            jsConf.splice(0, 1);
            if (jsConf.length > 0) {
                importJS(jsConf, lookFor);

                if (typeof blanket != "undefined") {
                    blanket.utils.cache[jsConf[0].src] = {};
                    blanket.utils.attachScript({
                        url: jsConf[0].src
                    }, function(content) {
                        blanket.instrument({
                            inputFile: content,
                            inputFileName: jsConf[0].src
                        }, function(instrumented) {
                            blanket.utils.cache[jsConf[0].src].loaded = true;
                            blanket.utils.blanketEval(instrumented);
                            blanket.requiringFile(jsConf[0].src, true);
                        });
                    });
                }
            } else {
                loadGameEnd = true;
            }
        });
    }

    var wait_for_script_load = function(jsConf, callback) {
        var interval = setInterval(function() {
            if (typeof jsConf[0].lookFor === 'undefined') {
                jsConf[0].lookFor = '';
            }

            if (jsConf[0].lookFor === '') {
                clearInterval(interval);
                callback();
            } else if (eval("typeof " + jsConf[0].lookFor) !== 'undefined') {
                clearInterval(interval);
                callback();
            }
        }, 50);
    }
    var listScript = [{
            src: 'game_sample/js/define.js',
            lookFor: 'define'
        },
        {
            src: 'game_sample/js/myMenu.js',
            lookFor: 'MyMenu'
        },
        {
            src: 'game_sample/js/constants.js',
            lookFor: 'Constants'
        },
        {
            src: 'game_sample/js/isaacHead.js',
            lookFor: 'IsaacHead'
        },
        {
            src: 'game_sample/js/isaac.js',
            lookFor: 'Isaac'
        },
        {
            src: 'game_sample/js/monster.js',
            lookFor: 'Monster'
        },
        {
            src: 'game_sample/js/boss.js',
            lookFor: 'Boss'
        },
        {
            src: 'game_sample/js/worm.js',
            lookFor: 'Worm'
        },
        {
            src: 'game_sample/js/fly.js',
            lookFor: 'Fly'
        },
        {
            src: 'game_sample/js/flyDie.js',
            lookFor: 'FlyDie'
        },
        {
            src: 'game_sample/js/shylyMonster.js',
            lookFor: 'ShylyMonster'
        },
        {
            src: 'game_sample/js/smallFly.js',
            lookFor: 'SmallFly'
        },
        {
            src: 'game_sample/js/fliesBoss.js',
            lookFor: 'FliesBoss'
        },
        {
            src: 'game_sample/js/wormBoss.js',
            lookFor: 'WormBoss'
        },
        {
            src: 'game_sample/js/horseman.js',
            lookFor: 'Horseman'
        },
        {
            src: 'game_sample/js/mapItem.js',
            lookFor: 'MapItem'
        },
        {
            src: 'game_sample/js/box.js',
            lookFor: 'Box'
        },
        {
            src: 'game_sample/js/poop.js',
            lookFor: 'Poop'
        },
        {
            src: 'game_sample/js/door.js',
            lookFor: 'Door'
        },
        {
            src: 'game_sample/js/nextLevelGate.js',
            lookFor: 'NextLevelGate'
        },
        {
            src: 'game_sample/js/stone.js',
            lookFor: 'Stone'
        },
        {
            src: 'game_sample/js/bullet.js',
            lookFor: 'Bullet'
        },
        {
            src: 'game_sample/js/laser.js',
            lookFor: 'Laser'
        },
        {
            src: 'game_sample/js/enemyBullet.js',
            lookFor: 'EnemyBullet'
        },
        {
            src: 'game_sample/js/bulletExplore.js',
            lookFor: 'BulletExplore'
        },
        {
            src: 'game_sample/js/laserExplore.js',
            lookFor: 'LaserExplore'
        },
        {
            src: 'game_sample/js/terrain.js',
            lookFor: 'Terrain'
        },
        {
            src: 'game_sample/js/slotMachine.js',
            lookFor: 'SlotMachine'
        },
        {
            src: 'game_sample/js/startingMapItem.js',
            lookFor: 'StartingMapItem'
        },
        {
            src: 'game_sample/js/mapTile.js',
            lookFor: 'MapTile'
        },
        {
            src: 'game_sample/js/playerHpBar.js',
            lookFor: 'PlayerHpBar'
        },
        {
            src: 'game_sample/js/randomMonster.js',
            lookFor: 'RandomMonster'
        },
        {
            src: 'game_sample/js/map.js',
            lookFor: 'Map'
        },
        {
            src: 'game_sample/js/gameLevel.js',
            lookFor: 'GameLevel'
        },
        {
            src: 'game_sample/js/gameOver.js',
            lookFor: 'GameOver'
        },
        {
            src: 'game_sample/js/gameWin.js',
            lookFor: 'GameWin'
        },
        {
            src: 'game_sample/js/mainGame.js'
        }
    ]
    importJS(listScript);

})();