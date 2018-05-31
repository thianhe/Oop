var RandomMonster = function(map) {
    this.map = map; // 1 worm 2 bigFly 3 smallFly 4 shyly monster
    this.createMonster = function(mapNumber) {
        var randomCreate = Math.floor(Math.random() * 3);
        if (mapNumber == 0) {
            if (randomCreate == 0) {
                this.map.addMonster(1, {
                    x: 7,
                    y: 4
                });
                this.map.addMonster(3, {
                    x: 6,
                    y: 4
                });
                this.map.addMonster(3, {
                    x: 8,
                    y: 4
                });
            } else if (randomCreate == 1) {
                this.map.addMonster(1, {
                    x: 2,
                    y: 2
                });
                this.map.addMonster(1, {
                    x: 2,
                    y: 6
                });
                this.map.addMonster(1, {
                    x: 12,
                    y: 2
                });
                this.map.addMonster(1, {
                    x: 12,
                    y: 6
                });
            } else if (randomCreate == 2) {
                this.map.addMonster(1, {
                    x: 6,
                    y: 3
                });
                this.map.addMonster(1, {
                    x: 8,
                    y: 5
                });
                this.map.addMonster(3, {
                    x: 6,
                    y: 5
                });
                this.map.addMonster(3, {
                    x: 8,
                    y: 3
                });
            }
        } else if (mapNumber == 1) {
            if (randomCreate == 0) {
                this.map.addMonster(4, {
                    x: 6,
                    y: 4
                });
                this.map.addMonster(4, {
                    x: 8,
                    y: 4
                });
                this.map.addMonster(3, {
                    x: 6,
                    y: 3
                });
                this.map.addMonster(3, {
                    x: 6,
                    y: 5
                });
                this.map.addMonster(3, {
                    x: 8,
                    y: 3
                });
                this.map.addMonster(3, {
                    x: 8,
                    y: 5
                });
            } else if (randomCreate == 1) {
                this.map.addMonster(1, {
                    x: 3,
                    y: 3
                });
                this.map.addMonster(1, {
                    x: 11,
                    y: 3
                });
                this.map.addMonster(1, {
                    x: 12,
                    y: 2
                });
                this.map.addMonster(1, {
                    x: 12,
                    y: 6
                });
            } else if (randomCreate == 2) {
                this.map.addMonster(1, {
                    x: 2,
                    y: 2
                });
                this.map.addMonster(1, {
                    x: 11,
                    y: 5
                });

            }
        } else if (mapNumber == 2) {
            if (randomCreate == 0) {
                this.map.addMonster(1, {
                    x: 1,
                    y: 1
                });
                this.map.addMonster(1, {
                    x: 1,
                    y: 7
                });
                this.map.addMonster(1, {
                    x: 13,
                    y: 1
                });
                this.map.addMonster(1, {
                    x: 13,
                    y: 7
                });
            } else if (randomCreate == 1) {
                this.map.addMonster(4, {
                    x: 5,
                    y: 5
                });
                this.map.addMonster(2, {
                    x: 10,
                    y: 3
                });
                this.map.addMonster(3, {
                    x: 9,
                    y: 3
                });
                this.map.addMonster(3, {
                    x: 11,
                    y: 3
                });
            } else if (randomCreate == 2) {
                this.map.addMonster(2, {
                    x: 5,
                    y: 3
                });
                this.map.addMonster(2, {
                    x: 9,
                    y: 5
                });
                this.map.addMonster(3, {
                    x: 5,
                    y: 5
                });
                this.map.addMonster(3, {
                    x: 10,
                    y: 3
                });
            }
        } else if (mapNumber == 3) {
            if (randomCreate == 0) {
                this.map.addMonster(1, {
                    x: 2,
                    y: 1
                });
                this.map.addMonster(1, {
                    x: 2,
                    y: 7
                });
                this.map.addMonster(1, {
                    x: 12,
                    y: 2
                });
                this.map.addMonster(1, {
                    x: 12,
                    y: 6
                });
            } else if (randomCreate == 1) {
                this.map.addMonster(1, {
                    x: 2,
                    y: 7
                });
                this.map.addMonster(1, {
                    x: 12,
                    y: 2
                });
                this.map.addMonster(4, {
                    x: 8,
                    y: 4
                });

            } else if (randomCreate == 2) {
                this.map.addMonster(2, {
                    x: 6,
                    y: 4
                });
                this.map.addMonster(3, {
                    x: 2,
                    y: 1
                });
                this.map.addMonster(3, {
                    x: 12,
                    y: 6
                });

            }
        } else if (mapNumber == 4) {
            if (randomCreate == 0) {
                this.map.addMonster(4, {
                    x: 6,
                    y: 4
                });
                this.map.addMonster(3, {
                    x: 8,
                    y: 7
                });

            } else if (randomCreate == 1) {
                this.map.addMonster(1, {
                    x: 7,
                    y: 4
                });
                this.map.addMonster(2, {
                    x: 6,
                    y: 4
                });
                this.map.addMonster(2, {
                    x: 8,
                    y: 4
                });

            } else if (randomCreate == 2) {
                this.map.addMonster(3, {
                    x: 6,
                    y: 4
                });
                this.map.addMonster(3, {
                    x: 7,
                    y: 3
                });
                this.map.addMonster(3, {
                    x: 8,
                    y: 4
                });
            }
        } else if (mapNumber == 5) {
            if (randomCreate == 0) {
                this.map.addMonster(3, {
                    x: 6,
                    y: 3
                });
                this.map.addMonster(3, {
                    x: 6,
                    y: 4
                });
                this.map.addMonster(3, {
                    x: 8,
                    y: 3
                });
                this.map.addMonster(3, {
                    x: 8,
                    y: 4
                });

            } else if (randomCreate == 1) {
                this.map.addMonster(2, {
                    x: 2,
                    y: 2
                });
                this.map.addMonster(3, {
                    x: 2,
                    y: 6
                });
                this.map.addMonster(2, {
                    x: 13,
                    y: 2
                });
                this.map.addMonster(3, {
                    x: 12,
                    y: 7
                });

            } else if (randomCreate == 2) {
                this.map.addMonster(2, {
                    x: 6,
                    y: 4
                });
                this.map.addMonster(3, {
                    x: 8,
                    y: 3
                });
            }
        } else if (mapNumber == 6) {
            if (randomCreate == 0) {
                this.map.addMonster(4, {
                    x: 7,
                    y: 4
                });
                this.map.addMonster(2, {
                    x: 7,
                    y: 3
                });
                this.map.addMonster(2, {
                    x: 7,
                    y: 5
                });

            } else if (randomCreate == 1) {
                this.map.addMonster(4, {
                    x: 7,
                    y: 4
                });
                this.map.addMonster(3, {
                    x: 7,
                    y: 3
                });
                this.map.addMonster(3, {
                    x: 8,
                    y: 4
                });
                this.map.addMonster(3, {
                    x: 7,
                    y: 5
                });

            } else if (randomCreate == 2) {
                this.map.addMonster(1, {
                    x: 7,
                    y: 4
                });
                this.map.addMonster(3, {
                    x: 5,
                    y: 3
                });
                this.map.addMonster(3, {
                    x: 5,
                    y: 5
                });
            }
        } else if (mapNumber == 7) {
            if (randomCreate == 0) {
                this.map.addMonster(4, {
                    x: 4,
                    y: 4
                });
                this.map.addMonster(2, {
                    x: 10,
                    y: 4
                });

            } else if (randomCreate == 1) {
                this.map.addMonster(2, {
                    x: 3,
                    y: 4
                });
                this.map.addMonster(2, {
                    x: 11,
                    y: 3
                });
            } else if (randomCreate == 2) {
                this.map.addMonster(1, {
                    x: 7,
                    y: 3
                });
                this.map.addMonster(1, {
                    x: 7,
                    y: 5
                });
            }
        } else if (mapNumber == 8) {
            if (randomCreate == 0) {
                this.map.addMonster(4, {
                    x: 7,
                    y: 5
                });
                this.map.addMonster(4, {
                    x: 8,
                    y: 2
                });

            } else if (randomCreate == 1) {
                this.map.addMonster(2, {
                    x: 7,
                    y: 5
                });
                this.map.addMonster(2, {
                    x: 8,
                    y: 3
                });
                this.map.addMonster(3, {
                    x: 6,
                    y: 5
                });
                this.map.addMonster(3, {
                    x: 9,
                    y: 3
                });
            } else if (randomCreate == 2) {
                this.map.addMonster(4, {
                    x: 4,
                    y: 4
                });
                this.map.addMonster(1, {
                    x: 7,
                    y: 5
                });
            }
        } else if (mapNumber == 9) {
            if (randomCreate == 0) {
                this.map.addMonster(4, {
                    x: 7,
                    y: 4
                });
                this.map.addMonster(2, {
                    x: 6,
                    y: 5
                });
                this.map.addMonster(3, {
                    x: 8,
                    y: 3
                });

            } else if (randomCreate == 1) {
                this.map.addMonster(3, {
                    x: 7,
                    y: 3
                });
                this.map.addMonster(3, {
                    x: 7,
                    y: 5
                });
                this.map.addMonster(1, {
                    x: 7,
                    y: 4
                });

            } else if (randomCreate == 2) {
                this.map.addMonster(4, {
                    x: 8,
                    y: 4
                });
                this.map.addMonster(3, {
                    x: 9,
                    y: 4
                });
                this.map.addMonster(2, {
                    x: 5,
                    y: 3
                });
            }
        } else if (mapNumber == 10) {
            if (randomCreate == 0) {
                this.map.addMonster(1, {
                    x: 3,
                    y: 4
                });
                this.map.addMonster(1, {
                    x: 11,
                    y: 1
                });
                this.map.addMonster(3, {
                    x: 8,
                    y: 3
                });
                this.map.addMonster(3, {
                    x: 4,
                    y: 4
                });

            } else if (randomCreate == 1) {
                this.map.addMonster(4, {
                    x: 4,
                    y: 3
                });
                this.map.addMonster(4, {
                    x: 10,
                    y: 5
                });
            } else if (randomCreate == 2) {
                this.map.addMonster(3, {
                    x: 4,
                    y: 3
                });
                this.map.addMonster(3, {
                    x: 4,
                    y: 5
                });
                this.map.addMonster(3, {
                    x: 10,
                    y: 3
                });
                this.map.addMonster(3, {
                    x: 10,
                    y: 5
                });
            }
        } else if (mapNumber == 11) {
            if (randomCreate == 0) {
                this.map.addMonster(4, {
                    x: 7,
                    y: 3
                });
                this.map.addMonster(4, {
                    x: 7,
                    y: 5
                });
                this.map.addMonster(2, {
                    x: 3,
                    y: 3
                });

            } else if (randomCreate == 1) {
                this.map.addMonster(2, {
                    x: 6,
                    y: 5
                });
                this.map.addMonster(2, {
                    x: 8,
                    y: 3
                });
                this.map.addMonster(3, {
                    x: 7,
                    y: 4
                });

            } else if (randomCreate == 2) {
                this.map.addMonster(3, {
                    x: 6,
                    y: 3
                });
                this.map.addMonster(3, {
                    x: 7,
                    y: 3
                });
                this.map.addMonster(3, {
                    x: 8,
                    y: 3
                });
                this.map.addMonster(3, {
                    x: 6,
                    y: 4
                });
                this.map.addMonster(3, {
                    x: 8,
                    y: 4
                });
                this.map.addMonster(3, {
                    x: 6,
                    y: 5
                });
                this.map.addMonster(3, {
                    x: 7,
                    y: 5
                });
                this.map.addMonster(3, {
                    x: 8,
                    y: 5
                });
            }
        } else if (mapNumber == 12) {
            if (randomCreate == 0) {
                this.map.addMonster(2, {
                    x: 6,
                    y: 4
                });
                this.map.addMonster(2, {
                    x: 7,
                    y: 4
                });
                this.map.addMonster(2, {
                    x: 8,
                    y: 4
                });

            } else if (randomCreate == 1) {
                this.map.addMonster(4, {
                    x: 7,
                    y: 3
                });
                this.map.addMonster(1, {
                    x: 7,
                    y: 4
                });
                this.map.addMonster(4, {
                    x: 7,
                    y: 5
                });

            } else if (randomCreate == 2) {
                this.map.addMonster(1, {
                    x: 4,
                    y: 4
                });
                this.map.addMonster(1, {
                    x: 10,
                    y: 4
                });
                this.map.addMonster(3, {
                    x: 5,
                    y: 4
                });
                this.map.addMonster(3, {
                    x: 11,
                    y: 4
                });
            }
        } else if (mapNumber == 13) {
            if (randomCreate == 0) {
                this.map.addMonster(3, {
                    x: 3,
                    y: 2
                });
                this.map.addMonster(3, {
                    x: 3,
                    y: 3
                });
                this.map.addMonster(3, {
                    x: 12,
                    y: 5
                });
                this.map.addMonster(3, {
                    x: 11,
                    y: 6
                });

            } else if (randomCreate == 1) {
                this.map.addMonster(4, {
                    x: 7,
                    y: 4
                });
                this.map.addMonster(1, {
                    x: 3,
                    y: 6
                });
                this.map.addMonster(1, {
                    x: 11,
                    y: 2
                });

            } else if (randomCreate == 2) {
                this.map.addMonster(2, {
                    x: 7,
                    y: 4
                });
                this.map.addMonster(2, {
                    x: 8,
                    y: 7
                });
            }
        } else if (mapNumber == 14) {
            if (randomCreate == 0) {
                this.map.addMonster(4, {
                    x: 7,
                    y: 4
                });
                this.map.addMonster(1, {
                    x: 10,
                    y: 4
                });
            } else if (randomCreate == 1) {
                this.map.addMonster(2, {
                    x: 6,
                    y: 3
                });
                this.map.addMonster(2, {
                    x: 6,
                    y: 5
                });
                this.map.addMonster(3, {
                    x: 8,
                    y: 3
                });
                this.map.addMonster(3, {
                    x: 8,
                    y: 5
                });

            } else if (randomCreate == 2) {
                this.map.addMonster(2, {
                    x: 7,
                    y: 4
                });
                this.map.addMonster(1, {
                    x: 11,
                    y: 2
                });
                this.map.addMonster(3, {
                    x: 5,
                    y: 4
                });
            }
        } else if (mapNumber == 15) {
            if (randomCreate == 0) {

            } else if (randomCreate == 1) {
                this.map.addMonster(4, {
                    x: 3,
                    y: 6
                });
                this.map.addMonster(2, {
                    x: 6,
                    y: 5
                });
            } else if (randomCreate == 2) {
                this.map.addMonster(2, {
                    x: 5,
                    y: 3
                });
                this.map.addMonster(1, {
                    x: 9,
                    y: 4
                });
            }
        } else if (mapNumber == 16) {
            if (randomCreate == 0) {
                this.map.addMonster(1, {
                    x: 7,
                    y: 3
                });
                this.map.addMonster(1, {
                    x: 7,
                    y: 5
                });
                this.map.addMonster(3, {
                    x: 7,
                    y: 4
                });
            } else if (randomCreate == 1) {
                this.map.addMonster(4, {
                    x: 7,
                    y: 4
                });
                this.map.addMonster(3, {
                    x: 7,
                    y: 6
                });
                this.map.addMonster(3, {
                    x: 7,
                    y: 8
                });
                this.map.addMonster(3, {
                    x: 6,
                    y: 4
                });
                this.map.addMonster(3, {
                    x: 8,
                    y: 4
                });

            } else if (randomCreate == 2) {
                this.map.addMonster(2, {
                    x: 2,
                    y: 6
                });
                this.map.addMonster(2, {
                    x: 12,
                    y: 2
                });
                this.map.addMonster(1, {
                    x: 5,
                    y: 4
                });
            }
        }
    }
}