/**
 * This class represents a player.
 */
class Enemy extends Character{
    constructor(game, x, y){
        super(game, x, y);
        Object.assign(this, {game, x, y});

        // Link sprite sheet
        this.spriteSheet = ASSET_MANAGER.getAsset("./assets/sprites/enemySprite.png");

        // Frames for animation
        // this.animation = [];
        // this.canvasX = 0;
        // this.canvasY = 0;
        this.animationState = 0; // 0 means stands still, 1 is moving to the left, 2 is moving to the right.
        // this.lastMouseX = 0;
        // this.lastMouseY = 0;
        this.enemyFrameWidth = 80;
        this.enemyFrameHeight = 93;
        this.frameTime = 0.333;
        this.scaler = 1;
        this.frameCount = 3;

        // Attach weapons to player
        // this.weapon = new Weapon(this);
        this.boundingCircleRadius = 40;
        this.boundingCircle = new BoundingCircle(this.canvasX + this.enemyFrameWidth / 2, this.canvasY + this.enemyFrameHeight / 2, this.boundingCircleRadius);

        // Mainly for testing
        this.damageReceived = 0;

        // load will stays at bottom
        this.loadAnimations();
    }


    setEnemyInitialPosition(canvas) {
        this.canvasX = canvas.width / 2 - this.enemyFrameWidth / 2 * this.scaler;
        this.canvasY = canvas.height / 3;
    }

    loadAnimations() {

        let enemyStill = new Animator(this.spriteSheet, 356, 986, this.enemyFrameWidth, this.enemyFrameHeight, this.frameCount, this.frameTime, 0, false, true);
        // let playerLeft = new Animator(this.spriteSheet, 16, 64, this.playerFrameWidth, this.playerFrameHeight, this.frameCount, this.frameTime, 0, false, true);
        // let playerRight = new Animator(this.spriteSheet, 16, 112, this.playerFrameWidth, this.playerFrameHeight, this.frameCount, this.frameTime, 0, false, true);
        this.animation.push(enemyStill);
        // this.animation.push(playerLeft);
        // this.animation.push(playerRight);



    }

    update() {
        this.privateUpdateBC();
    }

    draw(ctx) {

        this.animation[this.animationState].drawFrame(this.game.clockTick, ctx, this.canvasX, this.canvasY, this.scaler);

        // For dev only
        ctx.strokeStyle = "Blue";
        ctx.beginPath();
        ctx.arc(this.boundingCircle.centerX, this.boundingCircle.centerY, this.boundingCircleRadius, 0, Math.PI * 2);
        ctx.stroke();

    }
    privateUpdateBC() {
        this.boundingCircle.setLocation(this.canvasX + this.enemyFrameWidth / 2, this.canvasY + this.enemyFrameHeight / 2);
        this.game.entities.forEach(element => {
                if (element.boundingCircle && element.boundingCircle !== this.boundingCircle) {
                    if (element.boundingCircle.isCollided(this.boundingCircle)) {
                        if (element.damage != undefined){
                            this.damageReceived += element.damage;
                        }
                    }
                }
        })
    }
}