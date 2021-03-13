/**
 * This class represents a player.
 */
class Player extends Character{
    constructor(game, x, y){
        super(game, x, y);
        Object.assign(this, {game, x, y});

        // Link sprite sheet
        this.spriteSheet = ASSET_MANAGER.getAsset("./assets/sprites/playerSprite.png");
        this.bulletSheet = ASSET_MANAGER.getAsset("./assets/sprites/bulletSprite.png")

        // Frames for animation
        // this.animation = [];
        // this.canvasX = 0;
        // this.canvasY = 0;
        this.animationState = 0; // 0 means stands still, 1 is moving to the left, 2 is moving to the right.
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.playerFrameWidth = 32;
        this.playerFrameHeight = 48;
        this.frameTime = 0.125;
        this.scaler = 1;
        this.frameCount = 8;

        // Attach weapons to player
        this.weapon = new PlayerWeapon(this);

        this.boundingCircleRadius = 7;
        this.boundingCircle = new BoundingCircle(this.canvasX + this.playerFrameWidth / 2, this.canvasY + this.playerFrameHeight / 2, this.boundingCircleRadius);

        this.damageReceived = 0;
        this.damageThreshold = 100; // Should be changeable depended on difficulty later on.
        this.initialHealth = 300; // Should be changeable depended on difficulty later on.
        this.maxHP = this.initialHealth; // Temporary value only used to printed out on screen. Might remove later on.
        this.invulnerability = true;
        this.lastDeadTimeStamp = 0; // Set this to 0 at the beginning so we can have invulnerability period, will update again when dead.
        this.invulnerabilityPeriod = 3;

        // Draw barrier which appears when invurnerable
        
        // this.barrierAngle = 0;
        // this.barrierSpeed = 1;

        this.barrierAngle = 0;
        this.barrierSpeed = 120; // Fast rotation so look like an energy field.

        // load will stays at bottom
        this.loadAnimations();
    }

    /**
     * This function helps moving the character around based on mouse movement.
     * @param {canvas} canvas Canvas for game.
     */
    addMouseListenerCanvas(canvas) {
        // A separate timer to detect if the mouse has stopped moving
        //  Source: https://stackoverflow.com/questions/17646825/how-to-detect-when-mouse-has-stopped
        let timer = null;
        canvas.addEventListener('mousemove', event => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.animationState = 0;
                this.lastMouseX = event.clientX;
                this.lastMouseY = event.clientY;
            }, 500);

            // Only get mouse coordinate inside canvas
            let canvasRect = canvas.getBoundingClientRect();
            let newMouseX = event.clientX - canvasRect.left;
            let newMouseY = event.clientY - canvasRect.top;

            // Change state of direction
            if (newMouseX < this.lastMouseX) {
                this.animationState = 1;
            } else if (newMouseX === this.lastMouseX) {
                this.animationState = 0;
            } else if (newMouseX > this.lastMouseX) {
                this.animationState = 2;
            }

            //
            this.lastMouseX = newMouseX; // Real mouse position
            this.lastMouseY = newMouseY;
            this.canvasX = newMouseX - this.playerFrameWidth / 2 * this.scaler; // Modified position so the mouse is at
            this.canvasY = newMouseY - this.playerFrameHeight / 2 * this.scaler; //  the center of character sprite
            // console.log(this.animationState);
        })
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

        let playerBarrier = new Animator(this.bulletSheet, 404, 23, 63, 63, 1, this.frameTime, 0, false, true);
        this.animation.push(playerBarrier);

    }

    update() {
        this.privateUpdateBC();

        // Invunerable at the beginning and after dead.
        // console.log(this.game.timer.gameTime - this.lastDeadTimeStamp)
        if(this.game.timer.gameTime - this.lastDeadTimeStamp >= this.invulnerabilityPeriod) {
            this.invulnerability = false;
        }
        if(this.damageReceived >= this.damageThreshold) {
            this.lastDeadTimeStamp = this.game.timer.gameTime;
            this.invulnerability = true;
            this.damageReceived = 0;
        }
    }

    draw(ctx) {

        this.animation[this.animationState].drawFrame(this.game.clockTick, ctx, this.canvasX, this.canvasY, this.scaler);

        // For dev only
        if (params.DEBUG) {
            ctx.strokeStyle = "Blue";
            ctx.beginPath();
            ctx.arc(this.boundingCircle.centerX, this.boundingCircle.centerY, this.boundingCircleRadius, 0, Math.PI * 2);
            ctx.stroke();
        }


        if (this.invulnerability) {
            this.privateDrawBarrier(ctx);
        }

    }

    /**
     * This function helps draw a barrier after a player HP reduce to a certain threshold.
     * @param {context} ctx 
     */
    privateDrawBarrier(ctx) {
        let offScreenCanvas = document.createElement("canvas");
        offScreenCanvas.width = 128;
        offScreenCanvas.height = 128;
        let offScreenCtx = offScreenCanvas.getContext("2d");
        // offScreenCtx.translate(translateX, translateY);
        offScreenCtx.save();
        offScreenCtx.translate(64, 64);
        offScreenCtx.rotate(-this.barrierAngle * Math.PI / 180);
        offScreenCtx.translate(-64, -64);
        this.barrierAngle += this.barrierSpeed;
        this.animation[3].drawFrame(this.game.clockTick, offScreenCtx, 0, 0, this.scaler * 2);
        offScreenCtx.restore();
        ctx.drawImage(offScreenCanvas, this.canvasX - this.playerFrameWidth - 15, this.canvasY - this.playerFrameHeight);  // Hard coded value so reimu appears in the middle.
    }

    privateUpdateBC(){
        this.boundingCircle.setLocation(this.canvasX + this.playerFrameWidth / 2, this.canvasY + this.playerFrameHeight / 2);
        this.game.entities.forEach( element => {
                if (element.boundingCircle && (element.boundingCircle !== this.boundingCircle)) {
                    if (element.boundingCircle.isCollided(this.boundingCircle) && element.owner !== this) {
                        if (element.damage != undefined && !element.isCollided && !this.invulnerability){
                            this.damageReceived += element.damage; // Increase damage received. Separately keep track the dmg received so it
                                                                   //  is easier to modify and use later on.
                            this.initialHealth -= element.damage; // Reduce HP.
                            element instanceof Bullet ? element.isCollided = true : element.isCollided = false; // Bullet can only collide once.
                        }
                    }
                }
        })
    }
}