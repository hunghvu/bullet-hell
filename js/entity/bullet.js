class Bullet {
    constructor(weapon){


        // Link sprite sheet
        this.spriteSheet = ASSET_MANAGER.getAsset("./assets/sprites/playerSprite.png");


        this.weapon = weapon;
        this.game = weapon.game;
        this.x = weapon.orbLocationX;
        this.y = weapon.orbLocationY;
        this.scaler = weapon.scaler;
        this.frameTime = weapon.frameTime;

        this.weaponState = 0; // 0 is red bullet, 1 is orange bullet, 2 is purple bullet
        this.frameCount = 1;
        this.bulletSpeed = 1000;

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
        this.x = this.weapon.orbLocationX;
        this.y = this.weapon.orbLocationY;
        let bulletOnScence = null;
        if (this.weaponState === 0) {
            bulletOnScence = new Animator(this.spriteSheet, 15, 193, 65, 13, this.frameCount, this.frameTime, 0, false, true); // red bullet
        } else if (this.weaponState === 1) {
            bulletOnScence = new Animator(this.spriteSheet, 83, 192, 57, 7, this.frameCount, this.frameTime, 0, false, true); // orange bullet
        } else if (this.weaponState === 2) {
            bulletOnScence = new Animator(this.spriteSheet, 152, 193, 56, 13, this.frameCount, this.frameTime, 0, false, true); // purple bullet
        }
        
        bulletOnScence.x = -this.y;
        bulletOnScence.y = this.x;
        this.privateAddBulletOnScreen(bulletOnScence);
        if (this.bulletOnSceneList !== undefined) {
            for (var i = this.bulletOnSceneList.length - 1; i > 0; i--) {
                console.log(i + " " + this.bulletOnSceneList[i].x)
                if (this.bulletOnSceneList[i].x >= 0){
                    this.bulletOnSceneList.splice(i, 1);
                    console.log(true);
                } else {
                    this.bulletOnSceneList[i].x++;
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


    privateAddBulletOnScreen(bullet){
        // Temporary limit on number of bullet on screen, used for dev only
        if (this.bulletOnSceneList.length == 10) {
            console.log(this.bulletOnSceneList.length)
            return;
        }
        // console.log(this.bulletOnSceneList.length);
        this.bulletOnSceneList.push(bullet);
    }
}