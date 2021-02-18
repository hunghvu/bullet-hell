/**
 * This class is a bullet manager for a character Reimu.
 * It will initialize and update bullets on screen for Reimu.
 */
class BulletEnemyPatternOne {
    constructor(weapon){

        // Link sprite sheet
        this.spriteSheet = ASSET_MANAGER.getAsset("./assets/sprites/playerSprite.png");

        // Weapon coords
        this.weapon = weapon;
        this.game = weapon.game;

        this.x1 = weapon.orb1LocationX;
        this.y1 = weapon.orb1LocationY;

        this.x2 = weapon.orb2LocationX;
        this.y2 = weapon.orb2LocationY;

        this.x3 = weapon.orb3LocationX;
        this.y3 = weapon.orb3LocationY;

        this.scaler = weapon.scaler;
        this.frameTime = weapon.frameTime;
        // this.bulletState = weapon.orbState; // 0 is red bullet, 1 is orange bullet, 2 is purple bullet
        
        this.frameCount = 1;
        this.bulletSpeed = 50;

        // Shot once every 10 degree of orb trajectory
        this.previousAngle = weapon.orbAngle;
        this.bulletAngleInterval = 10;

        // Add bounding circle for each bullet, bullet will have its own bounding circle
        this.boundingCircleRadius = 10;

        this.buggyBulletRemoved = false;
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
                this.privateDrawRotatedBullet(105, element, ctx, 20, 60);
            } else if (element.side === "right") {
                this.privateDrawRotatedBullet(75, element, ctx, 20, 60);
            } else if (element.side === null) {
                this.privateDrawRotatedBullet(90, element, ctx, 0, 70);
            }

            // For dev only. Draw bounding circle
            ctx.beginPath();
            ctx.arc(element.boundingCircle.centerX, element.boundingCircle.centerY, this.boundingCircleRadius, 0, Math.PI * 2);
            ctx.stroke();
        });


        // console.log(this.bulletOnSceneList)
    }

    /**
     * This function update the current orbs (weapon) location on screen.
     */
    privateUpdateOrbLocation(){
        this.x1 = this.weapon.orb1LocationX;
        this.y1 = this.weapon.orb1LocationY;

        this.x2 = this.weapon.orb2LocationX;
        this.y2 = this.weapon.orb2LocationY;

        this.x3 = this.weapon.orb3LocationX;
        this.y3 = this.weapon.orb3LocationY;
    }

    /**
     * This function creates bullets to be shot.
     */
    privateInitBullet(){
        let bulletOnSceneOne = null;
        let bulletOnSceneTwo = null;
        let bulletOnSceneThree = null;


        // Level 1
        bulletOnSceneOne = new Bullet(
            new Animator(this.spriteSheet, 15, 193, 65, 13, this.frameCount, this.frameTime, 0, false, true),
            this.x1,
            this.y1,
            null,
            new BoundingCircle(this.x1, this.y1, this.boundingCircleRadius),
            this, 1);
        
        bulletOnSceneTwo = new Bullet(
            new Animator(this.spriteSheet, 15, 193, 65, 13, this.frameCount, this.frameTime, 0, false, true),
            this.x2,
            this.y2,
            null,
            new BoundingCircle(this.x1, this.y1, this.boundingCircleRadius),
            this, 1);

        bulletOnSceneThree = new Bullet(
            new Animator(this.spriteSheet, 15, 193, 65, 13, this.frameCount, this.frameTime, 0, false, true),
            this.x3,
            this.y3,
            null,
            new BoundingCircle(this.x1, this.y1, this.boundingCircleRadius),
            this, 1);
        

        if (this.weapon.orbAngle - this.previousAngle === this.bulletAngleInterval || this.weapon.orbAngle === 0) {
            this.bulletOnSceneList.push(bulletOnSceneOne);
            this.game.addEntity(bulletOnSceneOne);
            this.bulletOnSceneList.push(bulletOnSceneTwo);
            this.game.addEntity(bulletOnSceneTwo);
            this.bulletOnSceneList.push(bulletOnSceneThree);
            this.game.addEntity(bulletOnSceneThree);
            this.previousAngle = this.weapon.orbAngle;
        }
    }

    /**
     * This function update location of bullets over the time.
     */
    privateUpdateBulletLocation(){
        if (this.bulletOnSceneList !== undefined) {
            for (var i = this.bulletOnSceneList.length - 1; i >= 0; i--) {
                // console.log(this.bulletOnSceneList[i]);
                if (this.bulletOnSceneList[i].isRemovable()){
                    this.bulletOnSceneList.splice(i, 1);
                }  else {
                    this.bulletOnSceneList[i].updateLocation();
                    this.bulletOnSceneList[i].handleCollision();
                }
                // console.log(this.game.entities);
            }
            // Use to check if a bullet is deleted by observing the list, for dev only.
            // console.log(this.bulletOnSceneList);
        }
    }


    /**
     * This function helps draw a bullet with a rotated angle.
     * @param {*} angle angle to rotate (counter clockwise is positive)
     * @param {*} element the bullet
     * @param {*} ctx canvas context
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
        element.animator.drawFrame(this.game.clockTick, offScreenCtx, 0, 0, this.scaler);
        ctx.drawImage(offScreenCanvas, element.x, element.y);
        /**
         * @todo There is a bug where, if an orb is initialized at 0, 0, the first offscreen ctx
         *  will be drawn there as well and cannot be deleted for some reason. A work around is to
         *  drawn an orb offscreen.
         */

    }

}