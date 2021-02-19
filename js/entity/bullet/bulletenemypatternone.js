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

        this.x4 = weapon.orb4LocationX;
        this.y4 = weapon.orb4LocationY;

        this.x5 = weapon.orb5LocationX;
        this.y5 = weapon.orb5LocationY;

        this.x6 = weapon.orb6LocationX;
        this.y6 = weapon.orb6LocationY;

        this.scaler = weapon.scaler;
        this.frameTime = weapon.frameTime;
        
        this.frameCount = 1;
        this.bulletSpeed = 50;

        // Shot once every 10 degree of orb trajectory
        this.previousAngle = weapon.orbAngle;
        this.bulletAngleInterval = 5;

        // Add bounding circle for each bullet, bullet will have its own bounding circle
        this.boundingCircleRadius = 10;

        this.buggyBulletRemoved = false;
        this.frameWidthAndHeight = 16;
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

        this.x4 = this.weapon.orb4LocationX;
        this.y4 = this.weapon.orb4LocationY;

        this.x5 = this.weapon.orb5LocationX;
        this.y5 = this.weapon.orb5LocationY;

        this.x6 = this.weapon.orb6LocationX;
        this.y6 = this.weapon.orb6LocationY;
    }

    /**
     * This function creates bullets to be shot.
     */
    privateInitBullet(){
        let bulletOnSceneOne = null;
        let bulletOnSceneTwo = null;
        let bulletOnSceneThree = null;
        let bulletOnSceneFour = null;
        let bulletOnSceneFive = null;
        let bulletOnSceneSix = null;


        bulletOnSceneOne = new Bullet(
            this.weapon.enemy,
            new Animator(this.spriteSheet, 4, 37, this.frameWidthAndHeight, this.frameWidthAndHeight, this.frameCount, this.frameTime, 0, false, true),
            this.x1,
            this.y1,
            null,
            new BoundingCircle(this.x1 + this.frameWidthAndHeight / 2, this.y1 + this.frameWidthAndHeight / 2, this.boundingCircleRadius),
            this, 1,
            new Vector(this.x1 - this.weapon.enemy.boundingCircle.centerX, this.y1 - this.weapon.enemy.boundingCircle.centerY)
            );
        
        bulletOnSceneTwo = new Bullet(
            this.weapon.enemy,
            new Animator(this.spriteSheet, 20, 37, this.frameWidthAndHeight, this.frameWidthAndHeight, this.frameCount, this.frameTime, 0, false, true),
            this.x2,
            this.y2,
            null,
            new BoundingCircle(this.x2 + this.frameWidthAndHeight / 2, this.y2 + this.frameWidthAndHeight / 2, this.boundingCircleRadius),
            this, 1,
            new Vector(this.x2 - this.weapon.enemy.boundingCircle.centerX, this.y2 - this.weapon.enemy.boundingCircle.centerY)
            );

        bulletOnSceneThree = new Bullet(
            this.weapon.enemy,
            new Animator(this.spriteSheet, 36, 37, this.frameWidthAndHeight, this.frameWidthAndHeight, this.frameCount, this.frameTime, 0, false, true),
            this.x3,
            this.y3,
            null,
            new BoundingCircle(this.x3 + this.frameWidthAndHeight / 2, this.y3 + this.frameWidthAndHeight / 2, this.boundingCircleRadius),
            this, 1,
            new Vector(this.x3 - this.weapon.enemy.boundingCircle.centerX, this.y3 - this.weapon.enemy.boundingCircle.centerY)
            );

        bulletOnSceneFour = new Bullet(
            this.weapon.enemy,
            new Animator(this.spriteSheet, 36, 37, this.frameWidthAndHeight, this.frameWidthAndHeight, this.frameCount, this.frameTime, 0, false, true),
            this.x4,
            this.y4,
            null,
            new BoundingCircle(this.x4 + this.frameWidthAndHeight / 2, this.y4 + this.frameWidthAndHeight / 2, this.boundingCircleRadius),
            this, 1,
            new Vector(this.x4 - this.weapon.enemy.boundingCircle.centerX, this.y4 - this.weapon.enemy.boundingCircle.centerY)
            );

        bulletOnSceneFive = new Bullet(
            this.weapon.enemy,
            new Animator(this.spriteSheet, 36, 37, this.frameWidthAndHeight, this.frameWidthAndHeight, this.frameCount, this.frameTime, 0, false, true),
            this.x5,
            this.y5,
            null,
            new BoundingCircle(this.x5 + this.frameWidthAndHeight / 2, this.y5 + this.frameWidthAndHeight / 2, this.boundingCircleRadius),
            this, 1,
            new Vector(this.x5 - this.weapon.enemy.boundingCircle.centerX, this.y5 - this.weapon.enemy.boundingCircle.centerY)
            );

        bulletOnSceneSix = new Bullet(
            this.weapon.enemy,
            new Animator(this.spriteSheet, 36, 37, this.frameWidthAndHeight, this.frameWidthAndHeight, this.frameCount, this.frameTime, 0, false, true),
            this.x6,
            this.y6,
            null,
            new BoundingCircle(this.x6 + this.frameWidthAndHeight / 2, this.y6 + this.frameWidthAndHeight / 2, this.boundingCircleRadius),
            this, 1,
            new Vector(this.x6 - this.weapon.enemy.boundingCircle.centerX, this.y6 - this.weapon.enemy.boundingCircle.centerY)
            );
        
        if (this.weapon.orbAngle - this.previousAngle === this.bulletAngleInterval || this.weapon.orbAngle === 0) {
            this.bulletOnSceneList.push(bulletOnSceneOne);
            this.game.addEntity(bulletOnSceneOne);
            this.bulletOnSceneList.push(bulletOnSceneTwo);
            this.game.addEntity(bulletOnSceneTwo);
            this.bulletOnSceneList.push(bulletOnSceneThree);
            this.game.addEntity(bulletOnSceneThree);
            this.bulletOnSceneList.push(bulletOnSceneFour);
            this.game.addEntity(bulletOnSceneFour);
            this.bulletOnSceneList.push(bulletOnSceneFive);
            this.game.addEntity(bulletOnSceneFive);
            this.bulletOnSceneList.push(bulletOnSceneSix);
            this.game.addEntity(bulletOnSceneSix);
            this.previousAngle = this.weapon.orbAngle;
        }
    }

    /**
     * This function update location of bullets over the time.
     */
    privateUpdateBulletLocation(){
        if (this.bulletOnSceneList !== undefined) {
            for (var i = this.bulletOnSceneList.length - 1; i >= 0; i--) {
                // console.log(this.bulletOnSceneList[i].isRemovable());
                if (this.bulletOnSceneList[i].isRemovable()){
                    this.bulletOnSceneList.splice(i, 1);
                }  else {
                    this.bulletOnSceneList[i].updateLocationWithVector();
                    // this.bulletOnSceneList[i].handleCollision();
                }
                // console.log(this.game.entities);
            }
            // Use to check if a bullet is deleted by observing the list, for dev only.
            // console.log(this.bulletOnSceneList);
        }
    }

}