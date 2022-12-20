class Scene2 extends Phaser.Scene {
  constructor() {
    super("Play");
  }
  //create assets/characters
  create() {

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "space"); //moves the texture of the image: start position, width & height of sprite, identifier
    this.background.setOrigin(0, 0);   //image origin: top left corner.

    //adds assets and locations to screen
    this.respawn();
    //Create animations
    this.anims.create({
      key: "ship1_anim",  //"ID for animation, any name is good"
      frames: this.anims.generateFrameNumbers("ship"),  // "array of frames from sprite sheet, identifier must match"
      frameRate: 20,
      repeat: -1          //loop or not. -1 = infinite
    });
    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),   //can specify { start: and end: } to create more from one sprite
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true   //image will disapear after animation
    });

    //Play an animation on the given Game Objects that have an Animation Component.
    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    //makes objects clickable so they can explode
    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    this.score = 0;
    this.scoreText = this.add.text(20, 20, 'Score: 0', {fontSize: '32px Verdana', fill: 'green'}); //coordinates and default text, asthetics
    this.gameOverText = this.add.text(config.width / 2, config.height / 2, 'GAME OVER', {fontSize: '64px Verdana', fill: 'red'});
    this.gameOverText.setOrigin(0.5); //0.5 is for middle of the canvas, or you can set x and y value
    this.gameOverText.visible = false; // hides game over text while is false
  }

  update() {
    //npc, speed of movement
    this.moveEnemy(this.alien, 3);
    this.moveEnemy(this.monster, 4);
    this.moveEnemy(this.ship1, 5);
    this.moveEnemy(this.ship2, 7);
    this.moveEnemy(this.meteorite2, 8);
    this.moveEnemy(this.ship3, 8);
    this.moveEnemy(this.meteorite, 9);
    this.meteorite2.angle += 4;         //makes meteorite spin = change angle
    this.meteorite.angle += 3;
    // rate of movement of the sprite background
    this.background.tilePositionY -= 0.5;
    this.keysMovement();
    if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
      this.shoot();
    }
  }

  shoot() {
    var projectile = this.physics.add.image(this.hero.x, this.hero.y, "missile");
    this.missileTune.play();                                                      //plays missile sound when shooting
    this.allMissiles.add(projectile);                                             //adds each missile to group
    projectile.setVelocityY(-400);
    for(var i = 0; i < this.allMissiles.getChildren().length; i++) {
      var aMissile = this.allMissiles.getChildren()[i];
      if (aMissile.y < 0) {
        aMissile.destroy();   // eliminates missile when passing screen for better performance
      }
    }
  }

  keysMovement() {
    if (this.keys.left.isDown) {
      this.hero.setVelocityX(-settings.heroSpeed);
    } else if (this.keys.right.isDown) {
      this.hero.setVelocityX(settings.heroSpeed); //can put numerical value instead of settings
    } else if (this.keys.up.isDown) {
      this.hero.setVelocityY(-settings.heroSpeed);
    } else if (this.keys.down.isDown) {
      this.hero.setVelocityY(settings.heroSpeed);
    } else {
      this.hero.setVelocityX(0);   //needed so ship stops moving when key is up
      this.hero.setVelocityY(0);
    }
  }

  moveEnemy(enemy, speed) {
    enemy.y += speed;
    if (enemy.y > config.height) {  //if npc passes y boundaries reset it back to beginning
      this.resetEnemyPosition(enemy);
    }
  }

  resetEnemyPosition(enemy) {
    enemy.y = 0;                    //sends npc back to upper beginning of canvas
    var randomX = Phaser.Math.Between(0, config.width);  // and starts at a random x location
    enemy.x = randomX;
  }

  gotHit(hero, enemy) {
    var exploding = new Explosion(this, hero.x, hero.y);
    this.explosionTune.play();
    if (this.score < -25) {
      this.gameOverText.visible = true;  //displays game over screen
      this.physics.pause();              //stops our hero from moving
    }
    this.resetEnemyPosition(enemy);
    hero.x = config.width / 2;
    hero.y = config.height - 30;
    this.score -= 10;
    this.scoreText.setText('Score: ' + this.score);
  }

  destroyed(missile, enemy) {
    var exploding = new Explosion(this, enemy.x, enemy.y);  //creates instance of the explosion class to make animation happen
    this.explosionTune.play();
    missile.destroy();
    this.resetEnemyPosition(enemy);
    this.score += 5;
    this.scoreText.setText('Score: ' + this.score);         //update score variable every time missile hits enemy and display it on canvas.
  }

  respawn() {
    this.hero = this.physics.add.image(config.width / 2, config.height -30, "hero");
    this.keys = this.input.keyboard.createCursorKeys();
    this.hero.setCollideWorldBounds(true);
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    //tunes
    this.explosionTune = this.sound.add("explosionTune");
    this.missileTune = this.sound.add("missileTune");
    this.mainTune = this.sound.add("mainTune");
    this.mainTune.play();                                                          //plays main tune as soon as game starts
    //enemies and overlaps
    this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 2, "ship"); //give each character a class so we can use img properties below
    this.ship2 = this.add.sprite(config.width / 2, config.height / 2, "ship2");
    this.ship3 = this.add.sprite(config.width / 2 + 50, config.height / 2, "ship3");
    this.alien = this.physics.add.image(80, config.height / 4, "alien");
    this.monster = this.physics.add.image(config.width - 80, config.height / 4, "monster");
    this.meteorite = this.physics.add.image(140, config.height / 3, "meteorite");
    this.meteorite2 = this.physics.add.image(config.width - 140, config.height / 3, "meteorite2");
    this.allMissiles = this.physics.add.group();  //creates a group of objects. Will put all missiles here
    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);
    this.enemies.add(this.alien);
    this.enemies.add(this.monster);
    this.enemies.add(this.meteorite);
    this.enemies.add(this.meteorite2);
    //collision physics
    this.physics.add.overlap(this.hero, this.enemies, this.gotHit, null, this);  
    this.physics.add.overlap(this.allMissiles, this.enemies, this.destroyed, null, this); 
    this.ship1.setScale(4); //scales size of image
    //this.hero.flipY = true;  //flips the axis chosen
    //this.spaceship.angle += 7; //changes angle of image, rotates it.
    }
}

//this.background = this.add.image(0,0, "background"); //x, y, identifier //for static background 
//hero.setCollideWorldBounds(true);