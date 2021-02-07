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
        this.bulletSpeed = 50;

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

        /**
         * @todo Because the bullet location is updated before drawn and check for location. There is a bug where, for example,
         *  when a player stay inside an enemy whose has a radius of bounding circle equal to 10, Let say the bullet speed is 1000, 
         *  then the bullet passthrough the enemy right away and not counted as collided.
         */
    }

    draw(ctx) {
        // Draw a rotated bullet on a separate canvas, then draw that canvas on the main one.
        this.bulletOnSceneList.forEach(element => {
            if (element.side === "left") {
                this.privateDrawRotatedBullet(105, element.animator, ctx, 20, 60);
            } else if (element.side === "right") {
                this.privateDrawRotatedBullet(75, element.animator, ctx, 20, 60);
            } else if (element.side === null) {
                this.privateDrawRotatedBullet(90, element.animator, ctx, 0, 70);
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
        this.yLevel2_2 = this.weapon.orb2Y_2;
        this.xLevel2_3 = this.weapon.orb2X_3;
        this.yLevel2_3 = this.weapon.orb2Y_3;
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
        bulletOnSceneOne = new Bullet(
            new Animator(this.spriteSheet, 15, 193, 65, 13, this.frameCount, this.frameTime, 0, false, true),
            this.xLevel1,
            this.yLevel1,
            null,
            new BoundingCircle(this.xLevel1, this.yLevel1, this.boundingCircleRadius),
            this
        )

        if (this.bulletState === 1 || this.bulletState === 2) { // Level 2, orange bullet
            // X and Y for left and right are manually tuned.
            // X and Y are initial locations of a bullet on screen, which are used to draw.
            bulletOnSceneTwo_1 = new Bullet(
                new Animator(this.spriteSheet, 83, 192, 57, 7, this.frameCount, this.frameTime, 0, false, true),
                this.xLevel2_1 - this.weapon.orbFrameWidth * this.scaler,
                this.yLevel2_1 - this.weapon.orbFrameHeight * this.scaler,
                "right",
                new BoundingCircle(
                    this.xLevel2_1 - this.weapon.orbFrameWidth * this.scaler, 
                    this.yLevel2_1 - this.weapon.orbFrameHeight * this.scalery, 
                    this.boundingCircleRadius),
                this
            );

            bulletOnSceneTwo_2 = new Bullet(
                new Animator(this.spriteSheet, 83, 192, 57, 7, this.frameCount, this.frameTime, 0, false, true),
                this.xLevel2_2,
                this.yLevel2_2,
                null,
                new BoundingCircle(this.xLevel2_2, this.yLevel2_2, this.boundingCircleRadius),
                this
            );

            bulletOnSceneTwo_3 = new Bullet(
                new Animator(this.spriteSheet, 83, 192, 57, 7, this.frameCount, this.frameTime, 0, false, true),
                this.xLevel2_3,
                this.yLevel2_3,
                null,
                new BoundingCircle(this.xLevel2_3, this.yLevel2_3, this.boundingCircleRadius),
                this
            );

            bulletOnSceneTwo_4 = new Bullet(
                new Animator(this.spriteSheet, 83, 192, 57, 7, this.frameCount, this.frameTime, 0, false, true),
                this.xLevel2_4 - this.weapon.orbFrameWidth * this.scaler,
                this.yLevel2_4 - this.weapon.orbFrameHeight * this.scaler,
                "left",
                new BoundingCircle(
                    this.xLevel2_4 - this.weapon.orbFrameWidth * this.scaler, 
                    this.yLevel2_4 - this.weapon.orbFrameHeight * this.scaler, 
                    this.boundingCircleRadius), 
                this
            );
            this.bulletSpeed = 50;
        } 
        
        // Also change bullet speed from 50 to 100.
        if (this.bulletState === 2) { // Level 3, purple bullet
            bulletOnSceneThree_1 = new Bullet(
                new Animator(this.spriteSheet, 152, 193, 56, 13, this.frameCount, this.frameTime, 0, false, true),
                this.xLevel3_1,
                this.yLevel3_1,
                null,
                new BoundingCircle(this.xLevel3_1, this.yLevel3_1, this.boundingCircleRadius), 
                this
            );

            bulletOnSceneThree_2 = new Bullet(
                new Animator(this.spriteSheet, 152, 193, 56, 13, this.frameCount, this.frameTime, 0, false, true),
                this.xLevel3_2,
                this.yLevel3_2,
                null,
                new BoundingCircle(this.xLevel3_2, this.yLevel3_2, this.boundingCircleRadius),
                this
            );
            this.bulletSpeed = 100;
        }

        if (this.weapon.orbAngle - this.previousAngle === this.bulletAngleInterval || this.weapon.orbAngle === 0) {
            this.privateAddBulletOnScreen(bulletOnSceneOne);
            this.game.addEntity(bulletOnSceneOne);
            this.previousAngle = this.weapon.orbAngle;
            if (this.bulletState === 1 || this.bulletState === 2) {
                this.privateAddBulletOnScreen(bulletOnSceneTwo_1);
                this.privateAddBulletOnScreen(bulletOnSceneTwo_2);
                this.privateAddBulletOnScreen(bulletOnSceneTwo_3);
                this.privateAddBulletOnScreen(bulletOnSceneTwo_4);
                this.game.addEntity(bulletOnSceneTwo_1);
                this.game.addEntity(bulletOnSceneTwo_2);
                this.game.addEntity(bulletOnSceneTwo_3);
                this.game.addEntity(bulletOnSceneTwo_4);
            }
            if (this.bulletState === 2) {
                // console.log(bulletOnSceneThree_2.x)
                this.privateAddBulletOnScreen(bulletOnSceneThree_1);
                this.privateAddBulletOnScreen(bulletOnSceneThree_2);
                this.game.addEntity(bulletOnSceneThree_1);
                this.game.addEntity(bulletOnSceneThree_2);
            }
        }
    }

    /**
     * This function update location of bullets over the time.
     */
    privateUpdateBulletLocation(){
        if (this.bulletOnSceneList !== undefined) {
            for (var i = this.bulletOnSceneList.length - 1; i > 0; i--) {
                if (this.bulletOnSceneList[i].isRemovable()){
                    this.bulletOnSceneList.splice(i, 1);
                }  else {
                    this.bulletOnSceneList[i].updateLocation();
                    this.privateHandleCollision(i);
                }
                // console.log(this.game.entities);
            }
            // Use to check if a bullet is deleted by observing the list, for dev only.
            // console.log(this.bulletOnSceneList);
        }
    }
    privateHandleCollision(index){
        this.game.entities.forEach( element => {
            if (element.boundingCircle 
                && element.boundingCircle !== this.bulletOnSceneList[index].boundingCircle // Not collide itself
                && element instanceof Enemy // Bullet should only hit enemy. Not collide with previously shot bullet in some cases
                ) {
                if (element.boundingCircle.isCollided(this.bulletOnSceneList[index].boundingCircle)) {
                    // console.log(element);
                }
            }
    })
    }

    /**
     * This function helps draw a bullet with a rotated angle.
     * @param {*} angle 
     * @param {*} element 
     * @param {*} ctx 
     * @param {*} translateX the location X to translate canvas, manually tuned.
     * @param {*} translateY the location Y to translate canvas, manually tuned.
     */
    privateDrawRotatedBullet(angle, element, ctx, translateX, translateY) {
        let offScreenCanvas = document.createElement("canvas");
        offScreenCanvas.width = 70;
        offScreenCanvas.height = 70;
        let offScreenCtx = offScreenCanvas.getContext("2d");
        offScreenCtx.translate(translateX, translateY);
        offScreenCtx.rotate(-angle * Math.PI / 180);
        element.drawFrame(this.game.clockTick, offScreenCtx, 0, 0, this.scaler);
        ctx.drawImage(offScreenCanvas, element.x, element.y);
        /**
         * @todo There is a bug where, if an orb is initialized at 0, 0, the first offscreen ctx
         *  will be drawn there as well and cannot be deleted for some reason. A work around is to
         *  drawn an orb offscreen.
         */

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