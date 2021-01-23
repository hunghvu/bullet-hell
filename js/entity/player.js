class Player {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        // Link sprite sheet
        this.spriteSheet = ASSET_MANAGER.getAsset("./assets/sprites/playerSprite.png");

        // Frames for animation
        this.animation = [];
        this.loadAnimations();
        this.canvasX = 0;
        this.canvasY = 0;
        this.state = 0; // 0 means stands still, 1 is moving to the left, 2 is moving to the right.
        this.canvas = null;
        this.lastMouseX = 0;
        this.lastMouseY = 0;

    }

    addMouseListenerCanvas(canvas) {
        this.canvas = canvas;
        // Mouse position
        this.canvas.addEventListener('mousemove', event => {
            let canvasRect = this.canvas.getBoundingClientRect();
            let newMouseX = event.clientX - canvasRect.left;
            let newMouseY = event.clientY - canvasRect.top;
            // if (newMouseX < this.lastMouseX) {
            //     this.state = 1;
            // } else if (newMouseX === this.lastMouseX) {
            //     this.state = 0;
            // } else if (newMouseX > this.lastMouseX) {
            //     this.state = 2;
            // }
            this.lastMouseX = newMouseX;
            console.log(this.state);
            this.canvasX = newMouseX;
            this.canvasY = newMouseY;
        })
    }

    loadAnimations() {
        // for (var i = 0; i < 8; i++) {
            // this.animation[0] = new Animator(this.spriteSheet, 16, 16 , 32, 48, 8, 0.5, 0, false, true);
            let playerStill = new Animator(this.spriteSheet, 16, 16, 32, 48, 8, 0.125, 0, false, true);
            let playerLeft = new Animator(this.spriteSheet, 16, 48, 32, 48, 8, 0.125, 0, false, true);
            let playerRight = new Animator(this.spriteSheet, 16, 80, 32, 48, 8, 0.125, 0, false, true);
            this.animation.push(playerStill);
            this.animation.push(playerLeft);
            this.animation.push(playerRight);
            // console.log(reimu);
        // }
    }

    update() {

    }

    draw(ctx) {
        // for(var i = 0; i < 8; i++) {

        this.animation[this.state].drawFrame(this.game.clockTick, ctx, this.canvasX - 40, this.canvasY - 48, 3);

        // }
        // if (this.state === 0) {
        //     this.animation[0].drawFrame(this.game.clockTick, ctx, this.canvasX - 40, this.canvasY - 48, 3);
        // } else if (this.state === 1) {
        //     this.animation[1].drawFrame(this.game.clockTick, ctx, this.canvasX - 40, this.canvasY - 48, 3);
        // } else {
        //     this.animation[2].drawFrame(this.game.clockTick, ctx, this.canvasX - 40, this.canvasY - 48, 3);
        // }
    }
}