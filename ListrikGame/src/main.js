let gameConfig = {
    type: Phaser.AUTO,
    width: 1400,
    height:  800,
    backgroundColor: 'rgba(255,255,255,0)',
    parent: 'game',
    pixelArt: true,
    physics: {

        default: 'arcade',
        arcade: {
            gravity: { y: 986},
            fps : 120
        }
    },
    scene: [Tableau1,UI]
};
let game = new Phaser.Game(gameConfig);
window.Battery = 0;