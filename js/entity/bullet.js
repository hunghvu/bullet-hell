class Bullet {
    constructor(weapon){


        // Link sprite sheet
        this.spriteSheet = ASSET_MANAGER.getAsset("./assets/sprites/playerSprite.png");


        this.weapon = weapon;
        this.game = weapon.game;
        this.x = weapon.orbLocationX;
        this.y = weapon.orbLocationY;
        this.scaler = weapon.scaler;
        this.frameTime = weapon.frameTime;

        this.weaponState = 0; // 0 is red bullet, 1 is orange bullet, 2 is purple bullet
        this.frameCount = 1;

        this.weaponList = [];

        // Frames for animation
        // this.animation = [];
        // this.canvasX = 0;
        // this.canvasY = 0;
        // this.state = 0; // 0 means stands still, 1 is moving to the left, 2 is moving to the right.
        // this.lastMouseX = 0;
        // this.lastMouseY = 0;
        // this.frameTime = 0.125;
        // this.scaler = 3;


        // Orb angle.
        // this.orbSpeed = 1;
        // this.orbAngle = 0;
        // this.radius = 100;
        // this.orbFrameWidth = 16;
        // this.orbFrameHeight = 16;

        // load will stays at bottom
        this.loadAnimations();
    }


    loadAnimations() {

        let redBullet = new Animator(this.spriteSheet, 15, 193, 65, 13, this.frameCount, this.frameTime, 0, false, true);
        let orangeBullet = new Animator(this.spriteSheet, 83, 192, 57, 7, this.frameCount, this.frameTime, 0, false, true);
        let purpleBullet = new Animator(this.spriteSheet, 152, 193, 56, 13, this.frameCount, this.frameTime, 0, false, true);
        this.weaponList.push(redBullet);
        this.weaponList.push(orangeBullet);
        this.weaponList.push(purpleBullet);

    }

    update() {

    }

    draw(ctx) {
        this.x = this.weapon.orbLocationX;
        this.y = this.weapon.orbLocationY;

        ctx.save();

        ctx.rotate(-Math.PI / 2);
        this.weaponList[this.weaponState].drawFrame(this.game.clockTick, ctx, -this.y, this.x, this.scaler);

        // ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.restore();
    }
}