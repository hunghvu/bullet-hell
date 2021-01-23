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
        this.lastMouseX = 0;
        this.lastMouseY = 0;

        // A work around to display parallax background. Technically, it should be determined
        //  by the camera instead. And the background should have its own class.
        this.speed = 0.5;
        this.background = new Image();
        this.background.src = "./assets/background.png";
        this.backgroundPositionY = 0;
        this.canvas = null;
    }

    /**
     * This function helps moving the character around based on mouse movement.
     * @param {canvas} canvas Canvas for game.
     */
    addMouseListenerCanvas(canvas) {
        // Side task, adjust origin of the background. This can move to another function later.
        this.canvas = canvas;
        this.backgroundPositionY = (this.background.height - this.canvas.height) * -1;

        // A separate timer to detect if the mouse has stopped moving
        //  Source: https://stackoverflow.com/questions/17646825/how-to-detect-when-mouse-has-stopped
        let timer = null;
        canvas.addEventListener('mousemove', event => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.state = 0;
            }, 500);

            // Only get mouse coordinate inside canvas
            let canvasRect = canvas.getBoundingClientRect();
            let newMouseX = event.clientX - canvasRect.left;
            let newMouseY = event.clientY - canvasRect.top;

            // Change state of direction
            if (newMouseX < this.lastMouseX) {
                this.state = 1;
            } else if (newMouseX === this.lastMouseX) {
                this.state = 0;
            } else if (newMouseX > this.lastMouseX) {
                this.state = 2;
            }

            //
            this.lastMouseX = newMouseX; // Real mouse position
            this.lastMouseY = newMouseY;
            this.canvasX = newMouseX - 40; // Modified position so the mouse is at
            this.canvasY = newMouseY - 48; //  the center of character sprite

            console.log(this.state);
        })
    }

    loadAnimations() {

        let playerStill = new Animator(this.spriteSheet, 16, 16, 32, 48, 8, 0.125, 0, false, true);
        let playerLeft = new Animator(this.spriteSheet, 16, 64, 32, 48, 8, 0.125, 0, false, true);
        let playerRight = new Animator(this.spriteSheet, 16, 112, 32, 48, 8, 0.125, 0, false, true);
        this.animation.push(playerStill);
        this.animation.push(playerLeft);
        this.animation.push(playerRight);

    }

    update() {

    }

    draw(ctx) {

        // Draw the image off canvas then gradually move it.
        ctx.drawImage(this.background, 0, this.backgroundPositionY);
        if (this.backgroundPositionY <= 0) {
            this.backgroundPositionY += this.speed;
        }

        this.animation[this.state].drawFrame(this.game.clockTick, ctx, this.canvasX - 40, this.canvasY - 48, 3);



    }
}