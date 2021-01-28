/**
 * This class represents the bullets shot displayed ingame.
 */
class Bullet {
    constructor(weapon){

        // Link sprite sheet
        this.spriteSheet = ASSET_MANAGER.getAsset("./assets/sprites/playerSprite.png");

        // Weapon coords
        this.weapon = weapon;
        this.game = weapon.game;
        this.xLevel1 = weapon.orbLocationX;
        this.yLevel1 = weapon.orbLocationY;
        // The orange bullet is a bit thin, so add frame width to move it to the middle of the orb
        this.xLevel2_1 = weapon.orb2X_1 + weapon.orbFrameWidth;
        this.yLevel2_1 = weapon.orb2Y_1 + weapon.orbFrameHeight;
        this.xLevel2_2 = weapon.orb2X_2 + weapon.orbFrameWidth;
        this.yLevel2_2 = weapon.orb2Y_2 + weapon.orbFrameHeight;
        this.xLevel2_3 = weapon.orb2X_3 + weapon.orbFrameWidth;
        this.yLevel2_3 = weapon.orb2Y_3 + weapon.orbFrameHeight;
        this.xLevel2_4 = weapon.orb2X_4 + weapon.orbFrameWidth;
        this.yLevel2_4 = weapon.orb2Y_4 + weapon.orbFrameHeight;

        this.scaler = weapon.scaler;
        this.frameTime = weapon.frameTime;
        this.bulletState = weapon.orbState; // 0 is red bullet, 1 is orange bullet, 2 is purple bullet
        
        this.frameCount = 1;
        this.bulletSpeed = 50;

        // Shot once every 10 degree of orb trajectory
        this.previousAngle = weapon.orbAngle;
        this.bulletAngleInterval = 10;

        // this.bulletTypeList = [];
        this.bulletOnSceneList = [];

        // this.loadAnimations();
    }


    // loadAnimations() {

    //     let redBullet = new Animator(this.spriteSheet, 15, 193, 65, 13, this.frameCount, this.frameTime, 0, false, true);
    //     let orangeBullet = new Animator(this.spriteSheet, 83, 192, 57, 7, this.frameCount, this.frameTime, 0, false, true);
    //     let purpleBullet = new Animator(this.spriteSheet, 152, 193, 56, 13, this.frameCount, this.frameTime, 0, false, true);
    //     this.bulletTypeList.push(redBullet);
    //     this.bulletTypeList.push(orangeBullet);
    //     this.bulletTypeList.push(purpleBullet);
    //     // console.log(redBullet);

    // }

    update() {
        this.xLevel1 = this.weapon.orbLocationX;
        this.yLevel1 = this.weapon.orbLocationY;
        this.xLevel2_1 = this.weapon.orb2X_1 + this.weapon.orbFrameWidth;
        this.yLevel2_1 = this.weapon.orb2Y_1 + this.weapon.orbFrameHeight;
        this.xLevel2_2 = this.weapon.orb2X_2 + this.weapon.orbFrameWidth;
        this.yLevel2_2 = this.weapon.orb2Y_2 + this.weapon.orbFrameHeight;
        this.xLevel2_3 = this.weapon.orb2X_3 + this.weapon.orbFrameWidth;
        this.yLevel2_3 = this.weapon.orb2Y_3 + this.weapon.orbFrameHeight;
        this.xLevel2_4 = this.weapon.orb2X_4 + this.weapon.orbFrameWidth;
        this.yLevel2_4 = this.weapon.orb2Y_4 + this.weapon.orbFrameHeight;
        let bulletOnSceneOne = null;
        let bulletOnSceneTwo_1 = null;
        let bulletOnSceneTwo_2 = null;
        let bulletOnSceneTwo_3 = null;
        let bulletOnSceneTwo_4 = null;
        let bulletOnSceneThree = null;

        bulletOnSceneOne = new Animator(this.spriteSheet, 15, 193, 65, 13, this.frameCount, this.frameTime, 0, false, true); // red bullet
        bulletOnSceneOne.x = -this.yLevel1;
        bulletOnSceneOne.y = this.xLevel1;

        if (this.bulletState === 1 || this.bulletState === 2) {
            bulletOnSceneTwo_1 = new Animator(this.spriteSheet, 83, 192, 57, 7, this.frameCount, this.frameTime, 0, false, true); // orange bullet
            bulletOnSceneTwo_2 = new Animator(this.spriteSheet, 83, 192, 57, 7, this.frameCount, this.frameTime, 0, false, true);
            bulletOnSceneTwo_3 = new Animator(this.spriteSheet, 83, 192, 57, 7, this.frameCount, this.frameTime, 0, false, true);
            bulletOnSceneTwo_4 = new Animator(this.spriteSheet, 83, 192, 57, 7, this.frameCount, this.frameTime, 0, false, true);
            bulletOnSceneTwo_1.x = -this.yLevel2_1;
            bulletOnSceneTwo_1.y = this.xLevel2_1;
            bulletOnSceneTwo_2.x = -this.yLevel2_2;
            bulletOnSceneTwo_2.y = this.xLevel2_2;
            bulletOnSceneTwo_3.x = -this.yLevel2_3;
            bulletOnSceneTwo_3.y = this.xLevel2_3;
            bulletOnSceneTwo_4.x = -this.yLevel2_4;
            bulletOnSceneTwo_4.y = this.xLevel2_4;
            // console.log(bulletOnSceneTwo_4.x, bulletOnSceneTwo_4.y );
        } 
        
        if (this.bulletState === 2) {
            bulletOnSceneThree = new Animator(this.spriteSheet, 152, 193, 56, 13, this.frameCount, this.frameTime, 0, false, true); // purple bullet
        }



        if (this.weapon.orbAngle - this.previousAngle === this.bulletAngleInterval || this.weapon.orbAngle === 0) {
            this.privateAddBulletOnScreen(bulletOnSceneOne);
            this.previousAngle = this.weapon.orbAngle;
            if (bulletOnSceneTwo_1 !== null) {
                this.privateAddBulletOnScreen(bulletOnSceneTwo_1);
                this.privateAddBulletOnScreen(bulletOnSceneTwo_2);
                this.privateAddBulletOnScreen(bulletOnSceneTwo_3);
                this.privateAddBulletOnScreen(bulletOnSceneTwo_4);
            }
        }
        if (this.bulletOnSceneList !== undefined) {
            for (var i = this.bulletOnSceneList.length - 1; i > 0; i--) {

                // Remove the bullet when it is out of canvas
                if (this.bulletOnSceneList[i].x >= 0){
                    this.bulletOnSceneList.splice(i, 1);
                } else {
                    this.bulletOnSceneList[i].x += this.bulletSpeed;
                }

            }
        }
    }

    draw(ctx) {
        ctx.save();
        // Rotate 90 degrees counter clockwise
        ctx.rotate(-Math.PI / 2);

        this.bulletOnSceneList.forEach(element => {
            element.drawFrame(this.game.clockTick, ctx, element.x, element.y, this.scaler);
        })

        ctx.restore();

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