class Bullet {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        // Link sprite sheet
        this.spriteSheet = ASSET_MANAGER.getAsset("./assets/sprites/playerSprite.png");

        // Frames for animation
        // this.animation = [];
        // this.canvasX = 0;
        // this.canvasY = 0;
        // this.state = 0; // 0 means stands still, 1 is moving to the left, 2 is moving to the right.
        // this.lastMouseX = 0;
        // this.lastMouseY = 0;
        this.playerFrameWidth = 32;
        this.playerFrameHeight = 48;
        this.frameTime = 0.125;
        this.scaler = 3;


        // Orb angle.
        this.orbSpeed = 1;
        this.orbAngle = 0;
        this.radius = 100;
        this.orbFrameWidth = 16;
        this.orbFrameHeight = 16;

        // load will stays at bottom
        this.loadAnimations();
    }


    loadAnimations() {

        let playerStill = new Animator(this.spriteSheet, 16, 16, this.playerFrameWidth, this.playerFrameHeight, 8, this.frameTime, 0, false, true);
        let playerLeft = new Animator(this.spriteSheet, 16, 64, this.playerFrameWidth, this.playerFrameHeight, 8, this.frameTime, 0, false, true);
        let playerRight = new Animator(this.spriteSheet, 16, 112, this.playerFrameWidth, this.playerFrameHeight, 8, this.frameTime, 0, false, true);
        this.animation.push(playerStill);
        this.animation.push(playerLeft);
        this.animation.push(playerRight);

        let orb = new Animator (this.spriteSheet, 96, 160, this.orbFrameWidth, this.orbFrameHeight, 1, this.frameTime, 0, false, true);
        this.animation.push(orb); // At index 3.

    }

    update() {

    }

    draw(ctx) {

        

        this.animation[this.state].drawFrame(this.game.clockTick, ctx, this.canvasX, this.canvasY, this.scaler);

        let radian = -this.orbAngle * Math.PI / 180;

        //+ this.radius * Math.cos(radian)
        //+ this.radius * Math.sin(radian)

        // Orb width and frame width have 1:2 ratio, but height is 1:3, so the formular are different
        this.animation[3].drawFrame(this.game.clockTick, ctx, 
            this.canvasX + this.orbFrameWidth / 2 * this.scaler + this.radius * Math.cos(radian),
            this.canvasY + this.playerFrameHeight / 2 * 3 - this.orbFrameHeight / 2 * this.scaler +  this.radius * Math.sin(radian),
            3);
        this.orbAngle += this.orbSpeed;



    }
}