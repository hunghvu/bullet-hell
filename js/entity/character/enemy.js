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
        this.frameCount = 1;

        // Attach weapons to player
        this.weapon = new EnemyWeapon(this);
        this.boundingCircleRadius = 40;
        this.boundingCircle = new BoundingCircle(this.canvasX + this.enemyFrameWidth / 2, this.canvasY + this.enemyFrameHeight / 2, this.boundingCircleRadius);

        // Mainly for testing
        this.damageReceived = 0;
        this.fullHealthCircle = Math.PI * 2
        this.fullHelathThreshold = 1000;
        this.levelUpOne = false; // Flag to boost enemy at stage 1.

        // load will stays at bottom
        this.loadAnimations();
    }


    setEnemyInitialPosition(canvas) {
        this.canvasX = canvas.width / 2 - this.enemyFrameWidth / 2 * this.scaler;
        this.canvasY = canvas.height / 5;
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

        // Stage 1 enemy boost when below they are below 50% health.
        if (this.damageReceived >= this.fullHelathThreshold / 2 && !this.levelUpOne) {
            this.weapon.bullet.bulletAngleInterval = this.weapon.bullet.bulletAngleInterval * 60 / 100;
            this.weapon.orbAngle = 0;
            // Sudden change in the angle interval so it needs there is a temporary pause so the angle can be in line again ?
            // Rare bug, work around by reset orb angle.
            this.levelUpOne = true;
        }
        this.privateUpdateBC();
    }

    draw(ctx) {

        this.animation[this.animationState].drawFrame(this.game.clockTick, ctx, this.canvasX, this.canvasY, this.scaler);

        // Draw HP bar.
        ctx.beginPath()
        ctx.lineWidth = 20;
        ctx.arc(this.boundingCircle.centerX, this.boundingCircle.centerY, this.boundingCircleRadius * 2, -Math.PI / 2, this.fullHealthCircle - Math.PI / 2, false);
        ctx.strokeStyle = "Red";
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.closePath();

        // For dev only, draw bounding box.
        ctx.strokeStyle = "Blue";
        ctx.beginPath();
        ctx.arc(this.boundingCircle.centerX, this.boundingCircle.centerY, this.boundingCircleRadius, 0, Math.PI * 2);
        ctx.stroke();

    }
    privateUpdateBC() {
        this.boundingCircle.setLocation(this.canvasX + this.enemyFrameWidth / 2, this.canvasY + this.enemyFrameHeight / 2);
        this.game.entities.forEach(element => {
                if (element.boundingCircle && (element.boundingCircle !== this.boundingCircle)) {
                    if (element.boundingCircle.isCollided(this.boundingCircle) && element.owner !== this) {
                        if (element.damage != undefined && !element.isCollided){
                            this.damageReceived += element.damage;
                            this.fullHealthCircle = Math.PI * 2 * (this.fullHelathThreshold - this.damageReceived) / this.fullHelathThreshold;
                            element.isCollided = true;
                        }
                    }
                }
        })
    }
}