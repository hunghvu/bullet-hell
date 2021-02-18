/**
 * This class represents player's weapon.
 */
class PlayerWeapon {
    constructor(player) {
        
        // Define properties based on player.
        this.player = player
        this.game = player.game;
        this.x = player.x;
        this.y = player.y;
        this.scaler = player.scaler;
        this.frameTime = player.frameTime

        // Link sprite sheet
        this.spriteSheet = ASSET_MANAGER.getAsset("./assets/sprites/playerSprite.png");

        // Frames for orb
        this.orbList = []
        this.orbState = 0; // 0 is blue, 1 is orange, 2 is purprle
        // Orb angle.
        this.orbSpeed = 1;
        this.orbAngle = 0;
        this.radius = 60;
        this.orbFrameWidth = 16;
        this.orbFrameHeight = 16;

        // Max value to initialize orb off screen
        // Level 1 orb
        this.orbLocationX = Number.MAX_VALUE;
        this.orbLocationY = Number.MAX_VALUE;

        // Level 2 orbs (4 orb) + orb level 1
        this.orb2X_1 = Number.MAX_VALUE;
        this.orb2Y_1 = Number.MAX_VALUE;
        this.orb2X_2 = Number.MAX_VALUE;
        this.orb2Y_2 = Number.MAX_VALUE;
        this.orb2X_3 = Number.MAX_VALUE;
        this.orb2Y_3 = Number.MAX_VALUE;
        this.orb2X_4 = Number.MAX_VALUE;
        this.orb2Y_4 = Number.MAX_VALUE;

        // Level 2 orbs (2 orbs) + orbs level 1 + orb lv 2
        this.orb3X_1 = Number.MAX_VALUE;
        this.orb3Y_1 = Number.MAX_VALUE;
        this.orb3X_2 = Number.MAX_VALUE;
        this.orb3Y_2 = Number.MAX_VALUE;
        this.orb3Accumulator = 0;
        this.orb3Direction = false; // False means moving out, true means inward

        this.frameCount = 1;

        this.bullet = new BulletReimu(this);

        this.loadAnimation();
    }

    loadAnimation() {
        let orbBlue = new Animator (this.spriteSheet, 80, 160, this.orbFrameWidth, this.orbFrameHeight, this.frameCount, this.frameTime, 0, false, true);
        let orbOrange = new Animator (this.spriteSheet, 96, 160, this.orbFrameWidth, this.orbFrameHeight, this.frameCount, this.frameTime, 0, false, true);
        let orbPurple = new Animator (this.spriteSheet, 112, 160, this.orbFrameWidth, this.orbFrameHeight, this.frameCount, this.frameTime, 0, false, true);
        this.orbList.push(orbBlue);
        this.orbList.push(orbOrange);
        this.orbList.push(orbPurple);
    }

    update() {
        // Level 2 orb, right to left
        this.orb2X_1 = this.player.canvasX + this.player.playerFrameWidth * this.scaler;
        this.orb2Y_1 = this.player.canvasY + this.player.playerFrameHeight * this.scaler;

        this.orb2X_2 = this.player.canvasX + this.player.playerFrameWidth * this.scaler - this.orbFrameWidth * this.scaler;
        this.orb2Y_2 = this.player.canvasY + this.player.playerFrameHeight * (this.scaler + 1);

        this.orb2X_3 = this.player.canvasX + this.player.playerFrameWidth * this.scaler - this.orbFrameWidth * this.scaler * 2;
        this.orb2Y_3 = this.player.canvasY + this.player.playerFrameHeight * (this.scaler + 1);

        this.orb2X_4 = this.player.canvasX + this.player.playerFrameWidth * this.scaler - this.orbFrameWidth * this.scaler * 3;
        this.orb2Y_4 = this.player.canvasY + this.player.playerFrameHeight * this.scaler;

        // Level 3 orb, right to left
        this.orb3X_1 = this.orb2X_1; //under orb2_1
        this.orb3Y_1 = this.orb2Y_2;

        this.orb3X_2 = this.orb2X_4; //under orb2_4
        this.orb3Y_2 = this.orb3Y_1;
        // Make level 3 orb move in an out
        if (this.orb3Direction === false) {
            this.orb3X_1 += this.orb3Accumulator;
            this.orb3X_2 -= this.orb3Accumulator; 
            this.orb3Accumulator ++;
            if (this.orbFrameWidth * this.scaler < this.orb3Accumulator) {
                this.orb3Direction = true;
            }
        } else if (this.orb3Direction === true) {
            this.orb3X_1 += this.orb3Accumulator;
            this.orb3X_2 -= this.orb3Accumulator; 
            this.orb3Accumulator --;
            if (this.orb3Accumulator < 0) {
                this.orb3Direction = false;
            }
        }      
    }

    draw(ctx) {
        
        let radian = -this.orbAngle * Math.PI / 180;

        //+ this.radius * Math.cos(radian)
        //+ this.radius * Math.sin(radian)

        // Orb width and frame width have 1:2 ratio, but height is 1:3, so the formular are different
        // @todo, the location should be changed when the ratio is returned to 1:1
        this.orbLocationX = this.player.canvasX + this.orbFrameWidth / 2 * this.scaler + this.radius * Math.cos(radian);
        this.orbLocationY = this.player.canvasY 
                            + this.player.playerFrameHeight / 2 * this.scaler 
                            - this.orbFrameHeight / 2 * this.scaler +  this.radius * Math.sin(radian);
        this.orbList[0].drawFrame(this.game.clockTick, ctx, this.orbLocationX, this.orbLocationY, this.scaler);
        
        if(this.orbState == 1 || this.orbState === 2) {
            

            // console.log(this.orb2X_1);
            
            this.orbList[1].drawFrame(this.game.clockTick, ctx, 
                this.orb2X_1, 
                this.orb2Y_1, this.scaler);
            this.orbList[1].drawFrame(this.game.clockTick, ctx, 
                this.orb2X_2, 
                this.orb2Y_2, this.scaler);
            this.orbList[1].drawFrame(this.game.clockTick, ctx, 
                this.orb2X_3, 
                this.orb2Y_3, this.scaler);
            this.orbList[1].drawFrame(this.game.clockTick, ctx, 
                this.orb2X_4, 
                this.orb2Y_4, this.scaler);

        }

        if (this.orbState === 2) {
            
            this.orbList[2].drawFrame(this.game.clockTick, ctx, 
                this.orb3X_1, 
                this.orb3Y_1, this.scaler);
            this.orbList[2].drawFrame(this.game.clockTick, ctx, 
                this.orb3X_2, 
                this.orb3Y_2, this.scaler);

        }
        
        if (this.orbAngle === 360) {
            this.orbAngle = 0;
        } else {
            this.orbAngle += this.orbSpeed;
        }
        // console.log(this.orbAngle)

        // console.log(this.player.canvasX + this.orbFrameWidth / 2 * this.scaler + this.radius * Math.cos(radian))
    }
}