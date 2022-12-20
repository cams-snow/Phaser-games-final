var settings = {
  heroSpeed: 300, //sets the speed of our hero
}

var config = {
    width: 1400,                  // canvas size
    height: 680,
    backgroundColor: 0x000000,
    scene: [Scene1, Scene2],
    pixelArt: true,
    physics: {                    //defines physics for later use in things like boundaries 
      default: "arcade",
      arcade: {
        debug: false
      }
    }
  }
  
  var game = new Phaser.Game(config);