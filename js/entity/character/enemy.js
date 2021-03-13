/**
 * This class represents a player.
 */
class Enemy extends Character{
    constructor(game, x, y){
        super(game, x, y);
        Object.assign(this, {game, x, y});

        // Link sprite sheet
        this.enemySheet = ASSET_MANAGER.getAsset("./assets/sprites/enemySprite.png");
        this.bulletSheet = ASSET_MANAGER.getAsset("./assets/sprites/bulletSprite.png")

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
        this.initialHealth = 1000; // Cannot modify initial health directly as it's used like a const to draw hp circle.
        this.firstStageDone = false;
        this.secondStageDone = false;
        this.thirdStageDone = false;
        this.levelUpOne = false; // Flag to boost enemy at stage 1.
        this.levelUpTwo = false; // Flag to boost enemy at stage 2.
        this.levelUpThree = false; // Not use as of now.

        this.damage = 3;

        this.magicCircleAngle = 0;
        this.magicCircleSpeed = 1;
        this.magicCircleFrameWidth = 128;
        this.magicCircleFrameHeight = 124;

        this.canvas = null;
        this.movementTick = 0;
        // load will stays at bottom
        this.loadAnimations();
    }


    setEnemyInitialPosition(canvas) {
        this.canvas = canvas;
        this.canvasX = canvas.width / 2 - this.enemyFrameWidth / 2 * this.scaler;
        this.canvasY = canvas.height / 5;
    }

    loadAnimations() {

        let enemyStill = new Animator(this.enemySheet, 356, 986, this.enemyFrameWidth, this.enemyFrameHeight, this.frameCount, this.frameTime, 0, false, true);
        // let playerLeft = new Animator(this.spriteSheet, 16, 64, this.playerFrameWidth, this.playerFrameHeight, this.frameCount, this.frameTime, 0, false, true);
        // let playerRight = new Animator(this.spriteSheet, 16, 112, this.playerFrameWidth, this.playerFrameHeight, this.frameCount, this.frameTime, 0, false, true);
        this.animation.push(enemyStill);
        // this.animation.push(playerLeft);
        // this.animation.push(playerRight);
        let magicCircle = new Animator(this.bulletSheet, 404, 89, this.magicCircleFrameWidth, this.magicCircleFrameHeight, this.frameCount, this.frameTime, 0, false, true);
        this.animation.push(magicCircle);


    }

    generateMovementVector() {
        let velX = Math.random() * 100 - 60;
        let velY = Math.random() * 100 - 60;
        this.vector = new Vector(velX, velY);
    }

    update() {

        // Stage 1 enemy boost when below they are below 50% health.
        if (this.damageReceived >= this.initialHealth / 2 && !this.levelUpOne) {
            this.weapon.bullet.bulletAngleInterval = this.weapon.bullet.bulletAngleInterval * 80 / 100;
            this.weapon.orbAngle = 0;
            // Sudden change in the angle interval so it needs there is a temporary pause so the angle can be in line again ?
            // Rare bug, work around by reset orb angle.
            this.levelUpOne = true;
        }
        if (this.damageReceived >= this.initialHealth && !this.firstStageDone) {
            this.firstStageDone = true;
            this.initialHealth *= 1.5;
            this.damageReceived = 0;
            this.weapon.secondStage = true;
            setPlayerWeaponLevelTwo();
        } 

        // Stage 2, the bullet pattern become more random (visually).
        if (this.damageReceived >= this.initialHealth / 2 && this.firstStageDone && !this.levelUpTwo) {
            this.weapon.bullet.bulletAngleInterval = this.weapon.bullet.bulletAngleInterval * 60 / 80;
            this.weapon.bullet.notBouncedBackRate = 0.8;
            this.weapon.orbAngle = 0;
            this.levelUpTwo = true;
        }

        if (this.damageReceived > this.initialHealth && this.firstStageDone && !this.secondStageDone) {
            this.secondStageDone = true;
            this.initialHealth *= 1.5;
            this.damageReceived = 0;
            this.weapon.thirdStage = true;
            setPlayerWeaponLevelThree();
        }

        // Stage 3, the CPU now has random movement (change direction per about 3 secs).
        if (this.firstStageDone && this.secondStageDone && this.movementTick % 180 === 0) {
            this.generateMovementVector();
        }
        if (this.vector) {
            let newX = this.canvasX + this.vector.velX;
            let newY = this.canvasY + this.vector.velY;
            if (newX >= 0 && newX <= this.canvas.width - this.enemyFrameWidth) this.canvasX = newX;
            if (newY >= 0 && newY <= this.canvas.height - this.enemyFrameHeight) this.canvasY = newY;
            if (this.movementTick === 180) this.movementTick = 0;
            this.movementTick ++;
        }
        if (this.damageReceived > this.initialHealth && this.firstStageDone && this.secondStageDone && !this.thirdStageDone) {
            this.thirdStageDone = true;
        }
        this.privateUpdateBC();
    }

    draw(ctx) {
        this.privateDrawMagicCircle(ctx);
        this.animation[this.animationState].drawFrame(this.game.clockTick, ctx, this.canvasX, this.canvasY, this.scaler);

        // Draw HP bar.
        ctx.beginPath()
        ctx.lineWidth = 20;
        ctx.arc(this.boundingCircle.centerX, this.boundingCircle.centerY, this.boundingCircleRadius * 2, -Math.PI / 2, this.fullHealthCircle - Math.PI / 2, false);
        ctx.strokeStyle = "orange";
        if (this.firstStageDone) ctx.strokeStyle = "yellow";
        if (this.secondStageDone) ctx.strokeStyle = "green";
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.closePath();

        // For dev only, draw bounding box.
        if (params.DEBUG) {
            ctx.strokeStyle = "Blue";
            ctx.beginPath();
            ctx.arc(this.boundingCircle.centerX, this.boundingCircle.centerY, this.boundingCircleRadius, 0, Math.PI * 2);
            ctx.stroke();
        }

    }

    /**
     * This function helps draw a magic circle behind an enemy.
     * @param {context} ctx 
     */
    privateDrawMagicCircle(ctx) {
        let offScreenCanvas = document.createElement("canvas");
        offScreenCanvas.width = 256;
        offScreenCanvas.height = 256;
        let offScreenCtx = offScreenCanvas.getContext("2d");
        // offScreenCtx.translate(translateX, translateY);
        offScreenCtx.save();
        offScreenCtx.translate(128, 128);
        offScreenCtx.rotate(-this.magicCircleAngle * Math.PI / 180);
        offScreenCtx.translate(-128, -128);
        this.magicCircleAngle -= this.magicCircleSpeed;
        this.animation[1].drawFrame(this.game.clockTick, offScreenCtx, 0, 0, this.scaler * 2);
        offScreenCtx.restore();
        ctx.drawImage(offScreenCanvas, this.canvasX - 90, this.canvasY - 80);  
    }

    /**
     * This function help check whether a BC collision happens, and perform approriate actions.
     */
    privateUpdateBC() {
        this.boundingCircle.setLocation(this.canvasX + this.enemyFrameWidth / 2, this.canvasY + this.enemyFrameHeight / 2);
        this.game.entities.forEach(element => {
                if (element.boundingCircle && (element.boundingCircle !== this.boundingCircle)) {
                    if (element.boundingCircle.isCollided(this.boundingCircle) && element.owner !== this) {
                        if (element.damage != undefined && !element.isCollided){
                            this.damageReceived += element.damage;
                            this.fullHealthCircle = Math.PI * 2 * (this.initialHealth - this.damageReceived) / this.initialHealth;
                            element.isCollided = true;
                        }
                    }
                }
        })
    }
}