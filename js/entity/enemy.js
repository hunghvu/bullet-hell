/**
 * This class represents a player.
 */
class Enemy {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        // Link sprite sheet
        this.spriteSheet = ASSET_MANAGER.getAsset("./assets/sprites/playerSprite.png");

        // Frames for animation
        // this.animation = [];
        // this.canvasX = 0;
        // this.canvasY = 0;
        // this.animationState = 0; // 0 means stands still, 1 is moving to the left, 2 is moving to the right.
        // this.lastMouseX = 0;
        // this.lastMouseY = 0;
        // this.playerFrameWidth = 32;
        // this.playerFrameHeight = 48;
        // this.frameTime = 0.125;
        // this.scaler = 3;
        // this.frameCount = 8;

        // Attach weapons to player
        // this.weapon = new Weapon(this);

        // load will stays at bottom
        this.loadAnimations();
    }


    setPlayerInitialPosition(canvas) {
        this.canvasX = canvas.width / 2 - this.playerFrameWidth / 2 * this.scaler;
        this.canvasY = canvas.height / 3 * 2;
    }

    loadAnimations() {

        let playerStill = new Animator(this.spriteSheet, 16, 16, this.playerFrameWidth, this.playerFrameHeight, this.frameCount, this.frameTime, 0, false, true);
        let playerLeft = new Animator(this.spriteSheet, 16, 64, this.playerFrameWidth, this.playerFrameHeight, this.frameCount, this.frameTime, 0, false, true);
        let playerRight = new Animator(this.spriteSheet, 16, 112, this.playerFrameWidth, this.playerFrameHeight, this.frameCount, this.frameTime, 0, false, true);
        this.animation.push(playerStill);
        this.animation.push(playerLeft);
        this.animation.push(playerRight);



    }

    update() {

    }

    draw(ctx) {

        this.animation[this.animationState].drawFrame(this.game.clockTick, ctx, this.canvasX, this.canvasY, this.scaler);

    }
}