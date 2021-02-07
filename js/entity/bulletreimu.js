/**
 * This class represents the bullets shot displayed ingame.
 */
class BulletReimu {
    constructor(weapon){

        // Link sprite sheet
        this.spriteSheet = ASSET_MANAGER.getAsset("./assets/sprites/playerSprite.png");

        // Weapon coords
        this.weapon = weapon;
        this.game = weapon.game;
        this.xLevel1 = weapon.orbLocationX;
        this.yLevel1 = weapon.orbLocationY;
        // The orange bullet is a bit thin, so add frame width to move it to the middle of the orb
        // Right to left 
        this.xLevel2_1 = weapon.orb2X_1 + weapon.orbFrameWidth;
        this.yLevel2_1 = weapon.orb2Y_1 + weapon.orbFrameHeight;
        this.xLevel2_2 = weapon.orb2X_2 + weapon.orbFrameWidth;
        this.yLevel2_2 = weapon.orb2Y_2 + weapon.orbFrameHeight;
        this.xLevel2_3 = weapon.orb2X_3 + weapon.orbFrameWidth;
        this.yLevel2_3 = weapon.orb2Y_3 + weapon.orbFrameHeight;
        this.xLevel2_4 = weapon.orb2X_4 + weapon.orbFrameWidth;
        this.yLevel2_4 = weapon.orb2Y_4 + weapon.orbFrameHeight;

        this.xLevel3_1 = weapon.orb3X_1;
        this.yLevel3_1 = weapon.orb3Y_1;
        this.xLevel3_2 = weapon.orb3X_2;
        this.xLevel3_2 = weapon.orb3X_2;

        this.scaler = weapon.scaler;
        this.frameTime = weapon.frameTime;
        this.bulletState = weapon.orbState; // 0 is red bullet, 1 is orange bullet, 2 is purple bullet
        
        this.frameCount = 1;
        this.bulletSpeed = 1;

        // Shot once every 10 degree of orb trajectory
        this.previousAngle = weapon.orbAngle;
        this.bulletAngleInterval = 10;

        // Add bounding circle for each bullet, bullet will have its own bounding circle
        this.boundingCircleRadius = 10;


        this.bulletOnSceneList = [];
    }

    update() {
        this.privateUpdateOrbLocation();
        this.privateInitBullet();
        this.privateUpdateBulletLocation();
    }

    draw(ctx) {
        ctx.save();
        // Rotate 90 degrees counter clockwise
        ctx.rotate(-Math.PI / 2);

        this.bulletOnSceneList.forEach(element => {
            if (element.side === null) {
                element.drawFrame(this.game.clockTick, ctx, element.x, element.y, this.scaler);

            // For dev only. Draw bounding circle
            ctx.beginPath();
            ctx.arc(element.boundingCircle.centerX, element.boundingCircle.centerY, this.boundingCircleRadius, 0, Math.PI * 2);
            ctx.stroke();
            }
        })
        ctx.restore();

        // Draw a rotated bullet on a separate canvas, then draw that canvas on the main one.
        this.bulletOnSceneList.forEach(element => {
            if (element.side === "left") {
                this.privateDrawLeftRightBullet(105, element, ctx);
            } else if (element.side === "right") {
                this.privateDrawLeftRightBullet(75, element, ctx);
            }

            // For dev only. Draw bounding circle
            ctx.beginPath();
            ctx.arc(element.boundingCircle.centerX, element.boundingCircle.centerY, this.boundingCircleRadius, 0, Math.PI * 2);
            ctx.stroke();
        });

    }

    /**
     * This function update the current orbs location on screen.
     */
    privateUpdateOrbLocation(){
        // Right to left, 2_2 and 2_3 are manually tuned depended on the scale.
        this.xLevel1 = this.weapon.orbLocationX;
        this.yLevel1 = this.weapon.orbLocationY;
        this.xLevel2_1 = this.weapon.orb2X_1;
        this.yLevel2_1 = this.weapon.orb2Y_1;
        this.xLevel2_2 = this.weapon.orb2X_2 + this.weapon.orbFrameWidth / 2;
        this.yLevel2_2 = this.weapon.orb2Y_2 + this.weapon.orbFrameHeight * 3;
        this.xLevel2_3 = this.weapon.orb2X_3;
        this.yLevel2_3 = this.weapon.orb2Y_3 + this.weapon.orbFrameHeight * 3;
        this.xLevel2_4 = this.weapon.orb2X_4;
        this.yLevel2_4 = this.weapon.orb2Y_4;
        
        this.xLevel3_1 = this.weapon.orb3X_1;
        this.yLevel3_1 = this.weapon.orb3Y_1;
        this.xLevel3_2 = this.weapon.orb3X_2;
        this.yLevel3_2 = this.weapon.orb3Y_2;
    }

    /**
     * This function creates bullets to be shot.
     */
    privateInitBullet(){
        let bulletOnSceneOne = null;
        let bulletOnSceneTwo_1 = null;
        let bulletOnSceneTwo_2 = null;
        let bulletOnSceneTwo_3 = null;
        let bulletOnSceneTwo_4 = null;
        let bulletOnSceneThree_1 = null;
        let bulletOnSceneThree_2 = null;

        // Level 1
        bulletOnSceneOne = new Animator(this.spriteSheet, 15, 193, 65, 13, this.frameCount, this.frameTime, 0, false, true); // red bullet
        bulletOnSceneOne.x = -this.yLevel1;
        bulletOnSceneOne.y = this.xLevel1;
        bulletOnSceneOne.level = 0;
        bulletOnSceneOne.side = null;
        bulletOnSceneOne.boundingCircle = new BoundingCircle(bulletOnSceneOne.x, bulletOnSceneOne.y, this.bcRadius);
        

        if (this.bulletState === 1 || this.bulletState === 2) { // Level 2
            bulletOnSceneTwo_1 = new Animator(this.spriteSheet, 83, 192, 57, 7, this.frameCount, this.frameTime, 0, false, true); // orange bullet
            bulletOnSceneTwo_2 = new Animator(this.spriteSheet, 83, 192, 57, 7, this.frameCount, this.frameTime, 0, false, true);
            bulletOnSceneTwo_3 = new Animator(this.spriteSheet, 83, 192, 57, 7, this.frameCount, this.frameTime, 0, false, true);
            bulletOnSceneTwo_4 = new Animator(this.spriteSheet, 83, 192, 57, 7, this.frameCount, this.frameTime, 0, false, true);

            // X and Y for left and right are manually tuned.
            // X and Y are initial locations of a bullet on screen, which are used to draw.
            bulletOnSceneTwo_1.x = this.xLevel2_1 - this.weapon.orbFrameWidth * this.scaler;
            bulletOnSceneTwo_1.y = this.yLevel2_1 - this.weapon.orbFrameHeight * this.scaler;
            bulletOnSceneTwo_1.level = 1;
            bulletOnSceneTwo_1.side = "right";
            bulletOnSceneTwo_1.boundingCircle = new BoundingCircle(bulletOnSceneTwo_1.x, bulletOnSceneTwo_1.y, this.bcRadius);

            bulletOnSceneTwo_2.x = -this.yLevel2_2;
            bulletOnSceneTwo_2.y = this.xLevel2_2;
            bulletOnSceneTwo_2.level = 1;
            bulletOnSceneTwo_2.side = null;
            bulletOnSceneTwo_2.boundingCircle = new BoundingCircle(bulletOnSceneTwo_2.x, bulletOnSceneTwo_2.y, this.bcRadius);

            bulletOnSceneTwo_3.x = -this.yLevel2_3;
            bulletOnSceneTwo_3.y = this.xLevel2_3;
            bulletOnSceneTwo_3.level = 1;
            bulletOnSceneTwo_3.side = null;
            bulletOnSceneTwo_3.boundingCircle = new BoundingCircle(bulletOnSceneTwo_3.x, bulletOnSceneTwo_3.y, this.bcRadius);

            bulletOnSceneTwo_4.x = this.xLevel2_4 - this.weapon.orbFrameWidth * this.scaler;
            bulletOnSceneTwo_4.y = this.yLevel2_4 - this.weapon.orbFrameHeight * this.scaler;
            bulletOnSceneTwo_4.level = 1;
            bulletOnSceneTwo_4.side = "left";
            bulletOnSceneTwo_4.boundingCircle = new BoundingCircle(bulletOnSceneTwo_4.x, bulletOnSceneTwo_4.y, this.bcRadius);
            // console.log(bulletOnSceneTwo_4.x, bulletOnSceneTwo_4.y );
            this.bulletSpeed = 5;
        } 
        
        // Also change bullet speed from 50 to 100.
        if (this.bulletState === 2) { // Level 3
            bulletOnSceneThree_1 = new Animator(this.spriteSheet, 152, 193, 56, 13, this.frameCount, this.frameTime, 0, false, true); // purple bullet
            bulletOnSceneThree_1.x = -this.yLevel3_1;
            bulletOnSceneThree_1.y = this.xLevel3_1;
            bulletOnSceneThree_1.level = 2;
            bulletOnSceneThree_1.side = null;
            bulletOnSceneThree_1.boundingCircle = new BoundingCircle(bulletOnSceneThree_1.x, bulletOnSceneThree_1.y, this.bcRadius);
            // console.log(bulletOnSceneThree_1.x);
            
            bulletOnSceneThree_2 = new Animator(this.spriteSheet, 152, 193, 56, 13, this.frameCount, this.frameTime, 0, false, true); // purple bullet
            bulletOnSceneThree_2.x = -this.yLevel3_2;
            bulletOnSceneThree_2.y = this.xLevel3_2;
            bulletOnSceneThree_2.level = 2;
            bulletOnSceneThree_2.side = null;
            bulletOnSceneThree_2.boundingCircle = new BoundingCircle(bulletOnSceneThree_2.x, bulletOnSceneThree_2.y, this.bcRadius);

            this.bulletSpeed = 5;
        }

        if (this.weapon.orbAngle - this.previousAngle === this.bulletAngleInterval || this.weapon.orbAngle === 0) {
            this.privateAddBulletOnScreen(bulletOnSceneOne);
            this.previousAngle = this.weapon.orbAngle;
            if (this.bulletState === 1 || this.bulletState === 2) {
                this.privateAddBulletOnScreen(bulletOnSceneTwo_1);
                this.privateAddBulletOnScreen(bulletOnSceneTwo_2);
                this.privateAddBulletOnScreen(bulletOnSceneTwo_3);
                this.privateAddBulletOnScreen(bulletOnSceneTwo_4);
            }
            if (this.bulletState === 2) {
                // console.log(bulletOnSceneThree_2.x)
                this.privateAddBulletOnScreen(bulletOnSceneThree_1);
                this.privateAddBulletOnScreen(bulletOnSceneThree_2);
            }
        }
    }

    /**
     * This function update location of bullets over the time.
     */
    privateUpdateBulletLocation(){
        if (this.bulletOnSceneList !== undefined) {
            for (var i = this.bulletOnSceneList.length - 1; i > 0; i--) {

                // Remove the bullet when it is nearly out of canvas.
                //  Initially, it should be fully out of canvas, however,
                //  when a bullet is removed from the list, there is a bug where
                //  its bounding circle unexpectedly move to left screen.
                //  Remove the bullet sooner at x = -65 is a work around to fix this bug.
                //  This makes a buggy bounding circle appear off canvas.
                // Straight bullet (or "null") works on axis where X-north, y-east.
                // While "left" and "right" works on axis where X-east, y-south.
                if (this.bulletOnSceneList[i].x >= -65 && this.bulletOnSceneList[i].side === null){
                    this.bulletOnSceneList.splice(i, 1);

                } else if (this.bulletOnSceneList[i].y <= 0 
                    && (this.bulletOnSceneList[i].side === "left" || this.bulletOnSceneList[i].side === "right")) {
                        this.bulletOnSceneList.splice(i, 1);

                } else {
                    // Manually tune the location of circle.
                    if (this.bulletOnSceneList[i].side === null) {
                        this.bulletOnSceneList[i].x += this.bulletSpeed;
                        this.bulletOnSceneList[i].boundingCircle.setLocation(
                            this.bulletOnSceneList[i].x + 55, 
                            this.bulletOnSceneList[i].y + 5);
                    } else if (this.bulletOnSceneList[i].side === "left") {
                        this.bulletOnSceneList[i].y -= this.bulletSpeed;
                        this.bulletOnSceneList[i].x -= this.bulletSpeed / 5;
                        this.bulletOnSceneList[i].boundingCircle.setLocation(
                            this.bulletOnSceneList[i].x + 10, 
                            this.bulletOnSceneList[i].y + 10);
                    } else if (this.bulletOnSceneList[i].side === "right") {
                        this.bulletOnSceneList[i].y -= this.bulletSpeed;
                        this.bulletOnSceneList[i].x += this.bulletSpeed / 5;
                        this.bulletOnSceneList[i].boundingCircle.setLocation(
                            this.bulletOnSceneList[i].x + 35, 
                            this.bulletOnSceneList[i].y + 10);
                    }
                    this.privateHandleCollision(i);
                }
            }
            // Use to check if a bullet is deleted by observing the list, for dev only.
            // console.log(this.bulletOnSceneList);
        }
    }
    privateHandleCollision(index){
        this.game.entities.forEach( element => {
            if (element.boundingCircle && element.boundingCircle !== this.bulletOnSceneList[index].boundingCircle) {
                if (element.boundingCircle.isCollided(this.bulletOnSceneList[index].boundingCircle)) {
                    console.log(true);
                }
            }
    })
    }

    /**
     * This function draw left/right bullet of a level 2 weapon.
     * @param {*} angle 
     * @param {*} element 
     * @param {*} ctx j
     */
    privateDrawLeftRightBullet(angle, element, ctx) {
        let offScreenCanvas = document.createElement("canvas");
        offScreenCanvas.width = 210;
        offScreenCanvas.height = 210;
        let offScreenCtx = offScreenCanvas.getContext("2d");
        offScreenCtx.save();
        offScreenCtx.translate(20 * this.scaler, 60 * this.scaler);
        offScreenCtx.rotate(-angle * Math.PI / 180);
        element.drawFrame(this.game.clockTick, offScreenCtx, 0, 0, this.scaler);
        ctx.drawImage(offScreenCanvas, element.x, element.y);
    }

    /**
     * Temporary helper class, used for dev only
     * @param {*} bullet 
     */
    privateAddBulletOnScreen(bullet){
        // Temporary limit on number of bullet on screen, used for dev only
        // if (this.bulletOnSceneList.length == 10) {
        //     console.log(this.bulletOnSceneList.length)
        //     return;
        // }
        // console.log(this.bulletOnSceneList.length);
        this.bulletOnSceneList.push(bullet);
    }
}