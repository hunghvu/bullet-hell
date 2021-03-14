class EnemyWeapon {
    constructor(enemy) {
        
        // Define properties based on enemy.
        this.enemy = enemy
        this.game = enemy.game;
        this.enemyX = enemy.x;
        this.enemyY = enemy.y;
        this.scaler = enemy.scaler;
        this.frameTime = enemy.frameTime

        // Link sprite sheet
        this.spriteSheet = ASSET_MANAGER.getAsset("./assets/sprites/enemySprite.png");

        // Frames for orb
        this.orbList = []
        this.orbState = 0; // 0 is blue, 1 is orange, 2 is purprle
        // Orb angle.
        this.orbSpeed = 1;
        this.orbAngle = 0;
        this.radius = 80;
        this.orbFrameWidth = 16;
        this.orbFrameHeight = 16;

        // Max value to initialize orb off screen
        this.orb1LocationX = Number.MAX_VALUE;
        this.orb1LocationY = Number.MAX_VALUE;

        this.orb2LocationX = Number.MAX_VALUE;
        this.orb2LocationY = Number.MAX_VALUE;

        this.orb3LocationX = Number.MAX_VALUE;
        this.orb3LocationY = Number.MAX_VALUE;

        this.orb4LocationX = Number.MAX_VALUE;
        this.orb4LocationY = Number.MAX_VALUE;

        this.orb5LocationX = Number.MAX_VALUE;
        this.orb5LocationY = Number.MAX_VALUE;

        this.orb6LocationX = Number.MAX_VALUE;
        this.orb6LocationY = Number.MAX_VALUE;

        this.secondStage = false;
        this.thirdStage = false;
        this.frameCount = 1;
        this.bullet = new BulletEnemyPatternOne(this);

        this.loadAnimation();
    }

    loadAnimation() {
        let orb1 = new Animator (this.spriteSheet, 0, 0, this.orbFrameWidth, this.orbFrameHeight, this.frameCount, this.frameTime, 0, false, true);
        let orb2 = new Animator (this.spriteSheet, 0, 0, this.orbFrameWidth, this.orbFrameHeight, this.frameCount, this.frameTime, 0, false, true);
        let orb3 = new Animator (this.spriteSheet, 0, 0, this.orbFrameWidth, this.orbFrameHeight, this.frameCount, this.frameTime, 0, false, true);
        let orb4 = new Animator (this.spriteSheet, 0, 0, this.orbFrameWidth, this.orbFrameHeight, this.frameCount, this.frameTime, 0, false, true);
        let orb5 = new Animator (this.spriteSheet, 0, 0, this.orbFrameWidth, this.orbFrameHeight, this.frameCount, this.frameTime, 0, false, true);
        let orb6 = new Animator (this.spriteSheet, 0, 0, this.orbFrameWidth, this.orbFrameHeight, this.frameCount, this.frameTime, 0, false, true);
        this.orbList.push(orb1);
        this.orbList.push(orb2);
        this.orbList.push(orb3);
        this.orbList.push(orb4);
        this.orbList.push(orb5);
        this.orbList.push(orb6);

    }

    update() {
        let radian1 = -this.orbAngle * Math.PI / 180;

        // Second stage, flower petal like pattern
        if (this.secondStage && !this.thirdStage) {
            let distance = Math.cos(5 * radian1) * 15 + this.radius;
            this.orb1LocationX = this.enemy.canvasX + this.orbFrameWidth + 10 * this.scaler + distance * Math.cos(radian1);
            this.orb1LocationY = this.enemy.canvasY + this.enemy.enemyFrameHeight / 2 * this.scaler - this.orbFrameHeight / 2 * this.scaler +  distance * Math.sin(radian1);
    
            let radian2 = radian1 + 90;
            this.orb2LocationX = this.enemy.canvasX + this.orbFrameWidth + 10 * this.scaler + distance * Math.cos(radian2);
            this.orb2LocationY = this.enemy.canvasY + this.enemy.enemyFrameHeight / 2 * this.scaler - this.orbFrameHeight / 2 * this.scaler +  distance * Math.sin(radian2);
    
            let radian3 = radian1 + 180;
            this.orb3LocationX = this.enemy.canvasX + this.orbFrameWidth + 10 * this.scaler + this.radius * Math.cos(radian3);
            this.orb3LocationY = this.enemy.canvasY + this.enemy.enemyFrameHeight / 2 * this.scaler - this.orbFrameHeight / 2 * this.scaler +  distance * Math.sin(radian3);
    
            let radian4 = this.orbAngle * Math.PI / 180;
            this.orb4LocationX = this.enemy.canvasX + this.orbFrameWidth + 10 * this.scaler + this.radius * Math.cos(radian1);
            this.orb4LocationY = this.enemy.canvasY + this.enemy.enemyFrameHeight / 2 * this.scaler - this.orbFrameHeight / 2 * this.scaler +  distance * Math.sin(radian4);
    
            let radian5 = radian4 + 90;
            this.orb5LocationX = this.enemy.canvasX + this.orbFrameWidth + 10 * this.scaler + this.radius * Math.cos(radian2);
            this.orb5LocationY = this.enemy.canvasY + this.enemy.enemyFrameHeight / 2 * this.scaler - this.orbFrameHeight / 2 * this.scaler +  distance * Math.sin(radian5);
    
            let radian6 = radian4 + 180;
            this.orb6LocationX = this.enemy.canvasX + this.orbFrameWidth + 10 * this.scaler + this.radius * Math.cos(radian3);
            this.orb6LocationY = this.enemy.canvasY + this.enemy.enemyFrameHeight / 2 * this.scaler - this.orbFrameHeight / 2 * this.scaler +  distance * Math.sin(radian6);
            return;
        }
        
        // Third stage, pattern looks to be more randomized visually
        if(this.thirdStage) radian1 *= -Math.PI;

        // First stage, spriral like pattern
        this.orb1LocationX = this.enemy.canvasX + this.orbFrameWidth + 10 * this.scaler + this.radius * Math.cos(radian1);
        this.orb1LocationY = this.enemy.canvasY + this.enemy.enemyFrameHeight / 2 * this.scaler - this.orbFrameHeight / 2 * this.scaler +  this.radius * Math.sin(radian1);

        let radian2 = radian1 + 90;
        this.orb2LocationX = this.enemy.canvasX + this.orbFrameWidth + 10 * this.scaler + this.radius * Math.cos(radian2);
        this.orb2LocationY = this.enemy.canvasY + this.enemy.enemyFrameHeight / 2 * this.scaler - this.orbFrameHeight / 2 * this.scaler +  this.radius * Math.sin(radian2);

        let radian3 = radian1 + 180;
        this.orb3LocationX = this.enemy.canvasX + this.orbFrameWidth + 10 * this.scaler + this.radius * Math.cos(radian3);
        this.orb3LocationY = this.enemy.canvasY + this.enemy.enemyFrameHeight / 2 * this.scaler - this.orbFrameHeight / 2 * this.scaler +  this.radius * Math.sin(radian3);

        let radian4 = this.orbAngle * Math.PI / 180;
        this.orb4LocationX = this.enemy.canvasX + this.orbFrameWidth + 10 * this.scaler + this.radius * Math.cos(radian1);
        this.orb4LocationY = this.enemy.canvasY + this.enemy.enemyFrameHeight / 2 * this.scaler - this.orbFrameHeight / 2 * this.scaler +  this.radius * Math.sin(radian4);

        let radian5 = radian4 + 90;
        this.orb5LocationX = this.enemy.canvasX + this.orbFrameWidth + 10 * this.scaler + this.radius * Math.cos(radian2);
        this.orb5LocationY = this.enemy.canvasY + this.enemy.enemyFrameHeight / 2 * this.scaler - this.orbFrameHeight / 2 * this.scaler +  this.radius * Math.sin(radian5);

        let radian6 = radian4 + 180;
        this.orb6LocationX = this.enemy.canvasX + this.orbFrameWidth + 10 * this.scaler + this.radius * Math.cos(radian3);
        this.orb6LocationY = this.enemy.canvasY + this.enemy.enemyFrameHeight / 2 * this.scaler - this.orbFrameHeight / 2 * this.scaler +  this.radius * Math.sin(radian6);

    }

    draw(ctx) {
        this.orbList[0].drawFrame(this.game.clockTick, ctx, this.orb1LocationX, this.orb1LocationY, this.scaler);
        this.orbList[1].drawFrame(this.game.clockTick, ctx, this.orb2LocationX, this.orb2LocationY, this.scaler);
        this.orbList[2].drawFrame(this.game.clockTick, ctx, this.orb3LocationX, this.orb3LocationY, this.scaler);

        this.orbList[3].drawFrame(this.game.clockTick, ctx, this.orb4LocationX, this.orb4LocationY, this.scaler);
        this.orbList[4].drawFrame(this.game.clockTick, ctx, this.orb5LocationX, this.orb5LocationY, this.scaler);
        this.orbList[5].drawFrame(this.game.clockTick, ctx, this.orb6LocationX, this.orb6LocationY, this.scaler);

        
        
        if (this.orbAngle === 360) {
            this.orbAngle = 0;
        } else {
            this.orbAngle += this.orbSpeed;
        }
        // console.log(this.orbAngle)

        // console.log(this.enemy.canvasX + this.orbFrameWidth / 2 * this.scaler + this.radius * Math.cos(radian))
    }
}