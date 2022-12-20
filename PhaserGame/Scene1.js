class Scene1 extends Phaser.Scene {
    constructor() {
      super("Load");
    }
  
    preload(){
      //images
      this.load.image("space", "assets/images/space2.png");     //identifier, path. Loads image into memory
      this.load.image("hero", "assets/images/TIE.png"); 
      this.load.image("missile", "assets/images/missile.png");
      this.load.image("alien", "assets/images/alien.png");
      this.load.image("monster", "assets/images/monster.png");
      this.load.image("meteorite", "assets/images/meteorite.png");
      this.load.image("meteorite2", "assets/images/meteorite2.png");
      //audios
      this.load.audio("explosionTune", "assets/sounds/explosionSound.mp3");
      this.load.audio("missileTune", "assets/sounds/missileLaunch.mp3");
      this.load.audio("mainTune", "assets/sounds/spaceGameSound.mp3");
      //sprites
      this.load.spritesheet("ship", "assets/spritesheets/ship.png",{
        frameWidth: 16,
        frameHeight: 16                                                  //pixel frame size
      });
      this.load.spritesheet("ship2", "assets/spritesheets/ship2.png",{
        frameWidth: 32,
        frameHeight: 16
      });
      this.load.spritesheet("ship3", "assets/spritesheets/ship3.png",{
        frameWidth: 32,
        frameHeight: 32
      });
      this.load.spritesheet("explosion", "assets/spritesheets/explosion.png",{
        frameWidth: 16,
        frameHeight: 16
      });
    }
  
    create() {                              
      this.scene.start("Play");  
      //this.time.delayedCall(20000, this.scene.start("Play"), null, this);
    }
  }