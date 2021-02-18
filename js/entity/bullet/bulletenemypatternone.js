/**
 * This class is a bullet manager for the first bullet pattern of enemy (Spiral).
 * It will initialize and update bullets on screen for an enemy.
 */
class BulletEnemyPatternOne {
    constructor(weapon){

        // Link sprite sheet
        this.spriteSheet = ASSET_MANAGER.getAsset("./assets/sprites/bulletSprite.png");

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
        this.bulletOnSceneList.forEach(element => {
            element.animator.drawFrame(this.game.clockTick, ctx, element.x, element.y, this.scaler);

            // For dev only. Draw bounding circle
            ctx.beginPath();
            ctx.arc(element.boundingCircle.centerX, element.boundingCircle.centerY, this.boundingCircleRadius, 0, Math.PI * 2);
            ctx.stroke();
        });
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

        bulletOnSceneOne = new Bullet(
            new Animator(this.spriteSheet, 4, 37, 16, 16, this.frameCount, this.frameTime, 0, false, true),
            this.x1,
            this.y1,
            null,
            new BoundingCircle(this.x1, this.y1, this.boundingCircleRadius),
            this, 1,
            new Vector(this.x1 - this.weapon.enemyX, this.y1 - this.weapon.enemyY)
            );
        
        bulletOnSceneTwo = new Bullet(
            new Animator(this.spriteSheet, 20, 37, 16, 16, this.frameCount, this.frameTime, 0, false, true),
            this.x2,
            this.y2,
            null,
            new BoundingCircle(this.x2, this.y2, this.boundingCircleRadius),
            this, 1,
            new Vector(this.x2 - this.weapon.enemyX, this.y2 - this.weapon.enemyY)
            );

        bulletOnSceneThree = new Bullet(
            new Animator(this.spriteSheet, 36, 37, 16, 16, this.frameCount, this.frameTime, 0, false, true),
            this.x3,
            this.y3,
            null,
            new BoundingCircle(this.x3, this.y3, this.boundingCircleRadius),
            this, 1,
            new Vector(this.x3 - this.weapon.enemyX, this.y3 - this.weapon.enemyY)
            );
        
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
                    this.bulletOnSceneList[i].updateLocationWithVector();
                    this.bulletOnSceneList[i].handleCollision();
                }
                // console.log(this.game.entities);
            }
            // Use to check if a bullet is deleted by observing the list, for dev only.
            // console.log(this.bulletOnSceneList);
        }
    }

}