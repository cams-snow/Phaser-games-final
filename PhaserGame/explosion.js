class Explosion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "explosion");     //scene, x and y coordinates of ship that was hit followed by animation identifier
        scene.add.existing(this);
        this.play("explode");
    }
}